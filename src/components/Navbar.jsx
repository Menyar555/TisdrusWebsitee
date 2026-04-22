import { useState, useEffect, useRef, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Menu, Globe, Sun, Moon, ChevronDown, Zap, Shield, Brain, Layers, GraduationCap, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { LogoMark } from './Logo'

const LANGS = { fr: { flag: '🇫🇷', label: 'FR' }, en: { flag: '🇨🇦', label: 'EN' }, ar: { flag: '🇸🇦', label: 'عربي' } }

const SEARCH_INDEX = [
  { href: '/', label: 'Accueil', desc: 'Page d\'accueil TISDRUS', keywords: ['accueil', 'home', 'tisdrus', 'principal', 'bienvenue'] },
  { href: '/services', label: 'Services', desc: 'Cybersécurité · IA · Transformation · Formation', keywords: ['services', 'cybersécurité', 'intelligence artificielle', 'ia', 'transformation numérique', 'formation', 'pmp', 'scrum', 'agile', 'sécurité', 'cyber', 'iso', 'nist', 'cloud', 'audit', 'risques', 'gouvernance', 'cissp', 'ceh'] },
  { href: '/expertise', label: 'Expertise', desc: 'Domaines d\'expertise & certifications', keywords: ['expertise', 'compétences', 'certifications', 'industries', 'secteurs', 'data', 'données', 'mlops', 'zero trust', 'pipeda', 'loi 25', 'devops'] },
  { href: '/about', label: 'À propos', desc: 'Mission, vision, équipe & valeurs', keywords: ['à propos', 'about', 'mission', 'vision', 'équipe', 'team', 'valeurs', 'histoire', 'fondateur', 'rhouma', 'montréal', 'canada'] },
  { href: '/contact', label: 'Contact', desc: 'Consultation gratuite · Nous joindre', keywords: ['contact', 'consultation', 'gratuit', 'appel', 'email', 'téléphone', 'formulaire', 'devis', 'projet'] },
]

function fuzzyScore(query, text) {
  const q = query.toLowerCase().trim()
  const t = text.toLowerCase()
  if (t.includes(q)) return 2
  const words = q.split(/\s+/)
  const matched = words.filter(w => t.includes(w))
  return matched.length / words.length
}

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [langOpen, setLangOpen]   = useState(false)
  const [query, setQuery]         = useState('')
  const location  = useLocation()
  const langRef   = useRef(null)
  const searchRef = useRef(null)

  const links = [
    { href:'/', label: t('nav.home') },
    { href:'/services', label: t('nav.services') },
    { href:'/expertise', label: t('nav.expertise') },
    { href:'/about', label: t('nav.about') },
    { href:'/contact', label: t('nav.contact') },
  ]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false); setSearchOpen(false) }, [location.pathname])
  useEffect(() => {
    const fn = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])
  useEffect(() => { if (searchOpen && searchRef.current) searchRef.current.focus() }, [searchOpen])
  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : '' }, [menuOpen])

  const isActive = (href) => href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  return (
    <>
      <motion.header
        initial={{ y:-80, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
        style={{
          position:'fixed', top:0, left:0, right:0,
          zIndex: 1000,
          padding: scrolled ? '0.625rem 0' : '1rem 0',
          transition:'padding 0.4s ease,background 0.4s ease,border-color 0.4s ease',
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        }}
      >
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem' }}>

          {/* ── Logo ── */}
          <Link to="/" style={{ flexShrink:0 }}>
            <motion.div whileHover={{ scale:1.04 }} transition={{ duration:0.2 }}>
              <LogoMark fontSize="1.75rem" />
            </motion.div>
          </Link>

          {/* ── Desktop Pill Nav ── */}
          <nav className="hide-mobile" style={{
            display:'flex', alignItems:'center', gap:'0.125rem',
            background: scrolled ? 'transparent' : 'var(--card-bg)',
            border: scrolled ? 'none' : '1px solid var(--card-border)',
            borderRadius:'var(--r-full)',
            padding: scrolled ? '0' : '0.3rem',
            backdropFilter: scrolled ? 'none' : 'blur(16px)',
          }}>
            {links.map(l => (
              <Link key={l.href} to={l.href} style={{
                position:'relative',
                padding:'0.45rem 1rem',
                borderRadius:'var(--r-full)',
                fontSize:'0.875rem',
                fontWeight: isActive(l.href) ? 600 : 500,
                color: isActive(l.href) ? '#fff' : 'var(--text-secondary)',
                background: isActive(l.href) ? 'var(--grad-blue)' : 'transparent',
                boxShadow: isActive(l.href) ? 'var(--shadow-glow-b)' : 'none',
                transition:'all 0.25s ease',
                whiteSpace:'nowrap',
              }}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* ── Right Actions ── */}
          <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', flexShrink:0 }}>

            {/* Search */}
            <ActionBtn onClick={() => setSearchOpen(true)} title="Search">
              <Search size={16} />
            </ActionBtn>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                width:44, height:26, borderRadius:13, position:'relative',
                background: theme==='dark' ? 'var(--blue-subtle)' : 'var(--blue)',
                border:`1.5px solid ${theme==='dark' ? 'var(--border)' : 'var(--blue)'}`,
                cursor:'pointer', flexShrink:0, transition:'all 0.3s ease',
              }}
            >
              <motion.div
                animate={{ x: theme==='dark' ? 1 : 18 }}
                transition={{ type:'spring', stiffness:500, damping:35 }}
                style={{
                  position:'absolute', top:2, width:18, height:18, borderRadius:'50%',
                  background:'#fff',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  boxShadow:'0 1px 4px rgba(0,0,0,0.3)',
                }}
              >
                {theme==='dark'
                  ? <Moon size={10} style={{ color:'var(--blue-dark)' }} />
                  : <Sun  size={10} style={{ color:'var(--orange)' }} />
                }
              </motion.div>
            </button>

            {/* Language */}
            <div ref={langRef} style={{ position:'relative' }}>
              <ActionBtn onClick={() => setLangOpen(v => !v)}>
                <Globe size={14} />
                <span style={{ fontSize:'0.75rem', fontWeight:600 }}>{LANGS[language].label}</span>
                <motion.span animate={{ rotate: langOpen ? 180 : 0 }} transition={{ duration:0.2 }}>
                  <ChevronDown size={11} style={{ opacity:0.6 }} />
                </motion.span>
              </ActionBtn>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity:0, y:8, scale:0.95 }}
                    animate={{ opacity:1, y:0, scale:1 }}
                    exit={{ opacity:0, y:8, scale:0.95 }}
                    transition={{ duration:0.15 }}
                    className="glass"
                    style={{
                      position:'absolute', top:'calc(100% + 8px)', right:0,
                      borderRadius:'var(--r-md)', padding:'0.375rem',
                      minWidth:120, zIndex:200,
                      boxShadow:'var(--shadow-lg)',
                    }}
                  >
                    {Object.entries(LANGS).map(([code, info]) => (
                      <button
                        key={code}
                        onClick={() => { setLanguage(code); setLangOpen(false) }}
                        style={{
                          display:'flex', alignItems:'center', gap:'0.625rem',
                          width:'100%', padding:'0.5rem 0.875rem',
                          borderRadius:'var(--r-sm)',
                          background: language===code ? 'var(--blue-subtle)' : 'transparent',
                          border:'none', cursor:'pointer',
                          color: language===code ? 'var(--blue)' : 'var(--text-secondary)',
                          fontSize:'0.875rem', fontWeight: language===code ? 600 : 400,
                          transition:'all 0.15s',
                        }}
                      >
                        <span>{info.flag}</span> {info.label}
                        {language===code && <div style={{ marginLeft:'auto', width:6, height:6, borderRadius:'50%', background:'var(--blue)' }} />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <Link to="/contact" className="btn btn-primary btn-sm hide-mobile">
              <Zap size={13} /> {t('nav.cta')}
            </Link>

            {/* Hamburger */}
            <ActionBtn onClick={() => setMenuOpen(v => !v)} className="hide-desktop">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </ActionBtn>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.55)', zIndex:999, backdropFilter:'blur(6px)' }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }}
              transition={{ type:'spring', damping:32, stiffness:320 }}
              onClick={e => e.stopPropagation()}
              className="glass-strong"
              style={{
                position:'absolute', top:0, right:0, bottom:0,
                width:'min(320px,85vw)',
                display:'flex', flexDirection:'column', padding:'1.5rem', gap:'1.5rem',
              }}
            >
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <LogoMark fontSize="1.6rem" />
                <ActionBtn onClick={() => setMenuOpen(false)}><X size={18} /></ActionBtn>
              </div>

              <nav style={{ display:'flex', flexDirection:'column', gap:'0.25rem', flex:1 }}>
                {links.map((l, i) => (
                  <motion.div key={l.href} initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} transition={{ delay: i*0.06 }}>
                    <Link to={l.href} onClick={() => setMenuOpen(false)} style={{
                      display:'block', padding:'0.875rem 1rem', borderRadius:'var(--r-md)',
                      background: isActive(l.href) ? 'var(--blue-subtle)' : 'transparent',
                      color: isActive(l.href) ? 'var(--blue)' : 'var(--text-secondary)',
                      fontWeight: isActive(l.href) ? 600 : 400, fontSize:'1rem',
                      border: isActive(l.href) ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent',
                      transition:'all 0.2s',
                    }}>{l.label}</Link>
                  </motion.div>
                ))}
              </nav>

              <div style={{ display:'flex', gap:'0.5rem' }}>
                {Object.entries(LANGS).map(([code, info]) => (
                  <button key={code} onClick={() => { setLanguage(code); setMenuOpen(false) }} style={{
                    flex:1, padding:'0.6rem', borderRadius:'var(--r-sm)', cursor:'pointer',
                    background: language===code ? 'var(--blue-subtle)' : 'var(--card-bg)',
                    border: language===code ? '1px solid rgba(59,130,246,0.3)' : '1px solid var(--card-border)',
                    color: language===code ? 'var(--blue)' : 'var(--text-secondary)',
                    fontSize:'0.8rem', fontWeight: language===code ? 600 : 400, transition:'all 0.2s',
                  }}>
                    {info.flag} {info.label}
                  </button>
                ))}
              </div>

              <Link to="/contact" className="btn btn-primary" style={{ justifyContent:'center' }} onClick={() => setMenuOpen(false)}>
                <Zap size={15} /> {t('nav.cta')}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Search Modal ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={e => e.target===e.currentTarget && setSearchOpen(false)}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.72)', zIndex:9999, backdropFilter:'blur(10px)', display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'12vh 1rem 0' }}
          >
            <motion.div
              initial={{ y:-24, opacity:0, scale:0.97 }} animate={{ y:0, opacity:1, scale:1 }} exit={{ y:-16, opacity:0, scale:0.97 }}
              transition={{ duration:0.22, ease:[0.16,1,0.3,1] }}
              className="glass-strong"
              style={{ width:'100%', maxWidth:600, borderRadius:'var(--r-xl)', overflow:'hidden', boxShadow:'var(--shadow-xl)' }}
            >
              {/* Input row */}
              <div style={{ display:'flex', alignItems:'center', gap:'0.875rem', padding:'1.125rem 1.5rem', borderBottom:'1px solid var(--border)' }}>
                <Search size={18} style={{ color:'var(--blue)', flexShrink:0 }} />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder={t('nav.searchPlaceholder')}
                  onKeyDown={e => e.key==='Escape' && setSearchOpen(false)}
                  style={{ flex:1, background:'transparent', border:'none', color:'var(--text-primary)', fontSize:'1.0625rem', outline:'none' }}
                />
                {query && (
                  <button onClick={() => setQuery('')} style={{ background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', display:'flex' }}>
                    <X size={14} />
                  </button>
                )}
                <button onClick={() => setSearchOpen(false)} style={{ background:'var(--card-bg)', border:'1px solid var(--border)', borderRadius:'var(--r-sm)', padding:'0.2rem 0.5rem', color:'var(--text-muted)', cursor:'pointer', fontSize:'0.72rem', fontWeight:600, letterSpacing:'0.03em' }}>ESC</button>
              </div>

              {/* Results */}
              {query.trim().length > 0 ? (
                <div style={{ padding:'0.5rem', maxHeight:360, overflowY:'auto' }}>
                  {(() => {
                    const results = SEARCH_INDEX
                      .map(item => {
                        const haystack = [item.label, item.desc, ...item.keywords].join(' ')
                        const score = fuzzyScore(query, haystack)
                        return { ...item, score }
                      })
                      .filter(item => item.score > 0)
                      .sort((a, b) => b.score - a.score)
                    return results.length > 0 ? results.map(item => (
                      <Link key={item.href} to={item.href} onClick={() => { setSearchOpen(false); setQuery('') }} style={{
                        display:'flex', alignItems:'center', gap:'0.875rem',
                        padding:'0.875rem 1rem', borderRadius:'var(--r-md)',
                        color:'var(--text-secondary)', transition:'all 0.15s',
                        textDecoration:'none',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background='var(--blue-subtle)'; e.currentTarget.style.color='var(--text-primary)' }}
                        onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.color='var(--text-secondary)' }}
                      >
                        <div style={{ width:34, height:34, borderRadius:'var(--r-sm)', background:'var(--blue-subtle)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <Search size={14} style={{ color:'var(--blue)' }} />
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontWeight:600, fontSize:'0.9rem', color:'var(--text-primary)' }}>{item.label}</div>
                          <div style={{ fontSize:'0.78rem', color:'var(--text-muted)', marginTop:'0.1rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.desc}</div>
                        </div>
                        <ArrowRight size={13} style={{ opacity:0.4, flexShrink:0 }} />
                      </Link>
                    )) : (
                      <div style={{ padding:'2rem', textAlign:'center', color:'var(--text-muted)', fontSize:'0.9rem' }}>
                        Aucun résultat pour «&nbsp;{query}&nbsp;»
                      </div>
                    )
                  })()}
                </div>
              ) : (
                <div style={{ padding:'1rem 0.5rem' }}>
                  <div style={{ padding:'0.5rem 1rem', fontSize:'0.72rem', fontWeight:600, color:'var(--text-muted)', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:'0.25rem' }}>Navigation rapide</div>
                  {SEARCH_INDEX.map(item => (
                    <Link key={item.href} to={item.href} onClick={() => { setSearchOpen(false); setQuery('') }} style={{
                      display:'flex', alignItems:'center', gap:'0.875rem',
                      padding:'0.75rem 1rem', borderRadius:'var(--r-md)',
                      color:'var(--text-secondary)', transition:'all 0.15s', textDecoration:'none',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background='var(--card-bg)' }}
                      onMouseLeave={e => { e.currentTarget.style.background='' }}
                    >
                      <Search size={13} style={{ opacity:0.35, flexShrink:0 }} />
                      <span style={{ fontSize:'0.875rem', fontWeight:500 }}>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ActionBtn({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        display:'flex', alignItems:'center', gap:'0.3rem',
        padding:'0.475rem 0.75rem', borderRadius:'var(--r-sm)',
        background:'var(--card-bg)', border:'1px solid var(--card-border)',
        color:'var(--text-secondary)', cursor:'pointer', transition:'all 0.2s',
        fontSize:'0.8rem', fontWeight:500,
      }}
    >
      {children}
    </button>
  )
}
