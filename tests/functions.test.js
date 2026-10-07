import test from 'node:test';
import assert from 'node:assert/strict';
import { handler as createCheckout } from '../netlify/functions/create-checkout-session.js';
import { handler as getCheckout } from '../netlify/functions/get-checkout-session.js';
import { handler as stripeWebhook } from '../netlify/functions/stripe-webhook.js';

test('checkout creation rejects unsupported methods', async () => {
  const response = await createCheckout({ httpMethod: 'GET' });
  assert.equal(response.statusCode, 405);
});

test('checkout creation rejects an empty cart before contacting Stripe', async () => {
  const response = await createCheckout({ httpMethod: 'POST', body: JSON.stringify({ items: [] }) });
  assert.equal(response.statusCode, 400);
  assert.match(response.body, /cart is empty/i);
});

test('checkout retrieval rejects malformed session IDs before contacting Stripe', async () => {
  const response = await getCheckout({
    httpMethod: 'GET',
    queryStringParameters: { session_id: 'not-a-session' },
  });
  assert.equal(response.statusCode, 400);
});

test('webhook rejects unsupported methods', async () => {
  const response = await stripeWebhook({ httpMethod: 'GET' });
  assert.equal(response.statusCode, 405);
});
