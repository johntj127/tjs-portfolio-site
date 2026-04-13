// ─── Node definitions ─────────────────────────────────────────────────────────
// x/y are percentage positions of the viewport (for absolute positioning).
// pathProgress is 0–100 matching offset-distance on the SVG motion path.
// These x/y values are tuned to sit exactly on the curved SVG path.

export const NODES = [
  {
    id:           'contact',
    label:        'Contact',
    x:            8,    // % of viewport width
    y:            63,   // % of viewport height
    pathProgress: 0,
    color:        '#e74c3c',
    symbol:       '✉',
    tagline:      "Let's build something",
  },
  {
    id:           'experience',
    label:        'Experience',
    x:            27,
    y:            46,
    pathProgress: 25,
    color:        '#e67e22',
    symbol:       '◈',
    tagline:      '20 years at Disney',
  },
  {
    id:           'home',
    label:        'Home',
    x:            50,
    y:            57,
    pathProgress: 50,
    color:        '#f1c40f',
    symbol:       '★',
    tagline:      'Start here',
  },
  {
    id:           'projects',
    label:        'Projects',
    x:            73,
    y:            39,
    pathProgress: 75,
    color:        '#2ecc71',
    symbol:       '▶',
    tagline:      'Things I built',
  },
  {
    id:           'awards',
    label:        'Awards & Creds',
    x:            92,
    y:            53,
    pathProgress: 100,
    color:        '#9b59b6',
    symbol:       '♦',
    tagline:      'Recognition & education',
  },
]

// Quick lookup by id
export const NODE_MAP = Object.fromEntries(
  NODES.map((n, i) => [n.id, { ...n, index: i }])
)

export const DEFAULT_NODE_ID = 'home'

// ms per single-step walk — must match CSS transition duration
export const WALK_STEP_MS = 900
