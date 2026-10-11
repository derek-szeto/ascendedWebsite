import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import useTabTitle from '../hooks/useTabTitle';
import sunShirtFront from '../assets/sunShirtFront.png';
import sunShirtBack from '../assets/sunShirtBack.png';
import sunShirtFrontBack from '../assets/sunShirtNew.png';
import blackShirtFront from '../assets/blackShirtFront.png';
import blackShirtBack from '../assets/blackShirtBack.png';
import blackShirtFrontBack from '../assets/blackShirtFrontBack.png';
import hoodieFront from '../assets/hoodie_front.png';
import hoodieFrontBack from '../assets/hoodie_front_back.png';
import hoodieBack from '../assets/hoodie_back.png';
import { storeProducts } from '../data/storeProducts';
import styles from './Store.module.css';

const PRODUCT_GALLERIES = {
  'together-tee': [
      { src: sunShirtFront, position: 'center', size: 'cover', viewerSize: 'auto 125%', label: 'Ascend Together shirt, front view' },
      { src: sunShirtBack, position: 'center', size: 'cover', viewerSize: 'auto 125%', label: 'Ascend Together shirt, back view' },
      { src: sunShirtFrontBack, position: 'center', size: 'contain', backgroundColor: '#f2efec', label: 'Ascend Together shirt, front and back view' },
  ],
  'bridge-tee': [
      { src: blackShirtFront, position: 'center', size: 'cover', viewerSize: 'auto 125%', label: 'Bridge the Gap shirt, front view' },
      { src: blackShirtBack, position: 'center', size: 'cover', viewerSize: 'auto 125%', label: 'Bridge the Gap shirt, back view' },
      { src: blackShirtFrontBack, position: 'center', size: 'contain', backgroundColor: '#f2efec', label: 'Bridge the Gap shirt, front and back view' },
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

function ProductViewer({ product, activeImage, setActiveImage, onClose, restoreFocus }) {
  const dialogRef = useRef(null);
  const dragRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [closing, setClosing] = useState(false);
  const reducedMotion = useReducedMotion();
  const gallery = product.gallery;
  const image = gallery[activeImage];
  const viewName = image.label.split(', ').at(-1);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (!restoreFocus()) previousFocus?.focus();
    };
  }, [restoreFocus]);

  const setZoomLevel = (level) => {
    setZoom(Math.min(3, Math.max(1, level)));
    setPan({ x: 0, y: 0 });
  };

  const selectView = (index) => {
    setActiveImage(index);
    setZoomLevel(1);
  };

  const turnView = (direction) => selectView((activeImage + direction + gallery.length) % gallery.length);

  const requestClose = () => {
    if (reducedMotion) onClose();
    else setClosing(true);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const maxX = (bounds.width * (zoom - 1)) / 2;
    const maxY = (bounds.height * (zoom - 1)) / 2;
    setPan({
      x: Math.max(-maxX, Math.min(maxX, event.clientX - dragRef.current.x)),
      y: Math.max(-maxY, Math.min(maxY, event.clientY - dragRef.current.y)),
    });
  };

  const stopDragging = (event) => {
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') turnView(-1);
    else if (event.key === 'ArrowRight') turnView(1);
    else if (event.key === '+' || event.key === '=') setZoomLevel(zoom + .5);
    else if (event.key === '-') setZoomLevel(zoom - .5);
    else if (event.key === '0') setZoomLevel(1);
    else return;
    event.preventDefault();
  };

  return (
    <dialog ref={dialogRef} className={`${styles.productViewer} ${closing ? styles.viewerClosing : ''}`} aria-labelledby={`viewer-title-${product.id}`} onCancel={(event) => { event.preventDefault(); requestClose(); }} onClick={(event) => { if (event.target === event.currentTarget) requestClose(); }} onKeyDown={handleKeyDown} onAnimationEnd={(event) => { if (closing && event.target === event.currentTarget) onClose(); }}>
      <div className={styles.viewerPanel}>
        <header className={styles.viewerHeader}>
          <div><span>Explore the details</span><h2 id={`viewer-title-${product.id}`}>{product.name}</h2><p className={styles.viewerContext}>{viewName} <span aria-hidden="true">·</span> {activeImage + 1} of {gallery.length}</p></div>
          <button type="button" className={styles.viewerClose} onClick={requestClose} aria-label="Close image viewer">×</button>
        </header>
        <div className={styles.viewerMain}>
          <button type="button" className={styles.viewerTurn} onClick={() => turnView(-1)} aria-label="Rotate to previous view">←</button>
          <div
            className={`${styles.viewerStage} ${zoom > 1 ? styles.viewerStageZoomed : ''}`}
            role="img"
            aria-label={image.label}
            onDoubleClick={() => setZoomLevel(zoom > 1 ? 1 : 2)}
            onPointerDown={(event) => {
              if (zoom === 1) return;
              event.currentTarget.setPointerCapture(event.pointerId);
              dragRef.current = { x: event.clientX - pan.x, y: event.clientY - pan.y };
            }}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={activeImage} className={styles.viewerImageFrame} initial={reducedMotion ? false : { opacity: 0, scale: .975, rotateY: 5 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: .985, rotateY: -5 }} transition={{ duration: reducedMotion ? 0 : .36, ease: [.22, 1, .36, 1] }}>
                <div className={styles.viewerImage} style={{ backgroundImage: `url(${image.src})`, backgroundPosition: image.position, backgroundSize: image.viewerSize || image.size, backgroundColor: image.backgroundColor, transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }} />
              </motion.div>
            </AnimatePresence>
          </div>
          <button type="button" className={styles.viewerTurn} onClick={() => turnView(1)} aria-label="Rotate to next view">→</button>
        </div>
        <div className={styles.viewerFooter}>
          <div className={styles.viewerThumbnails} aria-label="Product views">
            {gallery.map((view, index) => (
              <button key={view.label} type="button" className={`${styles.viewerThumbnail} ${index === activeImage ? styles.viewerThumbnailActive : ''}`} onClick={() => selectView(index)} aria-label={`Show ${view.label}`} aria-pressed={index === activeImage}>
                <span style={{ backgroundImage: `url(${view.src})`, backgroundPosition: view.position, backgroundSize: view.size, backgroundColor: view.backgroundColor }} />
                <small>{view.label.split(', ').at(-1)}</small>
              </button>
            ))}
          </div>
          <div className={styles.viewerZoom} aria-label="Image zoom controls">
            <button type="button" onClick={() => setZoomLevel(zoom - .5)} disabled={zoom === 1} aria-label="Zoom out">−</button>
            <span>{Math.round(zoom * 100)}%</span>
            <button type="button" onClick={() => setZoomLevel(zoom + .5)} disabled={zoom === 3} aria-label="Zoom in">+</button>
          </div>
        </div>
        {product.disclaimer && <p className={styles.viewerDisclaimer}>{product.disclaimer}</p>}
        <p className={styles.viewerHint}>Use the arrows or thumbnails to change views. Double-click or use + to zoom, then drag to inspect details.</p>
      </div>
    </dialog>
  );
}

