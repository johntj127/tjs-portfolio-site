import React from 'react'
import styles from './OverviewRouteOverlay.module.css'

export default function OverviewRouteOverlay() {
  const desktopPath = `M -34,248
    C 8,228 44,182 88,144
    C 128,108 188,102 238,124
    C 286,146 306,188 316,234
    C 324,266 350,278 398,286
    L 1026,286
    C 1078,286 1106,312 1108,362
    L 1110,672
    C 1110,718 1086,742 1042,742
    L 150,742
    C 114,742 96,760 96,798
    L 98,1260
    C 98,1304 120,1326 164,1326
    L 1032,1326
    C 1074,1326 1092,1304 1092,1260
    L 1092,1172
    C 1092,1266 1074,1350 1038,1426
    C 1004,1494 940,1546 850,1582
    C 814,1596 796,1620 796,1658
    L 796,1814
    C 796,1842 812,1856 840,1856
    L 1088,1856
    C 1132,1856 1166,1842 1198,1812
    C 1142,1816 1094,1818 1040,1818
    L 828,1818
    C 788,1818 768,1798 768,1758
    L 768,1454
    C 768,1424 754,1410 724,1410
    L 548,1410
    C 514,1410 498,1426 498,1460
    L 498,1818
    C 498,1844 484,1856 458,1856
    L 164,1856
    C 122,1856 98,1834 98,1792
    L 98,1404
    C 98,1372 114,1356 146,1356
    L 430,1356`

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
          <g transform="translate(114 128)">
            <circle r="4.6" className={styles.nodeCore} />
            <circle r="11.8" className={styles.nodeRing} />
          </g>
          <g transform="translate(316 234)">
            <circle r="4.2" className={styles.nodeCore} />
            <circle r="10.8" className={styles.nodeRing} />
          </g>
          <g transform="translate(1088 384)">
            <circle r="5" className={styles.nodeCore} />
            <circle r="14" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(96 748)">
            <circle r="5.2" className={styles.nodeCore} />
            <circle r="14.8" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(1092 1260)">
            <circle r="4.8" className={styles.nodeCore} />
            <circle r="13.4" className={styles.nodeRing} />
          </g>
          <g transform="translate(796 1658)">
            <circle r="5.1" className={styles.nodeCore} />
            <circle r="14.6" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(498 1460)">
            <circle r="4.4" className={styles.nodeCore} />
            <circle r="12.2" className={styles.nodeRing} />
          </g>
          <g transform="translate(98 1792)">
            <circle r="4.4" className={styles.nodeCore} />
            <circle r="12.2" className={styles.nodeRing} />
          </g>
          <g transform="translate(1088 1856)">
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
