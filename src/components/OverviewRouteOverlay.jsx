import React from 'react'
import styles from './OverviewRouteOverlay.module.css'

export default function OverviewRouteOverlay() {
  const desktopPath = `M -42,248
    C 14,220 54,174 102,138
    C 150,104 214,108 254,144
    C 292,180 302,236 286,292
    C 268,346 226,388 160,418
    L 1040,418
    C 1080,418 1100,438 1100,478
    L 1100,730
    C 1100,770 1080,790 1040,790
    L 168,790
    C 124,790 102,812 102,856
    L 102,1298
    C 102,1342 124,1364 168,1364
    L 1044,1364
    C 1084,1364 1104,1384 1104,1424
    L 1104,1494
    C 1104,1530 1086,1548 1050,1548
    L 168,1548
    C 124,1548 102,1570 102,1614
    L 102,1878
    C 102,1918 122,1938 162,1938
    L 420,1938
    C 458,1938 478,1918 478,1880
    L 478,1558
    C 478,1520 498,1500 536,1500
    L 760,1500
    C 798,1500 818,1520 818,1558
    L 818,1880
    C 818,1918 838,1938 876,1938
    L 1092,1938
    C 1130,1938 1158,1920 1188,1888
    L 1188,1568
    C 1188,1528 1208,1508 1248,1508`

  const mobilePath = `M 26,132
    C 56,112 96,108 128,122
    C 156,136 172,164 172,198
    C 172,232 158,258 132,276
    C 94,302 68,338 58,386
    C 52,418 50,458 50,510
    L 50,1676
    C 50,1710 68,1728 102,1730
    L 332,1738`

  return (
    <div className={styles.overlay} aria-hidden="true">
      <svg
        className={styles.desktop}
        viewBox="0 0 1200 1900"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          className={styles.primaryRoute}
          d={desktopPath}
        />

        <g className={styles.nodes}>
          <g transform="translate(108 136)">
            <circle r="4.6" className={styles.nodeCore} />
            <circle r="11.8" className={styles.nodeRing} />
          </g>
          <g transform="translate(160 418)">
            <circle r="4.2" className={styles.nodeCore} />
            <circle r="10.8" className={styles.nodeRing} />
          </g>
          <g transform="translate(1100 478)">
            <circle r="5" className={styles.nodeCore} />
            <circle r="14" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(102 856)">
            <circle r="5.2" className={styles.nodeCore} />
            <circle r="14.8" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(1044 1364)">
            <circle r="4.8" className={styles.nodeCore} />
            <circle r="13.4" className={styles.nodeRing} />
          </g>
          <g transform="translate(168 1548)">
            <circle r="5.1" className={styles.nodeCore} />
            <circle r="14.6" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(478 1558)">
            <circle r="4.4" className={styles.nodeCore} />
            <circle r="12.2" className={styles.nodeRing} />
          </g>
          <g transform="translate(818 1558)">
            <circle r="4.4" className={styles.nodeCore} />
            <circle r="12.2" className={styles.nodeRing} />
          </g>
          <g transform="translate(1188 1888)">
            <circle r="4.4" className={styles.nodeCore} />
            <circle r="12.2" className={styles.nodeRing} />
          </g>
        </g>

        <g className={styles.travellers}>
          <g className={styles.traveller}>
            <circle r="2.4" />
            <circle r="6.6" className={styles.pulseRing} />
            <animateMotion
              dur="18s"
              repeatCount="indefinite"
              rotate="auto"
              path={desktopPath}
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
              path={desktopPath}
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
              path={desktopPath}
            />
          </g>
        </g>
      </svg>

      <svg
        className={styles.mobile}
        viewBox="0 0 420 2100"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          className={styles.primaryRoute}
          d={mobilePath}
        />

        <g className={styles.dockingRoutes}>
          <path className={styles.dockTick} d="M 54,454 C 104,454 144,458 182,470" />
          <path className={styles.dockTick} d="M 54,812 C 108,812 148,816 192,828" />
          <path className={styles.dockTick} d="M 54,1376 C 112,1376 156,1382 202,1394" />
          <path className={styles.dockTick} d="M 54,1622 C 118,1614 178,1616 238,1626" />
        </g>

        <g className={styles.nodes}>
          <g transform="translate(172 198)">
            <circle r="4.4" className={styles.nodeCore} />
            <circle r="11.6" className={styles.nodeRing} />
          </g>
          <g transform="translate(50 510)">
            <circle r="4.8" className={styles.nodeCore} />
            <circle r="13.6" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(50 968)">
            <circle r="4.8" className={styles.nodeCore} />
            <circle r="13.8" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(50 1676)">
            <circle r="4.4" className={styles.nodeCore} />
            <circle r="12.6" className={styles.nodeRing} />
          </g>
          <g transform="translate(102 1730)">
            <circle r="4.6" className={styles.nodeCore} />
            <circle r="13.2" className={styles.nodeRingPulse} />
          </g>
        </g>

        <g className={styles.travellers}>
          <g className={styles.traveller}>
            <circle r="2.2" />
            <circle r="5.8" className={styles.pulseRing} />
            <animateMotion
              dur="20s"
              repeatCount="indefinite"
              rotate="auto"
              path={mobilePath}
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
              path={mobilePath}
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
