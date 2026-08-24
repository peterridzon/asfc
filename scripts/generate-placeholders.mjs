/**
 * Generates the artwork shipped with ASFC:
 *   - the placeholder images so the three pages are not empty before you add
 *     your own (deliberately abstract and badged EXAMPLE)
 *   - the OpenGraph social card
 *
 *   node scripts/generate-placeholders.mjs
 *
 * Run ./scripts/rasterise-og.sh afterwards to refresh public/og-image.png.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const C = {
  sea: '#cfe6f6',
  land: '#eef5f0',
  landEdge: '#b9cfc2',
  navy: '#0b2b4a',
  green: '#12813f',
  yellow: '#e0af10',
  orange: '#de6a12',
  red: '#c31f1f',
}

function rng(seed) {
  let state = seed >>> 0
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 0xffffffff
  }
}

function blob(cx, cy, rx, ry, seed) {
  const random = rng(seed)
  const steps = 14
  const points = []
  for (let i = 0; i < steps; i += 1) {
    const angle = (i / steps) * Math.PI * 2
    const jitter = 0.88 + random() * 0.24
    points.push([cx + Math.cos(angle) * rx * jitter, cy + Math.sin(angle) * ry * jitter])
  }
  return `${points
    .map(([x, y], index) => {
      if (index === 0) return `M${x.toFixed(1)},${y.toFixed(1)}`
      const [px, py] = points[index - 1]
      return `Q${px.toFixed(1)},${py.toFixed(1)} ${((px + x) / 2).toFixed(1)},${((py + y) / 2).toFixed(1)}`
    })
    .join(' ')} Z`
}

const land = (seed) =>
  [
    [300, 300, 210, 145],
    [640, 250, 185, 125],
    [520, 470, 235, 135],
    [860, 420, 165, 115],
    [230, 545, 145, 105],
  ]
    .map(([cx, cy, rx, ry], index) => `<path d="${blob(cx, cy, rx, ry, seed + index * 17)}"/>`)
    .join('\n    ')

function page({ heading, body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800" role="img" aria-label="${heading} — placeholder graphic">
  <rect width="1200" height="800" fill="${C.sea}"/>
  ${body}
  <text x="600" y="440" text-anchor="middle" transform="rotate(-18 600 440)"
        font-family="ui-monospace, Menlo, monospace" font-size="130" font-weight="800"
        fill="${C.navy}" opacity="0.10">EXAMPLE</text>
  <rect x="0" y="0" width="1200" height="86" fill="${C.navy}"/>
  <text x="40" y="40" font-family="ui-monospace, Menlo, monospace" font-size="24" font-weight="700"
        fill="#ffffff" letter-spacing="3">ASFC — AMATEUR STORM FORECAST CENTER</text>
  <text x="40" y="68" font-family="ui-monospace, Menlo, monospace" font-size="17"
        fill="#bfdcf1">${heading}</text>
  <text x="1160" y="52" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="17"
        font-weight="700" fill="${C.yellow}">PLACEHOLDER IMAGE</text>
  <text x="1160" y="778" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="14"
        fill="${C.navy}" opacity="0.7">Abstract example graphic — not a real forecast</text>
</svg>
`
}

const landLayer = (seed) =>
  `<g fill="${C.land}" stroke="${C.landEdge}" stroke-width="2">\n    ${land(seed)}\n  </g>`

const outlookBody = `
  ${landLayer(11)}
  <path d="${blob(620, 350, 250, 165, 21)}" fill="${C.green}" fill-opacity="0.22" stroke="${C.green}" stroke-width="3"/>
  <path d="${blob(640, 350, 165, 110, 22)}" fill="${C.yellow}" fill-opacity="0.3" stroke="${C.yellow}" stroke-width="3"/>
  <path d="${blob(660, 345, 92, 62, 23)}" fill="${C.orange}" fill-opacity="0.3" stroke="${C.orange}" stroke-width="3"/>`

const alertBody = `
  ${landLayer(58)}
  <path d="${blob(560, 380, 230, 150, 41)}" fill="${C.yellow}" fill-opacity="0.3" stroke="${C.yellow}" stroke-width="3"/>
  <path d="${blob(700, 330, 150, 105, 42)}" fill="${C.orange}" fill-opacity="0.3" stroke="${C.orange}" stroke-width="3"/>
  <path d="${blob(740, 330, 84, 58, 43)}" fill="${C.red}" fill-opacity="0.32" stroke="${C.red}" stroke-width="3"/>`

const FILES = [
  ['public/images/demo-outlook.svg', page({ heading: 'Storm outlook — example graphic', body: outlookBody })],
  ['public/images/demo-alert.svg', page({ heading: 'Severe weather — example graphic', body: alertBody })],
]

/* --- provider logo placeholders ------------------------------------------
 * Plain grey stand-ins, NOT the real logos. Overwrite the file with the real
 * one (same filename) to use it — see src/content/providers.ts.
 */
