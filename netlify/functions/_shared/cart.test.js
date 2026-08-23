import test from 'node:test';
import assert from 'node:assert/strict';
import { CartValidationError, toStripeLineItems, validateCart } from './cart.js';

test('uses the server catalog price instead of a browser-supplied price', () => {
  const items = validateCart([{ id: 'bridge-tee', size: 'M', quantity: 2, price: 1 }]);
  const lineItems = toStripeLineItems(items);

  assert.equal(lineItems[0].price_data.unit_amount, 2800);
  assert.equal(lineItems[0].quantity, 2);
});

test('combines duplicate product variants', () => {
  const items = validateCart([
    { id: 'together-tee', size: 'S', quantity: 1 },
    { id: 'together-tee', size: 'S', quantity: 2 },
  ]);

  assert.equal(items.length, 1);
  assert.equal(items[0].quantity, 3);
});

test('rejects unavailable products and sizes', () => {
  assert.throws(
    () => validateCart([{ id: 'made-up-product', size: 'M', quantity: 1 }]),
    CartValidationError,
  );
  assert.throws(
    () => validateCart([{ id: 'bridge-tee', size: 'XXL', quantity: 1 }]),
    CartValidationError,
  );
});

test('rejects excessive or out-of-stock quantities', () => {
  assert.throws(
    () => validateCart([{ id: 'bridge-tee', size: 'M', quantity: 11 }]),
    CartValidationError,
  );
  assert.throws(
    () => validateCart([{ id: 'steady-hoodie', size: 'M', quantity: 9 }]),
    CartValidationError,
  );
});
