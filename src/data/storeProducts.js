export const storeProducts = [
  {
    id: 'together-tee',
    name: 'Ascend Together Tee',
    priceCents: 2600,
    stock: 18,
    eyebrow: 'Garment-dyed cotton',
    description: 'An everyday cream tee with a small front mark and bold education-inspired artwork.',
    sizes: ['S', 'M', 'L', 'XL'],
    imageClass: 'together',
  },
  {
    id: 'bridge-tee',
    name: 'Bridge the Gap Tee',
    priceCents: 2800,
    stock: 12,
    eyebrow: 'Heavyweight cotton',
    description: 'A relaxed black tee featuring our steady-rise turtle artwork on the back.',
    sizes: ['S', 'M', 'L', 'XL'],
    imageClass: 'bridge',
  },
  {
    id: 'steady-hoodie',
    name: 'Steady Rise Hoodie',
    priceCents: 4800,
    stock: 8,
    eyebrow: 'Midweight fleece',
    description: 'A soft black pullover made for cool class nights, volunteering, and slow steady progress.',
    sizes: ['S', 'M', 'L', 'XL'],
    imageClass: 'hoodie',
  },
];

export const storeProductsById = new Map(storeProducts.map((product) => [product.id, product]));
