import React from 'react'
import styles from './OverviewSignalField.module.css'

const PREVIOUS_DESKTOP_FLOATER_COUNT = 28
const DESKTOP_FLOATER_COUNT = 40
const MOBILE_FLOATER_COUNT = 12

const COLOR_CLASSES = [
  styles.teal,
  styles.gold,
  styles.amber,
  styles.blueWhite,
  styles.mutedBlue,
  styles.purple,
]

const SHAPE_CLASSES = [
  styles.shapeDot,
  styles.shapeRing,
  styles.shapeDiamond,
  styles.shapePlus,
  styles.shapeDash,
  styles.shapeGrid,
  styles.shapeTick,
  styles.shapeStar,
  styles.shapePing,
]

const MOTION_CLASSES = [styles.floatA, styles.floatB, styles.floatC]

function buildFloaters(count, mode) {
  const floaters = []
  const laneCount = mode === 'desktop' ? 8 : 5
  const yBase = mode === 'desktop' ? 6 : 10
  const yRange = mode === 'desktop' ? 90 : 82
  const sideBias = mode === 'desktop'
  const sizeSet = mode === 'desktop' ? [5, 6, 7, 8, 9, 10, 11, 12] : [5, 6, 7, 8, 9]

  for (let i = 0; i < count; i += 1) {
    const lane = i % laneCount
    let x

    if (mode === 'desktop') {
      if (lane === 0) x = 3 + ((i * 7) % 8)
      else if (lane === 1) x = 12 + ((i * 11) % 14)
      else if (lane === 2) x = 26 + ((i * 13) % 14)
      else if (lane === 3) x = 42 + ((i * 17) % 12)
      else if (lane === 4) x = 56 + ((i * 19) % 12)
      else if (lane === 5) x = 70 + ((i * 23) % 12)
      else if (lane === 6) x = 84 + ((i * 29) % 10)
      else x = 94 + ((i * 31) % 4)
    } else {
      if (lane === 0) x = 6 + ((i * 9) % 10)
      else if (lane === 1) x = 18 + ((i * 11) % 12)
      else if (lane === 2) x = 44 + ((i * 13) % 12)
      else if (lane === 3) x = 72 + ((i * 17) % 12)
      else x = 86 + ((i * 19) % 8)
    }

    const y = yBase + ((i * 37) % yRange)
    const size = sizeSet[(i * 5) % sizeSet.length]
    const dx = `${((i % 2 === 0 ? 1 : -1) * (8 + ((i * 7) % (mode === 'desktop' ? 24 : 14))))}px`
    const dy = `${-(54 + ((i * 9) % (mode === 'desktop' ? 56 : 30)))}px`
    const dur = `${mode === 'desktop' ? 6.2 + ((i * 3) % 44) / 10 : 5.8 + ((i * 3) % 28) / 10}s`
    const delay = `-${((i * 11) % 74) / 10}s`
    const opacity = (sideBias && (lane === 0 || lane === 7))
      ? 0.48 + ((i * 5) % 18) / 100
      : 0.34 + ((i * 7) % 36) / 100

    floaters.push({
      x: `${x}%`,
      y: `${y}%`,
      size: `${size}px`,
      dx,
      dy,
      dur,
      delay,
      opacity: opacity.toFixed(2),
      tone: COLOR_CLASSES[(i * 2 + lane) % COLOR_CLASSES.length],
      shape: SHAPE_CLASSES[(i * 3 + lane) % SHAPE_CLASSES.length],
      motion: MOTION_CLASSES[(i + lane) % MOTION_CLASSES.length],
      soft: i % 11 === 0 ? styles.softFloater : '',
      twinkle: i % 9 === 0 ? styles.twinkle : '',
    })
  }

  return floaters
}

function safeBuildFloaters(count, mode) {
  try {
    return buildFloaters(count, mode)
  } catch (error) {
    console.error(`OverviewSignalField: failed to build ${mode} floaters`, error)
    return []
  }
}

const DESKTOP_FLOATERS = safeBuildFloaters(DESKTOP_FLOATER_COUNT, 'desktop')
const MOBILE_FLOATERS = safeBuildFloaters(MOBILE_FLOATER_COUNT, 'mobile')

const BURST_SPARKS = [
  { className: styles.sparkA, size: styles.sparkSmall },
  { className: styles.sparkB, size: styles.sparkMedium },
  { className: styles.sparkC, size: styles.sparkSmall },
  { className: styles.sparkD, size: styles.sparkMedium },
  { className: styles.sparkE, size: styles.sparkSmall },
  { className: styles.sparkF, size: styles.sparkLarge },
  { className: styles.sparkG, size: styles.sparkSmall },
  { className: styles.sparkH, size: styles.sparkMedium },
]

