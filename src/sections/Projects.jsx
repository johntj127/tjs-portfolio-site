import React from 'react'
import { useNavigate } from 'react-router-dom'
import projectsData from '../content/projects.json'
import ProjectCard from '../components/ProjectCard.jsx'
import styles from './Projects.module.css'

// Tier assignment — drives grid structure independently of projects.json `featured` flag
// Priority order per brief: Starcruiser > Millennium Falcon > Buzz Lightyear > World of Color > Character AI > Holiday Windows > Archive
const TIER1_IDS = ['starcruiser', 'millennium-falcon-mission-2', 'buzz-lightyear-recharge']
const TIER2_IDS = ['world-of-color', 'miss-minutes', 'project-256']
const TIER3_IDS = ['magic-mobile', 'holiday-windows', 'accessibility']

// Public-safe summary overrides — replace projects.json strings that contain
// internal-sounding or unconfirmed claims. Flagged inline where pending confirmation.
const SAFE_SUMMARIES = {
  'starcruiser':
    'A custom game engine that powered a fully immersive Star Wars hotel experience, with integrated narrative systems and real-time show control across multiple platform integrations.',
  'project-256':
    'Technical production and platform leadership for Disney’s unbuilt PLAY! Pavilion concept at EPCOT, focused on connected guest experiences spanning mobile systems, real-time content, and multi-engine interactive development.',
}

// Impact line overrides — remove unconfirmed satisfaction claims
const SAFE_IMPACTS = {
  'starcruiser': 'THEA Award · 2 Disney Patents', // TODO: confirm whether Guest Sat % is public-safe
}

function getProject(id) {
  const p = projectsData.find(p => p.id === id)
  if (!p) return null
  return {
    ...p,
    summary: SAFE_SUMMARIES[id] ?? p.summary,
    impact:  SAFE_IMPACTS[id]  ?? p.impact,
  }
}

function tier(ids) {
  return ids.map(getProject).filter(Boolean)
}

// Compact archive row for Tier 3
function ArchiveItem({ project }) {
  const navigate = useNavigate()
  return (
    <button
      className={styles.archiveItem}
      onClick={() => navigate(`/work/${project.id}`)}
      aria-label={`View ${project.title}`}
    >
      <span className={styles.archiveName}>{project.title}</span>
      <span className={styles.archiveRole}>{project.role}</span>
      <span className={styles.archiveYear}>{project.years}</span>
      <span className={styles.archiveCta}>View →</span>
    </button>
  )
}

export default function Projects() {
  const t1 = tier(TIER1_IDS)
  const t2 = tier(TIER2_IDS)
  const t3 = tier(TIER3_IDS)

  return (
    <div className={styles.projects}>

      {/* ── Tier 1 — Featured ──────────────────────── */}
      <section>
        <h1 className={styles.pageTitle}>Projects</h1>
        <p className={styles.tierLabel}>Featured</p>
        <div className={styles.grid}>
          {t1.map(p => (
            <ProjectCard
              key={p.id}
              id={p.id}
              name={p.title}
              typeTag={p.tags?.[0] ?? ''}
              roleTag={p.role}
              summary={p.summary}
              impact={p.impact}
              imageSrc={p.cardImage}
              imageAlt={p.cardImageAlt ?? ''}
              imagePosition={p.cardImagePosition}
            />
          ))}
        </div>
      </section>

      <div className={styles.divider} aria-hidden="true" />

      {/* ── Tier 2 — Additional work ───────────────── */}
      <section>
        <p className={styles.tierLabel}>Additional Work</p>
        <div className={styles.grid}>
          {t2.map(p => (
            <ProjectCard
              key={p.id}
              id={p.id}
              name={p.title}
              typeTag={p.tags?.[0] ?? ''}
              roleTag={p.role}
              summary={p.summary}
              impact={p.impact}
              imageSrc={p.cardImage}
              imageAlt={p.cardImageAlt ?? ''}
              imagePosition={p.cardImagePosition}
            />
          ))}
        </div>
      </section>

      <div className={styles.divider} aria-hidden="true" />

      {/* ── Tier 3 — Archive ───────────────────────── */}
      <section>
        <p className={styles.tierLabel}>Archive</p>
        <div className={styles.archive}>
          {t3.map(p => <ArchiveItem key={p.id} project={p} />)}
        </div>
      </section>

    </div>
  )
}
