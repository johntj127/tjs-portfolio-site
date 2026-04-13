import React, { useState } from 'react'
import styles from './WorldMap.module.css'

export default function NodeMarker({ node, isCurrent, isWalking, isDepressed, onClick }) {
  const [hovered, setHovered] = useState(false)

  const handleClick = () => { if (!isWalking) onClick(node.id) }

  return (
    <div
      className={styles.nodeWrapper}
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
    >
      {/* Hover tooltip */}
      {hovered && !isWalking && (
        <div className={styles.nodeLabel} style={{ borderColor: node.color }}>
          {node.label}
          {node.tagline && <span className={styles.nodeLabelTagline}>{node.tagline}</span>}
        </div>
      )}

      {/* SMW pulse rings — only rendered on current/active node */}
      {isCurrent && (
        <>
          <div className={styles.nodePulseRing} />
          <div className={styles.nodePulseRing2} />
        </>
      )}

      {/* Node radio button */}
      <div
        className={[
          styles.node,
          isCurrent   ? styles.nodeCurrent   : '',
          hovered     ? styles.nodeHovered   : '',
          isWalking   ? styles.nodeDisabled  : '',
          isDepressed ? styles.nodeDepressed : '',
        ].filter(Boolean).join(' ')}
        style={{ '--node-color': node.color }}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="button"
        tabIndex={isWalking ? -1 : 0}
        onKeyDown={e => e.key === 'Enter' && handleClick()}
        aria-label={`Navigate to ${node.label}`}
      >
        {/* Inner concentric ring (radio button look) */}
        <div className={styles.nodeShine} />
        <span className={styles.nodeSymbol}>{node.symbol}</span>
      </div>

      <div className={styles.nodeSubLabel}>{node.label}</div>
    </div>
  )
}
