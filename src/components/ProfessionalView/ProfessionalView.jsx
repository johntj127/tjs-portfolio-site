import React from 'react'
import bio        from '../../content/bio.json'
import experience from '../../content/experience.json'
import projects   from '../../content/projects.json'
import awards     from '../../content/awards.json'
import styles     from './ProfessionalView.module.css'

export default function ProfessionalView({ onSwitchToGame }) {
  return (
    <div className={styles.proView}>
      {/* Toggle back to game */}
      <button className={styles.gameToggle} onClick={onSwitchToGame}>
        ▶ Switch to Game View
      </button>

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.name}>{bio.fullName}</h1>
        <p className={styles.title}>{bio.title}</p>
        <div className={styles.contact}>
          <a href={`mailto:${bio.contact.email}`}>{bio.contact.email}</a>
          <span>·</span>
          <span>{bio.contact.phone}</span>
          <span>·</span>
          <a href={bio.contact.linkedin} target="_blank" rel="noreferrer">{bio.contact.linkedinHandle}</a>
        </div>
      </header>

      <hr className={styles.divider} />

      {/* Summary */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Executive Summary</h2>
        <p className={styles.summary}>{bio.summary}</p>
        <p className={styles.coreStatement}>"{bio.coreStatement}"</p>
      </section>

      <hr className={styles.divider} />

      {/* Experience */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Work Experience</h2>
        {experience.map(role => (
          <div key={role.id} className={styles.role}>
            <div className={styles.roleHeader}>
              <div>
                <div className={styles.roleCompany}>{role.company}</div>
                <div className={styles.roleTitle}>{role.title}</div>
                <div className={styles.roleDivision}>{role.division}</div>
              </div>
              <div className={styles.roleYears}>{role.years}</div>
            </div>
            <ul className={styles.roleList}>
              {role.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <hr className={styles.divider} />

      {/* Key Projects */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Key Projects</h2>
        {projects.map(p => (
          <div key={p.id} className={styles.project}>
            <div className={styles.projectHeader}>
              <span className={styles.projectTitle}>{p.title}</span>
              <span className={styles.projectYears}>{p.years}</span>
            </div>
            <p className={styles.projectDesc}>{p.description}</p>
            {p.impact && <p className={styles.projectImpact}>★ {p.impact}</p>}
          </div>
        ))}
      </section>

      <hr className={styles.divider} />

      {/* Awards */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Awards & Recognition</h2>
        {awards.awards.map(a => (
          <div key={a.id} className={styles.awardItem}>
            <span className={styles.awardTitle}>{a.title}</span>
            <span className={styles.awardMeta}> — {a.org}, {a.year}</span>
            <p className={styles.awardDesc}>{a.description}</p>
          </div>
        ))}
      </section>

      <hr className={styles.divider} />

      {/* Skills */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Core Skills</h2>
        {awards.skills.map(s => (
          <p key={s.category} className={styles.skillLine}>
            <strong>{s.category}:</strong> {s.items.join(', ')}
          </p>
        ))}
      </section>

      <hr className={styles.divider} />

      {/* Certs & Education */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Certifications</h2>
        {awards.certifications.map(c => (
          <p key={c.id} className={styles.certLine}>{c.title} — {c.org} · {c.year}</p>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Education</h2>
        {awards.education.map(e => (
          <p key={e.id} className={styles.certLine}>
            {e.degree}, {e.field} — {e.school}, {e.location} · {e.year}
          </p>
        ))}
      </section>

      <div className={styles.footer}>
        <a href={bio.resumeFile} className={styles.downloadBtn} target="_blank" rel="noreferrer">
          Download Resume PDF
        </a>
      </div>
    </div>
  )
}
