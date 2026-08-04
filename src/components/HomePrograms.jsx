import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './HomePrograms.module.css';

const programs = [
  {
    icon: 'classes',
    title: 'Community Classes',
    desc: 'Free tutoring in math, computer science, and SAT/ACT prep at Ascend-Ed class-site grounds, built to make academic support easier to reach. Any money raised from classes goes back toward supporting education access in Illinois.',
    tone: 'white',
    action: 'classes',
  },
  {
    icon: 'events',
    title: 'Fundraising Events',
    desc: 'Student-run fundraisers that turn community support into real help for Illinois students, with clear tracking so supporters know exactly where the money goes.',
    badge: 'Coming Summer 2026',
    tone: 'white',
    action: 'events',
  },
  {
    icon: 'store',
    title: 'Merch & Online Store',
    desc: 'Ascend-Ed Merch designed to spread the mission and raise money for education access.',
    tone: 'white',
    action: 'store',
  },
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

  const scrollToSection = (id) => {
    navigate(`/#${id}`);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const openProgram = (action) => {
    if (action === 'classes') scrollToSection('classes');
    else if (action === 'events') scrollToSection('donate');
    else if (action === 'store') window.open('https://futureascended.myshopify.com', '_blank', 'noopener,noreferrer');
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
        </div>

        <div className={styles.programList}>
          {programs.map((program, index) => (
            <motion.article
              key={program.title}
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
              <div className={styles.programLead}><span className={styles.icon}><ProgramIcon type={program.icon}/></span></div>
              <div className={styles.programCopy}><h3>{program.title}</h3><p>{program.desc}</p></div>
              <div className={styles.programAction}><b aria-hidden>&rarr;</b></div>
            </motion.article>
          ))}
        </div>

        <motion.div className={styles.cta} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div><span>Want to help us Grow?</span><h2>Programs get stronger when <em>more people show up.</em></h2></div>
          <button onClick={() => scrollToSection('get-involved')}>Get involved <span aria-hidden>&rarr;</span></button>
        </motion.div>
      </div>
    </section>
  );
}
