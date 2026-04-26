import React from 'react'
import styles from './OverviewRouteOverlay.module.css'

export default function OverviewRouteOverlay() {
  const desktopPath = `M -34,248
    C 8,228 44,182 88,144
    C 128,108 188,102 238,124
    C 286,146 306,188 316,234
    C 326,274 352,288 404,292
    L 986,292
    C 1050,292 1080,320 1080,374
    L 1080,506
    C 1080,516 1068,522 1048,522
    L 184,522
    C 132,522 104,550 104,608
    L 104,1200
    C 104,1254 126,1280 178,1280
    L 1000,1280
    C 1060,1280 1088,1308 1088,1366
    L 1088,1470
    C 1088,1516 1068,1540 1026,1544
    L 812,1548
    C 752,1548 718,1566 698,1610
    L 664,1682
    C 644,1724 664,1752 706,1756
    L 1034,1760
    C 1092,1760 1134,1786 1198,1828`

  const mobilePath = `M 30,126
    C 56,112 88,108 118,122
    C 150,136 166,166 174,204
    C 182,238 202,252 242,254
    L 352,258
    C 388,260 406,280 406,314
    L 406,1526
    C 406,1562 388,1580 354,1582
    L 118,1586
    C 76,1588 54,1608 54,1650
    L 54,1828
    C 54,1864 74,1882 110,1884
    L 352,1888`

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

        <g className={styles.dockingRoutes}>
          <path
            className={styles.dockTick}
            d="M 120,214 C 176,198 232,198 286,214"
          />
          <path
            className={styles.dockTick}
            d="M 244,318 C 412,304 630,304 902,320"
          />
          <path
            className={styles.dockTick}
            d="M 194,1248 C 398,1236 648,1238 928,1258"
          />
          <path
            className={styles.dockTick}
            d="M 176,1252 C 384,1236 644,1238 930,1260"
          />
          <path
            className={styles.dockTick}
            d="M 812,1524 C 904,1508 978,1510 1054,1530"
          />
          <path
            className={styles.dockTick}
            d="M 676,1718 C 790,1698 916,1702 1038,1728"
          />
        </g>

        <g className={styles.nodes}>
          <g transform="translate(114 128)">
            <circle r="4.6" className={styles.nodeCore} />
            <circle r="11.8" className={styles.nodeRing} />
          </g>
          <g transform="translate(316 234)">
            <circle r="4.2" className={styles.nodeCore} />
            <circle r="10.8" className={styles.nodeRing} />
          </g>
          <g transform="translate(1080 374)">
            <circle r="5" className={styles.nodeCore} />
            <circle r="14" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(104 608)">
            <circle r="5.2" className={styles.nodeCore} />
            <circle r="14.8" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(1088 1366)">
            <circle r="4.8" className={styles.nodeCore} />
            <circle r="13.4" className={styles.nodeRing} />
          </g>
          <g transform="translate(698 1610)">
            <circle r="5.1" className={styles.nodeCore} />
            <circle r="14.6" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(1034 1760)">
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
          <path className={styles.dockTick} d="M 304,454 C 340,454 366,456 394,466" />
          <path className={styles.dockTick} d="M 300,792 C 340,792 370,796 400,808" />
          <path className={styles.dockTick} d="M 300,1362 C 340,1362 372,1368 402,1382" />
          <path className={styles.dockTick} d="M 124,1562 C 212,1548 294,1550 378,1570" />
        </g>

        <g className={styles.nodes}>
          <g transform="translate(174 204)">
            <circle r="4.4" className={styles.nodeCore} />
            <circle r="11.6" className={styles.nodeRing} />
          </g>
          <g transform="translate(406 314)">
            <circle r="4.8" className={styles.nodeCore} />
            <circle r="13.6" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(406 854)">
            <circle r="4.8" className={styles.nodeCore} />
            <circle r="13.8" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(406 1526)">
            <circle r="4.4" className={styles.nodeCore} />
            <circle r="12.6" className={styles.nodeRing} />
          </g>
          <g transform="translate(54 1650)">
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
