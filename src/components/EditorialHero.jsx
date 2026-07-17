import { motion } from 'framer-motion';
import styles from './EditorialHero.module.css';

export default function EditorialHero({ chapter, eyebrow, title, description, items, variant }) {
  return (
    <section className={`${styles.hero} ${variant ? styles[variant] : ''}`}>
      <div className={styles.grid} aria-hidden />
      <div className={styles.orbit} aria-hidden><span /><span /><span /></div>
      <div className={styles.techHud} aria-hidden>
        <span /><span /><span />
      </div>

      <motion.div
        className={styles.copy}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.chapter}>{chapter && <span>{chapter}</span>}<strong>{eyebrow}</strong></div>
        <h1>{title}</h1>
        <p>{description}</p>
      </motion.div>

      <div className={styles.mapPanel}>
        <motion.div
          className={styles.mapInner}
          initial={{ opacity: 0, x: 22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.mapLabel}>Explore this page</span>
          <div className={styles.mapList}>
            {items.map((item, i) => {
              const Item = item.href ? motion.a : motion.div;
              return (
              <Item
                key={item.label}
                className={styles.mapItem}
                href={item.href}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.45 }}
              >
                <span>0{i + 1}</span>
                <div><strong>{item.label}</strong><small>{item.detail}</small></div>
                <i aria-hidden />
              </Item>
              );
            })}
          </div>
        </motion.div>
      </div>
      <div className={styles.goldSweep} aria-hidden />
    </section>
  );
}
