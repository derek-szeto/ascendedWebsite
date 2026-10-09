export const storeProducts = [
  {
    id: 'together-tee',
    name: 'Ascend Together Shirt',
    priceCents: 1999,
    stock: 18,
    eyebrow: 'Garment-dyed cotton',
    description: 'An everyday cream shirt with a small front mark and bold education-inspired artwork.',
    sizes: ['S', 'M', 'L'],
    imageClass: 'together',
  },
  {
    id: 'bridge-tee',
    name: 'Bridge the Gap Shirt',
    priceCents: 1999,
    stock: 12,
    eyebrow: 'Heavyweight cotton',
    description: 'A relaxed black shirt featuring our steady-rise turtle artwork on the back.',
    sizes: ['S', 'M', 'L'],
    imageClass: 'bridge',
  },
  {
    id: 'steady-hoodie',
    name: 'Steady Rise Hoodie',
    priceCents: 2999,
    stock: 8,
    eyebrow: 'Midweight fleece',
    description: 'A soft black pullover made for cool class nights, volunteering, and slow steady progress.',
    sizes: ['S', 'M', 'L'],
    imageClass: 'hoodie',
  },
];

export const storeProductsById = new Map(storeProducts.map((product) => [product.id, product]));
