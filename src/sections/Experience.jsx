import React from 'react'
import experienceData from '../content/experience.json'
import awardsData from '../content/awards.json'
import MapField from '../components/MapField/MapField'
import styles from './Experience.module.css'

// Credentials shown in the callout row — patents + THEA only
const CREDENTIALS = awardsData.awards.filter(
  a => ['thea', 'patent-ble', 'patent-engine'].includes(a.id)
)

// ── Arc configuration ──────────────────────────────────────────
// SHOW_FULL_ARC = false  →  resume-era only (2014–present, 4 roles)
// SHOW_FULL_ARC = true   →  full Disney arc (2005–present, 7 roles)
//
// Pre-2014 roles exist in experience.json but are not on the current
// resume. Enable only after TJ confirms they should appear on portfolio.
const SHOW_FULL_ARC = true

const PRE_2014_IDS = new Set(['imagineering-rd', 'resort-ops', 'guest-relations'])
// Note: 'tech-mgr' and 'tech-cos' IDs replaced by 'tech-mgr-17', 'tech-mgr-24', and 'cos' in experience.json

const roles = SHOW_FULL_ARC
  ? experienceData
  : experienceData.filter(r => !PRE_2014_IDS.has(r.id))

export default function Experience() {
  return (
    <div className={styles.experience}>
      <div className={styles.introStage}>
        <MapField variant="subpage" className={styles.mapField} />

        <section className={styles.introPanel}>
          <div className={styles.introMeta}>
            <span className={styles.pageKicker}>Career Arc</span>
            <span className={styles.pageIndex}>Node 03</span>
          </div>

          <h1 className={styles.pageTitle}>Experience</h1>

          <div className={styles.credentials}>
            {CREDENTIALS.map(c => (
              <div key={c.id} className={styles.credential}>
                <span className={styles.credentialTitle}>{c.title}</span>
                <span className={styles.credentialYear}>{c.year}</span>
              </div>
            ))}
          </div>

          <div className={styles.company}>
            <span className={styles.companyName}>The Walt Disney Company</span>
            <span className={styles.companyTenure}>
              2005 – Present
            </span>
          </div>
        </section>
      </div>

      <div className={styles.rule} aria-hidden="true" />

      <div className={styles.timelinePanel}>
        {roles.map((role, i) => (
          <div key={role.id} className={styles.entry}>
            {/* Left accent line + year */}
            <div className={styles.entryLeft}>
              <div className={styles.entryDot} aria-hidden="true" />
              {i < roles.length - 1 && (
                <div className={styles.entryLine} aria-hidden="true" />
              )}
            </div>

            {/* Right content */}
            <div className={styles.entryContent}>
              <p className={styles.years}>{role.years}</p>
              <h2 className={styles.roleTitle}>{role.title}</h2>
              <p className={styles.division}>{role.division}</p>
              {role.highlights?.length > 0 && (
                <ul className={styles.highlights}>
                  {role.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
