import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Modal from './Modal';
import styles from './HomePrograms.module.css';

const modalContent = {
  title: 'Fundraising Events',
  body: 'We are planning student-led fundraising events for summer 2026. Dates and details are still being finalized, and all revenue will be tracked publicly and donated in full.',
};

const programs = [
  {
    num: '01',
    icon: 'classes',
    title: 'Community Classes',
    desc: 'Free and low-cost tutoring in math, computer science, and SAT/ACT prep at Ascend-Ed class-site grounds, built to make academic support easier to reach. Any money raised from classes goes back toward supporting education access in Illinois.',
    tone: 'white',
    action: 'classes',
  },
  {
    num: '02',
    icon: 'events',
    title: 'Fundraising Events',
    desc: 'Student-run fundraisers that turn community support into real help for Illinois students, with clear tracking so supporters know exactly where the money goes.',
    badge: 'Coming Summer 2026',
    tone: 'mint',
    action: 'events',
  },
  {
    num: '03',
    icon: 'store',
    title: 'Merch & Online Store',
    desc: 'Merch designed to spread the mission and raise money for education access.',
    badge: 'Coming Soon',
    tone: 'gold',
    action: 'store',
  },
];

const programFlow = [
  { label: 'Learn', text: 'Classes at our site grounds' },
  { label: 'Gather', text: 'Student-led events' },
  { label: 'Give', text: 'Support tracked publicly' },
];

function ProgramIcon({ type }) {
  if (type === 'events') {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 18.5V8.5C5 7.1 6.1 6 7.5 6H19v12.5H5Z"/><path d="M8 6V4.8c0-.8.6-1.4 1.4-1.4h7"/><path d="M10.4 14.8c1.9 0 3.4-1 3.4-2.3s-1.5-2.3-3.4-2.3-3.4 1-3.4 2.3 1.5 2.3 3.4 2.3Z"/><path d="M7 12.5v2.2c0 1.3 1.5 2.3 3.4 2.3s3.4-1 3.4-2.3v-2.2"/></svg>;
  }
  if (type === 'store') {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden><path d="M4 5h2.2l1.4 9.2c.1.8.8 1.3 1.6 1.3h7.5c.7 0 1.3-.4 1.5-1.1L20 8H7"/><path d="M9.2 19.2h.1M16.8 19.2h.1M9 11h8.8"/></svg>;
  }
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden><path d="M4 6.5c1.6-.7 3.4-.7 5 0 1.6.7 3.4.7 5 0 1.6-.7 3.4-.7 5 0v11c-1.6-.7-3.4-.7-5 0-1.6.7-3.4.7-5 0-1.6-.7-3.4-.7-5 0v-11Z"/><path d="M9 6.5v11M14 6.5v11M16.5 5 18.8 2.7l1.5 1.5L18 6.5l-1.8.5.3-2Z"/></svg>;
}

export default function HomePrograms() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const openProgram = (action) => {
    if (action === 'classes') navigate('/#classes');
    else if (action === 'store') navigate('/store');
    else setModalOpen(true);
  };

  return (
    <section className={styles.section} id="programs">
      <div className={styles.inner}>
        <div className={styles.modelIntro}>
          <motion.header className={styles.header} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span>Three Programs. One Mission</span>
          <h2>How we’re expanding <em>access to education</em></h2>
          <p>Each program is built to be useful on its own and stronger together. The goal is to make support easy to join, easy to understand, and easy to trust. We show how the mission becomes action.</p>
        </motion.header>

        <div className={styles.flow}>
          {programFlow.map((item, index) => (
            <motion.article key={item.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <small>0{index + 1}</small><h3>{item.label}</h3><p>{item.text}</p>
            </motion.article>
          ))}
        </div>
        </div>

        <div className={styles.programList}>
          {programs.map((program, index) => (
            <motion.article
              key={program.num}
              className={`${styles.program} ${styles[program.tone]}`}
              role="button"
              tabIndex={0}
              onClick={() => openProgram(program.action)}
              onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && openProgram(program.action)}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className={styles.programLead}><small>{program.num}</small><span className={styles.icon}><ProgramIcon type={program.icon}/></span></div>
              <div className={styles.programCopy}><h3>{program.title}</h3><p>{program.desc}</p></div>
              <div className={styles.programAction}>{program.badge && <span>{program.badge}</span>}<b aria-hidden>&rarr;</b></div>
            </motion.article>
          ))}
        </div>

        <motion.div className={styles.cta} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div><span>Want to help build one?</span><h2>Programs get stronger when <em>more people show up.</em></h2></div>
          <button onClick={() => navigate('/get-involved')}>Get involved <span aria-hidden>&rarr;</span></button>
        </motion.div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalContent.title} body={modalContent.body}/>
    </section>
  );
}
