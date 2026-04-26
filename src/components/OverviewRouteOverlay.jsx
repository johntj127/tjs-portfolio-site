import React from 'react'
import styles from './OverviewRouteOverlay.module.css'

export default function OverviewRouteOverlay() {
  return (
    <div className={styles.overlay} aria-hidden="true">
      <svg
        className={styles.desktop}
        viewBox="0 0 1200 760"
        preserveAspectRatio="none"
        focusable="false"
      >
        <g className={styles.primaryRoutes}>
          <path
            d="M 84,74 C 92,170 94,264 100,364 S 102,560 96,690"
            className={styles.routeStrong}
          />
          <path
            d="M 122,84 C 314,44 604,34 1018,72"
            className={styles.routeStrong}
          />
          <path
            d="M 1048,104 C 1102,188 1114,336 1078,470 S 1046,630 1088,720"
            className={styles.routeStrong}
          />
          <path
            d="M 140,694 C 316,654 560,648 808,674 S 1000,692 1082,670"
            className={styles.routeStrong}
          />
        </g>

        <g className={styles.secondaryRoutes}>
          <path
            d="M 108,188 C 224,172 348,174 476,190"
            className={styles.routeSoft}
          />
          <path
            d="M 630,188 C 780,164 928,166 1040,198"
            className={styles.routeSoft}
          />
          <path
            d="M 124,360 C 250,334 382,338 510,356"
            className={styles.routeSoft}
          />
          <path
            d="M 1048,270 C 1024,350 1022,430 1038,520"
            className={styles.routeSoft}
          />
          <path
            d="M 232,612 C 404,592 624,594 842,620"
            className={styles.routeSoft}
          />
        </g>

        <g className={styles.nodes}>
          <g transform="translate(100 210)">
            <circle r="4.8" className={styles.nodeCore} />
            <circle r="12.5" className={styles.nodeRing} />
          </g>
          <g transform="translate(96 430)">
            <circle r="5.8" className={styles.nodeCore} />
            <circle r="16.5" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(282 66)">
            <circle r="3.8" className={styles.nodeCore} />
            <circle r="10.2" className={styles.nodeRing} />
          </g>
          <g transform="translate(862 68)">
            <circle r="4.2" className={styles.nodeCore} />
            <circle r="11.2" className={styles.nodeRing} />
          </g>
          <g transform="translate(1040 224)">
            <circle r="4.6" className={styles.nodeCore} />
            <circle r="13.2" className={styles.nodeRing} />
          </g>
          <g transform="translate(1048 474)">
            <circle r="5.4" className={styles.nodeCore} />
            <circle r="15.8" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(248 668)">
            <circle r="4" className={styles.nodeCore} />
            <circle r="10.8" className={styles.nodeRing} />
          </g>
          <g transform="translate(934 686)">
            <circle r="4.4" className={styles.nodeCore} />
            <circle r="11.4" className={styles.nodeRing} />
          </g>
        </g>

        <g className={styles.travellers}>
          <g className={styles.pulseGold}>
            <circle r="2.8" />
            <circle r="7.6" className={styles.pulseRing} />
            <animateMotion
              dur="10s"
              repeatCount="indefinite"
              rotate="auto"
              path="M 84,74 C 92,170 94,264 100,364 S 102,560 96,690"
            />
          </g>
          <g className={styles.pulseTeal}>
            <circle r="2.5" />
            <circle r="6.8" className={styles.pulseRing} />
            <animateMotion
              dur="8.5s"
              begin="-2.8s"
              repeatCount="indefinite"
              rotate="auto"
              path="M 122,84 C 314,44 604,34 1018,72"
            />
          </g>
          <g className={styles.pulseGold}>
            <circle r="2.6" />
            <circle r="7.2" className={styles.pulseRing} />
            <animateMotion
              dur="11s"
              begin="-4.2s"
              repeatCount="indefinite"
              rotate="auto"
              path="M 1048,104 C 1102,188 1114,336 1078,470 S 1046,630 1088,720"
            />
          </g>
          <g className={styles.pulseTeal}>
            <circle r="2.4" />
            <circle r="6.4" className={styles.pulseRing} />
            <animateMotion
              dur="9.5s"
              begin="-5.1s"
              repeatCount="indefinite"
              rotate="auto"
              path="M 140,694 C 316,654 560,648 808,674 S 1000,692 1082,670"
            />
          </g>
        </g>
      </svg>

      <svg
        className={styles.mobile}
        viewBox="0 0 420 860"
        preserveAspectRatio="none"
        focusable="false"
      >
        <g className={styles.primaryRoutes}>
          <path
            d="M 36,86 C 40,202 44,356 48,522 S 50,720 44,820"
            className={styles.routeStrong}
          />
          <path
            d="M 304,124 C 360,226 374,390 348,542 S 334,734 362,824"
            className={styles.routeStrong}
          />
          <path
            d="M 70,776 C 156,748 242,748 338,770"
            className={styles.routeStrong}
          />
        </g>

        <g className={styles.secondaryRoutes}>
          <path
            d="M 58,188 C 132,170 214,172 306,192"
            className={styles.routeSoft}
          />
          <path
            d="M 58,470 C 150,446 250,448 334,468"
            className={styles.routeSoft}
          />
        </g>

        <g className={styles.nodes}>
          <g transform="translate(42 208)">
            <circle r="4.6" className={styles.nodeCore} />
            <circle r="12.2" className={styles.nodeRing} />
          </g>
          <g transform="translate(46 520)">
            <circle r="5.4" className={styles.nodeCore} />
            <circle r="15.2" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(344 262)">
            <circle r="4.8" className={styles.nodeCore} />
            <circle r="13.2" className={styles.nodeRing} />
          </g>
          <g transform="translate(350 566)">
            <circle r="5.2" className={styles.nodeCore} />
            <circle r="14.6" className={styles.nodeRingPulse} />
          </g>
          <g transform="translate(272 764)">
            <circle r="4.2" className={styles.nodeCore} />
            <circle r="11.4" className={styles.nodeRing} />
          </g>
        </g>

        <g className={styles.travellers}>
          <g className={styles.pulseGold}>
            <circle r="2.6" />
            <circle r="7.1" className={styles.pulseRing} />
            <animateMotion
              dur="9s"
              repeatCount="indefinite"
              rotate="auto"
              path="M 36,86 C 40,202 44,356 48,522 S 50,720 44,820"
            />
          </g>
          <g className={styles.pulseTeal}>
            <circle r="2.4" />
            <circle r="6.4" className={styles.pulseRing} />
            <animateMotion
              dur="10s"
              begin="-3.2s"
              repeatCount="indefinite"
              rotate="auto"
              path="M 304,124 C 360,226 374,390 348,542 S 334,734 362,824"
            />
          </g>
          <g className={styles.pulseGold}>
            <circle r="2.3" />
            <circle r="6.2" className={styles.pulseRing} />
            <animateMotion
              dur="8.5s"
              begin="-4.4s"
              repeatCount="indefinite"
              rotate="auto"
              path="M 70,776 C 156,748 242,748 338,770"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
