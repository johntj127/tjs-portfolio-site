import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './OverviewRouteOverlay.module.css'

const MOBILE_PATH = `M 26,132
  C 56,112 96,108 128,122
  C 156,136 172,164 172,198
  C 172,232 158,258 132,276
  C 94,302 68,338 58,386
  C 52,418 50,458 50,510
  L 50,1676
  C 50,1710 68,1728 102,1730
  L 332,1738`

const MOBILE_NODES = [
  { x: 172, y: 198, pulse: false, core: 4.4, ring: 11.6 },
  { x: 50, y: 510, pulse: true, core: 4.8, ring: 13.6 },
  { x: 50, y: 968, pulse: true, core: 4.8, ring: 13.8 },
  { x: 50, y: 1676, pulse: false, core: 4.4, ring: 12.6 },
  { x: 102, y: 1730, pulse: true, core: 4.6, ring: 13.2 },
]

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
  const capabilityRow = root.querySelector('section[aria-label="Core capabilities"]')
  const translationHeading = root.querySelector('#game-production-translation')
  const translationPanel = translationHeading?.closest('section')
  const featured = root.querySelector('section[aria-label="Featured work"]')
  const cards = featured ? [...featured.querySelectorAll('article[role="button"]')] : []

  if (!hero || !capabilityRow || !translationPanel || !featured || cards.length < 3) {
    return null
  }

  const overlayRect = overlayElement.getBoundingClientRect()
  const heroRect = relRect(hero, overlayRect)
  const capRect = relRect(capabilityRow, overlayRect)
  const translationRect = relRect(translationPanel, overlayRect)
  const featuredRect = relRect(featured, overlayRect)
  const [firstCard, secondCard, thirdCard] = cards.map((card) => relRect(card, overlayRect))

  const width = overlayRect.width
  const height = overlayRect.height

  const heroStart = point(Math.max(18, heroRect.left - 82), heroRect.top + 66)
  const heroOuter = point(heroRect.left - 26, heroRect.top + 18)
  const heroLead = point(heroRect.left + 18, heroRect.top + 20)
  const heroDrop = point(heroRect.left + 18, capRect.top - 48)

  const cardsTopLeft = point(capRect.left - 26, capRect.top - 40)
  const cardsTopRight = point(capRect.right + 30, capRect.top - 40)
  const cardsRightLower = point(capRect.right + 30, capRect.bottom + 32)
  const cardsBottomLeft = point(translationRect.left - 30, capRect.bottom + 32)

  const translationLeft = point(translationRect.left - 30, translationRect.top + 10)
  const translationLowerLeft = point(translationRect.left - 30, translationRect.bottom + 30)
  const translationBottomRun = point(firstCard.left - 34, translationRect.bottom + 30)

  const featuredApproach = point(firstCard.left - 34, firstCard.top - 28)
  const featuredLeft = point(firstCard.left - 34, firstCard.bottom + 28)
  const gutter12X = point((firstCard.right + secondCard.left) / 2, firstCard.bottom + 28)
  const secondTopGutter = point((firstCard.right + secondCard.left) / 2, secondCard.top - 26)
  const secondOuterRight = point(secondCard.right + 28, secondCard.top - 26)
  const secondLowerRight = point(secondCard.right + 28, secondCard.bottom + 28)
  const gutter23Lower = point((secondCard.right + thirdCard.left) / 2, secondCard.bottom + 28)
  const thirdTopGutter = point((secondCard.right + thirdCard.left) / 2, thirdCard.top - 26)
  const thirdOuterRight = point(thirdCard.right + 30, thirdCard.top - 26)
  const thirdLowerRight = point(thirdCard.right + 30, thirdCard.bottom + 24)
  const exit = point(Math.min(width - 22, thirdCard.right + 88), thirdCard.bottom + 24)

  const routePoints = [
    heroStart,
    heroOuter,
    heroLead,
    heroDrop,
    cardsTopLeft,
    cardsTopRight,
    cardsRightLower,
    cardsBottomLeft,
    translationLeft,
    translationLowerLeft,
    translationBottomRun,
    featuredApproach,
    featuredLeft,
    gutter12X,
    secondTopGutter,
    secondOuterRight,
    secondLowerRight,
    gutter23Lower,
    thirdTopGutter,
    thirdOuterRight,
    thirdLowerRight,
    exit,
  ]

  return {
    width,
    height,
    path: buildRoundedPath(routePoints, 24),
    nodes: [
      { x: heroOuter.x, y: heroOuter.y, pulse: false, core: 4.6, ring: 11.8 },
      { x: cardsTopRight.x, y: cardsTopRight.y, pulse: true, core: 5, ring: 14 },
      { x: translationLeft.x, y: translationLeft.y, pulse: true, core: 5.1, ring: 14.6 },
      { x: translationBottomRun.x, y: translationBottomRun.y, pulse: false, core: 4.4, ring: 12.2 },
      { x: secondOuterRight.x, y: secondOuterRight.y, pulse: false, core: 4.4, ring: 12.2 },
      { x: thirdOuterRight.x, y: thirdOuterRight.y, pulse: true, core: 4.8, ring: 13.4 },
      { x: exit.x, y: exit.y, pulse: false, core: 4.4, ring: 12.2 },
    ],
  }
}

export default function OverviewRouteOverlay() {
  const overlayRef = useRef(null)
  const rafRef = useRef(0)
  const [desktopGeometry, setDesktopGeometry] = useState(null)

  useEffect(() => {
    const overlayElement = overlayRef.current
    if (!overlayElement) return undefined

    const root = overlayElement.parentElement
    if (!root) return undefined

    const measure = () => {
      rafRef.current = 0
      setDesktopGeometry(buildDesktopGeometry(overlayElement))
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
        viewBox="0 0 420 2100"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          className={styles.primaryRoute}
          d={MOBILE_PATH}
        />

        <g className={styles.dockingRoutes}>
          <path className={styles.dockTick} d="M 54,454 C 104,454 144,458 182,470" />
          <path className={styles.dockTick} d="M 54,812 C 108,812 148,816 192,828" />
          <path className={styles.dockTick} d="M 54,1376 C 112,1376 156,1382 202,1394" />
          <path className={styles.dockTick} d="M 54,1622 C 118,1614 178,1616 238,1626" />
        </g>

        <g className={styles.nodes}>
          {MOBILE_NODES.map((node, index) => (
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
              path={MOBILE_PATH}
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
              path={MOBILE_PATH}
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
