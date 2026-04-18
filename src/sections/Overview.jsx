import React from 'react'
import ProjectCard from '../components/ProjectCard.jsx'
import MapField from '../components/MapField/MapField.jsx'
import styles from './Overview.module.css'

// ── Hero positioning statement ──────────────────────────────────
const POSITIONING =
  'Technical production leader with 20+ years delivering complex interactive systems across game platforms, real-time engines, mobile, and LiveOps — from concept through live operation.'

// ── Authored quote — upper-right identity anchor ────────────────
const QUOTE =
  'I build interactive experiences where technology, story, and player choice work as one system.'

const CLOSING_LINE =
  'Systems create the magic. Connection makes it matter.'

// ── Capability pillars ──────────────────────────────────────────
const PILLARS = [
  {
    id: 'leadership',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="12" cy="12" r="9" strokeDasharray="4 3" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="3"  x2="12" y2="6"  />
        <line x1="12" y1="18" x2="12" y2="21" />
        <line x1="3"  y1="12" x2="6"  y2="12" />
        <line x1="18" y1="12" x2="21" y2="12" />
      </svg>
    ),
    label: 'Technical Production Leadership',
    body:  'Bridging technical execution and creative vision to deliver high-complexity systems on time and at scale.',
  },
  {
    id: 'systems',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <path d="M17.5 17.5 L17.5 14 M14 17.5 L21 17.5" />
      </svg>
    ),
    label: 'Interactive Systems Expertise',
    body:  'Game engines, BLE, AI, show control, and mobile. Built a THEA Award-winning engine powering 2M+ play permutations.',
  },
  {
    id: 'liveops',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M12 2 L12 6 M12 18 L12 22 M4.22 4.22 L7.05 7.05 M16.95 16.95 L19.78 19.78" />
        <circle cx="12" cy="12" r="4" />
        <path d="M2 12 L6 12 M18 12 L22 12" />
      </svg>
    ),
    label: 'Live Ops & Sustainment',
    body:  'Building operational models that endure: monitoring, alerting, release cadence, and L1/L2 support across live systems.',
  },
  {
    id: 'firstkind',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ),
    label: 'First-of-Kind Delivery',
    body:  'Shipping innovative interactive experiences that require inventing the approach — and a track record to prove it.',
  },
]

// ── Tier 1 featured projects ────────────────────────────────────
const TIER1 = [
  {
    id: 'starcruiser',
    name: 'Star Wars: Galactic Starcruiser',
    typeTag: 'Custom Game Platform',
    roleTag: 'Technical Producer',
    imageSrc: '/assets/project-images/swgs_hero_01.jpg',
    imageAlt: '',
    imagePosition: 'center 42%',
    summary:
      'Custom interactive game platform combining BLE, Unity, show control, and personalized narrative systems — 2M+ play permutations across a fully immersive multi-day experience.',
    impact: 'THEA Award · 2 Disney Patents',
    accentColor: '#4fc3f7',
  },
  {
    id: 'millennium-falcon-mission-2',
    name: 'Millennium Falcon: Major Mission Update',
    typeTag: 'Gameplay Systems · Unreal Engine 5',
    roleTag: 'Technology Manager',
    imageSrc: '/assets/project-images/falcon_01.jpg',
    imageAlt: '',
    imagePosition: 'center center',
    summary:
      'End-to-end QA strategy and cross-functional delivery for a major Unreal Engine 5 mission — validating gameplay systems, show mechanics, and technical dependencies through launch.',
    impact: 'Launches May 22, 2026',
    accentColor: '#c9a84c',
  },
  {
    id: 'virtual-guest-services',
    name: 'Virtual Guest Services',
    typeTag: 'Production AI · Live Ops',
    roleTag: 'Technology Manager',
    imageSrc: '/assets/project-images/VGS_01.jpg',
    imageAlt: '',
    imagePosition: 'center center',
    summary:
      'Guest-facing AI chat assistant in the Disney Cruise Line Navigator app. Led sustainment readiness, monitoring, alerting, and the live-ops model for a bilingual mobile experience at sea.',
    impact: 'Disney Cruise Line Adventure · Live Ops',
    accentColor: '#69f0ae',
  },
]

export default function Overview() {
  return (
    <div className={styles.overview}>

      {/* ── Ambient background field ─────────────────── */}
      <MapField variant="overview" />

      {/* ── Identity block ───────────────────────────── */}
      <section className={styles.identity} aria-label="Introduction">

        {/* Avatar + orbital accent */}
        <div className={styles.avatarWrap}>
          <svg
            className={styles.accent}
            viewBox="0 0 220 220"
            aria-hidden="true"
            focusable="false"
          >
            <g className={styles.ring1} style={{ transformOrigin: '110px 110px' }}>
              <circle cx="110" cy="110" r="76"
                fill="none" stroke="currentColor" strokeWidth="1.6"
                strokeDasharray="72 56 20 68" strokeLinecap="round" />
            </g>
            <g className={styles.ring2} style={{ transformOrigin: '110px 110px' }}>
              <circle cx="110" cy="110" r="98"
                fill="none" stroke="currentColor" strokeWidth="1.2"
                strokeDasharray="48 110 16 52" strokeLinecap="round" />
            </g>
            <g className={styles.ring3} style={{ transformOrigin: '110px 110px' }}>
              <circle cx="110" cy="110" r="106"
                fill="none" stroke="currentColor" strokeWidth="0.9"
                strokeDasharray="24 148 10 44" strokeLinecap="round" />
            </g>
          </svg>
          <img
            src="/assets/avatar.png"
            alt="TJ Johnson"
            className={styles.avatar}
          />
        </div>

        <div className={styles.identityText}>
          <h1 className={styles.name}>TJ Johnson</h1>
          <p className={styles.titleLine}>
            Senior Technical Producer · Interactive Systems &amp; Games
          </p>
          <p
            className={styles.positioning}
            style={{ animationDelay: '145ms' }}
          >
            {POSITIONING}
          </p>
        </div>

        {/* Quote block — upper-right compositional anchor, human voice */}
        <blockquote
          className={styles.quoteBlock}
          style={{ animationDelay: '220ms' }}
        >
          <p className={styles.quoteText}>{QUOTE}</p>
          <cite className={styles.quoteAttrib}>— TJ Johnson</cite>
        </blockquote>
      </section>

      {/* ── Capability pillars ────────────────────────── */}
      <section className={styles.pillarsSection} aria-label="Core capabilities">
        {PILLARS.map((p, i) => (
          <div
            key={p.id}
            className={styles.pillar}
            style={{ animationDelay: `${200 + i * 55}ms` }}
          >
            <div className={styles.pillarIcon} aria-hidden="true">{p.icon}</div>
            <p className={styles.pillarLabel}>{p.label}</p>
            <p className={styles.pillarBody}>{p.body}</p>
          </div>
        ))}
      </section>

      <div className={styles.divider} aria-hidden="true" />

      {/* ── Featured work ────────────────────────────── */}
      <section aria-label="Featured work" className={styles.cardSection}>
        <h2 className={styles.sectionLabel}>Featured Work</h2>
        <div className={styles.cardGrid}>
          {TIER1.map(p => <ProjectCard key={p.id} {...p} />)}
        </div>
      </section>

      {/* ── Manifesto close ───────────────────────────── */}
      <p className={styles.manifesto} aria-hidden="true">
        {CLOSING_LINE}
      </p>

    </div>
  )
}
