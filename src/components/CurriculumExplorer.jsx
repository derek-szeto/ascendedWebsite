import { useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './CurriculumExplorer.module.css';

function SubjectIcon({ type }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {type === 'math' && <><path d="M4 7h6M7 4v6M15 7h5M5 15l4 4m0-4-4 4M15 17h5" /><circle cx="17.5" cy="13.5" r=".8" fill="currentColor" stroke="none" /><circle cx="17.5" cy="20.5" r=".8" fill="currentColor" stroke="none" /></>}
      {type === 'code' && <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="m9 8-2 2 2 2m6-4 2 2-2 2M12 17v3m-4 0h8" /></>}
      {type === 'test' && <><rect x="5" y="4" width="14" height="17" rx="2" /><rect x="9" y="2" width="6" height="4" rx="1" /><path d="m8 11 1 1 2-2m2 1h3m-8 5 1 1 2-2m2 1h3" /></>}
    </svg>
  );
}

export default function CurriculumExplorer({ subjects, applicationUrl }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const reduceMotion = useReducedMotion();
  const subject = subjects[active];

  const changeWithKeyboard = (event, index) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % subjects.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + subjects.length) % subjects.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = subjects.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    event.currentTarget.parentElement.children[next].focus();
  };

  return (
    <div className={styles.explorer}>
      <p className={styles.intro}>Our student tutors bring advanced coursework and a patient, practical approach. Explore a subject to see what you can work on together.</p>
      <div className={styles.tabs} role="tablist" aria-label="Explore subjects">
        {subjects.map((item, index) => (
          <button key={item.type} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => changeWithKeyboard(event, index)}>
            <span className={styles.tabIcon}><SubjectIcon type={item.type} /></span>
            {item.title}
          </button>
        ))}
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} tabIndex={0} className={styles.panel}>
        <motion.div key={subject.type} className={styles.layout} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25 }}>
          <div className={styles.overview}>
            <span className={styles.kicker}>{subject.short}</span>
            <h3>{subject.title}</h3>
            <p>{subject.body}</p>
            {subject.audience && <p className={styles.audience}>{subject.audience}.</p>}
            <div className={styles.note}>
              <svg aria-hidden="true" className={styles.noteMark} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M5.6 18.4 18.4 5.6" /></svg>
              <p>Start where you are.<br />Choose the topics you want to strengthen with your tutor.</p>
            </div>
          </div>
          <div className={styles.topics}>
            <h4>What we can work on</h4>
            <ul>
              {subject.materials.map(([title, detail]) => (
                <li key={title}>
                  <h5>{title}</h5>
                  <p>{detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
      <div className={styles.apply}>
        <div><h4>Let’s find your starting point.</h4><p>National India Hub is enrolling now. Tell us what you’d like help with.</p></div>
        <a href={applicationUrl} target="_blank" rel="noopener noreferrer">Register Now</a>
      </div>
    </div>
  );
}
