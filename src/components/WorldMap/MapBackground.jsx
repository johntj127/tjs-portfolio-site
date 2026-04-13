import React from 'react'
import styles from './WorldMap.module.css'

/**
 * SMW OVERWORLD — built from screenshot reference.
 *
 * Reference observations:
 *   • Island base = flat green, sandy beach border, dark rocky rim
 *   • NO cliff bands — hills ARE the terrain
 *   • Hills are dense, overlapping, fill almost all of the green area
 *   • Each hill: bright lime-green radial body, white oval eyes, dark pupils, glint
 *   • Trees: nearly-black tight circle clusters, no detail
 *   • Path: tan strip (handled by PathLine.jsx)
 *   • Node dots: on path (handled by NodeMarker.jsx)
 *
 * Hills are rendered back-to-front (ascending cy) so later hills
 * overlap earlier ones, creating natural foreground depth.
 *
 * Node positions (SVG 0-100 = viewport %):
 *   Contact(8,63) · Experience(27,46) · Home(50,57)
 *   Projects(73,39) · Awards(92,53)
 */

// rx/ry kept nearly equal so hills appear round on 16:9 screens
// (SVG stretches: 1 X-unit ≈ 1.6× a Y-unit visually at 1440×900)
const HILL_MOUNDS = [
  // ── Back row (top of island) ───────────────────────────────────────
  { id:'h-top',  cx:50,  cy:24,  rx:12.5, ry:12.0, eyeSpread:4.1 },
  { id:'h-ul',   cx:15,  cy:27,  rx:10.5, ry:10.0, eyeSpread:3.5 },
  { id:'h-ur',   cx:83,  cy:22,  rx:11.5, ry:11.0, eyeSpread:3.8 },
  // ── Middle row ────────────────────────────────────────────────────
  { id:'h-exp',  cx:26,  cy:42,  rx:12.5, ry:12.0, eyeSpread:4.1 },  // Experience
  { id:'h-proj', cx:73,  cy:37,  rx:13.5, ry:12.5, eyeSpread:4.4 },  // Projects
  { id:'h-ml',   cx:42,  cy:46,  rx: 9.5, ry: 9.0, eyeSpread:3.1 },  // mid filler
  { id:'h-mr',   cx:62,  cy:45,  rx: 9.5, ry: 9.0, eyeSpread:3.1 },  // mid filler
  // ── Front row (foreground) ────────────────────────────────────────
  { id:'h-cont', cx:11,  cy:61,  rx: 9.5, ry: 9.0, eyeSpread:3.1 },  // Contact
  { id:'h-home', cx:50,  cy:54,  rx:15.5, ry:14.5, eyeSpread:5.1 },  // Home — biggest
  { id:'h-awd',  cx:89,  cy:55,  rx:10.5, ry:10.0, eyeSpread:3.5 },  // Awards
  { id:'h-bot',  cx:50,  cy:74,  rx:11.5, ry:11.0, eyeSpread:3.8 },  // lower filler
]

const WATER_GLINTS = [
  { id:'w1', x:'3%',  y:'12%', delay:'0s'   },
  { id:'w2', x:'91%', y:'8%',  delay:'0.8s' },
  { id:'w3', x:'96%', y:'58%', delay:'1.4s' },
  { id:'w4', x:'2%',  y:'72%', delay:'2.1s' },
  { id:'w5', x:'50%', y:'4%',  delay:'0.4s' },
  { id:'w6', x:'50%', y:'91%', delay:'1.8s' },
]

