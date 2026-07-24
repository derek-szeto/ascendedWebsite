import { motion } from 'framer-motion';
import { teamMembers } from '../data/teamMembers';
import derekPhoto from '../assets/derek.jpg';
import rishabhPhoto from '../assets/betterrishabh.jpg';
import styles from './HomeAbout.module.css';

const principles = [
  {
    title: 'Student-led',
    body: 'Decisions stay close to students. We test ideas quickly, listen to families, and keep the work practical.',
  },
  {
    title: 'Transparent',
    body: 'Every contribution stays visible. Public breakdowns connect what comes in to where it goes.',
  },
  {
    title: 'Illinois-Focused',
    body: 'Ascend-Ed is built locally, aimed statewide. We begin with nearby communities and direct support toward education access across Illinois.',
  },
];

const roles = {
  'Aarush Bharthepudi': 'Co-Founder & Director',
  'Derek Szeto': 'Co-Founder · Lead Developer & Social Media',
  'Rishabh Dalal': 'Co-Founder · Curriculum & Community Outreach',
  'Vedsai Maddu': 'Co-Founder · Curriculum & Community Outreach',
  'Miles Mantasoot': 'Co-Founder · Social Media & Graphic Design',
};

const photoOverrides = {
  'Derek Szeto': derekPhoto,
  'Rishabh Dalal': rishabhPhoto,
};

export default function HomeAbout() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.word} aria-hidden>ABOUT</div>
      <div className={styles.inner}>
        <div className={styles.story}>
          <motion.header initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className={styles.eyebrow}>About Ascend-Ed</span>
            <h2>
              <span className={styles.titleLead}>Five students. One state.</span>
              <em className={styles.titleAccent}>A gap that we couldn&rsquo;t ignore.</em>
            </h2>
          </motion.header>
          <motion.div className={styles.storyCopy} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }}>
            <p>We started Ascend-Ed after learning how much a student&apos;s school resources can depend on where they live. In some Illinois communities, that difference can exceed $12,000 per student each year.</p>
            <p>Our work is grounded in practical action: expanding access to learning, raising funds responsibly, and providing support where it can make the most meaningful difference.</p>
          </motion.div>
        </div>

        <div className={styles.principles}>
          {principles.map((principle, index) => (
            <motion.article key={principle.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -5 }} viewport={{ once: true }} transition={{ delay: index * .08 }}>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </motion.article>
          ))}
        </div>

        <div className={styles.teamHeader}>
          <span>Student-led team</span>
          <h3>The people <em>moving it forward.</em></h3>
        </div>
        <div className={styles.team}>
          {teamMembers.map((member, index) => {
            const photo = photoOverrides[member.name] || member.img;
            return (
              <motion.article key={member.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}>
                <div className={styles.photo}>
                  {photo ? <img src={photo} alt={member.name} /> : <span>{member.initials}</span>}
                </div>
                <div><h4>{member.name}</h4><p>{roles[member.name] || 'Team Member'}</p></div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