const DESKTOP_FRAGMENTS = [
  styles.fragmentA,
  styles.fragmentB,
  styles.fragmentC,
  styles.fragmentD,
  styles.fragmentE,
  styles.fragmentF,
  styles.fragmentG,
  styles.fragmentH,
]

const MICRO_PULSES = [
  styles.microPulseA,
  styles.microPulseB,
  styles.microPulseC,
  styles.microPulseD,
  styles.microPulseE,
  styles.microPulseF,
]

function particleStyle({ x, y, size, dx, dy, dur, delay }) {
  return {
    '--x': x,
    '--y': y,
    '--size': size,
    '--dx': dx,
    '--dy': dy,
    '--dur': dur,
    '--delay': delay,
  }
}

function floaterStyle({ x, y, size, dx, dy, dur, delay, opacity }) {
  return {
    '--x': x,
    '--y': y,
    '--size': size,
    '--dx': dx,
    '--dy': dy,
    '--dur': dur,
    '--delay': delay,
    '--floater-opacity': opacity,
  }
}

export default function OverviewSignalField() {
  return (
    <div className={styles.field} aria-hidden="true">
      <div className={styles.gradientFlow} />
      <div className={styles.pageWave} />
      <div className={styles.pageWaveSecondary} />
      <div className={styles.pageWaveTertiary} />
      <div className={styles.leftAura} />
      <div className={styles.rightAura} />
      <div className={styles.deepFieldGlow} />

      <div className={styles.avatarZone}>
        <span className={[styles.avatarHalo, styles.avatarHaloOuter].join(' ')} />
        <span className={[styles.avatarHalo, styles.avatarHaloMid].join(' ')} />
        <span className={[styles.avatarHalo, styles.avatarHaloInner].join(' ')} />
        <span className={styles.avatarSweep} />
        <span className={styles.avatarSweepSecondary} />
        <span className={styles.avatarBloom} />
        <span className={styles.avatarCore} />
        <span className={styles.avatarBurst} />
        <span className={styles.avatarBurstSecondary} />
        <span className={styles.avatarBurstTertiary} />
        <span className={styles.avatarSparkField}>
          {BURST_SPARKS.map(({ className, size }, index) => (
            <span key={index} className={[styles.spark, className, size].join(' ')} />
          ))}
        </span>
      </div>

      <div className={styles.capabilityGlow} />
      <div className={styles.translationGlow} />
      <div className={styles.featuredEnergy} />
      <div className={styles.featuredEnergySecondary} />
      <div className={styles.signalFragments}>
        {DESKTOP_FRAGMENTS.map((fragment, index) => (
          <span key={index} className={[styles.fragment, fragment].join(' ')} />
        ))}
      </div>
      <div className={styles.microPulseTracks}>
        {MICRO_PULSES.map((pulse, index) => (
          <span key={index} className={[styles.microPulse, pulse].join(' ')} />
        ))}
      </div>
      <div className={styles.rightAnchor}>
        <span className={styles.rightAnchorCore} />
        <span className={styles.rightAnchorRing} />
        <span className={styles.rightAnchorRingSecondary} />
        <span className={styles.rightAnchorSweep} />
      </div>

      <div className={styles.pingCluster}>
        <span className={[styles.ping, styles.pingHero].join(' ')} />
        <span className={[styles.ping, styles.pingCapability].join(' ')} />
        <span className={[styles.ping, styles.pingFeatured].join(' ')} />
        <span className={[styles.ping, styles.pingRight].join(' ')} />
      </div>

      <div className={styles.desktopFloaters}>
        {DESKTOP_FLOATERS.map((floater, index) => (
          <span
            key={index}
            className={[
              styles.floater,
              floater.tone,
              floater.shape,
              floater.motion,
              floater.soft,
              floater.twinkle,
            ].filter(Boolean).join(' ')}
            style={floaterStyle(floater)}
          />
        ))}
      </div>

      <div className={styles.mobileField}>
        <div className={styles.mobileGlow} />
        <div className={styles.mobileAvatarPulse} />
        <div className={styles.mobileAvatarBurst} />
        <div className={styles.mobileSectionTicks}>
          <span className={styles.tickHero} />
          <span className={styles.tickCapabilities} />
          <span className={styles.tickTranslation} />
          <span className={styles.tickFeatured} />
        </div>
        <div className={styles.mobileFloaters}>
          {MOBILE_FLOATERS.map((floater, index) => (
            <span
              key={index}
              className={[
                styles.floater,
                floater.tone,
                floater.shape,
                floater.motion,
                floater.twinkle,
              ].filter(Boolean).join(' ')}
              style={floaterStyle(floater)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
