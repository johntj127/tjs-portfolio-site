import React from 'react'
import styles from './WorldMap.module.css'

/**
 * SMW OVERWORLD PATH — top-down dotted track.
 *
 * Node positions (% coords, must match nodeConfig.js):
 *   Contact(8,63) → Experience(27,46) → Home(50,57)
 *           → Projects(73,39) → Awards(92,53)
 *
 * Visual approach: 4-layer rendering to match SMW's orange dot path —
 *   1. Dark grass channel (the worn path in the grass, widest)
 *   2. Sandy path fill (tan/dirt color)
 *   3. Orange/tan dot overlay (the iconic SMW dots, strokeDasharray)
 *   4. Highlight dot center (tiny bright center on each dot)
 *
 * All in 0–100 viewBox % units, stretched via preserveAspectRatio="none".
 */
export default function PathLine() {
  // Path winds across the island. Gentle curves — SMW overworld paths aren't
  // extreme rollercoasters, they're winding trails seen from above.
  const d = `
    M 8,63
    C 10,52  18,42  27,46
    C 36,50  42,60  50,57
    C 58,54  65,44  73,39
    C 81,44  87,52  92,53
  `.trim()

  return (
    <svg
      className={styles.pathSvg}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="dotGlow">
          <feGaussianBlur stdDeviation="0.15" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Layer 1: Worn grass channel — wide dark underlay */}
      <path d={d} fill="none" stroke="#2a6a14" strokeWidth="2.6"
        strokeLinecap="round" opacity="0.6" />

      {/* Layer 2: Sand / dirt path fill */}
      <path d={d} fill="none" stroke="#c8a040" strokeWidth="1.8"
        strokeLinecap="round" />

      {/* Layer 3: SMW orange dots — the iconic overworld path markers */}
      {/* strokeDasharray="dot gap" — round linecap turns dashes into circles */}
      <path d={d} fill="none" stroke="#e87820" strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="0.01 3.8"
        filter="url(#dotGlow)"
      />

      {/* Layer 4: Tiny highlight center on each dot */}
      <path d={d} fill="none" stroke="#ffd060" strokeWidth="0.8"
        strokeLinecap="round"
        strokeDasharray="0.01 3.8"
        opacity="0.7"
      />
    </svg>
  )
}
