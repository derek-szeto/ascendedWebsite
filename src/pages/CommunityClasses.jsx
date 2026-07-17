import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import EditorialHero from '../components/EditorialHero';
import { teamMembers } from '../data/teamMembers';
import betterRishabhPhoto from '../assets/betterrishabh.jpg';
import whyRishabh from '../assets/Why Rishabh.png';
import whyVed from '../assets/Why Ved.png';
import styles from './CommunityClasses.module.css';

const GOOGLE_FORM_URL = 'https://forms.gle/mpEKmmc7Ao15dMo39';

const subjects = [
  { num: '01', type: 'math', title: 'Math', short: 'Foundations and confidence', body: 'Foundational support, problem solving, and guided practice for students who want to feel steadier and more confident with math.', materials: [
    ['Arithmetic Foundations', 'Operations, fractions, decimals, percentages, and number sense.'],
    ['Pre-Algebra', 'Expressions, equations, ratios, proportions, and graphing fundamentals.'],
    ['Algebra I', 'Linear equations, inequalities, functions, systems, and polynomials.'],
    ['Geometry', 'Angles, shapes, measurement, proofs, area, and volume.'],
    ['Calculus Foundations', 'An approachable introduction to limits, rates of change, and derivatives.'],
  ] },
  { num: '02', type: 'code', title: 'Computer Science', short: 'Code and create', body: 'Coding fundamentals, computational thinking, and beginner-friendly project work that turns ideas into something students can build.', materials: [
    ['Variables & Data', 'Store, update, and use information inside a program.'],
    ['Conditionals', 'Make programs respond differently when conditions change.'],
    ['Iteration', 'Use loops to repeat actions efficiently and recognize patterns.'],
    ['Abstraction', 'Break larger problems into reusable functions and manageable pieces.'],
    ['Projects & Debugging', 'Build small programs, test ideas, and learn how to fix errors.'],
  ] },
  { num: '03', type: 'test', title: 'Test Prep', short: 'Practice with a plan', body: 'Strategy, pacing, focused practice, and review designed to make assessments feel more familiar and manageable.', materials: [
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

function SubjectIcon({ type }) {
  const props = { className: `${styles.subjectIcon} ${styles[`${type}Icon`]}`, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': true };

  if (type === 'code') {
    return <svg {...props}><path d="M4 5.5h16v10.2H4V5.5Z" /><path d="M9 19h6M12 15.7V19" /><path d="m9.2 9.2-2 2 2 2m5.6-4 2 2-2 2m-1.9-4.5-1.8 5" /></svg>;
  }
  if (type === 'test') {
    return <svg {...props}><path d="M7 4.8h10c.9 0 1.6.7 1.6 1.6v12.3c0 .9-.7 1.6-1.6 1.6H7c-.9 0-1.6-.7-1.6-1.6V6.4c0-.9.7-1.6 1.6-1.6Z" /><path d="M9.2 3.7h5.6v2.6H9.2V3.7ZM8.7 10.4h6.6M8.7 14h6.6M8.7 17.4h3.8" /></svg>;
  }
  return <svg {...props}><g className={styles.mathPlus}><path d="M7 4.5v6M4 7.5h6" /></g><g className={styles.mathMinus}><path d="M14 7.5h6" /></g><g className={styles.mathMultiply}><path d="m4.9 14.2 4.2 4.2m0-4.2-4.2 4.2" /></g><g className={styles.mathDivide}><path d="M14 16.3h6" /><circle cx="17" cy="13.5" r=".65" fill="currentColor" stroke="none" /><circle cx="17" cy="19.1" r=".65" fill="currentColor" stroke="none" /></g></svg>;
}

export default function CommunityClasses() {
  const reduceMotion = useReducedMotion();
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [activeSubject, setActiveSubject] = useState(0);

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
        title={<>Free tutoring built around <em>useful practice.</em></>}
        description="A welcoming place for K–8 students to learn, ask questions, and build confidence with guidance from student tutors."
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
            <h2>Start with a place that feels <em>easy to reach.</em></h2>
            <p>See the current class location, then tell us what subject support and session details would work best for your student.</p>
          </motion.header>
          <motion.div className={styles.locationCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className={styles.locationLead}>
              <span className={styles.eyebrow}>Current class site</span>
              <h2>National India Hub</h2>
              <p>930 National Pkwy<br />Schaumburg, Illinois</p>
            </div>
            <div className={styles.locationMeta}>
              <span><b>Format</b> In-person, small-group tutoring</span>
              <span><b>Grades</b> K–8 students</span>
              <span><b>Cost</b> Free</span>
            </div>
            <div className={styles.locationStatus}><i /> Now enrolling</div>
          </motion.div>

          <motion.div className={styles.registerCard} id="register" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }}>
            <div><span className={styles.eyebrow}>Ready to begin?</span><h2>Tell us what support would help.</h2></div>
            <p>Complete the short intake form. We&apos;ll use your responses to help organize the right subject support and share confirmed session details.</p>
            <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className={`${styles.registerBtn} cta-glow`}>Register for classes <span aria-hidden>&rarr;</span></a>
          </motion.div>
        </div>
      </section>


      <section className={styles.subjects} id="class-details">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}><span>What we cover</span><h2>Three focus areas. Plenty of room to <em>ask questions.</em></h2></div>
          <div className={styles.subjectGrid} role="tablist" aria-label="Class subjects">
            {subjects.map((subject, i) => (
              <motion.article className={`${styles[`subjectCard${i + 1}`]} ${activeSubject === i ? styles.subjectCardActive : ''}`} key={subject.title} role="tab" tabIndex={activeSubject === i ? 0 : -1} aria-selected={activeSubject === i} aria-controls="subject-materials" onClick={() => setActiveSubject(i)} onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && setActiveSubject(i)} initial={reduceMotion ? false : { opacity: 0, y: 28, rotate: i === 1 ? 1 : -1 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} whileHover={reduceMotion ? undefined : { y: -7, scale: 1.012 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}>
                <span className={styles.subjectNum}>{subject.num}</span>
                <motion.div className={styles.iconTile} animate={reduceMotion ? undefined : { y: [0, -5, 0], rotate: [0, i === 1 ? 2 : -2, 0] }} transition={{ duration: 3.2 + i * .3, repeat: Infinity, ease: 'easeInOut' }}><SubjectIcon type={subject.type} /></motion.div>
                <h3>{subject.title}</h3>
                <strong>{subject.short}</strong>
                <p>{subject.body}</p>
              </motion.article>
            ))}
          </div>
          <div className={styles.materialBrowser} id="subject-materials" role="tabpanel" aria-live="polite">
            <div className={styles.materialBrowserHeader}>
              <motion.div className={styles.materialBrowserIcon} key={subjects[activeSubject].type} initial={reduceMotion ? false : { scale: .72, rotate: -8, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }}><SubjectIcon type={subjects[activeSubject].type} /></motion.div>
              <span>Explore the curriculum · {subjects[activeSubject].num}</span>
              <h3><em>{subjects[activeSubject].title}</em><span>Material</span></h3>
              <p>Select any subject above to see the concepts students can work through with their tutor.</p>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div className={styles.materialList} key={subjects[activeSubject].title} initial={reduceMotion ? false : { opacity: 0, x: 32, clipPath: 'inset(0 0 0 18%)' }} animate={{ opacity: 1, x: 0, clipPath: 'inset(0 0 0 0%)' }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -22, clipPath: 'inset(0 18% 0 0)' }} transition={{ duration: reduceMotion ? 0 : .42, ease: [0.22, 1, 0.36, 1] }}>
                {subjects[activeSubject].materials.map(([title, detail], index) => (
                  <motion.div className={styles.materialRow} key={title} initial={reduceMotion ? false : { opacity: 0, x: 24, scale: .985 }} animate={{ opacity: 1, x: 0, scale: 1 }} whileHover={reduceMotion ? undefined : { x: 7 }} transition={{ delay: reduceMotion ? 0 : .08 + index * .065, duration: .36, ease: [0.22, 1, 0.36, 1] }}>
                    <span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><p>{detail}</p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>


      <section className={styles.tutors} id="meet-tutors">
        <div className={styles.sectionInner}>
          <div className={styles.tutorLayout}>
            <motion.div className={styles.tutorIntroCopy} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className={styles.sectionHeader}>
                <span>Meet your tutors</span>
                <h2><strong>Learning feels easier</strong><b>with someone</b><em>in your corner.</em></h2>
              </div>
              <p>Ved and Rishabh lead our community classes with a focus on useful practice, clear explanations, and space for every student to ask questions.</p>
            </motion.div>
            <div className={styles.tutorGrid}>
              {tutors.map((tutor, i) => (
                <motion.article key={tutor.name} onClick={() => setSelectedTutor(tutor)} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -6 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}>
                  <div className={styles.tutorPhotoWrap}><img src={tutor.img} alt={`${tutor.displayName}, Ascend-Ed tutor`} /></div>
                  <div className={styles.tutorCopy}><span>Main tutor</span><h3>{tutor.displayName}</h3><p>Co-Founder · Curriculum &amp; Community Outreach</p><button type="button" onClick={() => setSelectedTutor(tutor)}>Meet {tutor.displayName.split(' ')[0]} <span aria-hidden>&rarr;</span></button></div>
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
