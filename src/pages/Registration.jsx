import { motion } from 'framer-motion';
import styles from './Registration.module.css';

const GOOGLE_FORM_URL = 'https://forms.gle/mpEKmmc7Ao15dMo39';

const materials = [
  {
    label: '01',
    icon: 'math',
    title: 'Math',
    body: 'Foundational support, problem solving, and practice for students who want steadier confidence with math.',
  },
  {
    label: '02',
    icon: 'code',
    title: 'Computer Science',
    body: 'Coding fundamentals, computational thinking, and beginner-friendly project work.',
  },
  {
    label: '03',
    icon: 'test',
    title: 'Test Prep',
    body: 'SAT and ACT prep focused on strategy, pacing, practice, and review.',
  },
];

const siteGrounds = [
  {
    label: 'Site Ground 01',
    title: 'Class-Site Sessions',
    body: 'Sessions hosted at Ascend-Ed site grounds designed to be accessible, focused, and easy for families to reach.',
  },
  {
    label: 'Site Ground 02',
    title: 'Community Rooms',
    body: 'Partner spaces for small-group instruction, review blocks, and student-led practice.',
  },
  {
    label: 'Site Ground 03',
    title: 'Pop-Up Study Days',
    body: 'Focused study days for test prep, coding help, and targeted math support.',
  },
];

function SubjectIcon({ type }) {
  const props = {
    className: styles.subjectIcon,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
  };

  if (type === 'code') {
    return (
      <svg {...props}>
        <path d="M4 5.5h16v10.2H4V5.5Z" />
        <path d="M9 19h6" />
        <path d="M12 15.7V19" />
        <path d="m9.2 9.2-2 2 2 2" />
        <path d="m14.8 9.2 2 2-2 2" />
        <path d="m12.9 8.7-1.8 5" />
      </svg>
    );
  }

  if (type === 'test') {
    return (
      <svg {...props}>
        <path d="M7 4.8h10c.9 0 1.6.7 1.6 1.6v12.3c0 .9-.7 1.6-1.6 1.6H7c-.9 0-1.6-.7-1.6-1.6V6.4c0-.9.7-1.6 1.6-1.6Z" />
        <path d="M9.2 3.7h5.6v2.6H9.2V3.7Z" />
        <path d="M8.7 10.4h6.6" />
        <path d="M8.7 14h6.6" />
        <path d="M8.7 17.4h3.8" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M7 5v5" />
      <path d="M4.5 7.5h5" />
      <path d="M14.5 7.5h5" />
      <path d="m5.2 14.7 3.6 3.6" />
      <path d="m8.8 14.7-3.6 3.6" />
      <path d="M14.5 16.5h5" />
      <circle cx="17" cy="13.8" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="17" cy="19.2" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Registration() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <motion.svg className={styles.heroBg} viewBox="0 0 900 560" fill="none" aria-hidden>
          <motion.circle
            cx="760"
            cy="90"
            r="230"
            stroke="rgba(92,203,138,0.08)"
            strokeWidth="1.5"
            animate={{ scale: [1, 1.04, 1], opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '760px 90px' }}
          />
          <motion.circle
            cx="120"
            cy="455"
            r="170"
            fill="rgba(232,180,79,0.055)"
            animate={{ scale: [1, 1.06, 1], opacity: [0.72, 1, 0.72] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            style={{ transformOrigin: '120px 455px' }}
          />
          <circle cx="450" cy="280" r="280" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
          <path d="M138 398 C280 236 462 342 742 128" stroke="rgba(232,180,79,0.13)" strokeWidth="1.5" strokeDasharray="8 13" />
        </motion.svg>
        <div className={styles.heroInner}>
          <motion.div
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Registration
          </motion.div>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Enroll in community classes for <span>math, computer science, and SAT/ACT prep.</span>
          </motion.h1>
          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.18 }}
          >
            Student-led sessions built to make academic support easier to reach, with proceeds supporting education access work in Illinois.
          </motion.p>
          <motion.a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.enrollBtn} cta-glow`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Enroll Now <span aria-hidden>&rarr;</span>
          </motion.a>
        </div>
        <div className={styles.heroDiag} aria-hidden />
      </section>

      <section className={styles.materials}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>Material covered</span>
            <h2>Three focus areas, built for useful practice.</h2>
          </div>
          <div className={styles.cardGrid}>
            {materials.map((item, i) => (
              <motion.div
                key={item.title}
                className={styles.infoCard}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.cardTop}>
                  <span className={styles.cardNum}>{item.label}</span>
                  <SubjectIcon type={item.icon} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sites}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>Site grounds</span>
            <h2>Three ways classes can meet students where they are.</h2>
          </div>
          <div className={styles.siteRows}>
            {siteGrounds.map((site, i) => (
              <motion.div
                key={site.label}
                className={styles.siteRow}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.siteLabel}>{site.label}</span>
                <div>
                  <h3>{site.title}</h3>
                  <p>{site.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
