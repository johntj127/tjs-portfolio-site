import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './OverviewRouteOverlay.module.css'

const DESKTOP_PADDING = {
  heroExitX: 18,
  heroExitY: 30,
  heroRunwayX: 74,
  heroRunwayY: 62,
  cardsTop: 56,
  cardsRight: 52,
  cardsBottom: 52,
  translationLeft: 58,
  translationTop: 34,
  translationBottom: 54,
  featuredLeft: 54,
  featuredTop: 36,
  featuredBottom: 40,
  featuredRight: 58,
}

function point(x, y) {
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 }
}

function relRect(element, origin) {
  const rect = element.getBoundingClientRect()
  return {
    left: rect.left - origin.left,
    right: rect.right - origin.left,
    top: rect.top - origin.top,
    bottom: rect.bottom - origin.top,
    width: rect.width,
    height: rect.height,
  }
}

function distance(a, b) {
  return Math.hypot(b.x - a.x, b.y - a.y)
}

function insetPoint(from, to, amount) {
  const len = distance(from, to) || 1
  return point(to.x - ((to.x - from.x) / len) * amount, to.y - ((to.y - from.y) / len) * amount)
}

function outsetPoint(from, to, amount) {
  const len = distance(from, to) || 1
  return point(from.x + ((to.x - from.x) / len) * amount, from.y + ((to.y - from.y) / len) * amount)
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function clampPoint(p, width, height, padding = 12) {
  return point(
    clamp(p.x, padding, Math.max(padding, width - padding)),
    clamp(p.y, padding, Math.max(padding, height - padding))
  )
}

function dedupePoints(points, minDistance = 18) {
  return points.reduce((acc, current) => {
    if (!acc.length) {
      acc.push(current)
      return acc
    }

    const prev = acc[acc.length - 1]
    if (distance(prev, current) < minDistance) {
      acc[acc.length - 1] = point((prev.x + current.x) / 2, (prev.y + current.y) / 2)
      return acc
    }

    acc.push(current)
    return acc
  }, [])
}

function buildRoundedPath(points, radius = 24) {
  if (!points.length) return ''
  if (points.length === 1) return `M ${points[0].x},${points[0].y}`

  let path = `M ${points[0].x},${points[0].y}`

  for (let i = 1; i < points.length - 1; i += 1) {
    const prev = points[i - 1]
    const current = points[i]
    const next = points[i + 1]
    const limit = Math.min(radius, distance(prev, current) / 2, distance(current, next) / 2)

    if (!Number.isFinite(limit) || limit <= 0.5) {
      path += ` L ${current.x},${current.y}`
      continue
    }

    const before = insetPoint(prev, current, limit)
    const after = outsetPoint(current, next, limit)
    path += ` L ${before.x},${before.y}`
    path += ` Q ${current.x},${current.y} ${after.x},${after.y}`
  }

  const last = points[points.length - 1]
  path += ` L ${last.x},${last.y}`
  return path
}

function buildDesktopGeometry(overlayElement) {
  const root = overlayElement.parentElement
  if (!root) return null

  const hero = root.querySelector('section[aria-label="Introduction"]')
  const avatar = root.querySelector('img[alt="TJ Johnson"]')
  const capabilityRow = root.querySelector('section[aria-label="Core capabilities"]')
  const translationHeading = root.querySelector('#game-production-translation')
  const translationPanel = translationHeading?.closest('section')
  const featured = root.querySelector('section[aria-label="Featured work"]')
  const cards = featured ? [...featured.querySelectorAll('article[role="button"]')] : []

  if (!hero || !avatar || !capabilityRow || !translationPanel || !featured || cards.length < 3) {
    return null
  }

  const overlayRect = overlayElement.getBoundingClientRect()
  const heroRect = relRect(hero, overlayRect)
  const avatarRect = relRect(avatar, overlayRect)
  const capRect = relRect(capabilityRow, overlayRect)
  const translationRect = relRect(translationPanel, overlayRect)
  const [firstCard, , thirdCard] = cards.map((card) => relRect(card, overlayRect))

  const width = overlayRect.width
  const height = overlayRect.height

  const avatarStart = point(avatarRect.left + avatarRect.width * 0.42, avatarRect.bottom + 8)
  const avatarExit = point(
    avatarRect.left - DESKTOP_PADDING.heroExitX,
    avatarRect.bottom + DESKTOP_PADDING.heroExitY
  )
  const heroRunway = point(
    capRect.left - DESKTOP_PADDING.heroRunwayX,
    capRect.top - DESKTOP_PADDING.heroRunwayY
  )

  const cardsTopLeft = point(capRect.left - 32, capRect.top - DESKTOP_PADDING.cardsTop)
  const cardsTopRight = point(capRect.right + DESKTOP_PADDING.cardsRight, capRect.top - DESKTOP_PADDING.cardsTop)
  const cardsRightLower = point(capRect.right + DESKTOP_PADDING.cardsRight, capRect.bottom + DESKTOP_PADDING.cardsBottom)

  const cardsToTranslationY = Math.min(
    translationRect.top - DESKTOP_PADDING.translationTop,
    capRect.bottom + DESKTOP_PADDING.cardsBottom
  )
  const cardsBottomLeft = point(translationRect.left - DESKTOP_PADDING.translationLeft, cardsToTranslationY)

  const translationLeftTop = point(
    translationRect.left - DESKTOP_PADDING.translationLeft,
    translationRect.top - 18
  )
  const translationLeftBottom = point(translationRect.left - DESKTOP_PADDING.translationLeft, translationRect.bottom + DESKTOP_PADDING.translationBottom)
  const featuredTopY = firstCard.top - DESKTOP_PADDING.featuredTop
  const featuredLeftX = firstCard.left - DESKTOP_PADDING.featuredLeft
  const featuredBottomY = Math.max(firstCard.bottom, thirdCard.bottom) + DESKTOP_PADDING.featuredBottom
  const featuredRightX = thirdCard.right + DESKTOP_PADDING.featuredRight
  const translationBottomRun = point(featuredLeftX, translationRect.bottom + DESKTOP_PADDING.translationBottom)

  const featuredApproach = point(featuredLeftX, featuredTopY)
  const featuredLeftBottom = point(featuredLeftX, featuredBottomY)
  const featuredRightBottom = point(featuredRightX, featuredBottomY)
  const featuredRightTop = point(featuredRightX, featuredTopY + 6)
  const exit = point(Math.min(width - 30, featuredRightX + 86), featuredTopY + 6)

  const routePoints = dedupePoints([
    clampPoint(avatarStart, width, height),
    clampPoint(avatarExit, width, height),
    clampPoint(heroRunway, width, height),
    clampPoint(cardsTopLeft, width, height),
    clampPoint(cardsTopRight, width, height),
    clampPoint(cardsRightLower, width, height),
    clampPoint(cardsBottomLeft, width, height),
    clampPoint(translationLeftTop, width, height),
    clampPoint(translationLeftBottom, width, height),
    clampPoint(translationBottomRun, width, height),
    clampPoint(featuredApproach, width, height),
    clampPoint(featuredLeftBottom, width, height),
    clampPoint(featuredRightBottom, width, height),
    clampPoint(featuredRightTop, width, height),
    clampPoint(exit, width, height),
  ])

  return {
    width,
    height,
    path: buildRoundedPath(routePoints, 24),
    nodes: [
      { x: avatarStart.x, y: avatarStart.y, pulse: false, core: 4.6, ring: 11.8 },
      { x: cardsTopRight.x, y: cardsTopRight.y, pulse: true, core: 5, ring: 14 },
      { x: translationLeftBottom.x, y: translationLeftBottom.y, pulse: true, core: 5.1, ring: 14.6 },
      { x: translationBottomRun.x, y: translationBottomRun.y, pulse: false, core: 4.4, ring: 12.2 },
      { x: featuredLeftBottom.x, y: featuredLeftBottom.y, pulse: false, core: 4.4, ring: 12.2 },
      { x: featuredRightTop.x, y: featuredRightTop.y, pulse: true, core: 4.8, ring: 13.4 },
      { x: exit.x, y: exit.y, pulse: false, core: 4.4, ring: 12.2 },
    ],
  }
}

function buildMobileGeometry(overlayElement) {
  const root = overlayElement.parentElement
  if (!root) return null

  const hero = root.querySelector('section[aria-label="Introduction"]')
  const avatar = root.querySelector('img[alt="TJ Johnson"]')
  const capabilityRow = root.querySelector('section[aria-label="Core capabilities"]')
  const translationHeading = root.querySelector('#game-production-translation')
  const translationPanel = translationHeading?.closest('section')
  const featured = root.querySelector('section[aria-label="Featured work"]')
  const cards = featured ? [...featured.querySelectorAll('article[role="button"]')] : []

  if (!hero || !avatar || !capabilityRow || !translationPanel || !featured || !cards.length) {
    return null
  }

  const overlayRect = overlayElement.getBoundingClientRect()
  const heroRect = relRect(hero, overlayRect)
  const avatarRect = relRect(avatar, overlayRect)
  const capRect = relRect(capabilityRow, overlayRect)
  const translationRect = relRect(translationPanel, overlayRect)
  const featuredRect = relRect(featured, overlayRect)

  const width = overlayRect.width
  const height = overlayRect.height
  const laneX = clamp(Math.min(heroRect.left - 18, avatarRect.left - 18), 26, Math.max(26, width * 0.18))

  const points = dedupePoints([
    clampPoint(point(avatarRect.left + avatarRect.width * 0.36, avatarRect.bottom + 10), width, height, 8),
    clampPoint(point(laneX, avatarRect.bottom + 26), width, height, 8),
    clampPoint(point(laneX, capRect.top - 20), width, height, 8),
    clampPoint(point(laneX, translationRect.top - 18), width, height, 8),
    clampPoint(point(laneX, featuredRect.top - 18), width, height, 8),
    clampPoint(point(laneX, featuredRect.bottom + 24), width, height, 8),
    clampPoint(point(width * 0.72, featuredRect.bottom + 26), width, height, 8),
  ], 20)

  return {
    width,
    height,
    path: buildRoundedPath(points, 20),
    nodes: [
      { x: points[0].x, y: points[0].y, pulse: false, core: 4.4, ring: 11.6 },
      { x: points[2].x, y: points[2].y, pulse: true, core: 4.8, ring: 13.6 },
      { x: points[3].x, y: points[3].y, pulse: true, core: 4.8, ring: 13.8 },
      { x: points[4].x, y: points[4].y, pulse: false, core: 4.4, ring: 12.6 },
      { x: points[5].x, y: points[5].y, pulse: true, core: 4.6, ring: 13.2 },
    ],
    ticks: [
      { d: `M ${laneX + 4},${heroRect.bottom + 18} C ${laneX + 46},${heroRect.bottom + 18} ${laneX + 82},${heroRect.bottom + 22} ${laneX + 118},${heroRect.bottom + 32}` },
      { d: `M ${laneX + 4},${capRect.top + 36} C ${laneX + 52},${capRect.top + 36} ${laneX + 94},${capRect.top + 40} ${laneX + 132},${capRect.top + 52}` },
      { d: `M ${laneX + 4},${translationRect.top + 58} C ${laneX + 56},${translationRect.top + 58} ${laneX + 102},${translationRect.top + 62} ${laneX + 142},${translationRect.top + 74}` },
      { d: `M ${laneX + 4},${featuredRect.top + 60} C ${laneX + 62},${featuredRect.top + 60} ${laneX + 112},${featuredRect.top + 64} ${laneX + 156},${featuredRect.top + 76}` },
    ],
  }
}

export default function OverviewRouteOverlay() {
  const overlayRef = useRef(null)
  const rafRef = useRef(0)
  const [desktopGeometry, setDesktopGeometry] = useState(null)
  const [mobileGeometry, setMobileGeometry] = useState(null)

  useEffect(() => {
    const overlayElement = overlayRef.current
    if (!overlayElement) return undefined

    const root = overlayElement.parentElement
    if (!root) return undefined

    const measure = () => {
      rafRef.current = 0
      setDesktopGeometry(buildDesktopGeometry(overlayElement))
      setMobileGeometry(buildMobileGeometry(overlayElement))
    }

    const scheduleMeasure = () => {
      if (rafRef.current) return
      rafRef.current = window.requestAnimationFrame(measure)
    }

    scheduleMeasure()

    const observer = new ResizeObserver(scheduleMeasure)
    observer.observe(root)

    const elements = [
      root.querySelector('section[aria-label="Introduction"]'),
      root.querySelector('section[aria-label="Core capabilities"]'),
      root.querySelector('#game-production-translation')?.closest('section'),
      root.querySelector('section[aria-label="Featured work"]'),
      ...root.querySelectorAll('article[role="button"]'),
    ].filter(Boolean)

    elements.forEach((element) => observer.observe(element))
    window.addEventListener('resize', scheduleMeasure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', scheduleMeasure)
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  const desktopViewBox = useMemo(() => {
    if (!desktopGeometry) return '0 0 1200 1900'
    return `0 0 ${Math.max(1200, desktopGeometry.width)} ${Math.max(1900, desktopGeometry.height)}`
  }, [desktopGeometry])

  return (
    <div ref={overlayRef} className={styles.overlay} aria-hidden="true">
      <svg
        className={styles.desktop}
        viewBox={desktopViewBox}
        preserveAspectRatio="none"
        focusable="false"
      >
        {desktopGeometry && (
          <>
            <path
              className={styles.primaryRoute}
              d={desktopGeometry.path}
            />

            <g className={styles.nodes}>
              {desktopGeometry.nodes.map((node, index) => (
                <g key={`${node.x}-${node.y}-${index}`} transform={`translate(${node.x} ${node.y})`}>
                  <circle r={node.core} className={styles.nodeCore} />
                  <circle
                    r={node.ring}
                    className={node.pulse ? styles.nodeRingPulse : styles.nodeRing}
                  />
                </g>
              ))}
            </g>

            <g className={styles.travellers}>
              <g className={styles.traveller}>
                <circle r="2.4" />
                <circle r="6.6" className={styles.pulseRing} />
                <animateMotion
                  dur="18s"
                  repeatCount="indefinite"
                  rotate="auto"
                  path={desktopGeometry.path}
                />
              </g>
              <g className={styles.traveller}>
                <circle r="2.1" />
                <circle r="5.9" className={styles.pulseRing} />
                <animateMotion
                  dur="18s"
                  begin="-6s"
                  repeatCount="indefinite"
                  rotate="auto"
                  path={desktopGeometry.path}
                />
              </g>
              <g className={styles.traveller}>
                <circle r="2.3" />
                <circle r="6.2" className={styles.pulseRing} />
                <animateMotion
                  dur="18s"
                  begin="-12s"
                  repeatCount="indefinite"
                  rotate="auto"
                  path={desktopGeometry.path}
                />
              </g>
            </g>
          </>
        )}
      </svg>

      <svg
        className={styles.mobile}
        viewBox={mobileGeometry ? `0 0 ${Math.max(420, mobileGeometry.width)} ${Math.max(2100, mobileGeometry.height)}` : '0 0 420 2100'}
        preserveAspectRatio="none"
        focusable="false"
      >
        {mobileGeometry && (
          <>
            <path
              className={styles.primaryRoute}
              d={mobileGeometry.path}
            />

            <g className={styles.dockingRoutes}>
              {mobileGeometry.ticks.map((tick, index) => (
                <path key={`${tick.d}-${index}`} className={styles.dockTick} d={tick.d} />
              ))}
            </g>

            <g className={styles.nodes}>
              {mobileGeometry.nodes.map((node, index) => (
                <g key={`${node.x}-${node.y}-${index}`} transform={`translate(${node.x} ${node.y})`}>
                  <circle r={node.core} className={styles.nodeCore} />
                  <circle
                    r={node.ring}
                    className={node.pulse ? styles.nodeRingPulse : styles.nodeRing}
                  />
                </g>
              ))}
            </g>

            <g className={styles.travellers}>
              <g className={styles.traveller}>
                <circle r="2.2" />
                <circle r="5.8" className={styles.pulseRing} />
                <animateMotion
                  dur="20s"
                  repeatCount="indefinite"
                  rotate="auto"
                  path={mobileGeometry.path}
                />
              </g>
              <g className={styles.traveller}>
                <circle r="2" />
                <circle r="5.4" className={styles.pulseRing} />
                <animateMotion
                  dur="20s"
                  begin="-10s"
                  repeatCount="indefinite"
                  rotate="auto"
                  path={mobileGeometry.path}
                />
              </g>
            </g>
          </>
        )}
      </svg>
    </div>
  )
}
