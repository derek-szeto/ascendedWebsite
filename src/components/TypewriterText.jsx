import { useState, useEffect } from 'react';
import styles from './TypewriterText.module.css';

export default function TypewriterText({ text, delay = 0, speed = 48 }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let ticker;
    const starter = setTimeout(() => {
      ticker = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(ticker);
          setTimeout(() => setDone(true), 900);
        }
      }, speed);
    }, delay * 1000);
    return () => { clearTimeout(starter); clearInterval(ticker); };
  }, [text, delay, speed]);

  return (
    <span>
      {displayed}
      {!done && <span className={styles.cursor} aria-hidden>|</span>}
    </span>
  );
}
