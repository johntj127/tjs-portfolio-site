import React from 'react'
import skillsData from '../content/skills.json'
import styles from './Skills.module.css'

export default function Skills() {
  return (
    <div className={styles.skills}>
      <h1 className={styles.pageTitle}>Skills</h1>

      <div className={styles.categories}>
        {skillsData.map(group => (
          <section key={group.category} className={styles.category}>
            <h2 className={styles.categoryLabel}>{group.category}</h2>
            <div className={styles.chips}>
              {group.items.map(item => (
                <span key={item} className={styles.chip}>{item}</span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
