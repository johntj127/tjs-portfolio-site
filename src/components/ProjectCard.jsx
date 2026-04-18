import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ProjectCard.module.css'

/**
 * ProjectCard — used on Overview (Tier 1) and the full Projects section.
 * impact is optional. If omitted the impact row is suppressed.
 */
export default function ProjectCard({
  id,
  name,
  typeTag,
  roleTag,
  summary,
  impact,
  accentColor,
  imageSrc,
  imageAlt = '',
  imagePosition,
}) {
  const navigate = useNavigate()

  function open() { navigate(`/work/${id}`) }

  return (
    <article
      className={styles.card}
      style={accentColor ? { borderTop: `3px solid ${accentColor}4d` } : undefined}
      onClick={open}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && open()}
      role="button"
      tabIndex={0}
      aria-label={`Open case study: ${name}`}
    >
      {/* Selection indicator — appears on hover */}
      <span className={styles.selectDot} aria-hidden="true" />

      {imageSrc && (
        <div className={styles.media} aria-hidden={imageAlt ? undefined : 'true'}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className={styles.mediaImage}
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
            loading="lazy"
          />
          <span className={styles.mediaVeil} aria-hidden="true" />
          <span className={styles.mediaFrame} aria-hidden="true" />
        </div>
      )}

      <h3 className={styles.name}>{name}</h3>

      <div className={styles.rule} aria-hidden="true" />

      <div className={styles.tags}>
        {typeTag && <span className={styles.typeTag}>{typeTag}</span>}
        {roleTag && <span className={styles.roleTag}>{roleTag}</span>}
      </div>

      <p className={styles.summary}>{summary}</p>

      {impact && <p className={styles.impact}>{impact}</p>}

      <div className={styles.cta} aria-hidden="true">Open ▶</div>
    </article>
  )
}
