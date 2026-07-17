import { motion } from 'framer-motion';
import Marquee from '../components/Marquee';
import EditorialHero from '../components/EditorialHero';
import { teamMembers } from '../data/teamMembers';
import derekPhoto from '../assets/derek.jpg';
import rishabhPhoto from '../assets/rishabh.jpg';
import styles from './About.module.css';

const principles = [
  {
    label: 'Student-run',
    title: 'Built by people close to the problem',
    body: 'We are students organizing around a gap we could not unsee, then turning that concern into classes, fundraising, and direct support.',
  },
  {
    label: 'Transparency',
    title: 'Supporters should see where money goes',
    body: 'No hidden cut, no vague promise. We track what comes in and post public breakdowns so the work stays accountable.',
  },
  {
    label: 'Illinois-focused',
    title: 'Local action for a statewide issue',
    body: 'The funding gap reaches beyond one city. Our work stays focused on students and trusted education organizations in Illinois.',
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

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }),
};

const onTiltMove = (e) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
  el.style.transition = 'transform 0.08s ease, box-shadow 0.08s ease';
  el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg)`;
  el.style.boxShadow = `${-x * 1.2}px ${y * 1.2}px 28px rgba(9,70,27,0.22)`;
};

const onTiltLeave = (e) => {
  const el = e.currentTarget;
  el.style.transition = 'transform 0.45s ease, box-shadow 0.45s ease';
  el.style.transform = '';
  el.style.boxShadow = '';
};

export default function About() {
  return (
    <div className={`${styles.page} subpage-theme`}>
      <EditorialHero
        chapter="03"
        eyebrow="About Ascend-Ed"
        title={<>Five students. One state. <em>A gap we couldn&apos;t ignore.</em></>}
        description="We built Ascend-Ed to turn concern into useful local action—community classes, transparent fundraising, and direct support for education access."
        items={principles.map((item) => ({ label: item.label, detail: item.title }))}
      />
      <Marquee variant="light" />


      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className={styles.pageLabel}
        >
          About Us
        </motion.div>

        <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className={styles.title}
            >
              Why we decided to act.
            </motion.h2>

            {[
              'We started Ascend-Ed in fall 2025 after learning how much a student\'s school resources can depend on where they live. In some Illinois communities, that difference can be more than $12,000 per student each year.',
              'Ascend-Ed is student-run. We do not keep a cut. No staff. No overhead. What we raise goes to trusted education organizations in Illinois that are already working on the issue, and we post public breakdowns so supporters can see where the money goes.',
            ].map((text, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={fadeIn}
                initial="hidden"
                animate="show"
                className={styles.para}
              >
                {text}
              </motion.p>
            ))}

            <section className={styles.principles}>
              <motion.div
                className={styles.principlesHeader}
                variants={fadeIn}
                custom={3}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <span>How we work</span>
                <h3>Small team. Clear rules. <em>Public accountability.</em></h3>
              </motion.div>
              <div className={styles.principlesGrid}>
                {principles.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className={styles.principleCard}
                    variants={fadeIn}
                    custom={i + 4}
                    initial="hidden"
                    whileInView="show"
                    whileHover={{ y: -5 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <span className={styles.principleLabel}>{item.label}</span>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Team grid */}
            <motion.div
              custom={7}
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={styles.teamIntro}
            >
              <span>Student-led team</span>
              <strong>The people moving it forward.</strong>
            </motion.div>
            <div className={styles.teamGrid}>
              {teamMembers.map((member, i) => {
                const photo = photoOverrides[member.name] || member.img;
                const photoClassName = `${styles.teamPhoto} ${
                  member.name === 'Rishabh Dalal' ? styles.rishabhPhoto : ''
                }`;

                return (
                  <motion.div
                    key={member.name}
                    custom={i + 4}
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="show"
                    whileHover={{ y: -3 }}
                    viewport={{ once: true, amount: 0.25 }}
                    className={styles.teamCard}
                    onMouseMove={onTiltMove}
                    onMouseLeave={onTiltLeave}
                  >
                    <div className={styles.teamPhotoWrap}>
                      {photo ? (
                        <img
                          src={photo}
                          alt={member.name}
                          className={photoClassName}
                        />
                      ) : (
                        <div className={styles.teamInitial}>{member.initials}</div>
                      )}
                    </div>
                    <div className={styles.teamInfo}>
                      <div className={styles.teamName}>{member.name}</div>
                      <div className={styles.teamRole}>{roles[member.name] || 'Team Member'}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
        </div>
      </div>
    </div>
  );
}
