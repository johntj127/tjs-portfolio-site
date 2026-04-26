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
    L 104,1234
    C 104,1270 122,1288 158,1288
    L 1004,1288
    C 1042,1288 1060,1268 1060,1232
    L 1060,1186
    C 1060,1210 1048,1248 1018,1290
    C 970,1356 884,1394 776,1400
    L 474,1404
    C 444,1404 428,1420 428,1450
    L 428,1744
    C 428,1772 412,1788 384,1788
    L 136,1788
    C 104,1788 88,1770 88,1738
    L 88,1398
    C 88,1372 104,1356 132,1356
    L 734,1356
    C 760,1356 774,1370 774,1398
    L 774,1708
    C 774,1744 794,1762 832,1762
    L 1020,1762
    C 1058,1762 1078,1742 1080,1704
    L 1080,1402
    C 1080,1370 1098,1354 1128,1354
    L 1198,1352`

  const mobilePath = `M 30,126
    C 56,112 88,108 118,122
    C 150,136 166,166 174,204
    C 188,232 220,244 280,246
    L 382,248
    C 400,250 410,266 410,294
    L 410,1526
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
            d="M 246,296 C 416,284 638,284 916,300"
          />
          <path
            className={styles.dockTick}
            d="M 178,1256 C 382,1242 636,1244 936,1262"
          />
          <path
            className={styles.dockTick}
            d="M 120,1344 C 228,1332 322,1334 420,1350"
          />
          <path
            className={styles.dockTick}
            d="M 450,1388 C 548,1372 646,1372 732,1388"
          />
          <path
            className={styles.dockTick}
            d="M 790,1388 C 884,1374 968,1376 1048,1396"
          />
          <path
            className={styles.dockTick}
            d="M 794,1742 C 878,1732 960,1732 1048,1746"
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
          <g transform="translate(1060 1232)">
            <circle r="4.8" className={styles.nodeCore} />
            <circle r="13.4" className={styles.nodeRing} />
          </g>
          <g transform="translate(428 1450)">
            <circle r="5.1" className={styles.nodeCore} />
            <circle r="14.6" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(774 1398)">
            <circle r="4.4" className={styles.nodeCore} />
            <circle r="12.2" className={styles.nodeRing} />
          </g>
          <g transform="translate(1080 1704)">
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
          <g transform="translate(410 294)">
            <circle r="4.8" className={styles.nodeCore} />
            <circle r="13.6" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(410 854)">
            <circle r="4.8" className={styles.nodeCore} />
            <circle r="13.8" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(410 1526)">
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
