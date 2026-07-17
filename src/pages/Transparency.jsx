import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Marquee from '../components/Marquee';
import Counter from '../components/Counter';
import styles from './Transparency.module.css';

const steps = [
  { n: '01', title: 'Raise', body: 'Funds come in through donations, community classes, and fundraising events — all processed through Zeffy with full transaction records.' },
  { n: '02', title: 'Track', body: 'Every dollar in is logged. We maintain internal records from day one so there are never gaps when we publish.' },
  { n: '03', title: 'Report', body: 'We publish a public breakdown of all funds raised and distributed. Anyone can see it — donors, partners, the public.' },
  { n: '04', title: 'Give', body: 'Funds go to vetted, well-rated organizations already working to close Illinois\' education gap. No overhead. No exceptions.' },
];

const commitments = [
  { stat: '100', suffix: '%', label: 'of donations reach the cause', sub: 'Zero overhead. Every dollar passes through.' },
  { stat: '0', suffix: '', label: 'dollars in paid staff or admin costs', sub: 'Fully volunteer-run from day one.' },
  { stat: '3', suffix: '', label: 'programs launching in 2026', sub: 'Classes, events, and direct giving.' },
];

export default function Transparency() {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <svg className={styles.heroBg} viewBox="0 0 900 500" fill="none" aria-hidden>
          <circle cx="750" cy="60" r="220" fill="rgba(92,203,138,0.05)" />
          <circle cx="120" cy="420" r="150" fill="rgba(232,180,79,0.05)" />
          <rect x="0" y="249" width="900" height="1" stroke="rgba(255,255,255,0.04)" />
          {/* Illinois outline (decorative) */}
          <path
            d="M680,60 L760,62 L764,90 L780,92 L780,110 L764,110 L762,280 L768,295 L762,310 L758,380 L720,430 L682,380 L678,310 L672,295 L678,280 L675,110 L660,92 L680,90 Z"
            stroke="rgba(232,180,79,0.12)"
            strokeWidth="1.5"
            fill="rgba(232,180,79,0.03)"
          />
        </svg>
        <div className={styles.heroInner}>
          <motion.div className={styles.eyebrow} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Transparency
          </motion.div>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            Every dollar is<em> public record.</em>
          </motion.h1>
          <motion.p className={styles.heroSub} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            The people who fund us deserve to know where their money goes. That is not optional for us — it is the whole point.
          </motion.p>
        </div>
        <div className={styles.heroDiag} aria-hidden />
      </section>


      <Marquee variant="dark" />

      {/* Animated stats */}
      <section className={styles.statsSection}>
        <div className={styles.statsInner}>
          {commitments.map((c, i) => (
            <motion.div
              key={i}
              className={styles.statBlock}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55 }}
            >
              <div className={styles.statNum}>
                <Counter to={parseInt(c.stat)} suffix={c.suffix} className={styles.statCount} />
              </div>
              <div className={styles.statLabel}>{c.label}</div>
              <div className={styles.statSub}>{c.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Process flow */}
      <section className={styles.process}>
        <div className={styles.processInner}>
          <motion.div
            className={styles.processHeader}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.processEyebrow}>How it works</span>
            <h2 className={styles.processTitle}>From your donation to real impact — every step is tracked.</h2>
          </motion.div>

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              className={styles.stepRow}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.stepNum}>{s.n}</div>
              <div className={styles.stepBody}>
                <div className={styles.stepTitle}>{s.title}</div>
                <p className={styles.stepDesc}>{s.body}</p>
              </div>
              <div className={styles.stepArrow} aria-hidden>→</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Commitment band */}
      <motion.section
        className={styles.band}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <svg className={styles.bandShape} viewBox="0 0 500 160" fill="none" aria-hidden>
          <circle cx="80" cy="80" r="72" stroke="rgba(7,26,18,0.1)" strokeWidth="1.5" />
          <circle cx="80" cy="80" r="48" stroke="rgba(7,26,18,0.07)" strokeWidth="1" />
        </svg>
        <div className={styles.bandInner}>
          <p className={styles.bandText}>
            Financial records will be published here as we grow. Check back as Ascend-Ed launches its first programs in 2026.
          </p>
          <div className={styles.bandBtns}>
            <a
              href="https://www.zeffy.com/en-US/donation-form/donate-to-ascend"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.bandBtnPrimary} cta-glow`}
            >
              Donate Now
            </a>
            <button className={styles.bandBtnGhost} onClick={() => navigate('/about')}>
              Meet the team →
            </button>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
