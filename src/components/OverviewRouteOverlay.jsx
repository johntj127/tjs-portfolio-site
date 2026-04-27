import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './OverviewRouteOverlay.module.css'

const DESKTOP = {
  heroOrbitX: 26,
  heroOrbitY: 18,
  heroEmitterDrop: 26,
  capTop: 42,
  capRight: 42,
  capBottom: 54,
  translationLeft: 52,
  translationTop: 18,
  featuredLeft: 52,
  featuredTop: 28,
  featuredRight: 58,
  featuredBottom: 36,
}

const MOBILE = {
  laneInset: 20,
  capTick: 44,
  translationTick: 58,
  featuredTick: 62,
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

function dedupePoints(points, minDistance = 14) {
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

function buildRoundedPath(points, radius = 22) {
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

function measureSections(overlayElement) {
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
  return {
    width: overlayRect.width,
    height: overlayRect.height,
    hero: relRect(hero, overlayRect),
    avatar: relRect(avatar, overlayRect),
    capability: relRect(capabilityRow, overlayRect),
    translation: relRect(translationPanel, overlayRect),
    featured: relRect(featured, overlayRect),
    cards: cards.map((card) => relRect(card, overlayRect)),
  }
}

function buildDesktopSignalGeometry(measured) {
  if (!measured) return null

  const { width, height, hero, avatar, capability, translation, cards } = measured
  const [firstCard, , thirdCard] = cards

  const avatarCenter = point(avatar.left + avatar.width * 0.5, avatar.top + avatar.height * 0.52)
  const avatarOrigin = clampPoint(point(avatar.left + avatar.width * 0.18, avatar.bottom + 10), width, height)

  const heroOrbit = buildRoundedPath(dedupePoints([
    clampPoint(point(avatar.left - DESKTOP.heroOrbitX, avatar.top + avatar.height * 0.18), width, height),
    clampPoint(point(avatar.left - DESKTOP.heroOrbitX, avatar.bottom + avatar.height * 0.08), width, height),
    clampPoint(point(avatar.left + avatar.width * 0.3, avatar.bottom + DESKTOP.heroEmitterDrop), width, height),
    clampPoint(point(avatar.left + avatar.width * 0.62, avatar.bottom + 20), width, height),
  ]), 18)

  const capabilityAccent = buildRoundedPath(dedupePoints([
    clampPoint(point(capability.left - 18, capability.top - DESKTOP.capTop), width, height),
    clampPoint(point(capability.right + DESKTOP.capRight, capability.top - DESKTOP.capTop), width, height),
    clampPoint(point(capability.right + DESKTOP.capRight, capability.bottom + DESKTOP.capBottom - 18), width, height),
    clampPoint(point(capability.left + 54, capability.bottom + DESKTOP.capBottom), width, height),
  ]), 24)

  const translationAccent = buildRoundedPath(dedupePoints([
    clampPoint(point(translation.left - DESKTOP.translationLeft, translation.top - DESKTOP.translationTop), width, height),
    clampPoint(point(translation.left - DESKTOP.translationLeft, translation.top + 78), width, height),
    clampPoint(point(translation.left - 26, translation.top + 78), width, height),
  ]), 16)

  const featuredTop = firstCard.top - DESKTOP.featuredTop
  const featuredLeft = firstCard.left - DESKTOP.featuredLeft
  const featuredRight = thirdCard.right + DESKTOP.featuredRight
  const featuredBottom = Math.max(firstCard.bottom, thirdCard.bottom) + DESKTOP.featuredBottom

  const featuredAccent = buildRoundedPath(dedupePoints([
    clampPoint(point(featuredLeft, featuredTop + 22), width, height),
    clampPoint(point(featuredLeft, featuredTop), width, height),
    clampPoint(point(featuredLeft + 116, featuredTop), width, height),
    clampPoint(point(featuredRight, featuredTop + 12), width, height),
    clampPoint(point(featuredRight, featuredBottom - 18), width, height),
    clampPoint(point(featuredLeft + 96, featuredBottom), width, height),
  ]), 28)

  return {
    width,
    height,
    avatarCenter,
    avatarOrigin,
    motes: [
      { x: Math.max(20, hero.left - 38), y: hero.top + 86, drift: 82, delay: '0s', duration: '10.2s', size: 2.2, tint: 'gold' },
      { x: Math.max(24, capability.left - 46), y: capability.top + 154, drift: 110, delay: '-3.2s', duration: '13.4s', size: 2.6, tint: 'teal' },
      { x: capability.right + 54, y: capability.top + 118, drift: 94, delay: '-2.1s', duration: '12.4s', size: 2.1, tint: 'gold' },
      { x: firstCard.left - 38, y: firstCard.top + 124, drift: 74, delay: '-5.2s', duration: '11.6s', size: 2.4, tint: 'teal' },
      { x: thirdCard.right + 46, y: thirdCard.top + 92, drift: 88, delay: '-7.1s', duration: '12.8s', size: 2.2, tint: 'gold' },
    ],
    segments: [
      {
        key: 'hero',
        className: styles.heroSegment,
        paths: [
          { d: heroOrbit, travellerDuration: '11.8s', travellerOffset: '-2.8s' },
        ],
        nodes: [
          { x: avatarOrigin.x, y: avatarOrigin.y, pulse: true, core: 4.8, ring: 13.6 },
          { x: avatarCenter.x - avatar.width * 0.36, y: avatarCenter.y + avatar.height * 0.18, pulse: false, core: 3.8, ring: 10.2 },
        ],
      },
      {
        key: 'capability',
        className: styles.capabilitySegment,
        paths: [
          { d: capabilityAccent, travellerDuration: '17.6s', travellerOffset: '-6.4s' },
        ],
        nodes: [
          { x: capability.right + DESKTOP.capRight, y: capability.top - DESKTOP.capTop + 2, pulse: true, core: 4.4, ring: 12.2 },
          { x: capability.left + 54, y: capability.bottom + DESKTOP.capBottom, pulse: false, core: 3.8, ring: 10.8 },
        ],
      },
      {
        key: 'translation',
        className: styles.translationSegment,
        paths: [
          { d: translationAccent, travellerDuration: '14.2s', travellerOffset: '-5.2s' },
        ],
        nodes: [
          { x: translation.left - DESKTOP.translationLeft, y: translation.top + 78, pulse: true, core: 3.9, ring: 10.8 },
        ],
      },
      {
        key: 'featured',
        className: styles.featuredSegment,
        paths: [
          { d: featuredAccent, travellerDuration: '19.8s', travellerOffset: '-8.4s' },
        ],
        nodes: [
          { x: featuredLeft, y: featuredTop, pulse: false, core: 3.8, ring: 10.6 },
          { x: featuredRight, y: featuredTop + 12, pulse: true, core: 4.6, ring: 12.8 },
          { x: featuredLeft + 96, y: featuredBottom, pulse: false, core: 3.9, ring: 11.2 },
        ],
      },
    ],
  }
}

function buildMobileSignalGeometry(measured) {
  if (!measured) return null

  const { width, height, hero, avatar, capability, translation, featured } = measured
  const laneX = clamp(Math.min(hero.left - MOBILE.laneInset, avatar.left - MOBILE.laneInset), 28, Math.max(28, width * 0.18))
  const avatarCenter = point(avatar.left + avatar.width * 0.5, avatar.top + avatar.height * 0.5)
  const avatarOrigin = clampPoint(point(avatar.left + avatar.width * 0.2, avatar.bottom + 10), width, height, 8)

  const heroAccent = buildRoundedPath(dedupePoints([
    clampPoint(point(avatar.left - 18, avatar.top + 14), width, height, 8),
    clampPoint(point(avatar.left - 18, avatar.bottom + 18), width, height, 8),
    clampPoint(point(avatar.left + avatar.width * 0.32, avatar.bottom + 24), width, height, 8),
  ]), 16)

  const laneTop = clampPoint(point(laneX, capability.top - 20), width, height, 8)
  const laneBottom = clampPoint(point(laneX, featured.bottom + 20), width, height, 8)
  const lanePath = buildRoundedPath(dedupePoints([laneTop, laneBottom]), 12)

  return {
    width,
    height,
    avatarCenter,
    avatarOrigin,
    motes: [
      { x: laneX + 8, y: capability.top + 44, drift: 88, delay: '0s', duration: '11.8s', size: 2.1, tint: 'gold' },
      { x: laneX + 12, y: translation.top + 66, drift: 76, delay: '-4.1s', duration: '12.6s', size: 2.2, tint: 'teal' },
      { x: laneX + 10, y: featured.top + 72, drift: 82, delay: '-6.2s', duration: '13.2s', size: 2.1, tint: 'gold' },
    ],
    segments: [
      {
        key: 'hero',
        className: styles.heroSegment,
        paths: [{ d: heroAccent, travellerDuration: '11.2s', travellerOffset: '-2s' }],
        nodes: [
          { x: avatarOrigin.x, y: avatarOrigin.y, pulse: true, core: 4.4, ring: 12.4 },
          { x: avatarCenter.x - avatar.width * 0.28, y: avatarCenter.y + avatar.height * 0.16, pulse: false, core: 3.6, ring: 9.8 },
        ],
      },
      {
        key: 'lane',
        className: styles.mobileLaneSegment,
        paths: [{ d: lanePath, travellerDuration: '17s', travellerOffset: '-7s' }],
        nodes: [
          { x: laneTop.x, y: laneTop.y, pulse: false, core: 3.6, ring: 10.2 },
          { x: laneBottom.x, y: laneBottom.y, pulse: true, core: 4.2, ring: 11.8 },
        ],
      },
    ],
    ticks: [
      buildRoundedPath(dedupePoints([
        clampPoint(point(laneX + 4, hero.bottom + 18), width, height, 8),
        clampPoint(point(laneX + 74, hero.bottom + 26), width, height, 8),
      ]), 12),
      buildRoundedPath(dedupePoints([
        clampPoint(point(laneX + 4, capability.top + MOBILE.capTick), width, height, 8),
        clampPoint(point(laneX + 86, capability.top + MOBILE.capTick + 8), width, height, 8),
      ]), 12),
      buildRoundedPath(dedupePoints([
        clampPoint(point(laneX + 4, translation.top + MOBILE.translationTick), width, height, 8),
        clampPoint(point(laneX + 78, translation.top + MOBILE.translationTick + 8), width, height, 8),
      ]), 12),
      buildRoundedPath(dedupePoints([
        clampPoint(point(laneX + 4, featured.top + MOBILE.featuredTick), width, height, 8),
        clampPoint(point(laneX + 94, featured.top + MOBILE.featuredTick + 10), width, height, 8),
      ]), 12),
    ],
  }
}

function SignalSegment({ segment }) {
  return (
    <g className={segment.className}>
      {segment.paths.map((pathConfig, index) => (
        <g key={`${segment.key}-path-${index}`}>
          <path className={styles.channelTrace} d={pathConfig.d} />
          <g className={styles.travellers}>
            <g className={styles.traveller}>
              <circle r="2.2" />
              <circle r="5.8" className={styles.pulseRing} />
              <animateMotion
                dur={pathConfig.travellerDuration}
                begin={pathConfig.travellerOffset}
                repeatCount="indefinite"
                rotate="auto"
                path={pathConfig.d}
              />
            </g>
          </g>
        </g>
      ))}

      <g className={styles.nodes}>
        {segment.nodes.map((node, index) => (
          <g key={`${segment.key}-node-${index}`} transform={`translate(${node.x} ${node.y})`}>
            <circle r={node.core} className={styles.nodeCore} />
            <circle
              r={node.ring}
              className={node.pulse ? styles.nodeRingPulse : styles.nodeRing}
            />
          </g>
        ))}
      </g>
    </g>
  )
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
      const measured = measureSections(overlayElement)
      setDesktopGeometry(buildDesktopSignalGeometry(measured))
      setMobileGeometry(buildMobileSignalGeometry(measured))
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
      root.querySelector('img[alt="TJ Johnson"]'),
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
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const desktopViewBox = useMemo(() => {
    if (!desktopGeometry) return '0 0 1200 1900'
    return `0 0 ${Math.max(1200, desktopGeometry.width)} ${Math.max(1900, desktopGeometry.height)}`
  }, [desktopGeometry])

  const mobileViewBox = useMemo(() => {
    if (!mobileGeometry) return '0 0 420 2100'
    return `0 0 ${Math.max(420, mobileGeometry.width)} ${Math.max(2100, mobileGeometry.height)}`
  }, [mobileGeometry])

  return (
    <div ref={overlayRef} className={styles.overlay} aria-hidden="true">
      <svg className={styles.desktop} viewBox={desktopViewBox} preserveAspectRatio="none" focusable="false">
        {desktopGeometry && (
          <>
            <g className={styles.avatarOrigin}>
              <circle
                cx={desktopGeometry.avatarCenter.x}
                cy={desktopGeometry.avatarCenter.y}
                r="48"
                className={styles.avatarHalo}
              />
              <circle
                cx={desktopGeometry.avatarCenter.x}
                cy={desktopGeometry.avatarCenter.y}
                r="72"
                className={styles.avatarHaloSecondary}
              />
            </g>

            {desktopGeometry.segments.map((segment) => (
              <SignalSegment key={segment.key} segment={segment} />
            ))}

            <g className={styles.telemetryField}>
              {desktopGeometry.motes.map((mote, index) => (
                <g
                  key={`desktop-mote-${index}`}
                  className={`${styles.telemetryMote} ${mote.tint === 'teal' ? styles.tealMote : styles.goldMote}`}
                  style={{
                    '--drift': `${mote.drift}px`,
                    '--delay': mote.delay,
                    '--duration': mote.duration,
                  }}
                  transform={`translate(${mote.x} ${mote.y})`}
                >
                  <circle r={mote.size} />
                </g>
              ))}
            </g>
          </>
        )}
      </svg>

      <svg className={styles.mobile} viewBox={mobileViewBox} preserveAspectRatio="none" focusable="false">
        {mobileGeometry && (
          <>
            <g className={styles.avatarOrigin}>
              <circle
                cx={mobileGeometry.avatarCenter.x}
                cy={mobileGeometry.avatarCenter.y}
                r="34"
                className={styles.avatarHalo}
              />
            </g>

            {mobileGeometry.segments.map((segment) => (
              <SignalSegment key={segment.key} segment={segment} />
            ))}

            <g className={styles.dockingRoutes}>
              {mobileGeometry.ticks.map((tick, index) => (
                <path key={`mobile-tick-${index}`} className={styles.dockTick} d={tick} />
              ))}
            </g>

            <g className={styles.telemetryField}>
              {mobileGeometry.motes.map((mote, index) => (
                <g
                  key={`mobile-mote-${index}`}
                  className={`${styles.telemetryMote} ${mote.tint === 'teal' ? styles.tealMote : styles.goldMote}`}
                  style={{
                    '--drift': `${mote.drift}px`,
                    '--delay': mote.delay,
                    '--duration': mote.duration,
                  }}
                  transform={`translate(${mote.x} ${mote.y})`}
                >
                  <circle r={mote.size} />
                </g>
              ))}
            </g>
          </>
        )}
      </svg>
    </div>
  )
}
