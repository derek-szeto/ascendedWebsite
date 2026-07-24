import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Marquee from '../components/Marquee';
import TypewriterText from '../components/TypewriterText';
import HomePrograms from '../components/HomePrograms';
import HomeAbout from '../components/HomeAbout';
import CommunityClasses from './CommunityClasses';
import styles from './Home.module.css';

const GOOGLE_FORM_URL = 'https://forms.gle/mpEKmmc7Ao15dMo39';

/*
const heroStats = [
  { n: '$12K+', l: 'Per-student spending gap between Cook County’s wealthiest districts and its lowest-funded districts', counter: { to: 12, prefix: '$', suffix: 'K+', duration: 1.8 } },
  { n: '1 in 3', l: 'Students read at grade level in Illinois’ most under-resourced districts' },
  { n: '2034', l: 'Projected year Illinois reaches fair school funding if progress stays at the current pace', counter: { to: 2034, prefix: '', suffix: '', duration: 2.2, useGrouping: false } },
];
*/

const issueStats = [
  { n: '$12K', d: 'Per-student spending gap between the wealthiest and lowest-funded districts in Cook County' },
  { n: '63%', d: 'Illinois districts funded below 90% of what the state says they need' },
  { n: '49.7%', d: 'Illinois public school students classified as low-income' },
  { n: '<33%', d: 'Students reading at grade level in the most underfunded Illinois districts' },
  { n: '40.8%', d: 'Chronic absenteeism rate in the most underfunded Illinois schools' },
  { n: '2034', d: 'Projected year for full equitable state funding if current legislative increases hold' },
];

const classSubjects = [
  { label: 'Math', icon: 'math', summary: 'Confidence, foundations, and problem solving' },
  { label: 'Computer Science', icon: 'code', summary: 'Coding fundamentals and creative projects' },
  { label: 'Test Prep', icon: 'test', summary: 'SAT/ACT prep open to eighth graders and high school students' },
];

const classFaqs = [
  { question: 'Who are the classes for?', answer: 'Our community classes support K–8 students with math, computer science, and foundational practice. Test Prep is also open to high school students preparing for the SAT or ACT.' },
  { question: 'Can high school students register?', answer: 'Yes. High school students are welcome to register for SAT/ACT Test Prep, including strategy, pacing, math review, reading comprehension, grammar, and guided practice.' },
  { question: 'How much do classes cost?', answer: 'Classes are free. Ascend-Ed is focused on making academic support easier for families to reach.' },
  { question: 'Where do sessions take place?', answer: 'Our current class sites are National India Hub at 930 National Pkwy in Schaumburg and Kenneth Young Center at 650 E. Algonquin Rd., Suite 104, in Schaumburg.' },
  { question: 'When will I receive the schedule?', answer: 'Session dates and times are shared through registration as they are confirmed, so completing the intake form is the best way to receive updates.' },
];


