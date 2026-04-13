import React from 'react'
import projects from '../../content/projects.json'
import styles from './Panels.module.css'

const featured   = projects.filter(p => p.featured)
const secondary  = projects.filter(p => !p.featured)

export default function ProjectsPanel() {
  return (
    <div className={styles.projectsPanel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelIcon}>▶</span>
        <h2 className={styles.panelTitle}>Projects</h2>
      </div>
      <p className={styles.panelSubtitle}>
        20+ technology-influenced experiences delivered
      </p>

      {/* ── Featured row ─────────────────────────────────────────────────── */}
      <div className={styles.featuredRow}>
        {featured.map(p => <FlipCard key={p.id} project={p} featured />)}
      </div>

      {/* ── Secondary row ────────────────────────────────────────────────── */}
      <div className={styles.secondaryRow}>
        {secondary.map(p => <FlipCard key={p.id} project={p} featured={false} />)}
      </div>
    </div>
  )
}

// ─── Flip Card ──────────────────────────────────────────────────────────────
function FlipCard({ project, featured }) {
  return (
    <div className={`${styles.cardContainer} ${featured ? styles.cardFeatured : styles.cardSecondary}`}>
      <div className={styles.cardInner}>

        {/* ── Front ──────────────────────────────────────────────────────── */}
        <div className={styles.cardFront} style={{ borderColor: project.accentColor }}>

          {/* Hero image tile */}
          <div
            className={`${styles.cardHero} ${featured ? styles.cardHeroFeatured : ''}`}
            style={{ background: project.heroGradient }}
          >
            <div className={styles.cardHeroGlow} style={{ background: project.accentColor }} />
            <span className={styles.cardHeroIcon}>{project.heroIcon}</span>
            {featured && (
              <div className={styles.cardHeroBadge} style={{ borderColor: project.accentColor, color: project.accentColor }}>
                FEATURED
              </div>
            )}
          </div>

          {/* Card info */}
          <div className={styles.cardFrontInfo}>
            <div className={styles.cardFrontTitle}>{project.title}</div>
            <div className={styles.cardFrontYears}>{project.years}</div>
            <div className={styles.cardFrontSummary}>{project.summary}</div>
            <div className={styles.cardHint}>hover to flip ▶</div>
          </div>
        </div>

        {/* ── Back ───────────────────────────────────────────────────────── */}
        <div className={styles.cardBack} style={{ borderColor: project.accentColor, background: project.color }}>
          <div className={styles.cardBackTitle}>{project.title}</div>
          <div className={styles.cardBackRole} style={{ color: project.accentColor }}>
            {project.role}
          </div>

          {/* Bullet points */}
          <ul className={styles.cardBullets}>
            {project.bullets.map((b, i) => (
              <li key={i} className={styles.cardBullet}>{b}</li>
            ))}
          </ul>

          <div className={styles.cardImpact} style={{ color: project.accentColor }}>
            ★ {project.impact}
          </div>

          <div className={styles.cardTags}>
            {project.tags.map(tag => (
              <span key={tag} className={styles.cardTag} style={{ borderColor: project.accentColor }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
