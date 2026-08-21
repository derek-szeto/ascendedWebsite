import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/#about', label: 'About Us' },
  { to: '/#programs', label: 'Programs' },
  { to: '/#classes', label: 'Classes' },
  { to: '/#faq', label: 'FAQ' },
  { to: '/#issue', label: 'Issue' },
  { to: '/#get-involved', label: 'Get Involved' },
  { to: '/store', label: 'Store' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.visuals} aria-hidden><i /><i /><i /><b /></div>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.kicker}>Illinois education access</span>
          <span className={styles.name}>Ascend-Ed</span>
          <span className={styles.tagline}>Student-run. Illinois-based. Built for the long run.</span>
        </div>
        <div className={styles.navigation}>
          <span className={styles.columnLabel}>Explore</span>
          <nav className={styles.nav} aria-label="Footer navigation">
            {links.map(({ to, label, external }, index) => (
              external
                ? <a key={to} href={to} className={styles.link}><small>0{index + 1}</small>{label}</a>
                : <NavLink key={to} to={to} className={styles.link}><small>0{index + 1}</small>{label}</NavLink>
            ))}
          </nav>
        </div>
        <div className={styles.right}>
          <span className={styles.columnLabel}>Start a conversation</span>
          <a href="mailto:future.ascended@gmail.com" className={styles.email}>future.ascended@gmail.com</a>
          <span className={styles.contactNote}>Questions, partnerships, or ideas—we&apos;d like to hear them.</span>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <span className={styles.bottomLeft}>© 2026 Ascend-Ed · EIN 42-3070575 · Nonprofit initiative · Illinois</span>
        <NavLink to="/privacy" className={styles.bottomLink}>Privacy Policy</NavLink>
      </div>
    </footer>
  );
}
