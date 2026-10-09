import CurriculumExplorer from '../components/CurriculumExplorer';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import EditorialHero from '../components/EditorialHero';
import { teamMembers } from '../data/teamMembers';
import betterRishabhPhoto from '../assets/betterrishabh.jpg';
import whyRishabh from '../assets/Why Rishabh.png';
import whyVed from '../assets/Why Ved.png';
import nationalIndiaHubLogo from '../assets/nationalIndiaHubLogo.png';
import styles from './CommunityClasses.module.css';

const GOOGLE_FORM_URL = 'https://forms.gle/mpEKmmc7Ao15dMo39';

const subjects = [
  { type: 'math', title: 'Math', short: 'Foundations and confidence', body: 'Foundational support, problem solving, and guided practice for students who want to feel steadier and more confident with math.', materials: [
    ['Arithmetic Foundations', 'Operations, fractions, decimals, percentages, and number sense.'],
    ['Pre-Algebra', 'Expressions, equations, ratios, proportions, and graphing fundamentals.'],
    ['Algebra I & II', 'Linear equations, inequalities, functions, systems, and polynomials.'],
    ['Geometry & Trigonometry', 'Angles, shapes, measurement, proofs, area, and volume.'],
    ['Calculus Foundations', 'An approachable introduction to limits, rates of change, and derivatives.'],
  ] },
  { type: 'code', title: 'Computer Science', short: 'Code and create', body: 'Coding fundamentals, computational thinking, and beginner-friendly project work that turns ideas into something students can build.', materials: [
    ['Variables & Data', 'Store, update, and use information inside a program.'],
    ['Conditionals', 'Make programs respond differently when conditions change.'],
    ['Iteration', 'Use loops to repeat actions efficiently and recognize patterns.'],
    ['Abstraction', 'Break larger problems into reusable functions and manageable pieces.'],
    ['Projects & Debugging', 'Build small programs, test ideas, and learn how to fix errors.'],
  ] },
  { type: 'test', title: 'Test Prep', short: 'Recommended for eighth graders and high school students', body: 'SAT/ACT strategy, pacing, focused practice, and review for students preparing for these exams.', materials: [
    ['Math Review', 'Revisit high-impact concepts and practice choosing efficient methods.'],
    ['Reading Comprehension', 'Find evidence, identify main ideas, and understand passage structure.'],
    ['Grammar & Writing', 'Practice sentence structure, punctuation, clarity, and revision.'],
    ['Pacing Strategies', 'Budget time, prioritize questions, and recover when a section feels difficult.'],
    ['Practice & Review', 'Work through guided questions and turn mistakes into a study plan.'],
  ] },
];

const tutors = [
  {
    ...teamMembers.find((member) => member.name === 'Vedsai Maddu'),
    displayName: 'Ved Maddu',
    profileUrl: 'https://www.instagram.com/p/DaJo_PdEdon/',
    whyImage: whyVed,
  },
  {
    ...teamMembers.find((member) => member.name === 'Rishabh Dalal'),
    img: betterRishabhPhoto,
    displayName: 'Rishabh Dalal',
    profileUrl: 'https://www.instagram.com/p/DaJpfiQkf3B/',
    whyImage: whyRishabh,
  },
];

