import React, { useState } from 'react'
import bio from '../../content/bio.json'
import styles from './Panels.module.css'

export default function ContactPanel() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(bio.contact.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.contactPanel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelIcon}>✉</span>
        <h2 className={styles.panelTitle}>Say Hi</h2>
      </div>

      <p className={styles.contactCta}>
        Let's build something fun together.
      </p>

      <div className={styles.contactLinks}>
        <div className={styles.contactItem} onClick={copyEmail} style={{ cursor: 'pointer' }}>
          <span className={styles.contactIconBig}>📧</span>
          <div>
            <div className={styles.contactLabel}>Email</div>
            <div className={styles.contactValue}>
              {copied ? '✓ Copied!' : bio.contact.email}
            </div>
          </div>
        </div>

        <a
          className={styles.contactItem}
          href={bio.contact.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          <span className={styles.contactIconBig}>🔗</span>
          <div>
            <div className={styles.contactLabel}>LinkedIn</div>
            <div className={styles.contactValue}>{bio.contact.linkedinHandle}</div>
          </div>
        </a>

        <div className={styles.contactItem}>
          <span className={styles.contactIconBig}>📍</span>
          <div>
            <div className={styles.contactLabel}>Location</div>
            <div className={styles.contactValue}>Orlando, FL</div>
          </div>
        </div>
      </div>

      <div className={styles.contactDivider} />

      <p className={styles.contactNote}>
        Building immersive experiences, leading creative-technical teams,
        and making memories that last a lifetime.
      </p>
    </div>
  )
}
