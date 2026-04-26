import React, { useMemo, useState } from 'react'
import ProjectCard from '../components/ProjectCard.jsx'
import CapabilityCards from '../components/CapabilityCards.jsx'
import CapabilityDetailModal from '../components/CapabilityDetailModal.jsx'
import MapField from '../components/MapField/MapField.jsx'
import TranslationGrid from '../components/TranslationGrid.jsx'
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
    translation:
      'Senior Producer / Technical Producer ownership across roadmap, scope, backlog, cross-functional alignment, vendors, QA, launch readiness, and executive communication.',
    practice: [
      'Led ambiguous interactive systems from concept through launch and live operation.',
      'Aligned engineering, design, QA, creative, product, vendors, operations, and executives.',
      'Managed schedules, risks, dependencies, escalation paths, and delivery tradeoffs.',
      'Balanced creative ambition with technical feasibility and sustainable delivery.',
      'Created structure for teams working through uncertainty.',
    ],
    proofPoints: [
      { label: 'Star Wars: Galactic Starcruiser', to: '/work/starcruiser' },
      { label: 'Millennium Falcon major mission update', to: '/work/millennium-falcon-mission-2' },
      { label: 'Virtual Guest Services', to: '/work/virtual-guest-services' },
      { label: 'Accessibility mobile platform', to: '/work/accessibility' },
      { label: 'World of Color Happiness', to: '/work/world-of-color' },
    ],
    cta: { label: 'Explore related work', to: '/work' },
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
    translation:
      'Real-time systems, game engines, mobile interactions, cloud-backed platforms, personalization, player-state logic, Unity/Unreal delivery, BLE, AI, and show-control integrations.',
    practice: [
      'Delivered systems with branching experiences, guest/player-specific state, real-time triggers, and backend rules.',
      'Partnered with Unity, Unreal, mobile, cloud, BLE, AI, and platform engineering teams.',
      'Translated creative intent into technical requirements, delivery plans, and operational support models.',
      'Built experiences where software, physical space, and player behavior had to work as one system.',
    ],
    proofPoints: [
      { label: 'Galactic Starcruiser game platform', to: '/work/starcruiser' },
      { label: 'Project 256 / Play Pavilion engine', to: '/work/project-256' },
      { label: 'Miss Minutes AI character experience', to: '/work/miss-minutes' },
      { label: 'Disney Uncharted Adventure' },
      { label: 'MagicBand+ Holiday Windows', to: '/work/holiday-windows' },
    ],
    cta: { label: 'See interactive systems work', to: '/work' },
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
    translation:
      'Live-service operations, KPI tracking, release readiness, incident escalation, telemetry, dashboards, support models, bug triage, and post-launch improvement.',
    practice: [
      'Built operational models for live guest-facing systems.',
      'Managed L1/L2 support structures, release cadence, monitoring, alerting, escalation, and partner readiness.',
      'Used observability and workflow tools including Splunk, New Relic, AppDynamics, and task/bug tracking systems.',
      'Prioritized bugs and incidents based on guest/player impact, severity, and operational risk.',
      'Improved reliability, support response, and operational compliance through process and dashboard visibility.',
    ],
    proofPoints: [
      { label: 'Magic Mobile / BLE / Location Services sustainment', to: '/work/magic-mobile' },
      { label: 'Digital Signage / Asgard' },
      { label: 'Virtual Guest Services', to: '/work/virtual-guest-services' },
      { label: 'World of Color Happiness', to: '/work/world-of-color' },
      { label: 'Accessibility mobile platform', to: '/work/accessibility' },
    ],
    cta: { label: 'Review live systems work', to: '/work' },
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
    translation:
      'Shipping new player experiences where the path is not fully known yet — reducing ambiguity, creating operating models, validating technical feasibility, and launching under real-world constraints.',
    practice: [
      'Delivered released and unreleased R&D-style products requiring new technical, operational, and creative approaches.',
      'Helped teams move from unclear concept to executable roadmap.',
      'Created delivery structure, validation plans, release paths, and support models for experiences without a pre-existing template.',
      'Operated in environments where failure would be visible to real guests/users in real time.',
    ],
    proofPoints: [
      { label: 'Star Wars: Galactic Starcruiser', to: '/work/starcruiser' },
      { label: 'Miss Minutes', to: '/work/miss-minutes' },
      { label: 'MagicBand+ Holiday Windows', to: '/work/holiday-windows' },
      { label: 'Accessibility mobile platform', to: '/work/accessibility' },
      { label: 'World of Color Happiness', to: '/work/world-of-color' },
      { label: 'Project 256 / Play Pavilion engine', to: '/work/project-256' },
    ],
    cta: { label: 'View first-of-kind delivery examples', to: '/experience' },
  },
]

