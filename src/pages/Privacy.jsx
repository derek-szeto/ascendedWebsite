import { motion } from 'framer-motion';
import styles from './Privacy.module.css';

const sections = [
  {
    title: 'Who we are',
    body: 'Ascend-Ed is a student-led nonprofit initiative based in Illinois. You can reach us at future.ascended@gmail.com.',
  },
  {
    title: 'What we collect',
    body: 'We do not collect personal information through this website. We do not use tracking cookies, analytics platforms, or user accounts. If you email us directly, we receive your email address and any information you include in that message. We use it only to respond to you and do not share it with third parties.',
  },
  {
    title: 'Donations',
    body: 'Donations are processed through Zeffy (zeffy.com), a third-party platform. When you donate, you are subject to Zeffy\'s privacy policy. We receive a record of your donation amount but do not store your payment information.',
  },
  {
    title: 'Third-party links',
    body: 'Our website contains links to external sites. We are not responsible for the privacy practices of those sites.',
  },
  {
    title: 'Changes to this policy',
    body: 'We may update this policy as our practices change. Updates will be posted here with a revised date.',
  },
  {
    title: 'Contact',
    body: null,
    email: true,
  },
];

export default function Privacy() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <motion.div
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Legal
          </motion.div>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            className={styles.meta}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Last updated June 2026
          </motion.p>
        </div>
      </div>


      <div className={styles.body}>
        <div className={styles.bodyInner}>
          {sections.map((s, i) => (
            <motion.section
              key={i}
              className={styles.section}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <h2 className={styles.sectionTitle}>{s.title}</h2>
              {s.email ? (
                <p className={styles.sectionBody}>
                  Questions? Email us at{' '}
                  <a href="mailto:future.ascended@gmail.com" className={styles.emailLink}>
                    future.ascended@gmail.com
                  </a>
                </p>
              ) : (
                <p className={styles.sectionBody}>{s.body}</p>
              )}
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
