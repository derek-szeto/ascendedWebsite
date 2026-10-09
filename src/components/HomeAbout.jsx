import AboutPrinciples from './AboutPrinciples';
import TeamProfile from './TeamProfile';
import { motion } from 'framer-motion';
import { founders, otherMembers } from '../data/teamGroups';
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

function TeamCard({ member, index }) {
  const photo = photoOverrides[member.name] || member.img;
  const [firstName, ...lastName] = member.name.split(' ');

  return (
    <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}>
      <div className={styles.photo}>
        {photo ? <img src={photo} alt={member.name} style={{ objectPosition: member.photoPosition, objectFit: member.photoFit, scale: member.photoScale, transformOrigin: member.photoTransformOrigin }} /> : <span>{member.initials}</span>}
      </div>
      <div className={styles.cardCopy}>
        <h5>{firstName}{lastName.length > 0 && <><br />{lastName.join(' ')}</>}</h5>
        <p>{roles[member.name] || 'Team Member'}</p>
        <span className={styles.profileHint}>View profile ↗</span>
      </div>
      <TeamProfile member={member} photo={photo} role={roles[member.name] || 'Team Member'} />
    </motion.article>
  );
}

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
        <div className={styles.teamGroup}>
          <h4 className={styles.groupHeading}>Co-founders</h4>
          <div className={`${styles.team} ${styles.founderTeam}`}>
            {founders.map((member, index) => <TeamCard key={member.name} member={member} index={index} />)}
          </div>
        </div>
        <div className={`${styles.teamGroup} ${styles.memberGroup}`}>
          <h4 className={styles.groupHeading}>Team members</h4>
          <div className={`${styles.team} ${styles.memberTeam}`}>
            {otherMembers.map((member, index) => <TeamCard key={member.name} member={member} index={index} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
