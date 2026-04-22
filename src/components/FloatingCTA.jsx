import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Zap, Mail, ArrowRight } from 'lucide-react'

export default function FloatingCTA() {
  const [visible, setVisible]   = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 36 }}
          style={{
            position: 'fixed', bottom: '1.75rem', right: '1.75rem',
            zIndex: 990, display: 'flex', flexDirection: 'column',
            alignItems: 'flex-end', gap: '0.625rem',
          }}
        >
          {/* Expanded panel */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.88 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="glass-strong"
                style={{
                  borderRadius: 'var(--r-xl)', padding: '1.375rem',
                  minWidth: 256, boxShadow: 'var(--shadow-xl)',
                  display: 'flex', flexDirection: 'column', gap: '0.875rem',
                  border: '1px solid var(--border)',
                }}
              >
                {/* Live dot */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: '#22c55e', display: 'block',
                    boxShadow: '0 0 10px rgba(34,197,94,0.8)',
                    animation: 'glow-pulse 1.8s ease-in-out infinite',
                  }} />
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#22c55e', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    En ligne maintenant
                  </span>
                </div>

                <div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    Parlez à un expert
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Réponse garantie sous 24h. Consultation initiale 100% gratuite.
                  </p>
                </div>

                <Link
                  to="/contact"
                  onClick={() => setExpanded(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    padding: '0.8rem', borderRadius: 'var(--r-md)',
                    background: 'var(--grad-blue)', color: '#fff',
                    fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none',
                    boxShadow: 'var(--shadow-glow-b)', transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <Zap size={14} /> Consultation gratuite
                </Link>

                <a
                  href="mailto:info@tisdrus.com"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    padding: '0.65rem', borderRadius: 'var(--r-md)',
                    background: 'var(--card-bg)', border: '1px solid var(--card-border)',
                    color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.8125rem',
                    textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.color = 'var(--orange)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.color = 'var(--text-secondary)' }}
                >
                  <Mail size={13} /> info@tisdrus.com
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle button */}
          <motion.button
            onClick={() => setExpanded(v => !v)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            style={{
              width: 56, height: 56, borderRadius: '50%',
              background: expanded
                ? 'var(--card-bg)'
                : 'linear-gradient(135deg, var(--orange), #f0a040)',
              border: expanded ? '1.5px solid var(--border)' : 'none',
              color: expanded ? 'var(--text-muted)' : '#fff',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: expanded
                ? 'var(--shadow-lg)'
                : '0 6px 28px rgba(232,120,32,0.55)',
              transition: 'all 0.3s ease', position: 'relative',
            }}
          >
            {!expanded && (
              <>
                <span style={{
                  position: 'absolute', inset: -5, borderRadius: '50%',
                  border: '2px solid rgba(232,120,32,0.35)',
                  animation: 'glow-pulse 2.2s ease-in-out infinite',
                }} />
                <span style={{
                  position: 'absolute', inset: -11, borderRadius: '50%',
                  border: '1px solid rgba(232,120,32,0.15)',
                  animation: 'glow-pulse 2.2s ease-in-out infinite 0.7s',
                }} />
              </>
            )}
            <motion.div animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>
              {expanded ? <X size={22} /> : <MessageCircle size={22} />}
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
