import { motion } from 'framer-motion';
import { DONATE_URL } from '../data/siteLinks';
import styles from './Privacy.module.css';

const sections = [
  {
    title: 'Who we are',
    paragraphs: [
      'Ascend-Ed is a student-led education initiative based in Illinois. We accept donations through a fiscal sponsorship with National India Hub. This policy describes the Ascend-Ed website; services you reach through our links have their own privacy practices.',
    ],
  },
  {
    title: 'Donations and fiscal sponsorship',
    paragraphs: [
      <>Donate buttons open <a href={DONATE_URL} className={styles.policyLink}>National India Hub&apos;s donation page</a>. That page identifies Global Community Hub Foundation as the organization processing donations for National India Hub. To identify your donation for Ascend-Ed, enter <strong>Ascend</strong> in the Comment field.</>,
      'The donation page collects the details you provide there, including payment information. Ascend-Ed does not collect payment card details through this website. National India Hub may share donation records with us for accounting and responding to donor questions.',
    ],
  },
  {
    title: 'Store purchases',
    paragraphs: [
      'The store saves the products, sizes, and quantities in your cart in your browser’s local storage. This lets your cart remain available if you leave the page. The cart is cleared after a confirmed purchase, or you can clear it in your browser settings.',
      <>Checkout takes place on <a href="https://stripe.com/privacy" className={styles.policyLink}>Stripe</a>. Stripe collects the payment, contact, and shipping information needed for the purchase. Ascend-Ed can access order details needed to confirm your purchase, provide support, and coordinate local delivery or pickup. This website does not store complete payment card numbers.</>,
    ],
  },
  {
    title: 'Class registration and messages',
    paragraphs: [
      <>Class registration links open a Google Form. Information entered there, which may include student and parent or guardian details, is submitted to the form owner through Google, rather than to this website. A parent or guardian should complete registration for a minor. See <a href="https://policies.google.com/privacy" className={styles.policyLink}>Google&apos;s privacy policy</a> for Google&apos;s practices.</>,
      'If you email us, we receive your email address and the information in your message. We use it to respond to you and handle your request.',
    ],
  },
  {
    title: 'Website services and external links',
    paragraphs: [
      <>Our hosting provider, <a href="https://www.netlify.com/privacy/" className={styles.policyLink}>Netlify</a>, may process standard request information such as your IP address and browser details to deliver and secure this site. The site also loads Google Fonts. We do not provide user accounts or include our own advertising or analytics trackers in the site code.</>,
      'When you follow a link to National India Hub, Stripe, Google Forms, Instagram, or another external site, that service may use cookies or collect information under its own policies.',
    ],
  },
  {
    title: 'How we use and keep information',
    paragraphs: [
      'We use information available to Ascend-Ed to answer inquiries, help with class registration, fulfill store orders, and account for donations identified for Ascend-Ed. We may share it with our fiscal sponsor or service providers when needed for those purposes. We keep records as needed for these activities and applicable accounting or legal requirements; external services set their own retention periods.',
    ],
  },
  {
    title: 'Your choices and questions',
    paragraphs: [
      <>You can clear your store cart in your browser settings. To ask about information Ascend-Ed controls, or request access, correction, or deletion where applicable, email <a href="mailto:future.ascended@gmail.com" className={styles.policyLink}>future.ascended@gmail.com</a>. Some records may need to be kept for accounting or legal reasons. For information held by an external service, contact that service directly.</>,
    ],
  },
  {
    title: 'Changes to this policy',
    paragraphs: [
      'We may update this policy as our practices change. The date above will show when this page was last revised.',
    ],
  },
];

export default function Privacy() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <motion.div
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Legal
          </motion.div>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            className={styles.meta}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Last updated October 9, 2026
          </motion.p>
        </div>
      </div>


      <div className={styles.body}>
        <div className={styles.bodyInner}>
          {sections.map((s, i) => (
            <motion.section
              key={s.title}
              className={styles.section}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <h2 className={styles.sectionTitle}>{s.title}</h2>
              {s.paragraphs.map((paragraph, index) => (
                <p className={styles.sectionBody} key={index}>{paragraph}</p>
              ))}
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
