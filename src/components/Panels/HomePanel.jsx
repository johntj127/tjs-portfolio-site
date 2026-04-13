import React from 'react'
import bio from '../../content/bio.json'
import styles from './Panels.module.css'

export default function HomePanel() {
  return (
    <div className={styles.homePanel}>
      <div className={styles.homeStar}>★</div>
      <h1 className={styles.homeName}>{bio.name.toUpperCase()}</h1>
      <p className={styles.homeTitle}>{bio.title}</p>
      <p className={styles.homeTagline}>{bio.tagline}</p>
      <div className={styles.homeDivider} />
      <p className={styles.homeBio}>{bio.summary}</p>
      <p className={styles.homeCoreStatement}>"{bio.coreStatement}"</p>
      <div className={styles.homeActions}>
        <a className={styles.actionBtn} href={bio.resumeFile} target="_blank" rel="noreferrer">
          ▶ View Resume
        </a>
        <a className={styles.actionBtn} href={bio.contact.linkedin} target="_blank" rel="noreferrer">
          ▶ LinkedIn
        </a>
      </div>
      <div className={styles.homeDivider} />
      <p className={styles.homeHint}>← explore the map →</p>
    </div>
  )
}
