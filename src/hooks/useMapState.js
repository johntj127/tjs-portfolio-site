import { useReducer, useCallback, useRef } from 'react'
import { NODE_MAP, DEFAULT_NODE_ID, WALK_STEP_MS } from '../utils/nodeConfig.js'
import { getPathBetween, getDirection } from '../utils/pathfinding.js'

// ─── Initial state ────────────────────────────────────────────────────────────
const startNode = NODE_MAP[DEFAULT_NODE_ID]

const INITIAL_STATE = {
  currentNodeId:  DEFAULT_NODE_ID,
  characterX:     startNode.x,     // % of viewport width
  characterY:     startNode.y,     // % of viewport height
  isWalking:      false,
  facingRight:    true,
  activePanelId:  null,
  isPanelOpen:    false,
  depressedNodeId: null,           // briefly set on arrival for depress animation
}

// ─── Reducer ──────────────────────────────────────────────────────────────────
function mapReducer(state, action) {
  switch (action.type) {
    case 'WALK_START':
      return {
        ...state,
        isWalking:    true,
        facingRight:  action.facingRight,
        isPanelOpen:  false,
        activePanelId: null,
        depressedNodeId: null,
      }
    case 'WALK_STEP':
      return { ...state, currentNodeId: action.nodeId, characterX: action.x, characterY: action.y }
    case 'WALK_END':
      return {
        ...state,
        isWalking:      false,
        currentNodeId:  action.nodeId,
        characterX:     action.x,
        characterY:     action.y,
        depressedNodeId: action.nodeId,
      }
    case 'CLEAR_DEPRESS':
      return { ...state, depressedNodeId: null }
    case 'OPEN_PANEL':
      return { ...state, activePanelId: action.panelId, isPanelOpen: true }
    case 'CLOSE_PANEL':
      return { ...state, isPanelOpen: false }
    default:
      return state
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useMapState() {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)

  const isWalkingRef   = useRef(false)
  const currentNodeRef = useRef(DEFAULT_NODE_ID)

  const walkTo = useCallback(async (destId) => {
    if (isWalkingRef.current) return

    const fromId = currentNodeRef.current
    if (fromId === destId) {
      dispatch({ type: 'OPEN_PANEL', panelId: destId })
      return
    }

    const path = getPathBetween(fromId, destId)
    if (path.length === 0) return

    const facingRight = getDirection(fromId, destId) === 'right'
    isWalkingRef.current = true
    dispatch({ type: 'WALK_START', facingRight })

    for (const nodeId of path) {
      const node = NODE_MAP[nodeId]
      currentNodeRef.current = nodeId
      dispatch({ type: 'WALK_STEP', nodeId, x: node.x, y: node.y })
      await new Promise(resolve => setTimeout(resolve, WALK_STEP_MS))
    }

    isWalkingRef.current = false
    const dest = NODE_MAP[destId]
    dispatch({ type: 'WALK_END', nodeId: destId, x: dest.x, y: dest.y })

    // Clear depress after animation completes (450ms)
    setTimeout(() => dispatch({ type: 'CLEAR_DEPRESS' }), 450)

    dispatch({ type: 'OPEN_PANEL', panelId: destId })
  }, [])

  const closePanel = useCallback(() => dispatch({ type: 'CLOSE_PANEL' }), [])

  return { state, walkTo, closePanel }
}
