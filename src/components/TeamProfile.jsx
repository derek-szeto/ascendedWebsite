import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './TeamProfile.module.css';

function ProfileDialog({ member, photo, role, onClose }) {
  const dialog = useRef(null);
  const titleId = useId();
  const [isClosing, setIsClosing] = useState(false);
  const qualifications = member.qualifications || [];
  const contact = member.contact || {};
  const close = () => setIsClosing(true);

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  return createPortal(
    <dialog ref={dialog} className={`${styles.dialog} ${isClosing ? styles.closing : ''}`} aria-labelledby={titleId}
      onAnimationEnd={(event) => {
        if (isClosing && event.target === event.currentTarget) onClose();
      }}
      onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}>
      <div className={styles.content}>
        <button type="button" className={styles.close} onClick={close} aria-label="Close profile">×</button>
        {photo ? <div className={styles.photoWrap}><img className={styles.photo} src={photo} alt={member.name} style={{ objectPosition: member.photoPosition, objectFit: member.photoFit, scale: member.photoScale }} /></div> : <div className={styles.initials}>{member.initials}</div>}
        <div className={styles.details}>
          <span className={styles.eyebrow}>Meet the team</span>
          <h2 id={titleId}>{member.name}</h2>
          <p className={styles.role}>{role}</p>
          {member.bio && <p className={styles.bio}>{member.bio}</p>}
          <section className={styles.infoSection} aria-label="Qualifications">
            <h3>Qualifications</h3>
            {qualifications.length > 0 ? (
              <ul className={styles.qualifications}>{qualifications.map((qualification) => <li key={qualification}>{qualification}</li>)}</ul>
            ) : <p className={styles.placeholder}>Qualifications coming soon.</p>}
          </section>
          <section className={styles.infoSection} aria-label="Contact information">
            <h3>Get in touch</h3>
            {contact.email || contact.linkedin ? (
              <div className={styles.contactLinks}>
                {contact.email && <a href={`mailto:${contact.email}`}><span>Email</span><span>{contact.email} ↗</span></a>}
                {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"><span>LinkedIn</span><span>View profile ↗</span></a>}
              </div>
            ) : <p className={styles.placeholder}>Contact details coming soon.</p>}
          </section>
        </div>
      </div>
    </dialog>, document.body,
  );
}

export default function TeamProfile({ member, photo, role }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button type="button" className={styles.trigger} aria-label={`View ${member.name}'s profile`} aria-haspopup="dialog" onClick={() => setIsOpen(true)} />
      {isOpen && <ProfileDialog member={member} photo={photo} role={role} onClose={() => setIsOpen(false)} />}
    </>
  );
}
