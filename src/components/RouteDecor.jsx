import styles from './RouteDecor.module.css';

export default function RouteDecor() {
  return (
    <div className={styles.decor} aria-hidden>
      <div className={styles.blobs}>
        {Array.from({ length: 7 }, (_, index) => <i key={index} />)}
      </div>
      <div className={styles.nodes}>
        {Array.from({ length: 14 }, (_, index) => <i key={index} />)}
      </div>
    </div>
  );
}
