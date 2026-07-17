import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './ComingSoon.module.css';

export default function ComingSoon({ title }) {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.label}>Coming Soon</div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.sub}>We're working on it. Check back soon.</p>
        <button className={styles.btn} onClick={() => navigate('/')}>Back to Home</button>
      </motion.div>
    </div>
  );
}
