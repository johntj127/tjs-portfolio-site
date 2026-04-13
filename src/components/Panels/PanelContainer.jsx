import React, { useEffect } from 'react'
import HomePanel       from './HomePanel.jsx'
import ExperiencePanel from './ExperiencePanel.jsx'
import ProjectsPanel   from './ProjectsPanel.jsx'
import AwardsPanel     from './AwardsPanel.jsx'
import ContactPanel    from './ContactPanel.jsx'
import styles from './Panels.module.css'

const PANEL_REGISTRY = {
  home:       HomePanel,
  experience: ExperiencePanel,
  projects:   ProjectsPanel,
  awards:     AwardsPanel,
  contact:    ContactPanel,
}

export default function PanelContainer({ panelId, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!panelId) return null
  const PanelContent = PANEL_REGISTRY[panelId]
  if (!PanelContent) return null

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayOpen : styles.overlayClose}`}
      onClick={onClose}
      role="dialog" aria-modal="true"
    >
      <div
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        <div className={`${styles.panelScroll} panel-scroll`}>
          <PanelContent />
        </div>
      </div>
    </div>
  )
}
