import heroVisual from '../assets/store_hero_visual.png';
import styles from './StoreComingSoon.module.css';

export default function StoreComingSoon() {
  return (
    <main className={styles.page}>
      <section className={styles.content} aria-labelledby="store-coming-soon-title">
        <div className={styles.copy}>
          <span className={styles.eyebrow}>Ascend-Ed Store</span>
          <h1 id="store-coming-soon-title">The store is <em>coming soon.</em></h1>
          <p>Student-designed apparel is on the way. Every purchase will help support education access across Illinois.</p>
          <span className={styles.note}>Check back for the launch.</span>
        </div>
        <div className={styles.visual}>
          <img src={heroVisual} alt="A preview of Ascend-Ed apparel" />
          <span aria-hidden="true">Coming soon</span>
        </div>
      </section>
    </main>
  );
}
