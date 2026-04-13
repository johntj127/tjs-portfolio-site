import React from 'react'
import styles from './WorldMap.module.css'

/**
 * TJ — pixel-art character.
 * Position driven by x/y percentages (sits on the curved path).
 * Both `left` and `top` use CSS transitions matching WALK_STEP_MS.
 * Character flips horizontally when walking left.
 */
export default function Character({ x, y, isWalking, facingRight }) {
  return (
    <div
      className={`${styles.character} ${isWalking ? (facingRight ? styles.charWalkRight : styles.charWalkLeft) : styles.charIdle}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden="true"
    >
      <CharacterSVG />
    </div>
  )
}

function CharacterSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 52"
      width="40" height="52" shapeRendering="crispEdges">
      {/* ── Hair ── */}
      <rect x="8"  y="0"  width="24" height="6"  fill="#3a1e00" />
      <rect x="6"  y="2"  width="4"  height="8"  fill="#3a1e00" />
      <rect x="30" y="2"  width="4"  height="8"  fill="#3a1e00" />
      {/* ── Head ── */}
      <rect x="8"  y="4"  width="24" height="18" fill="#f4a261" />
      {/* ── Ears ── */}
      <rect x="4"  y="8"  width="4"  height="6"  fill="#f4a261" />
      <rect x="32" y="8"  width="4"  height="6"  fill="#f4a261" />
      {/* ── Glasses ── */}
      <rect x="9"  y="10" width="9"  height="6"  fill="none" stroke="#666" strokeWidth="1.2" />
      <rect x="22" y="10" width="9"  height="6"  fill="none" stroke="#666" strokeWidth="1.2" />
      <rect x="18" y="12" width="4"  height="2"  fill="#888" />
      {/* ── Eyes ── */}
      <rect x="11" y="12" width="5"  height="2"  fill="#1a1a1a" />
      <rect x="24" y="12" width="5"  height="2"  fill="#1a1a1a" />
      {/* ── Nose ── */}
      <rect x="18" y="16" width="4"  height="2"  fill="#d4824a" />
      {/* ── Mustache ── */}
      <rect x="12" y="18" width="16" height="3"  fill="#2a1000" />
      <rect x="10" y="19" width="4"  height="2"  fill="#2a1000" />
      <rect x="26" y="19" width="4"  height="2"  fill="#2a1000" />
      {/* ── Neck ── */}
      <rect x="16" y="22" width="8"  height="4"  fill="#f4a261" />
      {/* ── Shirt ── */}
      <rect x="8"  y="26" width="24" height="14" fill="#1565c0" />
      <rect x="14" y="26" width="12" height="4"  fill="#1976d2" />
      {/* ── Arms ── */}
      <rect x="2"  y="26" width="6"  height="12" fill="#1565c0" />
      <rect x="32" y="26" width="6"  height="12" fill="#1565c0" />
      <rect x="2"  y="38" width="6"  height="4"  fill="#f4a261" />
      <rect x="32" y="38" width="6"  height="4"  fill="#f4a261" />
      {/* ── Pants ── */}
      <rect x="8"  y="40" width="10" height="12" fill="#1a237e" />
      <rect x="22" y="40" width="10" height="12" fill="#1a237e" />
      {/* ── Shoes ── */}
      <rect x="6"  y="48" width="12" height="4"  fill="#111111" />
      <rect x="22" y="48" width="12" height="4"  fill="#111111" />
    </svg>
  )
}
