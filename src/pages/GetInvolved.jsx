import { motion } from 'framer-motion';
import Marquee from '../components/Marquee';
import EditorialHero from '../components/EditorialHero';
import styles from './GetInvolved.module.css';

const trustBadges = ['No overhead', 'Every dollar tracked', 'Public breakdowns'];

const donationImpact = [
  {
    label: 'Give with confidence',
    stat: '100%',
    body: 'of donations are directed toward education access work, with no Ascend-Ed overhead taken out.',
  },
  {
    label: 'See the path',
    stat: 'Tracked',
    body: 'we document what comes in and publish where support goes after each giving cycle.',
  },
  {
    label: 'Move locally',
    stat: 'Illinois',
    body: 'support stays focused on students and organizations working inside the state.',
  },
];

const fitOptions = [
  {
    need: 'I have time',
    title: 'Teach or fundraise',
    body: 'Lead a session at one of our class-site grounds, help plan a student-run event, or take on a small coordination role.',
    href: 'mailto:future.ascended@gmail.com?subject=I have time to help',
  },
  {
    need: 'I have money',
    title: 'Donate directly',
    body: 'Support trusted education work in Illinois with a donation that is tracked and posted publicly.',
    href: '#donate',
  },
  {
    need: 'I have reach',
    title: 'Spread the word',
    body: 'Share Ascend-Ed with someone who can teach, donate, host, post, or connect us locally.',
    href: 'mailto:future.ascended@gmail.com?subject=I can help spread the word',
  },
];

const ways = [
  {
    num: '01',
    icon: 'teach',
    title: 'Teach',
    tag: 'Volunteer',
    body: 'Lead a free tutoring session at one of our class-site grounds. We need help in math, computer science, and SAT/ACT prep. No certification required. Just show up ready to teach.',
    action: { label: 'Volunteer to Teach', href: 'mailto:future.ascended@gmail.com?subject=I want to teach' },
  },
  {
    num: '02',
    icon: 'fundraise',
    title: 'Fundraise',
    tag: 'Help Us Grow',
    body: 'If you have event ideas, connections, or just time to help coordinate, reach out. Every event we run is student-led and every dollar goes toward the cause.',
    action: { label: 'Get in touch', href: 'mailto:future.ascended@gmail.com?subject=I want to help fundraise' },
  },
  {
    num: '03',
    icon: 'spread',
    title: 'Share',
    tag: 'Amplify',
    body: 'Post about it. Talk about it. Send this link to someone who should know. The funding gap is not secret — It just does not get enough attention.',
    action: { label: 'Email us', href: 'mailto:future.ascended@gmail.com?subject=I want to help spread the word' },
  },
];

