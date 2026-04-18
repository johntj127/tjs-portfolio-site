import React from 'react'
import awardsData from '../content/awards.json'
import styles from './Recognition.module.css'

// Disney Inventor Award omitted — pending confirmation of public-safe framing
const EXCLUDED_AWARD_IDS = new Set(['disney-inventor'])

const awards = awardsData.awards.filter(a => !EXCLUDED_AWARD_IDS.has(a.id))

export default function Recognition() {
  return (
    <div className={styles.recognition}>
      <h1 className={styles.pageTitle}>Recognition</h1>

      {/* ── Awards ───────────────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>Awards & Patents</h2>
        <div className={styles.list}>
          {awards.map(award => (
            <div key={award.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.itemTitle}>{award.title}</span>
                <span className={styles.itemYear}>{award.year}</span>
              </div>
              <p className={styles.itemOrg}>{award.org}</p>
              {award.description && (
                <p className={styles.itemDesc}>{award.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className={styles.rule} aria-hidden="true" />

      {/* ── Certifications ───────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>Certifications</h2>
        <div className={styles.list}>
          {awardsData.certifications.map(cert => (
            <div key={cert.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.itemTitle}>{cert.title}</span>
                <span className={styles.itemYear}>{cert.year}</span>
              </div>
              <p className={styles.itemOrg}>{cert.org}</p>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.rule} aria-hidden="true" />

      {/* ── Education ────────────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>Education</h2>
        <div className={styles.list}>
          {awardsData.education.map(edu => (
            <div key={edu.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.itemTitle}>{edu.degree}</span>
                <span className={styles.itemYear}>{edu.year}</span>
              </div>
              <p className={styles.itemOrg}>{edu.field} · {edu.school}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
