import styles from './Marquee.module.css';

const items = [
  '$12,000+ per-student funding gap in Cook County',
  'Student-run. Zero overhead.',
  '1 in 3 students reading below grade level',
  'Every dollar tracked and posted publicly',
  '2034: projected year for equitable funding',
  'Student-led since fall 2025',
  'Illinois students should not have to wait',
];

export default function Marquee({ variant = 'dark' }) {
  const track = [...items, ...items];
  return (
    <div className={`${styles.wrap} ${styles[variant]}`}>
      <div className={styles.track}>
        {track.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.dot} aria-hidden>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