const TRANSLATION_ROWS = [
  {
    need: 'Live service operations',
    experience: 'Sustained mobile, BLE, location, signage, AI assistant, and guest-facing platforms in live environments.',
  },
  {
    need: 'Release and configuration management',
    experience: 'Coordinated deployments, go/no-go readiness, launch checklists, QA validation, partner approvals, and live updates.',
  },
  {
    need: 'KPI tracking and observability',
    experience: 'Used dashboards, telemetry, incident data, adoption metrics, engagement lift, compliance, and support response indicators.',
  },
  {
    need: 'Cross-functional production',
    experience: 'Partnered with engineering, product, design, QA, creative, vendors, operations, security, legal, and executive stakeholders.',
  },
  {
    need: 'Player/guest impact decisions',
    experience: 'Prioritized defects, escalations, and launch tradeoffs based on real user impact and operational risk.',
  },
  {
    need: 'Interactive systems delivery',
    experience: 'Delivered game-engine, mobile, AI, BLE, cloud, show-control, and physical-digital systems with real-time user interaction.',
  },
  {
    need: 'Portfolio and roadmap management',
    experience: 'Managed competing priorities across live systems, modernization efforts, support intake, feature delivery, and executive goals.',
  },
]

// ── Tier 1 featured projects ────────────────────────────────────
const TIER1 = [
  {
    id: 'starcruiser',
    name: 'Star Wars: Galactic Starcruiser',
    typeTag: 'Custom Game Platform',
    roleTag: 'Technical Producer',
    imageSrc: import.meta.env.BASE_URL + 'assets/project-images/swgs_hero_01.jpg',
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
    imageSrc: import.meta.env.BASE_URL + 'assets/project-images/falcon_01.jpg',
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
    imageSrc: import.meta.env.BASE_URL + 'assets/project-images/VGS_01.jpg',
    imageAlt: '',
    imagePosition: 'center center',
    imageFit: 'contain',
    summary:
      'Guest-facing AI chat assistant in the Disney Cruise Line Navigator app. Led sustainment readiness, monitoring, alerting, and the live-ops model for a bilingual mobile experience at sea.',
    impact: 'Disney Cruise Line Adventure · Live Ops',
    accentColor: '#69f0ae',
  },
]

export default function Overview() {
  const [activeCapabilityId, setActiveCapabilityId] = useState(null)
  const [restoreFocusTo, setRestoreFocusTo] = useState(null)
  const activeCapability = useMemo(
    () => PILLARS.find((pillar) => pillar.id === activeCapabilityId) ?? null,
    [activeCapabilityId]
  )

  function openCapability(id, triggerElement) {
    setRestoreFocusTo(triggerElement ?? null)
    setActiveCapabilityId(id)
  }

  function closeCapability() {
    setActiveCapabilityId(null)
  }

  return (
    <div className={styles.overview}>

      {/* ── Ambient background field ─────────────────── */}
      <MapField variant="overviewContentAware" />

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
            src={import.meta.env.BASE_URL + 'assets/avatar.png'}
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
      <CapabilityCards items={PILLARS} onSelect={openCapability} />

      <section className={styles.translationSection} aria-labelledby="game-production-translation">
        <h2 id="game-production-translation" className={styles.sectionLabel}>
          How This Translates to Game Production
        </h2>
        <p className={styles.translationBody}>
          My background is not adjacent to game production because it was simply
          {' '}“themed entertainment.” It is adjacent because I led live, player-facing
          interactive systems with real-time infrastructure, game engines, mobile platforms,
          operational telemetry, release dependencies, support models, and guest/player impact at scale.
        </p>
        <TranslationGrid rows={TRANSLATION_ROWS} />
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

      {activeCapability && (
        <CapabilityDetailModal
          capability={activeCapability}
          onClose={closeCapability}
          restoreFocusTo={restoreFocusTo}
        />
      )}

    </div>
  )
}
