import React from 'react'
import { NavLink } from 'react-router-dom'
import compassRose from '../assets/goal_compass_rose.svg'
import styles from './Shell.module.css'

const NAV_ITEMS = [
  { to: '/overview',   label: 'Overview',   end: true,  contact: false },
  { to: '/work',       label: 'Projects',   end: false, contact: false }, // stays active on /work/:id
  { to: '/experience', label: 'Experience', end: true,  contact: false },
  { to: '/about',      label: 'About',      end: true,  contact: false },
  { to: '/contact',    label: 'Contact',    end: true,  contact: true  },
]

/**
 * QuestLog — sidebar navigation.
 *
 * Renders identically in two contexts:
 *   1. Desktop sidebar (AppShell .sidebar)
 *   2. Mobile drawer (AppShell .drawer)
 *
 * onNavClick — optional callback, passed on mobile so the
 *              drawer closes when the user selects a section.
 */
export default function QuestLog({ onNavClick }) {
  return (
    <nav className={styles.questLog} aria-label="Site navigation">
      <div className={styles.navRail}>
        <div className={styles.compassBlock} aria-hidden="true">
          <img
            src={compassRose}
            alt=""
            className={styles.compassImage}
            draggable="false"
          />
        </div>

        {/* Section nav */}
        <ul className={styles.navList} role="list">
          {NAV_ITEMS.map(({ to, label, end, contact }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={onNavClick}
                className={({ isActive }) =>
                  [
                    styles.navItem,
                    contact ? styles.navContact : '',
                    isActive ? styles.navActive : '',
                  ].filter(Boolean).join(' ')
                }
              >
                <span className={styles.navDot} aria-hidden="true" />
                <span className={styles.navLabel}>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.divider} />

      {/* Resume — utility link, visually deemphasized */}
      <a
        href="/resume.pdf"
        download
        className={styles.resumeLink}
        onClick={onNavClick}
        aria-label="Download resume PDF"
      >
        ↓ Resume
      </a>

    </nav>
  )
}
