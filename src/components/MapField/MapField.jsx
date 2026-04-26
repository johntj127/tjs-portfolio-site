import React from 'react'
import styles from './MapField.module.css'

// Shared decorative route network used by overview and future subpages.
// Coordinate space: 1060 x 900.
export default function MapField({ variant = 'overview', className = '' }) {
  const contentAwareOverview = variant === 'overviewContentAware'

  return (
    <svg
      className={[styles.field, styles[variant] ?? styles.overview, className].filter(Boolean).join(' ')}
      viewBox="0 0 1060 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {/* ── UPPER CEILING: contour arcs framing the top zone ────────── */}
      {/* Very quiet — frames the environment above hero content. */}
      <g opacity="0.30">
        <path
          d="M 0,52 C 180,34 420,62 660,44 S 920,56 1060,40"
          fill="none" stroke="currentColor" strokeWidth="0.7"
          strokeDasharray="5 16" strokeLinecap="round"
          className={styles.routePathSlow}
        />
        <path
          d="M 40,84 C 260,68 500,92 720,76 S 980,86 1060,74"
          fill="none" stroke="currentColor" strokeWidth="0.5"
          strokeDasharray="3 20" strokeLinecap="round"
        />
      </g>

      {/* ── PRIMARY: main artery — the dominant signal path ──────── */}
      <path
        d="M 55,480 C 150,410 272,334 418,268 S 630,300 784,452 S 944,486 1020,460"
        fill="none" stroke="currentColor" strokeWidth="1.9"
        strokeDasharray="11 7" strokeLinecap="round"
        className={styles.routePath}
      />

      {/* ── SECONDARY: supporting routes — step back visually ─────── */}
      <g className={styles.pathQuiet}>
        {/* Upper branch: primary hub → right waypoint → arcs to compass */}
        <path
          d="M 418,268 L 732,154 C 902,382 970,620 978,838"
          fill="none" stroke="currentColor" strokeWidth="1.0"
          strokeDasharray="7 10" strokeLinecap="round"
          className={styles.routePathSlow}
        />
        {/* Lower spur: secondary hub → card zone → terminates at compass */}
        <path
          d="M 784,452 L 762,556 L 836,684 L 978,838"
          fill="none" stroke="currentColor" strokeWidth="0.95"
          strokeDasharray="6 11" strokeLinecap="round"
          className={styles.routePathSlow}
        />
        {/* Western feeder: enters from upper-left, connects to primary hub */}
        <path
          d="M 80,110 L 200,200 L 418,268"
          fill="none" stroke="currentColor" strokeWidth="0.85"
          strokeDasharray="6 10" strokeLinecap="round"
          className={styles.routePath}
        />
      </g>

      {/* ── LOWER CLUSTER: hub + spurs anchoring the bottom zone ─────── */}
      {/* Intentional system structure in the lower third — not just color. */}
      <g opacity="0.90">
        {/* Primary lower hub */}
        <g transform="translate(382,798)">
          <circle cx="0" cy="0" r="5.8" />
          <circle cx="0" cy="0" r="15"  fill="none" strokeWidth="1.05" />
          <circle cx="0" cy="0" r="21"  fill="none" strokeWidth="0.46" strokeDasharray="2 6" />
          <line x1="-19" y1="0" x2="19" y2="0" strokeWidth="0.8" />
          <line x1="0" y1="-19" x2="0" y2="19" strokeWidth="0.8" />
        </g>
        {/* West spur */}
        <path
          d="M 382,798 L 156,840"
          fill="none" stroke="currentColor" strokeWidth="0.88"
          strokeDasharray="5 9" strokeLinecap="round"
          className={styles.routePathSlow}
        />
        {/* East spur */}
        <path
          d="M 382,798 L 596,820 L 780,804"
          fill="none" stroke="currentColor" strokeWidth="0.88"
          strokeDasharray="5 9" strokeLinecap="round"
          className={styles.routePathSlow}
        />
        {/* West terminal */}
        <g transform="translate(156,840)">
          <circle cx="0" cy="0" r="3" />
          <circle cx="0" cy="0" r="8.5" fill="none" strokeWidth="0.72" />
        </g>
        {/* East terminal */}
        <g transform="translate(780,804)">
          <circle cx="0" cy="0" r="3" />
          <circle cx="0" cy="0" r="8.5" fill="none" strokeWidth="0.72" />
        </g>
        {/* Mid-spur waypoint on east arm */}
        <g transform="translate(596,820)">
          <circle cx="0" cy="0" r="2" />
          <line x1="-7" y1="0" x2="7" y2="0" strokeWidth="0.62" />
          <line x1="0" y1="-7" x2="0" y2="7" strokeWidth="0.62" />
        </g>
      </g>

      {/* ── Node markers at route junctions ──────────────────────── */}

      {/* Primary hub — identity zone anchor */}
      <g transform="translate(418,268)" className={styles.hubGlow}>
        <circle cx="0" cy="0" r="7.5" />
        <circle cx="0" cy="0" r="19" fill="none" strokeWidth="1.3" />
        <circle cx="0" cy="0" r="27" fill="none" strokeWidth="0.55" strokeDasharray="3 6" />
        <circle cx="0" cy="0" r="37" fill="none" strokeWidth="0.7" className={styles.hubPulseRing} />
        <line x1="-23" y1="0" x2="23" y2="0" strokeWidth="0.9" />
        <line x1="0" y1="-23" x2="0" y2="23" strokeWidth="0.9" />
        <text x="27" y="-7" fontSize="7.5" fontFamily="monospace"
              stroke="none" letterSpacing="0.12em" opacity="0.45">04·12N</text>
        <text x="27" y="5"  fontSize="6"   fontFamily="monospace"
              stroke="none" letterSpacing="0.10em" opacity="0.32">PRIME</text>
      </g>

      {/* Secondary hub — featured-work threshold anchor */}
      <g transform="translate(784,452)" className={styles.hubGlow}>
        <circle cx="0" cy="0" r="6" />
        <circle cx="0" cy="0" r="18" fill="none" strokeWidth="1.1" />
        <circle cx="0" cy="0" r="25" fill="none" strokeWidth="0.45" strokeDasharray="2 5" />
        <circle cx="0" cy="0" r="32" fill="none" strokeWidth="0.62" className={styles.hubPulseRingSlow} />
        <line x1="-19" y1="0" x2="19" y2="0" strokeWidth="0.75" />
        <line x1="0" y1="-19" x2="0" y2="19" strokeWidth="0.75" />
        <text x="25" y="4" fontSize="7" fontFamily="monospace"
              stroke="none" letterSpacing="0.11em" opacity="0.38">07·09E</text>
      </g>

      {/* Waypoint — upper branch, right column (clear of hero text) */}
      <g transform="translate(732,154)">
        <circle cx="0" cy="0" r="4" />
        <circle cx="0" cy="0" r="12.5" fill="none" strokeWidth="0.85" />
        <line x1="-16" y1="0" x2="16" y2="0" strokeWidth="0.65" />
        <line x1="0" y1="-16" x2="0" y2="16" strokeWidth="0.65" />
        <text x="17" y="4" fontSize="6.5" fontFamily="monospace"
              stroke="none" letterSpacing="0.10em" opacity="0.30">ALPHA</text>
      </g>

      {/* Small node — western feeder origin */}
      <g transform="translate(80,110)">
        <circle cx="0" cy="0" r="3" />
        <circle cx="0" cy="0" r="9.5" fill="none" strokeWidth="0.65" />
      </g>

      {/* Small node — lower spur mid (en route to compass) */}
      <g transform="translate(836,684)">
        <circle cx="0" cy="0" r="3" />
        <circle cx="0" cy="0" r="9.5" fill="none" strokeWidth="0.65" />
      </g>

      {/* ── Compass — navigational anchor, lower-right ───────────────── */}
      {/* A single elegant compass rose grounds the map language.
          N spoke longer; intercardinal ticks give it instrument character. */}
      <g transform="translate(978, 838)" opacity="0.62" className={styles.hubGlow}>
        <circle cx="0" cy="0" r="20"  fill="none" strokeWidth="0.7" />
        <circle cx="0" cy="0" r="11"  fill="none" strokeWidth="0.4" strokeDasharray="2 7" />
        {/* Cardinal spokes */}
        <line x1="0"   y1="-26" x2="0"   y2="-15" strokeWidth="1.1" />
        <line x1="0"   y1="15"  x2="0"   y2="26"  strokeWidth="0.65" />
        <line x1="-26" y1="0"   x2="-15" y2="0"   strokeWidth="0.65" />
        <line x1="15"  y1="0"   x2="26"  y2="0"   strokeWidth="0.65" />
        {/* Intercardinal ticks */}
        <line x1="-18" y1="-18" x2="-22" y2="-22" strokeWidth="0.4" />
        <line x1="18"  y1="-18" x2="22"  y2="-22" strokeWidth="0.4" />
        <line x1="-18" y1="18"  x2="-22" y2="22"  strokeWidth="0.4" />
        <line x1="18"  y1="18"  x2="22"  y2="22"  strokeWidth="0.4" />
        {/* Center diamond */}
        <rect x="-3.5" y="-3.5" width="7" height="7" transform="rotate(45)" />
        {/* N label */}
        <text x="0" y="-31" fontSize="7" fontFamily="monospace" stroke="none"
              textAnchor="middle" letterSpacing="0.14em">N</text>
      </g>

      {/* ── Coordinate labels — kept restrained, paths are primary ─── */}
      <text x="44"  y="820" fontSize="7"   fontFamily="monospace"
            stroke="none" letterSpacing="0.12em" fill="currentColor" opacity="0.28">28·4W</text>
      <text x="862" y="62"  fontSize="6.5" fontFamily="monospace"
            stroke="none" letterSpacing="0.12em" fill="currentColor" opacity="0.24">SECTOR·7</text>
      <text x="664" y="734" fontSize="6"   fontFamily="monospace"
            stroke="none" letterSpacing="0.10em" fill="currentColor" opacity="0.30">61·9N</text>

      {/* ── Drifting scatter — adds organic depth behind the routes ── */}

      {/* Group A: slow 28s drift */}
      <g className={styles.driftA}>
        <rect x="-2"   y="-2"   width="4" height="4" transform="translate(85,140)  rotate(45)" />
        <rect x="-2"   y="-2"   width="4" height="4" transform="translate(820,95)  rotate(45)" />
        <rect x="-2"   y="-2"   width="4" height="4" transform="translate(970,460) rotate(45)" />
        <rect x="-1.5" y="-1.5" width="3" height="3" transform="translate(100,720) rotate(45)" />
        <circle cx="380" cy="640" r="1.5" />
        <circle cx="590" cy="50"  r="1.5" />
      </g>

      {/* Group B: medium 22s drift */}
      <g className={styles.driftB}>
        <rect x="-2"   y="-2"   width="4" height="4" transform="translate(270,65)  rotate(45)" />
        <rect x="-1.5" y="-1.5" width="3" height="3" transform="translate(120,390) rotate(45)" />
        <rect x="-1.5" y="-1.5" width="3" height="3" transform="translate(680,810) rotate(45)" />
        <circle cx="50"  cy="720" r="1.5" />
        <circle cx="610" cy="460" r="1"   />
        <line x1="860" y1="200" x2="872" y2="190" strokeWidth="0.7" />
        <line x1="490" y1="780" x2="503" y2="780" strokeWidth="0.7" />
      </g>

      {/* Group C: fast 18s drift */}
      <g className={styles.driftC}>
        <rect x="-2"   y="-2"   width="4" height="4" transform="translate(900,760) rotate(45)" />
        <rect x="-1.5" y="-1.5" width="3" height="3" transform="translate(200,840) rotate(45)" />
        <circle cx="1000" cy="200" r="1"   />
        <circle cx="920"  cy="630" r="1.5" />
        <line x1="150" y1="200" x2="150" y2="214" strokeWidth="0.7" />
        <line x1="1020" y1="640" x2="1034" y2="630" strokeWidth="0.7" />
      </g>

      {contentAwareOverview && (
        <>
          {/* Left gutter route — active signal channel beside the dashboard */}
          <g className={styles.contentAwareRoute}>
            <path
              d="M 88,168 C 104,254 96,342 116,430 S 118,610 96,762"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.05"
              strokeDasharray="4 12"
              strokeLinecap="round"
              className={styles.routePathSlow}
            />
            <g transform="translate(108,344)" className={styles.contentAwareNode}>
              <circle cx="0" cy="0" r="3.5" />
              <circle cx="0" cy="0" r="10" fill="none" strokeWidth="0.75" />
              <circle cx="0" cy="0" r="16" fill="none" strokeWidth="0.55" className={styles.hubPulseRingSlow} />
            </g>
            <g transform="translate(118,520)" className={styles.contentAwareNode}>
              <circle cx="0" cy="0" r="2.8" />
              <circle cx="0" cy="0" r="8.5" fill="none" strokeWidth="0.62" />
            </g>
            <g transform="translate(102,692)" className={styles.contentAwareNode}>
              <circle cx="0" cy="0" r="3.2" />
              <circle cx="0" cy="0" r="9.5" fill="none" strokeWidth="0.7" />
            </g>
          </g>

          {/* Right-side sweep — follows the open purple negative space */}
          <g className={styles.contentAwareSweep}>
            <path
              d="M 934,116 C 1008,174 1018,316 950,408 S 910,612 968,774"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.12"
              strokeDasharray="7 10"
              strokeLinecap="round"
              className={styles.routePath}
            />
            <path
              d="M 880,154 C 956,190 970,286 922,374"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.82"
              strokeDasharray="3 13"
              strokeLinecap="round"
              className={styles.routePathSlow}
            />
            <g transform="translate(944,252)" className={styles.contentAwareNode}>
              <circle cx="0" cy="0" r="4.5" />
              <circle cx="0" cy="0" r="14" fill="none" strokeWidth="0.8" />
              <line x1="-16" y1="0" x2="16" y2="0" strokeWidth="0.6" />
              <line x1="0" y1="-16" x2="0" y2="16" strokeWidth="0.6" />
            </g>
            <g transform="translate(934,624)" className={styles.contentAwareNode}>
              <circle cx="0" cy="0" r="3.2" />
              <circle cx="0" cy="0" r="9.5" fill="none" strokeWidth="0.68" />
            </g>
          </g>

          {/* Lower connector — routes around the translation matrix base */}
          <g className={styles.contentAwareLower}>
            <path
              d="M 204,764 C 314,714 448,714 582,744 S 842,760 978,724"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.96"
              strokeDasharray="6 11"
              strokeLinecap="round"
              className={styles.routePathSlow}
            />
            <g transform="translate(258,746)" className={styles.contentAwareNode}>
              <circle cx="0" cy="0" r="2.6" />
              <circle cx="0" cy="0" r="8" fill="none" strokeWidth="0.58" />
            </g>
            <g transform="translate(622,748)" className={styles.contentAwareNode}>
              <circle cx="0" cy="0" r="2.6" />
              <line x1="-8" y1="0" x2="8" y2="0" strokeWidth="0.55" />
              <line x1="0" y1="-8" x2="0" y2="8" strokeWidth="0.55" />
            </g>
            <g transform="translate(908,736)" className={styles.contentAwareNode}>
              <circle cx="0" cy="0" r="3" />
              <circle cx="0" cy="0" r="9" fill="none" strokeWidth="0.64" />
            </g>
          </g>
        </>
      )}
    </svg>
  )
}