function logoPlaceholder(text) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 200" width="360" height="200" role="img" aria-label="${text} logo placeholder">
  <rect width="360" height="200" fill="#f1f4f7" stroke="#c9d6e2" stroke-width="2" stroke-dasharray="8 6"/>
  <text x="180" y="98" text-anchor="middle" font-family="ui-monospace, Menlo, monospace"
        font-size="34" font-weight="700" fill="#7f93a6" letter-spacing="2">${text}</text>
  <text x="180" y="132" text-anchor="middle" font-family="ui-monospace, Menlo, monospace"
        font-size="15" fill="#9fb0bf" letter-spacing="3">LOGO PLACEHOLDER</text>
</svg>
`
}

FILES.push(
  ['public/images/logos/ecmwf.svg', logoPlaceholder('ECMWF')],
  ['public/images/logos/aladin.svg', logoPlaceholder('ALADIN')],
  ['public/images/logos/dwd.svg', logoPlaceholder('DWD')],
)

for (const [relative, content] of FILES) {
  const path = resolve(root, relative)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, content, 'utf8')
  console.log('wrote', relative, `${(content.length / 1024).toFixed(1)} kB`)
}

/* --- OpenGraph social card ------------------------------------------------ */

const ogArtwork = `
  <rect width="1200" height="630" fill="${C.sea}"/>
  <g fill="${C.land}" stroke="${C.landEdge}" stroke-width="2" opacity="0.85" transform="translate(90,40) scale(0.78)">
    ${land(12)}
  </g>
  <path d="${blob(790, 330, 175, 120, 5)}" fill="${C.orange}" fill-opacity="0.28" stroke="${C.orange}" stroke-width="4"/>
  <path d="${blob(800, 330, 100, 70, 6)}" fill="${C.red}" fill-opacity="0.28" stroke="${C.red}" stroke-width="4"/>
  <rect x="0" y="0" width="1200" height="10" fill="${C.navy}"/>
  <text x="80" y="240" font-family="ui-monospace, Menlo, monospace" font-size="118" font-weight="800"
        fill="${C.navy}" letter-spacing="14">ASFC</text>
  <text x="84" y="298" font-family="ui-monospace, Menlo, monospace" font-size="30" font-weight="600"
        fill="${C.navy}" letter-spacing="3">Amateur Storm Forecast Center</text>
  <rect x="80" y="470" width="1040" height="100" rx="6" fill="${C.navy}"/>
  <text x="104" y="508" font-family="ui-monospace, Menlo, monospace" font-size="19" fill="#ffffff">
    This is for experimental purposes only and this doesn\u2019t replace
  </text>
  <text x="104" y="540" font-family="ui-monospace, Menlo, monospace" font-size="19" fill="#ffffff">
    official weather warnings or forecasts.
  </text>
`

writeFileSync(
  resolve(root, 'public/og-image.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">${ogArtwork}</svg>\n`,
  'utf8',
)
console.log('wrote public/og-image.svg')

// Square padding so qlmanage (the only SVG rasteriser macOS ships) produces a
// bitmap that can be centre-cropped back to exactly 1200x630.
writeFileSync(
  resolve(root, 'scripts/.og-square.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="1200" height="1200">
  <rect width="1200" height="1200" fill="${C.sea}"/>
  <g transform="translate(0,285)">${ogArtwork}</g>
</svg>\n`,
  'utf8',
)
console.log('wrote scripts/.og-square.svg')
