import React from 'react'
import styles from './OverviewRouteOverlay.module.css'

export default function OverviewRouteOverlay() {
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
          d="M -26,236
             C 24,214 70,168 118,126
             C 162,88 230,82 280,120
             C 332,158 344,212 414,230
             C 558,268 760,252 960,246
             C 1038,244 1078,272 1084,334
             L 1090,556
             C 1092,618 1058,646 988,646
             L 156,646
             C 110,646 92,674 92,726
             L 92,1126
             C 92,1184 116,1212 176,1212
             L 1022,1212
             C 1070,1212 1096,1240 1098,1292
             L 1104,1426
             C 1108,1492 1082,1528 1022,1538
             C 922,1554 836,1540 760,1516
             C 706,1498 688,1520 688,1578
             L 688,1658
             C 688,1718 716,1750 770,1750
             L 1022,1750
             C 1094,1750 1142,1778 1208,1828"
        />

        <g className={styles.dockingRoutes}>
          <path
            className={styles.dockTick}
            d="M 116,214 C 190,198 266,196 346,214"
          />
          <path
            className={styles.dockTick}
            d="M 214,604 C 384,586 626,586 878,612"
          />
          <path
            className={styles.dockTick}
            d="M 188,1186 C 392,1166 646,1168 904,1198"
          />
          <path
            className={styles.dockTick}
            d="M 446,1514 C 520,1498 584,1502 652,1528"
          />
          <path
            className={styles.dockTick}
            d="M 760,1498 C 874,1476 970,1482 1054,1514"
          />
        </g>

        <g className={styles.nodes}>
          <g transform="translate(114 128)">
            <circle r="4.6" className={styles.nodeCore} />
            <circle r="11.8" className={styles.nodeRing} />
          </g>
          <g transform="translate(430 232)">
            <circle r="4.2" className={styles.nodeCore} />
            <circle r="10.8" className={styles.nodeRing} />
          </g>
          <g transform="translate(1088 338)">
            <circle r="5" className={styles.nodeCore} />
            <circle r="14" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(92 726)">
            <circle r="5.2" className={styles.nodeCore} />
            <circle r="14.8" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(1098 1292)">
            <circle r="4.8" className={styles.nodeCore} />
            <circle r="13.4" className={styles.nodeRing} />
          </g>
          <g transform="translate(688 1578)">
            <circle r="5.1" className={styles.nodeCore} />
            <circle r="14.6" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(1024 1750)">
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
              path="M -26,236
                    C 24,214 70,168 118,126
                    C 162,88 230,82 280,120
                    C 332,158 344,212 414,230
                    C 558,268 760,252 960,246
                    C 1038,244 1078,272 1084,334
                    L 1090,556
                    C 1092,618 1058,646 988,646
                    L 156,646
                    C 110,646 92,674 92,726
                    L 92,1126
                    C 92,1184 116,1212 176,1212
                    L 1022,1212
                    C 1070,1212 1096,1240 1098,1292
                    L 1104,1426
                    C 1108,1492 1082,1528 1022,1538
                    C 922,1554 836,1540 760,1516
                    C 706,1498 688,1520 688,1578
                    L 688,1658
                    C 688,1718 716,1750 770,1750
                    L 1022,1750
                    C 1094,1750 1142,1778 1208,1828"
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
              path="M -26,236
                    C 24,214 70,168 118,126
                    C 162,88 230,82 280,120
                    C 332,158 344,212 414,230
                    C 558,268 760,252 960,246
                    C 1038,244 1078,272 1084,334
                    L 1090,556
                    C 1092,618 1058,646 988,646
                    L 156,646
                    C 110,646 92,674 92,726
                    L 92,1126
                    C 92,1184 116,1212 176,1212
                    L 1022,1212
                    C 1070,1212 1096,1240 1098,1292
                    L 1104,1426
                    C 1108,1492 1082,1528 1022,1538
                    C 922,1554 836,1540 760,1516
                    C 706,1498 688,1520 688,1578
                    L 688,1658
                    C 688,1718 716,1750 770,1750
                    L 1022,1750
                    C 1094,1750 1142,1778 1208,1828"
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
              path="M -26,236
                    C 24,214 70,168 118,126
                    C 162,88 230,82 280,120
                    C 332,158 344,212 414,230
                    C 558,268 760,252 960,246
                    C 1038,244 1078,272 1084,334
                    L 1090,556
                    C 1092,618 1058,646 988,646
                    L 156,646
                    C 110,646 92,674 92,726
                    L 92,1126
                    C 92,1184 116,1212 176,1212
                    L 1022,1212
                    C 1070,1212 1096,1240 1098,1292
                    L 1104,1426
                    C 1108,1492 1082,1528 1022,1538
                    C 922,1554 836,1540 760,1516
                    C 706,1498 688,1520 688,1578
                    L 688,1658
                    C 688,1718 716,1750 770,1750
                    L 1022,1750
                    C 1094,1750 1142,1778 1208,1828"
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
          d="M 28,120
             C 54,102 84,96 116,114
             C 150,132 164,172 170,220
             C 180,292 220,310 298,312
             C 340,314 362,336 362,376
             L 362,566
             C 362,606 344,628 304,628
             L 72,628
             C 44,628 30,646 30,682
             L 30,1226
             C 30,1268 48,1288 88,1288
             L 354,1288
             C 382,1288 396,1304 396,1334
             L 396,1498
             C 396,1536 374,1554 336,1554
             L 110,1554
             C 72,1554 52,1572 52,1610
             L 52,1810
             C 52,1846 72,1866 108,1866
             L 344,1866"
        />

        <g className={styles.dockingRoutes}>
          <path className={styles.dockTick} d="M 76,300 C 142,286 212,288 292,306" />
          <path className={styles.dockTick} d="M 86,612 C 188,594 274,598 340,622" />
          <path className={styles.dockTick} d="M 78,1260 C 198,1240 292,1242 372,1266" />
          <path className={styles.dockTick} d="M 110,1536 C 208,1518 300,1520 378,1548" />
        </g>

        <g className={styles.nodes}>
          <g transform="translate(168 208)">
            <circle r="4.4" className={styles.nodeCore} />
            <circle r="11.6" className={styles.nodeRing} />
          </g>
          <g transform="translate(362 376)">
            <circle r="4.8" className={styles.nodeCore} />
            <circle r="13.6" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(30 682)">
            <circle r="4.8" className={styles.nodeCore} />
            <circle r="13.8" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(396 1334)">
            <circle r="4.4" className={styles.nodeCore} />
            <circle r="12.6" className={styles.nodeRing} />
          </g>
          <g transform="translate(52 1610)">
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
              path="M 28,120
                    C 54,102 84,96 116,114
                    C 150,132 164,172 170,220
                    C 180,292 220,310 298,312
                    C 340,314 362,336 362,376
                    L 362,566
                    C 362,606 344,628 304,628
                    L 72,628
                    C 44,628 30,646 30,682
                    L 30,1226
                    C 30,1268 48,1288 88,1288
                    L 354,1288
                    C 382,1288 396,1304 396,1334
                    L 396,1498
                    C 396,1536 374,1554 336,1554
                    L 110,1554
                    C 72,1554 52,1572 52,1610
                    L 52,1810
                    C 52,1846 72,1866 108,1866
                    L 344,1866"
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
              path="M 28,120
                    C 54,102 84,96 116,114
                    C 150,132 164,172 170,220
                    C 180,292 220,310 298,312
                    C 340,314 362,336 362,376
                    L 362,566
                    C 362,606 344,628 304,628
                    L 72,628
                    C 44,628 30,646 30,682
                    L 30,1226
                    C 30,1268 48,1288 88,1288
                    L 354,1288
                    C 382,1288 396,1304 396,1334
                    L 396,1498
                    C 396,1536 374,1554 336,1554
                    L 110,1554
                    C 72,1554 52,1572 52,1610
                    L 52,1810
                    C 52,1846 72,1866 108,1866
                    L 344,1866"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
