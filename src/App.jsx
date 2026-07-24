import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import RouteDecor from './components/RouteDecor';
import useTabTitle from './hooks/useTabTitle';
import Home from './pages/Home';
import Issue from './pages/Issue';
import About from './pages/About';
import Privacy from './pages/Privacy';
import GetInvolved from './pages/GetInvolved';
import ComingSoon from './pages/ComingSoon';

const pageVariants = {
  initial: { opacity: 0, y: 16, scale: 0.995, filter: 'blur(4px)' },
  enter: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.46, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, scale: 0.997, filter: 'blur(3px)', transition: { duration: 0.22 } },
};

function ScrollToLocation() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return undefined;
    }

    let attempts = 0;
    let timer;
    let cancelled = false;

    const scrollToHash = () => {
      if (cancelled) return;

      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      attempts += 1;
      if (attempts < 12) {
        timer = window.setTimeout(scrollToHash, 80);
      }
    };

    timer = window.setTimeout(scrollToHash, 80);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [pathname, hash]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
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
          <Route path="/store" element={<ComingSoon title="Store" />} />
          <Route path="/get-involved" element={<Navigate to="/#get-involved" replace />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppLayout() {
  useTabTitle('Come back — Ascend-Ed 🌿');
  return (
    <>
      <ScrollProgress />
      <ScrollToLocation />
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
