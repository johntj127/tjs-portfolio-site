import React from 'react'
import styles from './TranslationGrid.module.css'

export default function TranslationGrid({ rows }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <div className={styles.headerGroup}>
          <span className={styles.headerLabel}>System Translation Matrix</span>
          <span className={styles.headerValue}>Recruiter Readout</span>
        </div>
        <div className={styles.headerGroup} aria-hidden="true">
          <span className={styles.headerCol}>Game Production Need</span>
          <span className={styles.headerCol}>Direct Experience</span>
        </div>
      </div>

      <dl className={styles.grid}>
        {rows.map((row) => (
          <div key={row.need} className={styles.row}>
            <dt className={styles.term}>{row.need}</dt>
            <dd className={styles.definition}>{row.experience}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
