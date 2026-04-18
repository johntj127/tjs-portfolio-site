import React from 'react'
import skillsData from '../content/skills.json'
import awardsData from '../content/awards.json'
import MapField from '../components/MapField/MapField'
import styles from './About.module.css'

export default function About() {
  return (
    <div className={styles.about}>
      <div className={styles.introStage}>
        <MapField variant="subpage" className={styles.mapField} />

        <header className={styles.introPanel}>
          <div className={styles.introMeta}>
            <span className={styles.pageKicker}>Profile Brief</span>
            <span className={styles.pageIndex}>Node 04</span>
          </div>
          <h1 className={styles.pageTitle}>About</h1>

          {/* ── Positioning lead ─────────────────────────────────── */}
          <p className={styles.lead}>
            Senior Technical Producer with a track record of delivering complex
            interactive systems across games, mobile, live operations, and immersive
            experiences. Leads cross-functional teams across engineering, creative,
            product, QA, and operations to ship custom game platforms, real-time
            systems, and first-of-kind interactive experiences. Strongest in
            high-ambiguity environments where technical execution and player
            experience both matter.
          </p>
        </header>
      </div>

      <div className={styles.rule} aria-hidden="true" />

      {/* ── How I work ───────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionPanel}`}>
        <h2 className={styles.sectionLabel}>How I Work</h2>
        <div className={styles.blocks}>
          <div className={styles.block}>
            <p className={styles.blockTitle}>I sit between disciplines.</p>
            <p className={styles.blockBody}>
              My value is in the gap between creative directors, engineers, and
              operators — translating across those boundaries without losing
              fidelity in either direction.
            </p>
          </div>
          <div className={styles.block}>
            <p className={styles.blockTitle}>I build to ship.</p>
            <p className={styles.blockBody}>
              I care about what actually goes live. Scope discipline, vendor
              accountability, risk management, and the operational realities of
              running something at Disney scale — those are the job.
            </p>
          </div>
          <div className={styles.block}>
            <p className={styles.blockTitle}>I lead from context.</p>
            <p className={styles.blockBody}>
              I've managed teams of 40+ across engineering, design, and
              production. The approach is structured but not rigid — Lean,
              Agile, and plain-language communication depending on what the
              project actually needs.
            </p>
          </div>
        </div>
      </section>

      <div className={styles.rule} aria-hidden="true" />

      {/* ── What makes me different ───────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionPanel}`}>
        <h2 className={styles.sectionLabel}>What Makes Me Different</h2>
        <ul className={styles.differentiators}>
          <li>
            <span className={styles.diffLabel}>Depth at Disney scale.</span>{' '}
            Twenty-plus years building experiences for one of the most complex
            creative-technical organizations in the world. That context doesn't
            transfer on a résumé — it shows in how I scope, staff, de-risk,
            and deliver a project.
          </li>
          <li>
            <span className={styles.diffLabel}>Technical fluency without a technical title.</span>{' '}
            I don't write the engine — I define what it needs to do, keep the
            team unblocked, and make sure the architecture decisions hold up
            six months into production.
          </li>
          <li>
            <span className={styles.diffLabel}>A track record in hard work that ships.</span>{' '}
            THEA Award, two Disney patents, and a history of delivering things
            that required inventing new approaches to get there.
          </li>
        </ul>
      </section>

      <div className={styles.rule} aria-hidden="true" />

      {/* ── Disciplines & Tools ───────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionPanel} ${styles.skillsPanel}`}>
        <h2 className={styles.sectionLabel}>Disciplines &amp; Tools</h2>
        <div className={styles.skillGroups}>
          {skillsData.map(group => (
            <div key={group.category} className={styles.skillGroup}>
              <p className={styles.skillGroupLabel}>{group.category}</p>
              <div className={styles.chips}>
                {group.items.map(item => (
                  <span key={item} className={styles.chip}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.rule} aria-hidden="true" />

      {/* ── Credentials ──────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionPanel} ${styles.credentialsPanel}`}>
        <h2 className={styles.sectionLabel}>Credentials</h2>
        <div className={styles.credentialGroups}>

          <div className={styles.credentialGroup}>
            <p className={styles.credentialGroupLabel}>Certifications</p>
            {awardsData.certifications.map(c => (
              <div key={c.id} className={styles.credentialRow}>
                <span className={styles.credentialName}>{c.title}</span>
                <span className={styles.credentialMeta}>{c.org} · {c.year}</span>
              </div>
            ))}
          </div>

          <div className={styles.credentialGroup}>
            <p className={styles.credentialGroupLabel}>Education</p>
            {awardsData.education.map(e => (
              <div key={e.id} className={styles.credentialRow}>
                <span className={styles.credentialName}>{e.degree}</span>
                <span className={styles.credentialMeta}>{e.field} · {e.school}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}
