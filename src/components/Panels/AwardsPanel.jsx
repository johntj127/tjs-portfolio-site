import React from 'react'
import awards from '../../content/awards.json'
import styles from './Panels.module.css'

export default function AwardsPanel() {
  return (
    <div className={styles.awardsPanel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelIcon}>♦</span>
        <h2 className={styles.panelTitle}>Awards & Credentials</h2>
      </div>

      {/* Awards */}
      <div className={styles.awardSection}>
        <h3 className={styles.awardSectionTitle}>Recognition</h3>
        <div className={styles.awardGrid}>
          {awards.awards.map(a => (
            <div key={a.id} className={styles.awardCard}>
              <div className={styles.awardEmoji}>{a.emoji}</div>
              <div className={styles.awardTitle}>{a.title}</div>
              <div className={styles.awardOrg}>{a.org}</div>
              <div className={styles.awardYear}>{a.year}</div>
              <p className={styles.awardDesc}>{a.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.awardDivider} />

      {/* Certifications */}
      <div className={styles.awardSection}>
        <h3 className={styles.awardSectionTitle}>Certifications</h3>
        <div className={styles.certList}>
          {awards.certifications.map(c => (
            <div key={c.id} className={styles.certItem}>
              <span className={styles.certEmoji}>{c.emoji}</span>
              <div>
                <div className={styles.certTitle}>{c.title}</div>
                <div className={styles.certMeta}>{c.org} · {c.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.awardDivider} />

      {/* Education */}
      <div className={styles.awardSection}>
        <h3 className={styles.awardSectionTitle}>Education</h3>
        <div className={styles.certList}>
          {awards.education.map(e => (
            <div key={e.id} className={styles.certItem}>
              <span className={styles.certEmoji}>{e.emoji}</span>
              <div>
                <div className={styles.certTitle}>{e.degree} — {e.field}</div>
                <div className={styles.certMeta}>{e.school} · {e.location} · {e.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.awardDivider} />

      {/* Skills */}
      <div className={styles.awardSection}>
        <h3 className={styles.awardSectionTitle}>Core Skills</h3>
        <div className={styles.skillsGrid}>
          {awards.skills.map(s => (
            <div key={s.category} className={styles.skillGroup}>
              <div className={styles.skillCategory}>{s.category}</div>
              <div className={styles.skillItems}>
                {s.items.map(item => <span key={item} className={styles.skillTag}>{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
