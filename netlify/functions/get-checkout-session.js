import Stripe from 'stripe';
import { jsonResponse } from './_shared/http.js';

const API_VERSION = '2026-07-29.dahlia';
const SESSION_ID_PATTERN = /^cs_(test|live)_[A-Za-z0-9]+$/;

const getStripeClient = () => {
  const apiKey = process.env.STRIPE_API_KEY;
  if (!apiKey) throw new Error('STRIPE_API_KEY is not configured.');
  return new Stripe(apiKey, { apiVersion: API_VERSION });
};

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return jsonResponse(405, { error: 'Method not allowed.' });
  }

  const sessionId = event.queryStringParameters?.session_id || '';
  if (!SESSION_ID_PATTERN.test(sessionId)) {
    return jsonResponse(400, { error: 'Invalid Checkout Session.' });
  }

  try {
    const session = await getStripeClient().checkout.sessions.retrieve(sessionId);
    return jsonResponse(200, {
      orderId: session.client_reference_id,
      paymentStatus: session.payment_status,
      status: session.status,
      amountTotal: session.amount_total,
      currency: session.currency,
      itemCount: Number.parseInt(session.metadata?.item_count || '0', 10),
    });
  } catch (error) {
    console.error('Checkout Session retrieval failed', {
      type: error?.type,
      code: error?.code,
      requestId: error?.requestId,
    });
    return jsonResponse(404, { error: 'Checkout Session not found.' });
  }
};
