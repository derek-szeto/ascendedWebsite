import styles from './PageTrail.module.css';

function StopIcon({ index }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {index === 0 && <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>}
    {index === 1 && <><path d="M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1Zm0 0v14M6 9h3m-3 4h3m6-4h3m-3 4h3" /></>}
    {index === 2 && <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4v2" /></>}
    {index === 3 && <><path d="M21 11a9 9 0 0 1-9 9H4l-2 2V11a9 9 0 0 1 19 0Z" /><path d="M9.5 8a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4m0 3h.01" /></>}
  </svg>;
}

export default function PageTrail({ items }) {
  return (
    <nav className={styles.trail} aria-label="Explore community classes">
      <p className={styles.eyebrow}>Explore this page</p>
      <div className={styles.stops}>
        <svg className={styles.path} viewBox="0 0 80 480" preserveAspectRatio="none" aria-hidden="true"><path d="M36 60C36 120 56 120 56 180S36 240 36 300 56 360 56 420" /></svg>
        {items.map((item, index) => (
          <a key={item.label} className={styles.stop} href={item.href}>
            <span className={styles.icon}><StopIcon index={index} /></span>
            <span className={styles.copy}><strong>{item.label}</strong><small>{item.detail}</small></span>
          </a>
        ))}
      </div>
    </nav>
  );
}
