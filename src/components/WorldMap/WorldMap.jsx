import React, { useState } from 'react'
import { NODES, NODE_MAP } from '../../utils/nodeConfig.js'
import { useMapState } from '../../hooks/useMapState.js'
import MapBackground from './MapBackground.jsx'
import PathLine from './PathLine.jsx'
import NodeMarker from './NodeMarker.jsx'
import Character from './Character.jsx'
import PanelContainer from '../Panels/PanelContainer.jsx'
import StartScreen from '../StartScreen/StartScreen.jsx'
import styles from './WorldMap.module.css'

export default function WorldMap({ onSwitchToPro }) {
  const { state, walkTo, closePanel } = useMapState()
  const {
    characterX, characterY, isWalking, facingRight,
    currentNodeId, activePanelId, isPanelOpen,
    depressedNodeId,
  } = state

  const currentNode = NODE_MAP[currentNodeId]

  // Start screen — show on load, hide when user presses start
  const [showStart, setShowStart] = useState(true)

  const handleStart = () => setShowStart(false)
  const handleSkip  = () => { setShowStart(false); onSwitchToPro() }
  const handleSignClick = () => setShowStart(true)

  return (
    <div className={styles.worldMap}>
      <MapBackground />
      <PathLine />

      {/* ── In-world sign post (visible when start screen dismissed) ──────── */}
      {!showStart && (
        <div
          className={styles.worldSign}
          onClick={handleSignClick}
          title="Show intro"
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && handleSignClick()}
          aria-label="Open intro screen"
        >
          <div className={styles.worldSignBoard}>
            <span className={styles.worldSignStar}>★</span>
            <span className={styles.worldSignText}>TJ</span>
          </div>
          <div className={styles.worldSignPole} />
        </div>
      )}

      {/* ── Nodes ─────────────────────────────────────────────────────────── */}
      {NODES.map(node => (
        <NodeMarker
          key={node.id}
          node={node}
          isCurrent={node.id === currentNodeId}
          isWalking={isWalking}
          isDepressed={node.id === depressedNodeId}
          onClick={walkTo}
        />
      ))}

      <Character x={characterX} y={characterY} isWalking={isWalking} facingRight={facingRight} />

      {/* ── HUD ───────────────────────────────────────────────────────────── */}
      <div className={styles.hud}>
        <div className={styles.hudBox}>
          <div className={styles.hudName}>TJ JOHNSON</div>
          <div className={styles.hudLocation}>
            {isWalking ? '▶ on the move...' : `▶ ${currentNode?.label ?? ''}`}
          </div>
          <div className={styles.hudYears}>20+ years · The Walt Disney Company</div>
        </div>
        <button className={styles.hudSkipBtn} onClick={onSwitchToPro}>
          Skip to Pro View
        </button>
      </div>

      {!isWalking && !isPanelOpen && !showStart && (
        <div className={styles.walkingHint}>click a location to explore</div>
      )}

      <PanelContainer panelId={activePanelId} isOpen={isPanelOpen} onClose={closePanel} />

      {/* ── Start Screen (on top of everything) ───────────────────────────── */}
      <StartScreen isOpen={showStart} onStart={handleStart} onSkip={handleSkip} />
    </div>
  )
}