function ProductCard({ product, index, onAdd }) {
  const imageButtonRef = useRef(null);
  const previewDelayRef = useRef(null);
  const previewIntervalRef = useRef(null);
  const restoreFocus = useCallback(() => {
    if (!imageButtonRef.current?.isConnected) return false;
    imageButtonRef.current.focus();
    return true;
  }, []);
  const [size, setSize] = useState('M');
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const gallery = product.gallery;

  const stopPreview = useCallback(() => {
    window.clearTimeout(previewDelayRef.current);
    window.clearInterval(previewIntervalRef.current);
    previewDelayRef.current = null;
    previewIntervalRef.current = null;
  }, []);

  useEffect(() => () => stopPreview(), [stopPreview]);

  const startPreview = (event) => {
    if (event.pointerType !== 'mouse' || gallery.length < 2 || viewerOpen || reducedMotion) return;
    stopPreview();
    previewDelayRef.current = window.setTimeout(() => {
      setActiveImage((current) => (current + 1) % gallery.length);
      previewIntervalRef.current = window.setInterval(() => {
        setActiveImage((current) => (current + 1) % gallery.length);
      }, 1800);
    }, 550);
  };

  const selectImage = (nextImage) => {
    stopPreview();
    setActiveImage(nextImage);
  };

  const addItem = () => {
    onAdd(product, size);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1300);
  };

  return (<>
    <motion.article className={styles.productCard} initial={reducedMotion ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .65, delay: reducedMotion ? 0 : index * .1, ease: [0.22, 1, 0.36, 1] }}>
      <div className={`${styles.productVisual} ${gallery.length > 1 ? styles.hasGallery : ''}`} onPointerEnter={startPreview} onPointerLeave={stopPreview} onFocusCapture={stopPreview}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.button
            type="button"
            ref={imageButtonRef}
            key={activeImage}
            className={`${styles.productImage} ${gallery[activeImage].className ? styles[gallery[activeImage].className] : ''}`}
            style={{ backgroundImage: `url(${gallery[activeImage].src})`, backgroundPosition: gallery[activeImage].position, backgroundSize: gallery[activeImage].size, backgroundColor: gallery[activeImage].backgroundColor }}
            aria-label={`Zoom in on ${gallery[activeImage].label}`}
            onClick={() => { stopPreview(); setViewerOpen(true); }}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, rotateY: 12, x: 12 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0, rotateY: -12, x: -12 }}
            transition={{ duration: reducedMotion ? 0 : .32, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
        <span className={styles.zoomCue} aria-hidden="true">⌕ Zoom</span>
        <span className={styles.viewLabel}>{gallery[activeImage].label.split(', ').at(-1)}</span>
        {gallery.length > 1 && <div className={styles.galleryControls}>
          <button type="button" onClick={() => selectImage((activeImage - 1 + gallery.length) % gallery.length)} aria-label="Previous product image">←</button>
          <div className={styles.galleryDots}>{gallery.map((image, index) => <button key={image.label} type="button" className={index === activeImage ? styles.activeDot : ''} onClick={() => selectImage(index)} aria-label={`Show image ${index + 1}`} aria-current={index === activeImage ? 'true' : undefined} />)}</div>
          <button type="button" onClick={() => selectImage((activeImage + 1) % gallery.length)} aria-label="Next product image">→</button>
        </div>}
      </div>
      <div className={styles.productBody}>
        <span className={styles.productType}>{product.id === 'steady-hoodie' ? 'Hoodie' : 'Shirt'}</span>
        <div className={styles.productHeading}>
          <h3>{product.name}</h3>
          <div className={styles.price}><strong>{money.format(product.price)}</strong></div>
        </div>
        <p>{product.description}</p>
        {product.disclaimer && <p className={styles.productDisclaimer}>{product.disclaimer}</p>}
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
    {viewerOpen && createPortal(<ProductViewer product={product} activeImage={activeImage} setActiveImage={setActiveImage} onClose={() => setViewerOpen(false)} restoreFocus={restoreFocus} />, document.body)}
  </>);
}

