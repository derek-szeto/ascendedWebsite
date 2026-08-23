import { storeProductsById } from '../../../src/data/storeProducts.js';

const MAX_LINE_QUANTITY = 10;
const MAX_TOTAL_ITEMS = 20;

export class CartValidationError extends Error {}

export const validateCart = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new CartValidationError('Your cart is empty.');
  }

  const combinedItems = new Map();

  for (const item of items) {
    if (!item || typeof item !== 'object') {
      throw new CartValidationError('The cart contains an invalid item.');
    }

    const product = storeProductsById.get(item.id);
    if (!product || !product.sizes.includes(item.size)) {
      throw new CartValidationError('The cart contains an unavailable product or size.');
    }

    const maximumQuantity = Math.min(MAX_LINE_QUANTITY, product.stock);
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > maximumQuantity) {
      throw new CartValidationError(`Choose between 1 and ${maximumQuantity} of this item.`);
    }

    const key = `${product.id}:${item.size}`;
    const existing = combinedItems.get(key);
    const quantity = (existing?.quantity || 0) + item.quantity;

    if (quantity > maximumQuantity) {
      throw new CartValidationError(`Choose no more than ${maximumQuantity} of this item.`);
    }

    combinedItems.set(key, { product, size: item.size, quantity });
  }

  const normalizedItems = [...combinedItems.values()];
  const totalItems = normalizedItems.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems > MAX_TOTAL_ITEMS) {
    throw new CartValidationError(`Choose no more than ${MAX_TOTAL_ITEMS} items per order.`);
  }

  return normalizedItems;
};

export const toStripeLineItems = (items) => items.map(({ product, size, quantity }) => ({
  quantity,
  price_data: {
    currency: 'usd',
    unit_amount: product.priceCents,
    product_data: {
      name: `${product.name} — Size ${size}`,
      description: product.description,
      metadata: {
        store_product_id: product.id,
        size,
      },
    },
  },
}));

export const compactCartSummary = (items) => items
  .map(({ product, size, quantity }) => `${product.id}:${size}:${quantity}`)
  .join('|');
