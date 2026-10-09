import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import useTabTitle from '../hooks/useTabTitle';
import creamSunShirt from '../assets/cream_sun_shirt.png';
import blackBridgeShirt from '../assets/black_bridge_shirt.png';
import foldedCreamShirt from '../assets/folded_cream_shirt.png';
import foldedBlackShirt from '../assets/folded_black_shirt.png';
import hoodieFront from '../assets/hoodie_front.png';
import hoodieFrontBack from '../assets/hoodie_front_back.png';
import hoodieBack from '../assets/hoodie_back.png';
import { storeProducts } from '../data/storeProducts';
import styles from './Store.module.css';

const PRODUCT_GALLERIES = {
  'together-tee': [
      { src: creamSunShirt, position: '15% center', size: '205% auto', label: 'Ascend Together shirt, front view' },
      { src: creamSunShirt, position: '85% center', size: '205% auto', label: 'Ascend Together shirt, back view' },
      { src: foldedCreamShirt, position: 'center', size: 'cover', label: 'Ascend Together shirt, folded view' },
  ],
  'bridge-tee': [
      { src: blackBridgeShirt, position: '15% center', size: '205% auto', label: 'Bridge the Gap shirt, front view' },
      { src: blackBridgeShirt, position: '85% center', size: '205% auto', label: 'Bridge the Gap shirt, back view' },
      { src: foldedBlackShirt, position: 'center', size: 'cover', label: 'Bridge the Gap shirt, folded view' },
  ],
  'steady-hoodie': [
      { src: hoodieFront, className: 'hoodieGallery', position: 'center', size: 'cover', label: 'Steady Rise hoodie, front view' },
      { src: hoodieFrontBack, className: 'hoodieGallery', position: 'center', size: 'contain', label: 'Steady Rise hoodie, front and back view' },
      { src: hoodieBack, className: 'hoodieGallery', position: 'center', size: 'cover', label: 'Steady Rise hoodie, back view' },
  ],
};

const PRODUCTS = storeProducts.map((product) => ({
  ...product,
  price: product.priceCents / 100,
  gallery: PRODUCT_GALLERIES[product.id],
}));

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const STORE_SLOGANS = ['Bridge the gap', 'Ascend together', 'Education elevates everyone', 'Wear the mission'];

function BagIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8.5h14l-1 12H6l-1-12Z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>;
}

