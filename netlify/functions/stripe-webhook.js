import Stripe from 'stripe';

const API_VERSION = '2026-07-29.dahlia';

const response = (statusCode, body = '') => ({ statusCode, body });

const getStripeClient = () => {
  const apiKey = process.env.STRIPE_API_KEY;
  if (!apiKey) throw new Error('STRIPE_API_KEY is not configured.');
  return new Stripe(apiKey, { apiVersion: API_VERSION });
};

export const handler = async (request) => {
  if (request.httpMethod !== 'POST') return response(405, 'Method not allowed.');

  const signature = request.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error('Stripe webhook signature or signing secret is missing.');
    return response(400, 'Webhook configuration error.');
  }

  const rawBody = request.isBase64Encoded
    ? Buffer.from(request.body || '', 'base64').toString('utf8')
    : request.body || '';

  let event;
  try {
    event = getStripeClient().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error('Stripe webhook signature verification failed', { message: error.message });
    return response(400, 'Invalid signature.');
  }

  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object;
    if (session.payment_status === 'paid' || session.payment_status === 'no_payment_required') {
      // Stripe is the order record for now. Inventory and email automation can be added here later.
      console.info('Paid Ascend-Ed order received', {
        eventId: event.id,
        sessionId: session.id,
        orderId: session.client_reference_id,
        amountTotal: session.amount_total,
        currency: session.currency,
      });
    }
  } else if (event.type === 'checkout.session.async_payment_failed') {
    console.warn('Asynchronous Checkout payment failed', {
      eventId: event.id,
      sessionId: event.data.object.id,
    });
  }

  return response(200, 'ok');
};
