import AboutPrinciples from './AboutPrinciples';
import TeamProfile from './TeamProfile';
import { motion } from 'framer-motion';
import { teamMembers } from '../data/teamMembers';
import derekPhoto from '../assets/dereknew.png';
import rishabhPhoto from '../assets/betterrishabh.jpg';
import styles from './HomeAbout.module.css';

const roles = {
  'Aarush Bharthepudi': 'Co-Founder & Director',
  'Derek Szeto': 'Co-Founder · Lead Developer & Social Media',
  'Rishabh Dalal': 'Co-Founder · Curriculum & Community Outreach',
  'Vedsai Maddu': 'Co-Founder · Curriculum & Community Outreach',
  'Miles Mantasoot': 'Co-Founder · Social Media & Graphic Design',
  'Dhruv Dayeneni': 'Tutor & Incoming Director',
  'Martin Choi': 'Tutor',
  'Avanish Rajesh': 'Marketing Director',
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
              <span className={styles.titleLead}>High school students</span>
              <span className={styles.titleFollow}>who couldn&rsquo;t ignore the education gap.</span>
            </h2>
          </motion.header>
          <motion.div className={styles.storyCopy} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }}>
            <p>We started Ascend-Ed after learning how much a student&apos;s school resources can depend on where they live. In some Illinois communities, that difference can exceed $12,000 per student each year.</p>
            <p>Our work is grounded in practical action: expanding access to learning, raising funds responsibly, and providing support where it can make the most meaningful difference.</p>
          </motion.div>
        </div>

        <AboutPrinciples />

        <div className={styles.teamHeader}>
          <span>Student-led team</span>
          <h3>The people moving it forward.</h3>
        </div>
        {[teamMembers.slice(0, 6), teamMembers.slice(6)].map((members, groupIndex) => (
        <div key={groupIndex} className={`${styles.team} ${groupIndex === 1 ? styles.newMembers : ''}`}>
          {members.map((member, index) => {
            const photo = photoOverrides[member.name] || member.img;
            return (
              <motion.article key={member.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}>
                <div className={styles.photo}>
                  {photo ? <img src={photo} alt={member.name} style={{ objectPosition: member.photoPosition, objectFit: member.photoFit, scale: member.photoScale }} /> : <span>{member.initials}</span>}
                </div>
                <div><h4>{member.name === 'Derek Szeto' ? <>Derek<br />Szeto</> : member.name === 'Martin Choi' ? <>Martin<br />Choi</> : member.name}</h4><p>{roles[member.name] || 'Team Member'}</p><span className={styles.profileHint}>View profile ↗</span></div>
                <TeamProfile member={member} photo={photo} role={roles[member.name] || 'Team Member'} />
              </motion.article>
            );
          })}
        </div>
        ))}
      </div>
    </section>
  );
}
