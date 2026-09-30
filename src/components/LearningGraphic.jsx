import styles from './LearningGraphic.module.css';

export default function LearningGraphic({ subjects, Icon }) {
  return (
    <div className={styles.graphic}>
      <span className={styles.eyebrow}>What we cover</span>
      <div className={styles.journey}>
        <svg className={styles.branch} viewBox="0 0 110 450" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path className={styles.stem} d="M40 75C40 150 60 150 60 225S40 300 40 375" />
          <path className={styles.leaf} d="M49 152c-23 0-30-17-29-31 22 2 33 12 29 31ZM52 300c22-2 33-17 32-32-24 4-36 17-32 32Z" />
          <circle className={styles.seed} cx="40" cy="75" r="5" />
          <circle className={styles.seed} cx="60" cy="225" r="5" />
          <circle className={styles.seed} cx="40" cy="375" r="5" />
        </svg>
        {subjects.map((subject) => (
          <div className={`${styles.subject} ${subject.icon === 'test' ? styles.test : ''}`} key={subject.icon}>
            <span className={styles.icon}><Icon type={subject.icon} /></span>
            <div className={styles.copy}>
              <h3>{subject.label}</h3>
              <p>{subject.summary}</p>
            </div>
          </div>
        ))}
      </div>
      <svg className={styles.flourish} viewBox="0 0 100 100" fill="none" aria-hidden="true"><path d="M8 92C25 55 50 25 92 8M28 59c-16-4-20-17-16-30 17 6 22 16 16 30ZM51 35c1-18 14-25 30-25-3 17-14 27-30 25Z" /></svg>
    </div>
  );
}