export default function CommunityClasses() {
  const reduceMotion = useReducedMotion();
  const [selectedTutor, setSelectedTutor] = useState(null);


  useEffect(() => {
    if (!selectedTutor) return undefined;
    const closeOnEscape = (event) => event.key === 'Escape' && setSelectedTutor(null);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedTutor]);

  return (
    <div className={styles.page}>
      <EditorialHero
        variant="community"
        eyebrow="Community Classes"
        title={<>Free tutoring built around useful practice.</>}
        description="A welcoming place for K–12 students to learn, ask questions, and build confidence with guidance from qualified student tutors."
        items={[
          { label: 'Sites', detail: 'Location and registration', href: '#class-sites' },
          { label: 'Class Details', detail: 'Subjects and learning approach', href: '#class-details' },
          { label: 'Meet Tutors', detail: 'The students leading sessions', href: '#meet-tutors' },
          { label: 'FAQ', detail: 'Answers for families', href: '#faq' },
        ]}
      />


      <section className={styles.overview} id="class-sites">
        <div className={styles.overviewInner}>
          <motion.header
            className={styles.scheduleHeader}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span>Sites &amp; scheduling</span>
            <h2>Start with a place that feels easy to reach.</h2>
            <p>See the current class sites, then tell us what subject support and session details would work best for your student.</p>
          </motion.header>
          <motion.div className={styles.locationCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className={`${styles.locationLead} ${styles.locationLeadWithLogo}`}>
              <img src={nationalIndiaHubLogo} alt="National India Hub" className={styles.siteLogo} />
              <div>
                <h2>National India Hub</h2>
                <p>930 National Pkwy<br />Schaumburg, Illinois<br />Weekly Wednesdays, 5–6 PM</p>
              </div>
            </div>
            <div className={styles.locationStatus}><i /> Enrolling now</div>
          </motion.div>

          <motion.div className={styles.locationCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className={styles.locationLead}>
              <span className={styles.eyebrow}>Current class site</span>
              <h2>Kenneth Young Center</h2>
              <p>650 E. Algonquin Rd., Suite 104<br />Schaumburg, IL</p>
            </div>
            <div className={`${styles.locationStatus} ${styles.notEnrolling}`}><i /> Not enrolling</div>
          </motion.div>

          <motion.div className={styles.locationCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }}>
            <div className={styles.locationLead}>
              <span className={styles.eyebrow}>Current class site</span>
              <h2>Alive Center</h2>
              <p>1211 Catalina Drive<br />Hanover Park<br />Every other Thursday, 4–5 PM</p>
            </div>
            <div className={`${styles.locationStatus} ${styles.notEnrolling}`}><i /> Not enrolling</div>
          </motion.div>

          <motion.div className={styles.registerCard} id="register" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.20 }}>
            <div><span className={styles.eyebrow}>National IndiaHub registration</span><h2>Tell us what support would help.</h2></div>
            <p>Registration is currently available only for National India Hub classes, held weekly on Wednesdays from 5–6 PM.</p>
            <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className={`${styles.registerBtn} cta-glow`}>Register for India Hub</a>
          </motion.div>
        </div>
      </section>


      <section className={styles.subjects} id="class-details">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}><span>What we cover</span><h2>Math, Computer Science, & SAT/ACT Prep</h2></div>
          <CurriculumExplorer subjects={subjects} applicationUrl={GOOGLE_FORM_URL} />
        </div>
      </section>


      <section className={styles.bring} id="what-to-bring" aria-labelledby="what-to-bring-title">
        <div className={`${styles.sectionInner} ${styles.bringInner}`}>
          <div className={styles.sectionHeader}>
            <span>Before your first class</span>
            <h2 id="what-to-bring-title">What do I need <em>to bring?</em></h2>
          </div>
          <ul className={styles.bringList}>
            <li><h3>The everyday basics</h3><p>Bring pencils or pens, an eraser, and a notebook or some paper.</p></li>
            <li><h3>A device, if you have one</h3><p>You’re welcome to bring your school-issued device, especially for Computer Science sessions.</p></li>
            <li><h3>No computer? We’ve got you.</h3><p>We can provide computers for students to use during class. Bringing your own device is optional.</p></li>
          </ul>
        </div>
      </section>

      <section className={styles.tutors} id="meet-tutors">
        <div className={styles.sectionInner}>
          <div className={styles.tutorLayout}>
            <motion.div className={styles.tutorIntroCopy} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className={styles.sectionHeader}>
                <span>Meet your tutors</span>
                <h2><strong>Learning feels easier</strong><b>with someone</b><em>on your side.</em></h2>
              </div>
              <p>Ved and Rishabh are academically strong student tutors with experience in advanced math, computer science, and SAT/ACT concepts. They bring both subject knowledge and patience to each session, helping students learn from peers who understand the material and know how to explain it clearly.</p>
              <div className={styles.tutorCredibility} aria-label="Tutor strengths">
                <span><i aria-hidden>✓</i> Advanced Math & CS Experience</span>
                <span><i aria-hidden>✓</i> Patient, Step-by-Step Support</span>
                <span><i aria-hidden>✓</i> Clear peer-to-peer teaching</span>
              </div>
            </motion.div>
            <div className={styles.tutorGrid}>
              {tutors.map((tutor, i) => (
                <motion.article key={tutor.name} onClick={() => setSelectedTutor(tutor)} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -6 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}>
                  <div className={styles.tutorPhotoWrap}><img src={tutor.img} alt={`${tutor.displayName}, Ascend-Ed tutor`} /></div>
                  <div className={styles.tutorCopy}><h3>{tutor.displayName}</h3><p>Co-Founder · Curriculum &amp; Community Outreach</p><button type="button" onClick={() => setSelectedTutor(tutor)}>Meet {tutor.displayName.split(' ')[0]} <span aria-hidden>&rarr;</span></button></div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {createPortal(<AnimatePresence>
        {selectedTutor && (
          <motion.div className={styles.tutorModalBackdrop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.24 }} onClick={() => setSelectedTutor(null)}>
            <motion.div className={styles.tutorModal} role="dialog" aria-modal="true" aria-label={`Why ${selectedTutor.displayName}`} initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.96 }} transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }} onClick={(event) => event.stopPropagation()}>
              <button className={styles.tutorModalClose} type="button" onClick={() => setSelectedTutor(null)} aria-label="Close tutor profile">&times;</button>
              <img src={selectedTutor.whyImage} alt={`Why ${selectedTutor.displayName} is an Ascend-Ed tutor`} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </div>
  );
}
