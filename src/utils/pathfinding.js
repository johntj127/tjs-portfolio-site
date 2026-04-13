import { NODES } from './nodeConfig.js'

/**
 * Returns the index of a node in the NODES array.
 */
export function getNodeIndex(nodeId) {
  return NODES.findIndex(n => n.id === nodeId)
}

/**
 * Returns an ordered array of node IDs to visit, starting AFTER startId
 * and ending AT endId (inclusive). Intermediate nodes are included so
 * the character passes through them without stopping.
 *
 * Example: getPathBetween('home', 'awards') → ['projects', 'awards']
 * Example: getPathBetween('awards', 'contact') → ['projects','home','experience','contact']
 */
export function getPathBetween(startId, endId) {
  const startIdx = getNodeIndex(startId)
  const endIdx   = getNodeIndex(endId)

  if (startIdx === -1 || endIdx === -1) return []
  if (startIdx === endIdx) return []

  const step = startIdx < endIdx ? 1 : -1
  const path = []

  for (let i = startIdx + step; i !== endIdx + step; i += step) {
    path.push(NODES[i].id)
  }

  return path // includes destination as last element
}

/**
 * Returns 'right', 'left', or 'none'.
 */
export function getDirection(fromId, toId) {
  const fromIdx = getNodeIndex(fromId)
  const toIdx   = getNodeIndex(toId)
  if (fromIdx === toIdx) return 'none'
  return fromIdx < toIdx ? 'right' : 'left'
}
