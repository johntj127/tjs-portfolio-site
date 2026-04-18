import React from 'react'
import styles from './Contact.module.css'
import MapField from '../components/MapField/MapField'

export default function Contact() {
  return (
    <div className={styles.contact}>
      <MapField variant="subpage" className={styles.mapField} />

      <div className={styles.headerMeta}>
        <div className={styles.eyebrow}>Terminal / Contact</div>
        <div className={styles.status}>
          <span className={styles.statusDot} aria-hidden="true" />
          Available for senior interactive and technical leadership conversations
        </div>
      </div>

      <h1 className={styles.pageTitle}>Contact</h1>

      <p className={styles.lead}>
        Open to senior interactive producer and technical leadership roles — particularly in immersive experience, games, and complex creative-technical production.
      </p>

      <div className={styles.links}>
        <a
          href="mailto:johntj127@gmail.com"
          className={[styles.link, styles.linkPrimary].join(' ')}
        >
          <span className={styles.linkLabel}>Email</span>
          <span className={styles.linkValue}>johntj127@gmail.com</span>
          <span className={styles.linkArrow}>→</span>
        </a>

        <a
          href="tel:+14074632918"
          className={styles.link}
        >
          <span className={styles.linkLabel}>Phone</span>
          <span className={styles.linkValue}>+1 407 463 2918</span>
          <span className={styles.linkArrow}>→</span>
        </a>

        <a
          href="https://www.linkedin.com/in/tj-johnson"
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.linkLabel}>LinkedIn</span>
          <span className={styles.linkValue}>www.linkedin.com/in/tj-johnson</span>
          <span className={styles.linkArrow}>→</span>
        </a>

        <a
          href="/resume.pdf"
          className={styles.link}
          download
        >
          <span className={styles.linkLabel}>Resume</span>
          <span className={styles.linkValue}>Download PDF</span>
          <span className={styles.linkArrow}>↓</span>
        </a>
      </div>

      <div className={styles.coordinate} aria-hidden="true">NODE·09 / OPEN CHANNEL</div>
    </div>
  )
}
