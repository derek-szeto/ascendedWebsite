import { randomUUID } from 'node:crypto';
import Stripe from 'stripe';
import { CartValidationError, compactCartSummary, toStripeLineItems, validateCart } from './_shared/cart.js';
import { getSiteUrl, jsonResponse } from './_shared/http.js';

const API_VERSION = '2026-07-29.dahlia';
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const getStripeClient = () => {
  const apiKey = process.env.STRIPE_API_KEY;
  if (!apiKey) throw new Error('STRIPE_API_KEY is not configured.');
  return new Stripe(apiKey, { apiVersion: API_VERSION });
};

const isLiveKey = (apiKey = '') => apiKey.startsWith('rk_live_') || apiKey.startsWith('sk_live_');

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed.' });
  }

  if (isLiveKey(process.env.STRIPE_API_KEY) && process.env.STRIPE_LIVE_CHECKOUT_ENABLED !== 'true') {
    return jsonResponse(503, { error: 'Live checkout is not enabled yet.' });
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const items = validateCart(payload.items);
    const siteUrl = getSiteUrl();
    const orderId = `AE-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 6).toUpperCase()}`;
    const requestId = UUID_PATTERN.test(payload.requestId || '') ? payload.requestId : randomUUID();
    const cartSummary = compactCartSummary(items);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const stripe = getStripeClient();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      client_reference_id: orderId,
      line_items: toStripeLineItems(items),
      success_url: `${siteUrl}/store?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/store?checkout=cancelled`,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      shipping_options: [{
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'usd' },
          display_name: 'Free local delivery or pickup',
        },
      }],
      metadata: {
        order_id: orderId,
        cart: cartSummary,
        item_count: String(itemCount),
      },
      payment_intent_data: {
        metadata: {
          order_id: orderId,
          cart: cartSummary,
        },
      },
      custom_text: {
        shipping_address: {
          message: 'Free fulfillment is available within Ascend-Ed’s local Illinois service area. We will contact you to coordinate delivery or pickup.',
        },
        submit: {
          message: 'Your purchase helps support Ascend-Ed educational programs.',
        },
      },
      submit_type: 'pay',
    }, {
      idempotencyKey: `ascend-ed-checkout-${requestId}`,
    });

    return jsonResponse(200, { url: session.url });
  } catch (error) {
    if (error instanceof CartValidationError || error instanceof SyntaxError) {
      return jsonResponse(400, { error: error.message || 'Invalid checkout request.' });
    }

    console.error('Checkout Session creation failed', {
      type: error?.type,
      code: error?.code,
      requestId: error?.requestId,
    });
    return jsonResponse(500, { error: 'Checkout is temporarily unavailable. Please try again.' });
  }
};
