import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../assets/ascend-ed-logo-simplified.png';
import styles from './Navbar.module.css';

const links = [
  { to: '/', label: 'Home', section: 'home' },
  { to: '/#about', label: 'About Us', section: 'about' },
  { to: '/#programs', label: 'Programs', section: 'programs' },
  { to: '/#classes', label: 'Classes', section: 'classes' },
  { to: '/#faq', label: 'FAQ', section: 'faq' },
  { to: '/#issue', label: 'Issue', section: 'issue' },
  { to: '/#get-involved', label: 'Get Involved', section: 'get-involved' },
  { to: 'https://futureascended.myshopify.com', label: 'Store', external: true },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleNavClick = (to) => {
    setMenuOpen(false);
    if (to === '/') {
      setActiveSection('home');
      window.setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }), 30);
      return;
    }
    if (to?.includes('#')) return;

    window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 90);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      return undefined;
    }

    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.38;
      const visibleSection = ['about', 'programs', 'classes', 'issue', 'get-involved', 'faq'].find((id) => {
        const element = document.getElementById(id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= marker && rect.bottom > marker;
      });
      setActiveSection(visibleSection || 'home');
    };

    const initialFrame = window.requestAnimationFrame(updateActiveSection);
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [location.pathname, location.hash]);

  const isLinkActive = (link, routerActive) => {
    if (link.section) return location.pathname === '/' && activeSection === link.section;
    return routerActive;
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <NavLink to="/" className={styles.logo} onClick={() => handleNavClick('/')}>
        <img src={logo} alt="Ascend-Ed" className={styles.logoImg} />
      </NavLink>

      {/* Desktop links */}
      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.to}>
            {link.external ? (
              <a href={link.to} className={styles.navBtn} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ) : (
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `${styles.navBtn} ${isLinkActive(link, isActive) ? styles.active : ''} ${link.soon ? styles.navSoon : ''}`
                }
                onClick={() => handleNavClick(link.to)}
              >
                {link.label}
                {link.soon && <span className={styles.soonBadge}>soon</span>}
              </NavLink>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.drawer}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.045, duration: 0.18, ease: 'easeOut' }}
              >
                {link.external ? (
                  <a href={link.to} onClick={() => setMenuOpen(false)} className={styles.drawerBtn}>
                    {link.label}
                  </a>
                ) : (
                  <NavLink
                    to={link.to}
                    onClick={() => handleNavClick(link.to)}
                    className={({ isActive }) =>
                      `${styles.drawerBtn} ${isLinkActive(link, isActive) ? styles.active : ''}`
                    }
                  >
                    {link.label}
                    {link.soon && <span className={styles.soonBadge}>soon</span>}
                  </NavLink>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
