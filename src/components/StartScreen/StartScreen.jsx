import React, { useEffect } from 'react'
import styles from './StartScreen.module.css'

/**
 * StartScreen — diegetic intro sign that spins from the Home node position
 * out toward the camera until full screen, then spins back on dismiss.
 *
 * The overlay is always fixed/full-size; CSS scale + rotateY + transform-origin
 * makes it appear to grow from the Home node (50%, 57%) when opening.
 */
export default function StartScreen({ isOpen, onStart, onSkip }) {
  // Esc key dismisses
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onStart()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onStart])

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.signBoard}>

        {/* ── Close (X) ─────────────────────────────────── */}
        <button
          className={styles.closeBtn}
          onClick={onStart}
          aria-label="Close intro screen"
        >
          ✕
        </button>

        {/* ── Top banner ────────────────────────────────── */}
        <div className={styles.topBanner}>
          <span className={styles.bannerStar}>★</span>
          <span>TJ'S PORTFOLIO</span>
          <span className={styles.bannerStar}>★</span>
        </div>

        {/* ── Main title ────────────────────────────────── */}
        <h1 className={styles.mainTitle}>
          WELCOME TO<br />TJ'S WORLD
        </h1>

        {/* ── Titles ────────────────────────────────────── */}
        <div className={styles.subtitle}>Creative Technical Leader</div>
        <div className={styles.tagline}>Builder of Immersive Experiences</div>

        {/* ── Disney badge ──────────────────────────────── */}
        <div className={styles.disneyBadge}>
          ★ THE WALT DISNEY COMPANY · 20+ YEARS ★
        </div>

        <div className={styles.divider} />

        {/* ── CTA buttons ───────────────────────────────── */}
        <div className={styles.btnRow}>
          <button className={styles.startBtn} onClick={onStart}>
            ▶ PRESS START
          </button>
          <button className={styles.skipBtn} onClick={onSkip}>
            SKIP TO RESUME
          </button>
        </div>

        {/* ── Bottom hint ───────────────────────────────── */}
        <div className={styles.hint}>[ CLICK A LOCATION TO EXPLORE ]</div>

      </div>
    </div>
  )
}
