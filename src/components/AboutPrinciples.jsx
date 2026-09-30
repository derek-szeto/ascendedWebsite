import styles from './AboutPrinciples.module.css';

const ideas = [
  'Students lead the way. We listen to families, test ideas quickly, and turn their needs into practical action.',
  'Every contribution has a clear path. Public breakdowns show what comes in and exactly where it goes.',
  'Our work starts close to home and reaches across Illinois, expanding education access one community at a time.',
];

function Illustration({ index }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className={styles.illustration}>
      <circle cx="60" cy="60" r="53" className={styles.halo} />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {index === 0 && <>
          <circle cx="60" cy="35" r="9" />
          <circle cx="34" cy="44" r="7" />
          <circle cx="86" cy="44" r="7" />
          <path d="M44 62c0-9 7-15 16-15s16 6 16 15M22 69v-4c0-8 5-13 12-13M98 69v-4c0-8-5-13-12-13" />
          <path d="M60 73c-8-7-18-9-29-7v23c11-2 21 0 29 7 8-7 18-9 29-7V66c-11-2-21 0-29 7Zm0 0v23" />
          <path d="m39 75 12 4m-12 4 12 4m18-8 12-4m-12 12 12-4" opacity=".45" />
        </>}
        {index === 1 && <>
          <circle cx="60" cy="60" r="34" />
          <circle cx="60" cy="60" r="27" opacity=".35" />
          <path d="M69 47c-3-3-6-4-10-4-6 0-10 3-10 8 0 5 5 7 11 9s11 4 11 10c0 5-5 8-12 8-5 0-9-2-12-5M60 37v46" />
          <path d="M22 45v30m-5-5 5 5 5-5M98 75V45m-5 5 5-5 5 5" opacity=".5" />
        </>}
        {index === 2 && <>
          <ellipse cx="60" cy="86" rx="36" ry="13" opacity=".3" />
          <ellipse cx="60" cy="86" rx="22" ry="7" opacity=".4" />
          <path d="M82 47c0 18-22 37-22 37S38 65 38 47a22 22 0 1 1 44 0Z" />
          <path d="m60 36 3.5 7 7.5 1-5.5 5.5 1.3 7.5-6.8-3.6-6.8 3.6 1.3-7.5L49 44l7.5-1Z" />
          <circle cx="24" cy="70" r="3" /><circle cx="96" cy="70" r="3" />
        </>}
      </g>
    </svg>
  );
}

export default function AboutPrinciples() {
  return (
    <div className={styles.graphic} id="our-principles" role="group" aria-label="How Ascend-Ed works">
      <div className={styles.connection} aria-hidden="true" />
      {ideas.map((idea, index) => (
        <div className={styles.idea} key={idea}>
          <Illustration index={index} />
          <p>{idea}</p>
        </div>
      ))}
    </div>
  );
}
