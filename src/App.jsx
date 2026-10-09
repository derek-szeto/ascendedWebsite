import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import RouteDecor from './components/RouteDecor';
import useTabTitle from './hooks/useTabTitle';
import Home from './pages/Home';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Store from './pages/Store';

const pageVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } },
};

const reducedPageVariants = {
  initial: { opacity: 1 },
  enter: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 1, transition: { duration: 0 } },
};

function ScrollToLocation({ location }) {
  const { pathname, hash, key } = location;
  const previousPath = useRef(null);

  useLayoutEffect(() => {
    const samePage = previousPath.current === pathname;
    previousPath.current = pathname;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: samePage && !reduceMotion ? 'smooth' : 'instant',
      });
      return undefined;
    }

    // A new route has just mounted. Start from its top, then travel to the section.
    if (!samePage) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    let attempts = 0;
    let frame;
    let cancelled = false;

    const scrollToHash = () => {
      if (cancelled) return;

      let id;
      try { id = decodeURIComponent(hash.slice(1)); } catch { id = hash.slice(1); }
      const target = document.getElementById(id);
      if (target) {
        const navbar = document.querySelector('nav[aria-label="Primary navigation"]');
        const navbarHeight = navbar?.getBoundingClientRect().height || 72;
        // Sections already have space above their content. Count that space so
        // the fixed navbar does not push the selected section down twice.
        let contentInset = 0;
        let section = target;
        for (let depth = 0; depth < 3 && section; depth += 1) {
          const padding = parseFloat(window.getComputedStyle(section).paddingTop) || 0;
          contentInset += padding;
          if (contentInset >= navbarHeight + 24) break;

          const child = section.firstElementChild;
          if (!child || Math.abs(child.getBoundingClientRect().top - section.getBoundingClientRect().top - padding) > 2) break;
          section = child;
        }
        const offset = Math.max(0, navbarHeight + 24 - contentInset);
        window.scrollTo({
          top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset),
          behavior: reduceMotion ? 'instant' : 'smooth',
        });
        return;
      }

      attempts += 1;
      if (attempts < 120) frame = window.requestAnimationFrame(scrollToHash);
    };

    frame = window.requestAnimationFrame(scrollToHash);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [pathname, hash, key]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={reduceMotion ? reducedPageVariants : pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ flex: 1, position: 'relative', isolation: 'isolate' }}
      >
        <RouteDecor />
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/issue" element={<Navigate to="/#issue" replace />} />
          <Route path="/programs" element={<Navigate to="/#programs" replace />} />
          <Route path="/programs/community-classes" element={<Navigate to="/#classes" replace />} />
          <Route path="/registration" element={<Navigate to="/#register" replace />} />
          <Route path="/store" element={<Store />} />
          <Route path="/get-involved" element={<Navigate to="/#get-involved" replace />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <ScrollToLocation location={location} />
      </motion.div>
    </AnimatePresence>
  );
}

function AppLayout() {
  useTabTitle('Come back — Ascend-Ed 🌿');
  const navigate = useNavigate();

  useEffect(() => {
    const handleSectionLink = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.('a[href]');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || !url.hash) return;
      event.preventDefault();
      navigate(`${url.pathname}${url.search}${url.hash}`);
    };
    document.addEventListener('click', handleSectionLink);
    return () => document.removeEventListener('click', handleSectionLink);
  }, [navigate]);
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
