import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Issue.module.css';

const stats = [
  { n: '$12K', d: 'Per-student spending gap between the wealthiest and lowest-funded districts in Cook County' },
  { n: '63%', d: 'Illinois districts funded below 90% of what the state says they need' },
  { n: '49.7%', d: 'Illinois public school students classified as low-income' },
  { n: '<33%', d: 'Students reading at grade level in the most underfunded Illinois districts' },
  { n: '40.8%', d: 'Chronic absenteeism rate in the most underfunded Illinois schools' },
  { n: '2034', d: 'Projected year for full equitable state funding if current legislative increases hold' },
];

export default function Issue() {
  const statsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: statsRef,
    offset: ['start end', 'end start'],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ['2%', '-28%']);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <motion.div
          className={styles.intro}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <motion.div
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              The Issue
            </motion.div>
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Education inequality in Illinois is not just a Chicago problem.<em> It affects students across the state.</em>
            </motion.h2>
          </div>

          <motion.div
            className={styles.body}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              In Illinois, school funding is closely tied to local property taxes. That means the resources a student receives can depend more on where they live instead of what they need.
            </p>
            <div className={styles.openingCallout}>
              <span className={styles.calloutKicker}>The consequence</span>
              <strong>Two students in the same county can receive <span>$12,000 less</span> in school funding simply because of where their street falls on a tax map.</strong>
            </div>
            <motion.p
              className={styles.originLine}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              That&apos;s why we started <span>Ascend-Ed.</span>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className={styles.pullQuote}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg className={styles.pqShape} viewBox="0 0 400 400" fill="none" aria-hidden>
          <circle cx="200" cy="200" r="196" stroke="rgba(7,26,18,0.1)" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="140" stroke="rgba(7,26,18,0.07)" strokeWidth="1" />
        </svg>
        <div className={styles.pqInner}>
          <div className={styles.pqMark}>&ldquo;</div>
          <p className={styles.pqText}>
            Where you live should not decide <span>how far you go.</span>
          </p>
          <div className={styles.pqSource}>Ascend-Ed</div>
        </div>
      </motion.div>

      <section ref={statsRef} className={styles.statsSection}>
        <motion.div className={styles.bgWord} style={{ x: bgX }} aria-hidden>
          ILLINOIS
        </motion.div>
        <div className={styles.statsInner}>
          <div className={styles.stats}>
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className={styles.statRow}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.statN}>{s.n}</div>
                <div className={styles.statD}>{s.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