export default function MapBackground() {
  return (
    <div className={styles.background}>
      {WATER_GLINTS.map(g => (
        <div
          key={g.id}
          className={styles.waterGlint}
          style={{ left: g.x, top: g.y, animationDelay: g.delay }}
        />
      ))}

      <svg
        className={styles.islandSvg}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Hill body — bright lime summit, darker flanks, matches SMW screenshot */}
          <radialGradient id="hillBody" cx="34%" cy="26%" r="70%">
            <stop offset="0%"   stopColor="#96e832" />
            <stop offset="35%"  stopColor="#60c018" />
            <stop offset="100%" stopColor="#348808" />
          </radialGradient>

          {/* Tree canopy — near-black top-down blobs */}
          <radialGradient id="treeTop" cx="32%" cy="28%" r="65%">
            <stop offset="0%"   stopColor="#1c8808" />
            <stop offset="60%"  stopColor="#0a4c04" />
            <stop offset="100%" stopColor="#052002" />
          </radialGradient>
        </defs>

        {/* ════════════════════════════════════════════════════════
            ISLAND BASE — 3 layers only, no cliff bands
        ════════════════════════════════════════════════════════ */}

        {/* Rocky outer rim */}
        <path
          d="M 12,14 C 22,2  44,2  59,6  C 74,10 87,4  96,14
             C 102,24 100,38 99,51 C 98,64 100,75 92,84
             C 84,93  65,97  49,95 C 33,93 15,88  7,76
             C -1,64  1,47   3,34  C 5,21  8,16  12,14 Z"
          fill="#4e2806" opacity="0.55"
        />

        {/* Sandy beach */}
        <path
          d="M 14,16 C 24,4  44,4  58,8  C 72,12 85,6  94,16
             C 100,26 98,38 97,50 C 96,62 98,73 90,82
             C 82,91  64,95  48,93 C 32,91 16,86  8,74
             C 0,62   2,46   4,34  C 6,22  10,18 14,16 Z"
          fill="#d4a840"
        />

        {/* Flat green island — hills sit on top */}
        <path
          d="M 17,19 C 27,8  44,7  57,11 C 70,15 83,9  91,18
             C 97,27 95,39 94,50 C 93,62 95,71 87,79
             C 79,87 61,91 45,89 C 29,87 16,82  9,71
             C 2,60  4,46   6,34  C 8,22  13,20 17,19 Z"
          fill="#5ab210"
        />

        {/* ════════════════════════════════════════════════════════
            SMW HILL MOUNDS — rendered back-to-front
        ════════════════════════════════════════════════════════ */}
        {HILL_MOUNDS.map(m => {
          // Eyes sit in the upper-center of the hill face
          const eyeY    = m.cy - m.ry * 0.13
          const eyeRx   = m.rx * 0.18
          const eyeRy   = m.ry * 0.29
          const leftX   = m.cx - m.eyeSpread * 0.52
          const rightX  = m.cx + m.eyeSpread * 0.52
          const pupilDX = eyeRx * 0.08
          const pupilDY = eyeRy * 0.16
          const pupilR  = Math.min(eyeRx, eyeRy) * 0.56

          return (
            <g key={m.id}>
              {/* Soft cast shadow */}
              <ellipse
                cx={m.cx + m.rx * 0.07} cy={m.cy + m.ry * 0.16}
                rx={m.rx * 1.04}         ry={m.ry * 0.55}
                fill="#083a06" opacity="0.18"
              />
              {/* Hill body */}
              <ellipse
                cx={m.cx} cy={m.cy} rx={m.rx} ry={m.ry}
                fill="url(#hillBody)" stroke="#1a5a06" strokeWidth="0.48"
              />
              {/* Top-left summit sheen */}
              <ellipse
                cx={m.cx - m.rx * 0.28} cy={m.cy - m.ry * 0.26}
                rx={m.rx * 0.40}         ry={m.ry * 0.32}
                fill="rgba(255,255,255,0.17)"
              />

              {/* Left eye — white oval, dark pupil, glint */}
              <ellipse cx={leftX}  cy={eyeY} rx={eyeRx} ry={eyeRy}
                       fill="white" stroke="#1a4a06" strokeWidth="0.28" />
              <circle  cx={leftX  + pupilDX} cy={eyeY + pupilDY} r={pupilR}
                       fill="#181818" />
              <circle  cx={leftX  + pupilDX - pupilR * 0.42}
                       cy={eyeY   + pupilDY - pupilR * 0.38}
                       r={pupilR  * 0.30} fill="white" />

              {/* Right eye */}
              <ellipse cx={rightX} cy={eyeY} rx={eyeRx} ry={eyeRy}
                       fill="white" stroke="#1a4a06" strokeWidth="0.28" />
              <circle  cx={rightX + pupilDX} cy={eyeY + pupilDY} r={pupilR}
                       fill="#181818" />
              <circle  cx={rightX + pupilDX - pupilR * 0.42}
                       cy={eyeY   + pupilDY - pupilR * 0.38}
                       r={pupilR  * 0.30} fill="white" />
            </g>
          )
        })}

        {/* ════════════════════════════════════════════════════════
            TREES — near-black clusters, no detail
        ════════════════════════════════════════════════════════ */}

        {/* Upper-left */}
        <circle cx="13" cy="25" r="2.9" fill="url(#treeTop)" stroke="#041802" strokeWidth="0.30" />
        <circle cx="17" cy="22" r="2.5" fill="url(#treeTop)" stroke="#041802" strokeWidth="0.30" />
        <circle cx="10" cy="21" r="2.3" fill="url(#treeTop)" stroke="#041802" strokeWidth="0.30" />

        {/* Upper-right */}
        <circle cx="81" cy="19" r="2.7" fill="url(#treeTop)" stroke="#041802" strokeWidth="0.30" />
        <circle cx="85" cy="22" r="2.3" fill="url(#treeTop)" stroke="#041802" strokeWidth="0.30" />
        <circle cx="78" cy="22" r="2.5" fill="url(#treeTop)" stroke="#041802" strokeWidth="0.30" />

        {/* Lower-center */}
        <circle cx="49" cy="75" r="2.6" fill="url(#treeTop)" stroke="#041802" strokeWidth="0.30" />
        <circle cx="53" cy="73" r="2.2" fill="url(#treeTop)" stroke="#041802" strokeWidth="0.30" />
        <circle cx="45" cy="73" r="2.1" fill="url(#treeTop)" stroke="#041802" strokeWidth="0.30" />

        {/* ════════════════════════════════════════════════════════
            POND
        ════════════════════════════════════════════════════════ */}
        <ellipse cx="62" cy="46" rx="3.4" ry="2.0" fill="#3a9adc" opacity="0.85" />
        <ellipse cx="62" cy="45.4" rx="2.0" ry="0.95" fill="#80c8f8" opacity="0.45" />
        <ellipse cx="63" cy="45.1" rx="0.8"  ry="0.38" fill="#d0e8ff" opacity="0.65" />

      </svg>

      <div className={styles.cloudShadow1} />
      <div className={styles.cloudShadow2} />
    </div>
  )
}