function WayIcon({ type }) {
  const props = {
    className: styles.wayIcon,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
  };

  if (type === 'fundraise') {
    return (
      <svg {...props}>
        <path d="M5 18.5V8.5C5 7.1 6.1 6 7.5 6H19v12.5H5Z" />
        <path d="M8 6V4.8C8 4 8.6 3.4 9.4 3.4h7" />
        <path d="M15.8 12.2H19" />
        <path d="M10.4 14.8c1.9 0 3.4-1 3.4-2.3s-1.5-2.3-3.4-2.3-3.4 1-3.4 2.3 1.5 2.3 3.4 2.3Z" />
        <path d="M7 12.5v2.2c0 1.3 1.5 2.3 3.4 2.3s3.4-1 3.4-2.3v-2.2" />
      </svg>
    );
  }

  if (type === 'donate') {
    return (
      <svg {...props}>
        <path d="M7.5 12.5 12 17l4.5-4.5a3.1 3.1 0 0 0 0-4.4 3.1 3.1 0 0 0-4.4 0L12 8.2l-.1-.1a3.1 3.1 0 0 0-4.4 4.4Z" />
        <path d="M4 19h5.8c1 0 2-.3 2.8-.9l5-3.5c.6-.4 1.4-.3 1.8.3.4.6.3 1.4-.3 1.8l-5.2 3.7c-.9.6-2 .9-3.1.9H4" />
        <path d="M4 15h4.5c.9 0 1.5.6 1.5 1.4S9.4 18 8.5 18H7" />
      </svg>
    );
  }

  if (type === 'spread') {
    return (
      <svg {...props}>
        <path d="M4 13.5v-3l10-4v11l-10-4Z" />
        <path d="M14 9.2c2.2 0 4 1.3 4 2.8s-1.8 2.8-4 2.8" />
        <path d="M7.5 14.8 9 20h2.5l-1.2-4.1" />
        <path d="M20 8.5 21.5 7" />
        <path d="M20.6 15.2 22.4 16" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M4 6.5c1.6-.7 3.4-.7 5 0 1.6.7 3.4.7 5 0 1.6-.7 3.4-.7 5 0v11c-1.6-.7-3.4-.7-5 0-1.6.7-3.4.7-5 0-1.6-.7-3.4-.7-5 0v-11Z" />
      <path d="M9 6.5v11" />
      <path d="M14 6.5v11" />
      <path d="m16.5 5 2.3-2.3 1.5 1.5L18 6.5l-1.8.5.3-2Z" />
    </svg>
  );
}

export default function GetInvolved() {
  return (
    <div className={`${styles.page} subpage-theme`}>

      <EditorialHero
        chapter="02"
        eyebrow="Get Involved"
        title={<>Bring what you have. <em>Make it matter.</em></>}
        description="You do not have to be a student to care about this. Teach, fundraise, donate, or share—there is a useful way for you to show up."
        items={fitOptions.map((item) => ({ label: item.need, detail: item.title }))}
      />

      {/* Hero */}
      <section className={styles.legacyHero}>
        <svg className={styles.heroBg} viewBox="0 0 900 520" fill="none" aria-hidden>
          <circle cx="820" cy="100" r="240" fill="rgba(92,203,138,0.06)" />
          <circle cx="80" cy="460" r="160" fill="rgba(232,180,79,0.05)" />
          <circle cx="450" cy="260" r="320" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <path
            d="M760,40 L840,42 L844,70 L860,72 L860,90 L844,90 L842,260 L848,275 L842,290 L838,360 L800,410 L762,360 L758,290 L752,275 L758,260 L755,90 L740,72 L760,70 Z"
            stroke="rgba(92,203,138,0.1)"
            strokeWidth="1.5"
            fill="rgba(92,203,138,0.02)"
          />
        </svg>
        <div className={styles.heroInner}>
          <motion.div className={styles.eyebrow} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Get Involved
          </motion.div>
          <h1 className={styles.heroTitle}>
            <motion.span
              className={styles.titleLine}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              This is
            </motion.span>{' '}
            <motion.span
              className={styles.titleFocus}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.58, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              your state
            </motion.span>
            , {' '} 
            <motion.em
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.54, ease: [0.22, 1, 0.36, 1] }}
            >
              {' '} too.
            </motion.em>
          </h1>
          <motion.p className={styles.heroSub} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            You do not have to be a student to care about this. Whether you can teach, fundraise, donate, or share the mission, there is a way to help.
          </motion.p>
          <motion.p
            className={styles.heroGrounding}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.34 }}
          >
            Most help starts small: one session, one post, one event idea, one donor.
          </motion.p>
        </div>
        <div className={styles.heroDiag} aria-hidden />
      </section>

      <Marquee variant="dark" />

      <section className={styles.fit}>
        <div className={styles.fitInner}>
          <motion.div
            className={styles.fitHeader}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className={styles.fitEyebrow}>Not sure what fits?</span>
            <h2 className={styles.fitTitle}>Start with what you already have.</h2>
          </motion.div>
          <div className={styles.fitGrid}>
            {fitOptions.map((option, i) => (
              <motion.a
                key={option.need}
                href={option.href}
                {...(option.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={styles.fitCard}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.fitNeed}>{option.need}</span>
                <span className={styles.fitCardTitle}>{option.title}</span>
                <span className={styles.fitBody}>{option.body}</span>
                <span className={styles.fitArrow} aria-hidden>&rarr;</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.donateSection} id="donate">
        <div className={styles.donateInner}>
          <motion.div
            className={styles.donateIntro}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className={styles.donateEyebrow}>Donate</span>
            <h2 className={styles.donateTitle}>The funding gap is real. Change can start here.</h2>
            <p className={styles.donateSub}>
              Your donation supports trusted education groups in Illinois. We track what comes in and post where it goes.
            </p>
            <div className={styles.trustBadges}>
              {trustBadges.map((badge, i) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.42, delay: i * 0.08 }}
                >
                  {badge}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <div className={styles.donateGrid}>
            {donationImpact.map((item, i) => (
              <motion.div
                key={item.label}
                className={styles.donateCard}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.donateLabel}>{item.label}</span>
                <span className={styles.donateStat}>{item.stat}</span>
                <p>{item.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={styles.donateCta}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.58, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.donateProof}>
              <span className={styles.donateProofNum}>100%</span>
              <span>reaches the cause</span>
            </div>
            <a
              href="https://www.zeffy.com/en-US/donation-form/donate-to-ascend"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.donateBtn} cta-glow`}
            >
              Donate Now <span className={styles.btnArrow} aria-hidden>&rarr;</span>
            </a>
            <span className={styles.donateNote}>Processed securely through Zeffy</span>
          </motion.div>
        </div>
      </section>


      {/* Ways to get involved */}
      <section className={styles.ways}>
        <div className={styles.waysInner}>
          <motion.div
            className={styles.waysHeader}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.waysEyebrow}>More ways to help</span>
            <h2 className={styles.waysTitle}>Choose the role that fits <span>you.</span></h2>
          </motion.div>

          {ways.map((w, i) => (
            <motion.div
              key={w.num}
              className={styles.wayRow}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
            >
              <div className={styles.wayLeft}>
                <div className={styles.wayNum}>{w.num}</div>
                <WayIcon type={w.icon} />
              </div>
              <div className={styles.wayBody}>
                <div className={styles.wayMeta}>
                  <span className={styles.wayTag}>{w.tag}</span>
                </div>
                <div className={styles.wayTitle}>{w.title}</div>
                <p className={styles.wayDesc}>{w.body}</p>
              </div>
              <div className={styles.wayAction}>
                <a
                  href={w.action.href}
                  {...(w.action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`${styles.wayBtn} ${w.action.variant === 'gold' ? styles.goldBtn : ''}`}
                >
                  {w.action.label} <span className={styles.btnArrow} aria-hidden>&rarr;</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact band */}
      <motion.section
        className={styles.band}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <svg className={styles.bandBg} viewBox="0 0 900 200" fill="none" aria-hidden>
          <circle cx="800" cy="100" r="140" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <circle cx="800" cy="100" r="90" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <rect x="0" y="99" width="600" height="1" stroke="rgba(255,255,255,0.06)" />
        </svg>
        <div className={styles.bandInner}>
          <p className={styles.bandKicker}>You do not need to do everything.</p>
          <p className={styles.bandText}>Pick one way to start.</p>
          <a href="mailto:future.ascended@gmail.com" className={styles.bandEmail}>
            future.ascended@gmail.com <span aria-hidden>↗</span>
          </a>
          <p className={styles.bandSub}>Email us, and we&apos;ll help you find the best way to get involved.</p>
        </div>
      </motion.section>

    </div>
  );
}
