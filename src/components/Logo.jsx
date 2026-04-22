/**
 * TISDRUS Logo Component
 * Replicates the official logo: T [orange <;>] SDRUS
 *                               ─────────────────────
 *                               IT Consulting You Can Trust.
 *
 * dir="ltr" is forced on every element so the logo always reads
 * left-to-right, even when the page is in Arabic (RTL) mode.
 *
 * LogoMark  — compact, for Navbar
 * LogoFull  — with divider line + tagline, for Footer / large displays
 */

const BASE = {
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  fontWeight: 900,
  letterSpacing: '-0.035em',
  lineHeight: 1,
  userSelect: 'none',
  direction: 'ltr',       /* always LTR — logo is a proper noun */
  unicodeBidi: 'isolate', /* isolate from surrounding RTL context */
}

/* ── Compact logo for Navbar ── */
export function LogoMark({ fontSize = '1.35rem' }) {
  return (
    <span dir="ltr" style={{ ...BASE, display:'inline-flex', alignItems:'baseline', fontSize }}>
      <span style={{ color:'var(--logo-text)' }}>T</span>
      <span style={{ color:'var(--orange)', fontSize:'0.88em' }}>{'<;>'}</span>
      <span style={{ color:'var(--logo-text)' }}>SDRUS</span>
    </span>
  )
}

/* ── Full logo with divider + tagline ── */
export function LogoFull({ fontSize = '2.5rem' }) {
  return (
    <div dir="ltr" style={{ display:'inline-flex', flexDirection:'column', direction:'ltr', unicodeBidi:'isolate' }}>
      {/* Word mark */}
      <span style={{ ...BASE, display:'inline-flex', alignItems:'baseline', fontSize }}>
        <span style={{ color:'var(--logo-text)' }}>T</span>
        <span style={{ color:'var(--orange)', fontSize:'0.88em' }}>{'<;>'}</span>
        <span style={{ color:'var(--logo-text)' }}>SDRUS</span>
      </span>

      {/* Divider line */}
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, var(--gray-light), rgba(90,106,138,0.15))',
        margin: '0.35rem 0 0.28rem',
        width: '100%',
      }} />

      {/* Tagline — always LTR, always English */}
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: `calc(${fontSize} * 0.27)`,
        color: 'var(--gray)',
        letterSpacing: '0.06em',
        whiteSpace: 'nowrap',
        direction: 'ltr',
        unicodeBidi: 'isolate',
      }}>
        IT Consulting You Can Trust.
      </span>
    </div>
  )
}
