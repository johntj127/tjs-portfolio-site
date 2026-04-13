import React, { useState } from 'react'
import experience from '../../content/experience.json'
import styles from './Panels.module.css'

export default function ExperiencePanel() {
  const [open, setOpen] = useState('mgr-tp') // first item open by default

  return (
    <div className={styles.expPanel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelIcon}>◈</span>
        <h2 className={styles.panelTitle}>Experience</h2>
      </div>
      <p className={styles.panelSubtitle}>
        The Walt Disney Company · 2005 – Present
      </p>
      <div className={styles.timeline}>
        {experience.map(role => (
          <div key={role.id} className={styles.timelineItem}>
            <div
              className={`${styles.timelineHeader} ${open === role.id ? styles.timelineOpen : ''}`}
              onClick={() => setOpen(open === role.id ? null : role.id)}
            >
              <div className={styles.timelineDot} />
              <div className={styles.timelineInfo}>
                <span className={styles.timelineYears}>{role.years}</span>
                <span className={styles.timelineTitle}>{role.title}</span>
                <span className={styles.timelineDivision}>{role.division}</span>
              </div>
              <span className={styles.timelineArrow}>{open === role.id ? '▲' : '▼'}</span>
            </div>
            {open === role.id && (
              <ul className={styles.timelineHighlights}>
                {role.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
