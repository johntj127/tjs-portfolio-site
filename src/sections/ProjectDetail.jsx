import React from 'react'
import { useParams, Link } from 'react-router-dom'
import projectsData from '../content/projects.json'
import styles from './ProjectDetail.module.css'

// ── Safe bullet overrides ───────────────────────────────────────
// Replace projects.json bullets that contain internal-sounding or
// unconfirmed claims. Keyed by project id → array index → safe string.
// null = keep original. TODO comments mark items pending TJ review.
const SAFE_BULLETS = {
  'starcruiser': [
    // Original: "Delivered the most complex tech stack in Disney history — 15+ integrated APIs..."
    'Delivered a custom tech stack integrating BLE, Unity, and AI systems across multiple platform integrations, narrative systems, and real-time show control.',
    null, // "Built game engine powering 2M+ personalized play permutations" — from resume, safe
    null, // "Led 40+ person cross-functional team" — from resume, safe
  ],
  'miss-minutes': [
    'Led technical production and architecture for a conversational character AI platform spanning mobile, real-time systems, and streaming-connected guest interactions.',
    'Helped pioneer second-screen interaction design using audio-triggered activation to support character engagement connected to episodic storytelling.',
    'Directed cross-functional delivery across iOS, Android, Unreal-based in-park proof-of-concept work, AI systems, and supporting backend integrations.',
  ],
  'project-256': [
    'Led technical production for a connected interactive platform designed to support multi-attraction guest experiences across mobile, real-time content, and location-aware systems.',
    'Coordinated architecture and delivery planning across Unity, Unreal, mobile surfaces, content pipelines, and cloud-backed orchestration to enable cross-experience continuity.',
    'Helped establish the platform foundation and delivery model for a large-scale interactive pavilion concept centered on personalized play, avatar-driven identity, and connected in-park experiences.',
  ],
}

// Same summary/impact overrides as Projects.jsx
const SAFE_SUMMARIES = {
  'starcruiser':
    'A custom game engine that powered a fully immersive Star Wars hotel experience, with integrated narrative systems and real-time show control across multiple platform integrations.',
  'project-256':
    'Technical production and platform leadership for Disney’s unbuilt PLAY! Pavilion concept at EPCOT, focused on connected guest experiences spanning mobile systems, real-time content, and multi-engine interactive development.',
}

const SAFE_IMPACTS = {
  'starcruiser': 'THEA Award · 2 Disney Patents',
}

function getSafeBullets(project) {
  const overrides = SAFE_BULLETS[project.id]
  if (!overrides) return project.bullets ?? []
  return (project.bullets ?? []).map((original, i) =>
    overrides[i] !== undefined && overrides[i] !== null ? overrides[i] : original
  )
}

export default function ProjectDetail() {
  const { id } = useParams()
  const raw = projectsData.find(p => p.id === id)

  if (!raw) {
    return (
      <div className={styles.notFound}>
        <Link to="/work" className={styles.back}>← Projects</Link>
        <p className={styles.notFoundMsg}>Project not found.</p>
      </div>
    )
  }

  const project = {
    ...raw,
    summary: SAFE_SUMMARIES[id] ?? raw.summary,
    impact:  SAFE_IMPACTS[id]  ?? raw.impact,
    bullets: getSafeBullets(raw),
  }

  return (
    <article className={styles.detail}>

      {/* ── Back nav ──────────────────────────────── */}
      <Link to="/work" className={styles.back}>← Projects</Link>

      {/* ── Header ───────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.metaRow}>
          {project.tags?.[0] && (
            <span className={styles.typeTag}>{project.tags[0]}</span>
          )}
          {project.years && (
            <span className={styles.years}>{project.years}</span>
          )}
        </div>

        <h1 className={styles.title}>{project.title}</h1>

        <p className={styles.roleTag}>{project.role}</p>
      </header>

      <div className={styles.rule} aria-hidden="true" />

      {project.detailImage && (
        <>
          <figure className={styles.mediaPanel}>
            <div
              className={[
                styles.mediaFrame,
                project.detailImageFit === 'contain' ? styles.mediaContain : '',
              ].filter(Boolean).join(' ')}
            >
              <img
                src={import.meta.env.BASE_URL + project.detailImage}
                alt={project.detailImageAlt ?? ''}
                className={styles.mediaImage}
                loading="lazy"
              />
              <span className={styles.mediaOverlay} aria-hidden="true" />
              <span className={styles.mediaGrid} aria-hidden="true" />
            </div>
          </figure>

          <div className={styles.rule} aria-hidden="true" />
        </>
      )}

      {/* ── Lead summary ─────────────────────────── */}
      <p className={styles.summary}>{project.summary}</p>

      <div className={styles.rule} aria-hidden="true" />

      {/* ── Work delivered ───────────────────────── */}
      {project.bullets?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>The Work</h2>
          <ul className={styles.bullets}>
            {project.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </section>
      )}

      {/* ── Disciplines & tools ──────────────────── */}
      {project.tags?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Disciplines & Tools</h2>
          <div className={styles.tags}>
            {project.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </section>
      )}

      {/* ── Outcome ──────────────────────────────── */}
      {project.impact && (
        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Outcome</h2>
          <p className={styles.impact}>{project.impact}</p>
        </section>
      )}

      {/* ── Official page link ───────────────────── */}
      {project.link && (
        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Official Page</h2>
          <a
            href={project.link.url}
            className={styles.externalLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.link.label} →
          </a>
        </section>
      )}

      {/* ── Footer nav ───────────────────────────── */}
      <div className={styles.footer}>
        <Link to="/work" className={styles.back}>← All Projects</Link>
      </div>

    </article>
  )
}