function SubjectIcon({ type }) {
  const props = {
    className: `${styles.subjectIcon} ${styles[`${type}Symbol`]}`,
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
      <g className={styles.homeMathPlus}><path d="M7 4.5v6M4 7.5h6" /></g>
      <g className={styles.homeMathMinus}><path d="M14 7.5h6" /></g>
      <g className={styles.homeMathMultiply}><path d="m4.9 14.2 4.2 4.2m0-4.2-4.2 4.2" /></g>
      <g className={styles.homeMathDivide}><path d="M14 16.3h6" /><circle cx="17" cy="13.5" r=".65" fill="currentColor" stroke="none" /><circle cx="17" cy="19.1" r=".65" fill="currentColor" stroke="none" /></g>
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);
  const reduceMotion = useReducedMotion();
  const issueStatsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: issueStatsRef,
    offset: ['start end', 'end start'],
  });
  const issueBgX = useTransform(scrollYProgress, [0, 1], ['18%', '-8%']);

  return (
    <div className={styles.root} id="top">

      <div className={styles.combinedHero}>
      <section className={styles.communityHero}>
        <div className={styles.heroPattern} aria-hidden />
        <motion.div
          className={styles.heroLearningPath}
          aria-hidden
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span />
          <span />
          <span />
        </motion.div>
        <div className={styles.heroSparkField} aria-hidden>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <svg className={styles.heroLeaf} viewBox="0 0 180 220" fill="none" aria-hidden>
          <path d="M22 210C34 136 69 72 137 18" />
          <path d="M58 115C25 111 14 84 13 62c30 4 49 20 45 53Z" />
          <path d="M84 78C71 47 89 22 110 9c12 28 4 53-26 69Z" />
          <path d="M108 50c20-25 49-21 67-8-18 25-42 31-67 8Z" />
        </svg>
        <svg className={styles.heroLeafAlt} viewBox="0 0 180 220" fill="none" aria-hidden>
          <path d="M22 210C34 136 69 72 137 18" />
          <path d="M58 115C25 111 14 84 13 62c30 4 49 20 45 53Z" />
          <path d="M84 78C71 47 89 22 110 9c12 28 4 53-26 69Z" />
          <path d="M108 50c20-25 49-21 67-8-18 25-42 31-67 8Z" />
        </svg>
        <div className={styles.heroOrbit} aria-hidden><span /><span /><span /></div>

        <div className={styles.communityHeroInner}>
          <motion.div className={styles.communityHeroCopy} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
            <span className={styles.communityEyebrow}>Our programs · Community Classes</span>
            <h1>
              <span className={styles.communityTitleLine}>Free tutoring</span>
              <span className={styles.communityTitleLine}>for <em>K–8</em></span>
              <span className={styles.communityTitleLine}><em>students.</em></span>
            </h1>
            <p>A welcoming place to learn, ask questions, and build confidence—led by student volunteers and made easier for families to reach.</p>
            <div className={styles.heroActions}>
              <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className={`${styles.heroEnroll} cta-glow`}>Register for classes <span aria-hidden>&rarr;</span></a>
              <button className={styles.heroDetails} onClick={() => navigate('/programs/community-classes')}>See Community Classes</button>
            </div>
          </motion.div>

          <motion.div className={styles.posterPanel} initial={{ opacity: 0, x: 24, rotate: 1 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
            <div className={styles.posterTopline}>
              <span>What we cover</span>
  
            </div>
            <div className={styles.posterSubjects}>
              {classSubjects.map((subject, i) => (
                <motion.div
                  key={subject.label}
                  className={subject.icon === 'test' ? styles.posterSubjectTest : undefined}
                  initial={reduceMotion ? false : { opacity: 0, x: 42, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  whileHover={reduceMotion ? undefined : { x: 7, scale: 1.012 }}
                  transition={{ delay: 0.42 + i * 0.14, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={styles.posterSubjectNum}>0{i + 1}</span>
                  <motion.span
                    className={styles.subjectIconMotion}
                    animate={reduceMotion ? undefined : {
                      y: [0, -7, 0],
                      rotate: [0, i === 1 ? 4 : -4, 0],
                      scale: [1, 1.04, 1],
                    }}
                    transition={{
                      duration: 3.1 + i * 0.35,
                      delay: 1 + i * 0.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <SubjectIcon type={subject.icon} />
                  </motion.span>
                  <span className={styles.posterSubjectCopy}>
                    <strong>{subject.label}</strong>
                    <small>{subject.summary}</small>
                    {subject.icon === 'test' && <b className={styles.posterAudience}>High school students welcome</b>}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className={styles.communityHeroCut} aria-hidden />
      </section>

      <section className={styles.missionBridge}>
        <div className={styles.missionBridgeGlow} aria-hidden />
        <motion.div
          className={styles.missionBridgeInner}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.missionBridgeEyebrow}>
            <TypewriterText text="Illinois & Greater Chicago Area" delay={0.35} speed={52} />
          </span>
          <h2>
            <span className={styles.missionHeadlineLine}>Where you grow up</span>
            <span className={styles.missionHeadlineLine}>shouldn&rsquo;t decide</span>
            <span className={styles.missionHeadlineLine}>what you <em>learn.</em></span>
          </h2>
          <p>
            Ascend-Ed is a student-led initiative helping to close Illinois' education gap through community classes, student-led fundraising, and support for under-resourced communities.
          </p>
          <div className={styles.missionBridgeActions}>
            <button className="cta-glow" onClick={() => navigate('/#donate')}>
              Donate Now <span aria-hidden>&rarr;</span>
            </button>
            <a href="#issue">Learn the Issue</a>
          </div>
        </motion.div>
        <div className={styles.topDivider} aria-hidden />
        <div
          className={styles.missionBridgeWord}
          aria-hidden
        >
          <span>ASCEND TOGETHER</span>
          <span>ASCEND TOGETHER</span>

        </div>
        <div className={styles.missionYellowBar} aria-hidden />
      </section>
      </div>


      {/* ── LEGACY HERO (kept out of layout while the new class campaign is active) ── */}
      <section className={styles.legacyHero}>
        <div className={styles.heroLeft}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.tag}
          >
            Illinois &amp; Greater Chicago Area
          </motion.div>

          <h1 className={styles.heroH1}>
            {[
              { text: 'Where you grow up', delay: 0.1 },
              { text: "shouldn’t decide", delay: 0.22 },
            ].map(({ text, delay }) => (
              <span key={text} className={styles.lineWrap}>
                <motion.span
                  className={styles.lineText}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
                >
                  {text}
                </motion.span>
              </span>
            ))}
            <span className={styles.lineWrap}>
              <motion.span
                className={styles.lineText}
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.75, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              >
                what you <em>learn.</em>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className={styles.sub}
          >
            Ascend-Ed is a student-led initiative helping to close Illinois' education gap through community classes, student-led fundraising, and support for under-resourced communities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.btnGroup}
          >
            <button className={`${styles.btnPrimary} cta-glow`} onClick={() => navigate('/#donate')}>
              Donate Now <span className={styles.btnArrow} aria-hidden>&rarr;</span>
            </button>
            <button className={styles.btnGhost} onClick={() => navigate('/#issue')}>
              Learn the Issue
            </button>
          </motion.div>
        </div>

        <div className={styles.heroRight}>
          <svg className={styles.heroBg} viewBox="0 0 480 580" fill="none" aria-hidden>
            <circle cx="380" cy="100" r="220" fill="rgba(92,203,138,0.07)" />
            <circle cx="80" cy="460" r="160" fill="rgba(232,180,79,0.06)" />
            <rect x="60" y="80" width="2" height="380" fill="rgba(232,180,79,0.2)" />
            <rect x="120" y="140" width="2" height="260" fill="rgba(92,203,138,0.15)" />
          </svg>
          <div className={styles.heroTexture} aria-hidden />
          <div className={styles.classRibbon} aria-hidden>
            <span>Class-site sessions</span>
            <span>Student tutors</span>
            <span>Practice-first</span>
          </div>

          <div className={styles.rightLabel}>Community classes</div>
          <motion.div
            className={styles.classCard}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.classChrome} aria-hidden>
              <span />
              <span />
              <span />
              <strong>Ascend-Ed class hub</strong>
              <em>Open</em>
            </div>
            <span className={styles.classKicker}>Starting mid-June 2026</span>
            <h2 className={styles.classTitle}>Community classes built for useful practice.</h2>
            <p className={styles.classText}>
              Math, computer science, and SAT/ACT prep led by academically accomplished student tutors who are comfortable with advanced topics and know how to explain them clearly.
            </p>
            <div className={styles.classVisual} aria-hidden>
              <div className={styles.classVisualMain}>
                <span>Weekly focus</span>
                <strong>3 subjects</strong>
                <div>
                  <i style={{ '--w': '86%' }} />
                  <i style={{ '--w': '68%' }} />
                  <i style={{ '--w': '74%' }} />
                </div>
              </div>
              <div className={styles.classVisualSide}>
                <span>Access</span>
                <strong>Free + low cost</strong>
              </div>
            </div>
            <div className={styles.classMeta}>
              {classSubjects.map((subject) => (
                <span key={subject.label}>
                  <SubjectIcon type={subject.icon} />
                  <span>{subject.label}</span>
                </span>
              ))}
            </div>
            <button className={`${styles.classBtn} cta-glow`} onClick={() => navigate('/registration')}>
              Register <span aria-hidden>&rarr;</span>
            </button>
          </motion.div>
          <div className={styles.classNote}>
            Any money raised from classes goes back toward education access work in Illinois.
          </div>
        </div>

        <div className={styles.diagonalCut} aria-hidden />
      </section>

      {/* ── IMPACT NUMBERS BAND ── */}
      <HomeAbout />
      <HomePrograms />

      <div id="classes">
        <CommunityClasses />
      </div>

      <section className={styles.homeFaq} id="faq">
        <div className={styles.homeFaqInner}>
          <motion.div className={styles.homeFaqHeader} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span>Community class FAQ</span>
            <h2>What <em>families</em><b>should know.</b></h2>
            <p>Quick answers about eligibility, cost, location, and scheduling.</p>
            <div className={styles.faqSignal} aria-hidden><i /><i /><i /></div>
          </motion.div>
          <div className={styles.homeFaqList}>
            {classFaqs.map((item, i) => (
              <motion.div
                className={styles.faqItem}
                key={item.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <button
                  className={styles.faqQuestion}
                  type="button"
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.question}</span>
                  <motion.i aria-hidden animate={{ rotate: openFaq === i ? 45 : 0 }}>+</motion.i>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      className={styles.faqAnswer}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={reduceMotion ? { duration: 0 } : { height: { duration: 0.38, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.22 } }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className={styles.issueFeature} id="issue">
      <div className={styles.issueIntroSection}>
        <div className={styles.issueIntroInner}>
          <motion.div
            className={styles.issueIntro}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className={styles.issueEyebrow}>The Issue</div>
              <h2 className={styles.issueTitle}>
                Education inequality in Illinois is not just a Chicago problem.<em> It affects students across the state.</em>
              </h2>
            </div>
            <div className={styles.issueBody}>
              <p>
                In Illinois, school funding is closely tied to local property taxes. That means the resources a student receives can depend more on where they live instead of what they need.
              </p>
              <div className={styles.openingCallout}>
                <span className={styles.calloutKicker}>The consequence</span>
                <strong>Two students in the same county can receive <span>$12,000 less</span> in school funding simply because of where their street falls on a tax map.</strong>
              </div>
              <p className={styles.originLine}>
                That&apos;s why we started <span>Ascend-Ed.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MANIFESTO ── */}
      <section className={styles.manifesto}>
        <div className={styles.manifestoInner}>
          <motion.div
            className={styles.manifestoQuote}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.manifestoMark}>&ldquo;</span>
            Two students in the same county can have more than a $12,000 difference in school funding each year — just because of where they live.
            <span className={styles.manifestoMark}>&rdquo;</span>
          </motion.div>
          <motion.p
            className={styles.manifestoSub}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            That isn&apos;t just a Chicago problem. That&apos;s an Illinois problem. And it&apos;s one we&apos;re working to close.
          </motion.p>
          <motion.button
            className={styles.manifestoBtn}
            onClick={() => navigate('/#issue')}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            
          </motion.button>
        </div>
        <svg className={styles.manifestoShape} viewBox="0 0 200 200" fill="none" aria-hidden>
          <circle cx="100" cy="100" r="98" stroke="rgba(232,180,79,0.12)" strokeWidth="1" />
          <circle cx="100" cy="100" r="70" stroke="rgba(232,180,79,0.08)" strokeWidth="1" />
        </svg>
      </section>

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
          <span className={styles.issueQuoteLabel}>Why this matters</span>
          <div className={styles.pqMark}>&ldquo;</div>
          <p className={styles.pqText}>
            Where you live should not decide <span>how far you go.</span>
          </p>
          <div className={styles.pqSource}>Ascend-Ed</div>
        </div>
      </motion.div>

      <section ref={issueStatsRef} className={styles.issueStatsSection}>
        <motion.div className={styles.issueBgWord} style={{ x: issueBgX }} aria-hidden>
          ILLINOIS
        </motion.div>
        <div className={styles.issueStatsInner}>
          <motion.header
            className={styles.issueStatsHeader}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Illinois education gap · key statistics</span>
          </motion.header>
          <div className={styles.issueStats}>
            {issueStats.map((s, i) => (
              <motion.div
                key={i}
                className={styles.issueStatRow}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.issueStatN}>{s.n}</div>
                <div className={styles.issueStatD}>{s.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </section>

      {/* ── GET INVOLVED SECTION ── */}
      <section className={styles.getInvolvedSection} id="get-involved">
        <div className={styles.involvedTechVisuals} aria-hidden>
          <i /><i /><i /><i />
        </div>
        <div className={styles.getInvolvedInner}>
          <motion.div
            className={styles.getInvolvedHeader}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className={styles.getInvolvedEyebrow}>Get Involved</span>
            <motion.h2
              className={styles.getInvolvedTitle}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: .7 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: .16, delayChildren: .08 } } }}
            >
              <motion.span className={styles.involvedWhite} variants={{ hidden: { opacity: 0, y: 24, filter: 'blur(7px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: .58, ease: [0.22, 1, 0.36, 1] } } }}>This is&nbsp;</motion.span>
              <motion.span className={styles.involvedGold} variants={{ hidden: { opacity: 0, y: 24, filter: 'blur(7px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: .62, ease: [0.22, 1, 0.36, 1] } } }}>your state,</motion.span>{' '}
              <motion.em className={styles.involvedLime} variants={{ hidden: { opacity: 0, scale: .78, rotate: -4, filter: 'blur(7px)' }, show: { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 190, damping: 16 } } }}>too.</motion.em>
            </motion.h2>
            <p className={styles.getInvolvedSub}>You do not have to be a student to care about this. Whether you can teach, fundraise, donate, or share the mission, there is a way to help.</p>
          </motion.div>

          <motion.div
            className={styles.donateSection}
            id="donate"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.donateContent}>
              <span className={styles.donateEyebrow}>Most direct way to help</span>
              <h3 className={styles.donateTitle}>The funding gap is real. Change starts <em>here.</em></h3>
              <p className={styles.donateSub}>Help Ascend-Ed fund education access in Illinois. Your donation supports trusted education groups in Illinois. We track what comes in and post where it goes.</p>
              <div className={styles.trustBadges}>
                {['No overhead', 'Every dollar tracked', 'Public breakdowns'].map((badge, i) => (
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
            </div>
            <a
              href="https://www.zeffy.com/en-US/donation-form/donate-to-ascend"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.donateBtn} cta-glow`}
            >
              Donate Now <span aria-hidden>&rarr;</span>
            </a>
          </motion.div>

          <div className={styles.waysSection}>
            <motion.div
              className={styles.waysHeader}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className={styles.waysEyebrow}>More ways to help</span>
              <h3 className={styles.waysTitle}>Choose the role that <em>fits you.</em></h3>
            </motion.div>

            {[
              { icon: 'teach', title: 'Teach', tag: 'Volunteer', body: 'Lead a free tutoring session at one of our class-site grounds. We need help in math, computer science, and SAT/ACT prep.' },
              { icon: 'fundraise', title: 'Fundraise', tag: 'Help Us Grow', body: 'If you have event ideas, connections, or time to help coordinate, reach out. Every event is student-led.' },
              { icon: 'spread', title: 'Share', tag: 'Amplify', body: 'Post about it. Talk about it. Send this link to someone who should know.' },
            ].map((w, i) => (
              <motion.div
                key={w.title}
                className={styles.wayRow}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
              >
                <div className={styles.wayBody}>
                  <div className={styles.wayMeta}>
                    <span className={styles.wayTag}>{w.tag}</span>
                  </div>
                  <div className={styles.wayTitle}>{w.title}</div>
                  <p className={styles.wayDesc}>{w.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={styles.contactBand}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className={styles.bandKicker}>You do not need to do everything.</p>
            <p className={styles.bandText}>Pick one way to start.</p>
            <a href="mailto:future.ascended@gmail.com" className={styles.bandEmail}>
              future.ascended@gmail.com <span aria-hidden>↗</span>
            </a>
            <p className={styles.bandSub}>Tell us what you can offer, and we&apos;ll point you toward a useful next step.</p>
          </motion.div>
        </div>
      </section>

      <Marquee variant="light" />


      {/* ── PILLARS ── */}
      {/* ── BOTTOM CTA BAND ── */}
      <section className={styles.ctaBand}>
        <svg className={styles.ctaBg} viewBox="0 0 1200 300" fill="none" aria-hidden>
          <circle cx="1100" cy="150" r="200" stroke="rgba(92,203,138,0.1)" strokeWidth="1" />
          <circle cx="1100" cy="150" r="130" stroke="rgba(92,203,138,0.06)" strokeWidth="1" />
          <circle cx="80" cy="150" r="150" fill="rgba(92,203,138,0.04)" />
          <rect x="160" y="149" width="700" height="1" stroke="rgba(255,255,255,0.05)" />
        </svg>
        <div className={styles.ctaInner}>
          <motion.p
            className={styles.ctaEyebrow}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Illinois students can&apos;t wait until 2034
          </motion.p>
          <motion.h2
            className={styles.ctaHeadline}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.ctaJoin}>Join us</span> in closing the gap.
          </motion.h2>
          <motion.div
            className={styles.ctaBtns}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <a
              href="https://www.zeffy.com/en-US/donation-form/donate-to-ascend"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.ctaBtnPrimary} cta-glow`}
            >
              Donate Now
            </a>
            <button className={styles.ctaBtnSecondary} onClick={() => navigate('/#get-involved')}>
              Get Involved
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