export default function Store() {
  const reducedMotion = useReducedMotion();
  useTabTitle('Store | Ascend-Ed');
  const checkoutLock = useRef(false);
  const confirmationRef = useRef(null);
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
  useEffect(() => { if (order) confirmationRef.current?.focus(); }, [order]);
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
            <a className={styles.heroCta} href="#collection">EXPLORE THE COLLECTION <span aria-hidden="true">↓</span></a>
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
              <circle className={styles.impactRing} cx="110" cy="110" r="96" stroke="currentColor" strokeOpacity=".26" />
              <circle className={styles.impactRingInner} cx="110" cy="110" r="78" stroke="currentColor" strokeOpacity=".18" />
              <g className={styles.impactPlant}>
                <path d="M110 165V103" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path className={styles.impactLeafLeft} d="M109 126c-25 0-39-16-40-42 26 2 40 16 40 42Z" fill="currentColor" fillOpacity=".72" />
                <path className={styles.impactLeafRight} d="M111 109c0-29 15-47 42-51-1 30-15 47-42 51Z" fill="currentColor" />
                <circle cx="110" cy="116" r="17" fill="#e9d596" />
                <g className={styles.impactEyes} fill="#174634">
                  <ellipse cx="104" cy="112" rx="1.6" ry="2.3" />
                  <ellipse cx="116" cy="112" rx="1.6" ry="2.3" />
                </g>
                <path d="M103 120c3.5 5 10.5 5 14 0" stroke="#174634" strokeWidth="2.4" strokeLinecap="round" />
              </g>
              <path d="M84 166h52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <circle className={styles.impactSpark} cx="54" cy="68" r="3" fill="currentColor" />
              <circle className={styles.impactSpark} cx="170" cy="142" r="3" fill="currentColor" />
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

      <AnimatePresence>
        {order && (
          <motion.div
            key="purchase-confirmation"
            className={styles.modalBackdrop}
            role="presentation"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : .36, ease: 'easeOut' }}
          >
            <motion.section
              ref={confirmationRef}
              tabIndex={-1}
              className={styles.confirmation}
              role="dialog"
              aria-modal="true"
              aria-labelledby="confirmation-title"
              aria-describedby="confirmation-description"
              initial={reducedMotion ? false : { opacity: 0, y: 30, scale: .97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: .985, transition: { duration: .25, ease: 'easeIn' } }}
              transition={{ duration: reducedMotion ? 0 : .62, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.confirmMark} aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="m7 16.5 6 6L25 10" /></svg></span>
              <span className={styles.kicker}>Payment received / {order.number}</span>
              <h2 id="confirmation-title">Thank you for<br /><em>lifting others.</em></h2>
              <p id="confirmation-description">Your payment{order.itemCount ? ` for ${order.itemCount} item${order.itemCount === 1 ? '' : 's'}` : ''} has been confirmed. We’ll contact you to coordinate free local delivery or pickup.</p>
              <div className={styles.orderSummary}><span>Order total</span><strong>{money.format(order.total)}</strong></div>
              <button type="button" onClick={() => setOrder(null)}>Continue shopping</button>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
      </>, document.body)}
    </>
  );
}
