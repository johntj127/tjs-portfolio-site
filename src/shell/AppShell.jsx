import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import QuestLog from './QuestLog.jsx'
import styles from './Shell.module.css'

const EXIT_DURATION_MS = 90

/**
 * AppShell — persistent layout wrapper for all content routes.
 *
 * Desktop: fixed 200px sidebar (QuestLog) + scrollable content area.
 * Mobile:  fixed 56px top bar + slide-in drawer (same QuestLog).
 *
 * Route changes keep the shell stable while the current page fades out,
 * then the next page fades in with a small settle.
 */
export default function AppShell() {
  const location = useLocation()
  const outlet = useOutlet()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [displayPath, setDisplayPath] = useState(location.pathname)
  const [displayOutlet, setDisplayOutlet] = useState(outlet)
  const [transitionStage, setTransitionStage] = useState('enter')
  const contentRef = useRef(null)

  // Close drawer on any route change (catches back/forward navigation)
  useEffect(() => {
    setDrawerOpen(false)
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [location.pathname])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  useEffect(() => {
    if (location.pathname === displayPath) {
      setDisplayOutlet(outlet)
      return
    }

    setTransitionStage('exit')

    const swapTimer = window.setTimeout(() => {
      setDisplayOutlet(outlet)
      setDisplayPath(location.pathname)
      setTransitionStage('enter')
    }, EXIT_DURATION_MS)

    return () => window.clearTimeout(swapTimer)
  }, [location.pathname, outlet, displayPath])

  return (
    <div className={styles.shell}>

      {/* ── Desktop sidebar ─────────────────────────────── */}
      <aside className={styles.sidebar}>
        <QuestLog />
      </aside>

      {/* ── Mobile top bar ──────────────────────────────── */}
      <div className={styles.topBar} role="banner">
        <span className={styles.topBarMark} aria-hidden="true">TJ</span>
        <button
          className={styles.hamburger}
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={drawerOpen}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </div>

      {/* ── Mobile drawer ───────────────────────────────── */}
      {drawerOpen && (
        <div
          className={styles.drawerOverlay}
          onClick={() => setDrawerOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <aside
            className={styles.drawer}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className={styles.drawerClose}
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation menu"
            >
              ✕
            </button>

            {/* Same QuestLog — onNavClick closes drawer */}
            <QuestLog onNavClick={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      {/* ── Content area ────────────────────────────────── */}
      <main ref={contentRef} className={styles.content} id="main-content">
        <div
          key={displayPath}
          className={[
            styles.contentInner,
            transitionStage === 'exit' ? styles.contentInnerExit : styles.contentInnerEnter,
          ].join(' ')}
        >
          {displayOutlet}
        </div>
      </main>

    </div>
  )
}
