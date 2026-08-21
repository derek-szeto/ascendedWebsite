import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import useTabTitle from '../hooks/useTabTitle';
import heroVisual from '../assets/store_hero_visual.png';
import styles from './Store.module.css';

const products = [
  {
    id: 'bridge-tee',
    name: 'Bridge the Gap Tee',
    price: 28,
    eyebrow: 'Heavyweight cotton',
    description: 'A relaxed black tee featuring our steady-rise turtle artwork on the back.',
    sizes: ['S', 'M', 'L', 'XL'],
    imageClass: 'bridge',
  },
  {
    id: 'together-tee',
    name: 'Ascend Together Tee',
    price: 26,
    eyebrow: 'Garment-dyed cotton',
    description: 'An everyday cream tee with a small front mark and bold education-inspired artwork.',
    sizes: ['S', 'M', 'L', 'XL'],
    imageClass: 'together',
  },
  {
    id: 'steady-hoodie',
    name: 'Steady Rise Hoodie',
    price: 48,
    eyebrow: 'Midweight fleece',
    description: 'A soft black pullover made for cool class nights, volunteering, and slow steady progress.',
    sizes: ['S', 'M', 'L', 'XL'],
    imageClass: 'hoodie',
  },
];

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function ProductCard({ product, onAdd }) {
  const [size, setSize] = useState('M');
  const [added, setAdded] = useState(false);

  const addItem = () => {
    onAdd(product, size);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.article className={styles.productCard} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className={`${styles.productImage} ${styles[product.imageClass]}`} style={{ backgroundImage: `url(${heroVisual})` }} role="img" aria-label={product.name} />
      <div className={styles.productBody}>
        <span className={styles.eyebrow}>{product.eyebrow}</span>
        <div className={styles.productHeading}><h3>{product.name}</h3><strong>{money.format(product.price)}</strong></div>
        <p>{product.description}</p>
        <div className={styles.purchaseRow}>
          <label>Size
            <select value={size} onChange={(event) => setSize(event.target.value)} aria-label={`Size for ${product.name}`}>
              {product.sizes.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <button type="button" onClick={addItem}>{added ? 'Added!' : 'Add to cart'} <span aria-hidden>→</span></button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Store() {
  useTabTitle('Store | Ascend-Ed');
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ascend-ed-cart')) || []; } catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => { localStorage.setItem('ascend-ed-cart', JSON.stringify(cart)); }, [cart]);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 75 ? 0 : 6;
  const total = subtotal + shipping;

  const addToCart = (product, size) => {
    const key = `${product.id}-${size}`;
    setCart((current) => {
      const existing = current.find((item) => item.key === key);
      return existing
        ? current.map((item) => item.key === key ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { key, id: product.id, name: product.name, price: product.price, size, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const changeQuantity = (key, delta) => setCart((current) => current
    .map((item) => item.key === key ? { ...item, quantity: item.quantity + delta } : item)
    .filter((item) => item.quantity > 0));

  const checkoutItems = useMemo(() => cart.map((item) => `${item.quantity}× ${item.name} (${item.size})`).join(', '), [cart]);

  const placeOrder = (event) => {
    event.preventDefault();
    const nextOrder = `AE-${Date.now().toString().slice(-6)}`;
    setOrderNumber(nextOrder);
    setCart([]);
    setCheckoutOpen(false);
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <img src={heroVisual} alt="Ascend-Ed apparel collection featuring tees and a hoodie supporting education access" />
        <div className={styles.heroNote}><span>Student-built collection</span><strong>Every purchase supports education access.</strong></div>
      </section>

      <section className={styles.shop} aria-labelledby="shop-title">
        <header className={styles.shopHeader}>
          <div><span className={styles.kicker}>Wear the mission</span><h1 id="shop-title">The Ascend-Ed <em>shop</em></h1></div>
          <button className={styles.cartButton} type="button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${itemCount} items`}>
            Cart <span>{itemCount}</span>
          </button>
        </header>
        <p className={styles.intro}>Pieces designed to start conversations and help widen access to education. Small-batch, mission-first, and built by students.</p>
        <div className={styles.productGrid}>{products.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}</div>
        <div className={styles.impactBand}><span>01</span><div><strong>Style with a purpose.</strong><p>Store proceeds go back into Ascend-Ed programs serving students across Illinois.</p></div><b>Education elevates everyone.</b></div>
      </section>

      <div className={`${styles.backdrop} ${cartOpen ? styles.visible : ''}`} onClick={() => setCartOpen(false)} aria-hidden={!cartOpen} />
      <aside className={`${styles.cartDrawer} ${cartOpen ? styles.open : ''}`} aria-hidden={!cartOpen} aria-label="Shopping cart">
        <header><div><span>Your bag</span><h2>{itemCount ? `${itemCount} item${itemCount === 1 ? '' : 's'}` : 'Cart is empty'}</h2></div><button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart">×</button></header>
        <div className={styles.cartItems}>
          {!cart.length && <div className={styles.empty}><span>◎</span><p>Your next favorite piece could be right here.</p><button type="button" onClick={() => setCartOpen(false)}>Keep shopping</button></div>}
          {cart.map((item) => (
            <div className={styles.cartItem} key={item.key}>
              <div><strong>{item.name}</strong><span>Size {item.size}</span><small>{money.format(item.price)} each</small></div>
              <div className={styles.quantity}><button type="button" onClick={() => changeQuantity(item.key, -1)} aria-label={`Remove one ${item.name}`}>−</button><span>{item.quantity}</span><button type="button" onClick={() => changeQuantity(item.key, 1)} aria-label={`Add one ${item.name}`}>+</button></div>
              <b>{money.format(item.price * item.quantity)}</b>
            </div>
          ))}
        </div>
        {!!cart.length && <footer className={styles.cartFooter}>
          <div><span>Subtotal</span><strong>{money.format(subtotal)}</strong></div>
          <div><span>Shipping</span><strong>{shipping ? money.format(shipping) : 'Free'}</strong></div>
          {subtotal < 75 && <small>Add {money.format(75 - subtotal)} more for free shipping.</small>}
          <button type="button" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>Checkout · {money.format(total)}</button>
        </footer>}
      </aside>

      {checkoutOpen && <div className={styles.modalBackdrop} role="presentation">
        <section className={styles.checkout} role="dialog" aria-modal="true" aria-labelledby="checkout-title">
          <button className={styles.closeCheckout} type="button" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout">×</button>
          <span className={styles.kicker}>Final step</span><h2 id="checkout-title">Checkout</h2><p>{checkoutItems}</p>
          <form onSubmit={placeOrder}>
            <div className={styles.formRow}><label>First name<input required autoComplete="given-name" /></label><label>Last name<input required autoComplete="family-name" /></label></div>
            <label>Email address<input required type="email" autoComplete="email" /></label>
            <label>Shipping address<input required autoComplete="street-address" /></label>
            <div className={styles.formRow}><label>City<input required autoComplete="address-level2" /></label><label>ZIP code<input required inputMode="numeric" pattern="[0-9]{5}(-[0-9]{4})?" autoComplete="postal-code" /></label></div>
            <div className={styles.orderTotal}><span>Order total</span><strong>{money.format(total)}</strong></div>
            <button type="submit">Place order request</button><small>This demo checkout records your order request; no payment is collected.</small>
          </form>
        </section>
      </div>}

      {orderNumber && <div className={styles.toast} role="status"><strong>Order request received!</strong><span>Confirmation {orderNumber}</span><button type="button" onClick={() => setOrderNumber('')} aria-label="Dismiss">×</button></div>}
    </main>
  );
}