function ProductCard({ product, index, onAdd }) {
  const [size, setSize] = useState('M');
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const reducedMotion = useReducedMotion();
  const gallery = product.gallery;

  const addItem = () => {
    onAdd(product, size);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1300);
  };

  return (
    <motion.article className={styles.productCard} initial={reducedMotion ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .65, delay: reducedMotion ? 0 : index * .1, ease: [0.22, 1, 0.36, 1] }}>
      <div className={`${styles.productVisual} ${gallery.length > 1 ? styles.hasGallery : ''}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeImage}
            className={`${styles.productImage} ${gallery[activeImage].className ? styles[gallery[activeImage].className] : ''}`}
            style={{ backgroundImage: `url(${gallery[activeImage].src})`, backgroundPosition: gallery[activeImage].position, backgroundSize: gallery[activeImage].size }}
            role="img"
            aria-label={gallery[activeImage].label}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.035, x: 12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: .985, x: -12 }}
            transition={{ duration: reducedMotion ? 0 : .32, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
        <span className={styles.viewLabel}>{gallery[activeImage].label.split(', ').at(-1)}</span>
        {gallery.length > 1 && <div className={styles.galleryControls}>
          <button type="button" onClick={() => setActiveImage((activeImage - 1 + gallery.length) % gallery.length)} aria-label="Previous product image">←</button>
          <div className={styles.galleryDots}>{gallery.map((image, index) => <button key={image.label} type="button" className={index === activeImage ? styles.activeDot : ''} onClick={() => setActiveImage(index)} aria-label={`Show image ${index + 1}`} aria-current={index === activeImage ? 'true' : undefined} />)}</div>
          <button type="button" onClick={() => setActiveImage((activeImage + 1) % gallery.length)} aria-label="Next product image">→</button>
        </div>}
      </div>
      <div className={styles.productBody}>
        <span className={styles.productType}>{product.id === 'steady-hoodie' ? 'Hoodie' : 'Shirt'}</span>
        <div className={styles.productHeading}>
          <h3>{product.name}</h3>
          <div className={styles.price}><strong>{money.format(product.price)}</strong></div>
        </div>
        <p>{product.description}</p>
        <fieldset className={styles.sizeSelector}>
          <legend>Available sizes</legend>
          <div className={styles.sizeOptions}>
            {product.sizes.map((option) => (
              <label key={option} className={styles.sizeOption}>
                <input type="radio" name={`size-${product.id}`} value={option} checked={size === option} onChange={() => setSize(option)} aria-label={`${{ S: 'Small', M: 'Medium', L: 'Large' }[option]} for ${product.name}`} />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className={styles.purchaseRow}>
          <button className={added ? styles.added : ''} type="button" onClick={addItem}><BagIcon />{added ? 'Added to bag' : 'Add to bag'}</button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Store() {
  const reducedMotion = useReducedMotion();
  useTabTitle('Store | Ascend-Ed');
  const checkoutLock = useRef(false);
  const [cart, setCart] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ascend-ed-cart')) || [];
      return saved.reduce((normalized, item) => {
        const product = PRODUCTS.find((candidate) => candidate.id === item.id);
        if (!product || !product.sizes.includes(item.size) || !Number.isInteger(item.quantity) || item.quantity < 1) return normalized;
        const key = `${item.id}-${item.size}`;
        const existing = normalized.find((entry) => entry.key === key);
        if (existing) existing.quantity = Math.min(product.stock, existing.quantity + item.quantity);
        else normalized.push({ key, id: product.id, name: product.name, price: product.price, size: item.size, quantity: Math.min(product.stock, item.quantity), stock: product.stock });
        return normalized;
      }, []);
    } catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  useEffect(() => { localStorage.setItem('ascend-ed-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => {
    document.body.style.overflow = cartOpen || order ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen, order]);
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') { setCartOpen(false); setOrder(null); }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkoutResult = params.get('checkout');
    if (!checkoutResult) return undefined;

    const cleanCheckoutUrl = () => window.history.replaceState({}, '', `${window.location.pathname}${window.location.hash}`);
    if (checkoutResult === 'cancelled') {
      cleanCheckoutUrl();
      const cancelledCheckoutTimer = window.setTimeout(() => {
        setCheckoutError('Checkout was canceled. Your items are still in your bag.');
        setCartOpen(true);
      }, 0);
      return () => window.clearTimeout(cancelledCheckoutTimer);
    }

    const sessionId = params.get('session_id');
    if (checkoutResult !== 'success' || !sessionId) {
      cleanCheckoutUrl();
      return undefined;
    }

    let cancelled = false;
    const verifyPayment = async () => {
      try {
        const response = await fetch(`/.netlify/functions/get-checkout-session?session_id=${encodeURIComponent(sessionId)}`);
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || 'We could not verify this payment.');
        if (result.paymentStatus !== 'paid' && result.paymentStatus !== 'no_payment_required') {
          throw new Error('Your payment is still processing. Please check Stripe or contact Ascend-Ed before trying again.');
        }
        if (cancelled) return;
        setOrder({
          number: result.orderId,
          total: result.amountTotal / 100,
          itemCount: result.itemCount,
        });
        setCart([]);
        setCheckoutError('');
      } catch (error) {
        if (cancelled) return;
        setCheckoutError(error.message || 'We could not verify this payment.');
        setCartOpen(true);
      } finally {
        cleanCheckoutUrl();
      }
    };

    verifyPayment();
    return () => { cancelled = true; };
  }, []);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (product, size) => {
    const key = `${product.id}-${size}`;
    setCart((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) return current.map((item) => item.key === key ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) } : item);
      return [...current, { key, id: product.id, name: product.name, price: product.price, size, quantity: 1, stock: product.stock }];
    });
    setCheckoutError('');
    setCartOpen(true);
  };

  const changeQuantity = (key, delta) => setCart((current) => current
    .map((item) => item.key === key ? { ...item, quantity: Math.min(item.stock, item.quantity + delta) } : item)
    .filter((item) => item.quantity > 0));

  const beginCheckout = async () => {
    if (!cart.length || checkoutLock.current) return;
    checkoutLock.current = true;
    setIsCheckingOut(true);
    setCheckoutError('');

    try {
      const requestId = window.crypto?.randomUUID?.();
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          items: cart.map(({ id, size, quantity }) => ({ id, size, quantity })),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Checkout is temporarily unavailable.');
      if (!result.url) throw new Error('Stripe did not return a checkout link.');
      window.location.assign(result.url);
    } catch (error) {
      setCheckoutError(error.message || 'Checkout is temporarily unavailable. Please try again.');
      setCartOpen(true);
      checkoutLock.current = false;
      setIsCheckingOut(false);
    }
  };

  return (
    <>
    <main className={styles.page}>
      <section className={styles.welcome} aria-labelledby="store-title">
        <div className={styles.welcomeMain}>
          <motion.div className={styles.welcomeCopy} initial={reducedMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}>
            <span className={styles.kicker}>Ascend-Ed Store</span>
            <h1 id="store-title">Wear what you <em>stand for.</em></h1>
          </motion.div>
          <motion.aside className={styles.welcomeNote} aria-label="Store mission" initial={reducedMotion ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .18, ease: [0.22, 1, 0.36, 1] }}>
            <p><strong>Style with a purpose.</strong> Student-designed essentials that turn everyday style into support for education access.</p>
            <a className={styles.heroCta} href="#collection">Explore the collection <span aria-hidden="true">↓</span></a>
          </motion.aside>
        </div>
        <div className={styles.welcomeBottom} aria-hidden="true" />
        <span className={styles.welcomeTriangle} aria-hidden="true" />
      </section>

      <div className={styles.missionMarquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[0, 1, 2, 3].map((copy) => <div className={styles.marqueeSet} key={copy}>{STORE_SLOGANS.map((slogan) => <span key={slogan}>{slogan}<i>✦</i></span>)}</div>)}
        </div>
      </div>

      <section className={styles.shop} id="collection" aria-labelledby="shop-title">
        <motion.header className={styles.shopHeader} initial={reducedMotion ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: .65 }}>
          <div><h2 id="shop-title">Find your piece.</h2></div>
          <button className={styles.cartButton} type="button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${itemCount} items`}>
            <BagIcon /><span className={styles.cartButtonCopy}><small>Your cart</small><strong>{itemCount ? `${itemCount} item${itemCount === 1 ? '' : 's'}` : 'Start shopping'}</strong></span><b>{itemCount}</b>
          </button>
        </motion.header>
        <motion.div className={styles.shopIntro} initial={reducedMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: .08 }}><p>Wear the mission. Choose a style and size. Local delivery or pickup is free.</p></motion.div>
        <div className={styles.productGrid}>{PRODUCTS.map((product, index) => <ProductCard key={product.id} product={product} index={index} onAdd={addToCart} />)}</div>

        <motion.div className={styles.impactBand} initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .65 }}>
          <div className={styles.impactCopy}>
            <strong>Good things grow when we move together.</strong>
            <p>Every purchase helps support Ascend-Ed’s education programs and community work.</p>
          </div>
          <div className={styles.impactEmblem} aria-hidden="true">
            <svg viewBox="0 0 220 220" fill="none">
              <circle cx="110" cy="110" r="96" stroke="currentColor" strokeOpacity=".26" />
              <circle cx="110" cy="110" r="78" stroke="currentColor" strokeOpacity=".18" />
              <path d="M110 165V103" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M109 126c-25 0-39-16-40-42 26 2 40 16 40 42Z" fill="currentColor" fillOpacity=".72" />
              <path d="M111 109c0-29 15-47 42-51-1 30-15 47-42 51Z" fill="currentColor" />
              <path d="M84 166h52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <circle cx="54" cy="68" r="3" fill="currentColor" />
              <circle cx="170" cy="142" r="3" fill="currentColor" />
            </svg>
          </div>
        </motion.div>
      </section>

      </main>
      {createPortal(<>
      <button className={`${styles.floatingCart} ${itemCount ? styles.hasItems : styles.emptyCart}`} type="button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${itemCount} items`}>
        <span className={styles.bagIcon}><BagIcon />{itemCount > 0 && <b>{itemCount}</b>}</span><span className={styles.floatingCartCopy}><small>Your bag</small><strong>{money.format(subtotal)}</strong></span>
      </button>

      <div className={`${styles.backdrop} ${cartOpen ? styles.visible : ''}`} onClick={() => setCartOpen(false)} aria-hidden={!cartOpen} />
      <aside className={`${styles.cartDrawer} ${cartOpen ? styles.open : ''}`} aria-hidden={!cartOpen} inert={!cartOpen} aria-label="Shopping cart">
        <header><div><span>Your bag</span><h2>{itemCount ? `${itemCount} item${itemCount === 1 ? '' : 's'} ready` : 'Make an impact'}</h2></div><button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart">×</button></header>
        <div className={styles.fulfillmentNote}>
          <span aria-hidden="true">✦</span>
          <div><strong>Free local fulfillment</strong><small>Local delivery or pickup will be coordinated after purchase.</small></div>
        </div>
        <div className={styles.cartItems}>
          {!cart.length && <div className={styles.empty}><span><BagIcon /></span><h3>Your bag is ready.</h3><p>Add a piece and carry the mission with you.</p><button type="button" onClick={() => setCartOpen(false)}>Explore the drop</button></div>}
          {cart.map((item) => {
            const product = PRODUCTS.find((candidate) => candidate.id === item.id);
            const preview = product.gallery[0];
            return (
            <div className={styles.cartItem} key={item.key}>
              <div
                className={`${styles.miniProduct} ${preview.className ? styles[preview.className] : ''}`}
                style={{ backgroundImage: `url(${preview.src})`, backgroundPosition: preview.position, backgroundSize: preview.size }}
                role="img"
                aria-label={`${preview.label} thumbnail`}
              />
              <div className={styles.cartItemCopy}><strong>{item.name}</strong><span>Size {item.size}</span><button type="button" onClick={() => setCart((current) => current.filter((cartItem) => cartItem.key !== item.key))}>Remove</button></div>
              <b>{money.format(item.price * item.quantity)}</b>
              <div className={styles.quantity}><button type="button" onClick={() => changeQuantity(item.key, -1)} aria-label={`Remove one ${item.name}`}>−</button><span>{item.quantity}</span><button type="button" disabled={item.quantity >= item.stock} onClick={() => changeQuantity(item.key, 1)} aria-label={`Add one ${item.name}`}>+</button></div>
            </div>
          );})}
        </div>
        {!!cart.length && <footer className={styles.cartFooter}>
          <div><span>Subtotal</span><strong>{money.format(subtotal)}</strong></div>
          <div><span>Local delivery / pickup</span><strong>Free</strong></div>
          {checkoutError && <p className={styles.checkoutError} role="alert">{checkoutError}</p>}
          <button className={styles.checkoutButton} type="button" onClick={beginCheckout} disabled={isCheckingOut} aria-busy={isCheckingOut}><span>{isCheckingOut ? 'Opening secure checkout…' : 'Secure checkout'}</span><strong>{money.format(subtotal)}</strong></button>
          <small>Payment and contact details are completed securely on Stripe.</small>
        </footer>}
      </aside>

      {order && <div className={styles.modalBackdrop} role="presentation"><section className={styles.confirmation} role="dialog" aria-modal="true" aria-labelledby="confirmation-title"><span className={styles.confirmMark}>✓</span><span className={styles.kicker}>Payment received / {order.number}</span><h2 id="confirmation-title">Thank you for<br/><em>lifting others.</em></h2><p>Your payment{order.itemCount ? ` for ${order.itemCount} item${order.itemCount === 1 ? '' : 's'}` : ''} has been confirmed. We’ll contact you to coordinate free local delivery or pickup.</p><div><span>Order total</span><strong>{money.format(order.total)}</strong></div><button type="button" onClick={() => setOrder(null)}>Continue shopping</button></section></div>}
      </>, document.body)}
    </>
  );
}
