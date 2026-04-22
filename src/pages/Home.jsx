import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight, Shield, Brain, Layers, GraduationCap,
  Building2, Landmark, Heart, Radio, Zap, ShoppingBag,
  BookOpen, ChevronRight, CheckCircle, Quote,
  Linkedin, Mail, TrendingUp, Users, Target, MapPin,
  XCircle, Clock, ArrowUpRight,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import AnimatedSection from '../components/AnimatedSection'

/* ────────────────────────────────────────────────
   Animated Blob Background
──────────────────────────────────────────────── */
function MeshBackground() {
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
      {/* Grid dots */}
      <div className="bg-grid" style={{ position:'absolute', inset:0, opacity:0.35 }} />

      {/* Blobs */}
      <div style={{
        position:'absolute', width:700, height:700, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(27,45,94,0.45) 0%, transparent 65%)',
        top:'-15%', left:'-5%',
        animation:'blob-drift 18s ease-in-out infinite',
        filter:'blur(1px)',
      }} />
      <div style={{
        position:'absolute', width:600, height:600, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(46,107,229,0.18) 0%, transparent 65%)',
        top:'10%', right:'-8%',
        animation:'blob-drift 22s ease-in-out infinite reverse',
        filter:'blur(1px)',
      }} />
      <div style={{
        position:'absolute', width:500, height:500, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(232,120,32,0.08) 0%, transparent 65%)',
        bottom:'-10%', left:'35%',
        animation:'blob-drift 16s ease-in-out infinite 4s',
        filter:'blur(1px)',
      }} />

      {/* Gradient vignette */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to bottom, transparent 60%, var(--bg-base) 100%)',
      }} />
    </div>
  )
}

/* ────────────────────────────────────────────────
   Counter
──────────────────────────────────────────────── */
function Counter({ to, suffix = '', duration = 1800 }) {
  const [val, setVal] = useState(0)
  const ref  = useRef(null)
  const done = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        const num = parseInt(to), step = num / (duration / 16)
        let c = 0
        const t = setInterval(() => { c = Math.min(c + step, num); setVal(Math.floor(c)); if (c >= num) clearInterval(t) }, 16)
      }
    }, { threshold: 0.5 })
    ob.observe(el)
    return () => ob.disconnect()
  }, [to, duration])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ────────────────────────────────────────────────
   Floating UI Card (hero decoration)
──────────────────────────────────────────────── */
function FloatCard({ children, style = {}, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      transition={{ delay, duration:0.7, ease:[0.16,1,0.3,1] }}
      style={{
        background:'var(--glass-bg)',
        border:'1px solid var(--glass-border)',
        backdropFilter:'blur(20px)',
        WebkitBackdropFilter:'blur(20px)',
        borderRadius:16,
        padding:'0.875rem 1.125rem',
        boxShadow:'var(--shadow-card)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}

const ICON_MAP = { Shield, Brain, Layers, GraduationCap, Building2, Landmark, Heart, Radio, Zap, ShoppingBag, BookOpen }

/* ──────────────────────────────────────────────────────────────
   HOME PAGE
────────────────────────────────────────────────────────────── */
export default function Home() {
  const { t } = useLanguage()
  const heroRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset:['start start','end start'] })
  const heroY  = useTransform(scrollYProgress, [0,1], [0, 100])
  const heroOp = useTransform(scrollYProgress, [0,0.75], [1, 0])

  const letters      = t('tisdrus.letters')       || []
  const valueItems   = t('values.items')          || []
  const services     = t('servicesPreview.items') || []
  const industries   = t('industries.items')      || []
  const resultItems  = t('results.items')         || []
  const problemItems = t('problems.items')        || []
  const processItems = t('process.items')         || []
  const whyUsItems   = t('whyUs.items')           || []
  const clientItems  = t('clientTypes.items')     || []
  const insightItems = t('insights.items')        || []

  const stats = [
    { to:'150', suffix:'+', label: t('hero.stat1.label') },
    { to:'98',  suffix:'%', label: t('hero.stat2.label') },
    { to:'12',  suffix:'+', label: t('hero.stat3.label') },
    { to:'4',   suffix:'',  label: 'Domaines d\'expertise' },
  ]

  const letterColors = ['#F97316','#818cf8','#34d399','#60a5fa','#f472b6','#a3e635','#fb923c']

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.35 }}>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="bg-hero-mesh noise" style={{ minHeight:'100vh', display:'flex', alignItems:'center', position:'relative', paddingTop:90, overflow:'hidden' }}>
        <MeshBackground />

        <motion.div className="container section-inner" style={{ y:heroY, opacity:heroOp, paddingTop:'3rem', paddingBottom:'5rem', position:'relative', zIndex:2 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:'4rem', alignItems:'center' }}>

            {/* Left */}
            <div style={{ maxWidth:780 }}>
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15, duration:0.6 }}>
                <span className="badge badge-blue" style={{ marginBottom:'1.5rem' }}>
                  <Zap size={11} /> {t('hero.label')}
                </span>
              </motion.div>

              <motion.h1
                className="t-hero"
                initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.25, duration:0.75, ease:[0.16,1,0.3,1] }}
                style={{ color:'var(--text-primary)', marginBottom:'1.5rem' }}
              >
                {t('hero.title')}{' '}
                <span className="text-grad-blue">{t('hero.titleHighlight')}</span>
              </motion.h1>

              <motion.p
                className="t-body-lg"
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.4, duration:0.7 }}
                style={{ color:'var(--text-secondary)', maxWidth:640, marginBottom:'2.5rem' }}
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.div
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.55 }}
                style={{ display:'flex', gap:'0.875rem', flexWrap:'wrap', marginBottom:'3.5rem' }}
              >
                <Link to="/contact" className="btn btn-primary btn-lg">
                  {t('hero.cta1')} <ArrowRight size={18} />
                </Link>
                <Link to="/expertise" className="btn btn-ghost btn-lg">
                  {t('hero.cta2')}
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
                style={{ display:'flex', gap:'2.5rem', flexWrap:'wrap', padding:'1.75rem 2rem', background:'var(--card-bg)', border:'1px solid var(--card-border)', borderRadius:'var(--r-xl)', backdropFilter:'blur(16px)', width:'fit-content' }}
              >
                {stats.map((s, i) => (
                  <div key={i} style={{ display:'flex', flexDirection:'column', gap:'0.2rem' }}>
                    <div style={{ fontSize:'clamp(1.75rem,3vw,2.25rem)', fontWeight:900, letterSpacing:'-0.04em', lineHeight:1, background:'var(--grad-warm)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                      <Counter to={s.to} suffix={s.suffix} />
                    </div>
                    <div className="t-xs" style={{ color:'var(--text-muted)', fontWeight:500 }}>{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — floating UI cards */}
            <div className="hide-mobile" style={{ position:'relative', width:320, height:400 }}>
              <FloatCard delay={0.8} style={{ position:'absolute', top:0, right:0, width:240 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.875rem' }}>
                  <div className="icon-box icon-box-sm icon-blue"><Shield size={15} /></div>
                  <span style={{ fontSize:'0.8rem', fontWeight:600, color:'var(--text-primary)' }}>Cyber Score</span>
                </div>
                <div style={{ fontSize:'2rem', fontWeight:900, color:'var(--blue)', letterSpacing:'-0.04em' }}>94<span style={{ fontSize:'1rem', color:'var(--text-muted)' }}>/100</span></div>
                <div style={{ height:6, background:'var(--card-border)', borderRadius:3, marginTop:'0.75rem', overflow:'hidden' }}>
                  <motion.div initial={{ width:0 }} animate={{ width:'94%' }} transition={{ delay:1.2, duration:1.2, ease:[0.16,1,0.3,1] }} style={{ height:'100%', background:'var(--grad-blue)', borderRadius:3 }} />
                </div>
                <div className="t-xs" style={{ color:'var(--text-muted)', marginTop:'0.5rem' }}>Security posture: Excellent</div>
              </FloatCard>

              <FloatCard delay={1.0} style={{ position:'absolute', top:130, left:0, width:220 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'0.625rem', marginBottom:'0.625rem' }}>
                  <div className="icon-box icon-box-sm icon-orange"><Brain size={15} /></div>
                  <span style={{ fontSize:'0.8rem', fontWeight:600, color:'var(--text-primary)' }}>AI Readiness</span>
                </div>
                <div style={{ display:'flex', gap:'4px' }}>
                  {[85,72,90,68,95].map((v,i)=>(
                    <motion.div key={i} initial={{ height:0 }} animate={{ height:v*0.5 }} transition={{ delay:1.4+i*0.1, duration:0.6 }} style={{ width:28, background:`rgba(249,115,22,${0.4+v/200})`, borderRadius:'4px 4px 0 0', marginTop:'auto' }} />
                  ))}
                </div>
              </FloatCard>

              <FloatCard delay={1.2} style={{ position:'absolute', bottom:10, right:20, width:210 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.625rem' }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--emerald)', boxShadow:'0 0 8px var(--emerald)' }} />
                  <span className="t-xs" style={{ color:'var(--text-muted)' }}>Active Projects</span>
                </div>
                {[{n:'Cyber Audit',p:78,c:'var(--blue)'},{n:'AI Governance',p:55,c:'var(--orange)'},{n:'Data Platform',p:91,c:'var(--cyan)'}].map((p,i)=>(
                  <div key={i} style={{ marginBottom:'0.5rem' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'3px' }}>
                      <span className="t-xs" style={{ color:'var(--text-secondary)', fontWeight:500 }}>{p.n}</span>
                      <span className="t-xs" style={{ color:p.c, fontWeight:600 }}>{p.p}%</span>
                    </div>
                    <div style={{ height:4, background:'var(--card-border)', borderRadius:2, overflow:'hidden' }}>
                      <motion.div initial={{ width:0 }} animate={{ width:`${p.p}%` }} transition={{ delay:1.5+i*0.15, duration:0.8 }} style={{ height:'100%', background:p.c, borderRadius:2 }} />
                    </div>
                  </div>
                ))}
              </FloatCard>
            </div>

          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4 }} style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem', zIndex:2 }}>
          <span className="t-xs" style={{ color:'var(--text-muted)', letterSpacing:'0.08em', textTransform:'uppercase' }}>Scroll</span>
          <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:1.5 }} style={{ width:1, height:32, background:'linear-gradient(to bottom, var(--blue), transparent)' }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          TICKER MARQUEE
      ══════════════════════════════════════════ */}
      <div style={{ background:'var(--bg-surface)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', padding:'0.875rem 0', overflow:'hidden' }}>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...Array(2)].map((_, ri) => (
              <div key={ri} style={{ display:'flex' }}>
                {['Intelligence Artificielle','Cybersécurité','Gouvernance des Données','Transformation Numérique','IA Responsable','Zero Trust','Cloud Security','MLOps','Change Management','ISO 27001','NIST','DevSecOps'].map(item => (
                  <span key={item} className="marquee-item t-label" style={{ color:'var(--text-muted)' }}>
                    <span style={{ color:'var(--orange)', fontSize:'0.5rem' }}>◆</span> {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RESULTS METRICS BAND
      ══════════════════════════════════════════ */}
      <section className="section bg-base">
        <div className="container section-inner">
          <AnimatedSection>
            <div style={{ textAlign:'center', maxWidth:640, margin:'0 auto', marginBottom:'clamp(2.5rem,5vw,4rem)' }}>
              <div className="eyebrow">{t('results.label')}</div>
              <h2 className="t-h2" style={{ color:'var(--text-primary)', marginBottom:'1rem' }}>{t('results.title')}</h2>
              <p className="t-body-lg" style={{ color:'var(--text-secondary)' }}>{t('results.subtitle')}</p>
            </div>
          </AnimatedSection>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'1.25rem' }}>
            {resultItems.map((item, i) => {
              const colors = ['var(--blue)','var(--orange)','var(--cyan)','var(--violet-light)']
              const c = colors[i % colors.length]
              return (
                <AnimatedSection key={i} delay={i * 80} direction="up">
                  <motion.div
                    whileHover={{ y:-6 }}
                    style={{
                      background:'var(--card-bg)', border:'1px solid var(--card-border)',
                      borderRadius:'var(--r-xl)', padding:'2rem',
                      display:'flex', flexDirection:'column', gap:'0.75rem',
                      height:'100%', position:'relative', overflow:'hidden',
                      transition:'all 0.25s',
                    }}
                  >
                    <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${c},transparent)` }} />
                    <div style={{ fontSize:'clamp(2.25rem,4vw,3rem)', fontWeight:900, letterSpacing:'-0.04em', color:c, lineHeight:1 }}>
                      {item.value}
                    </div>
                    <div style={{ fontSize:'1rem', fontWeight:700, color:'var(--text-primary)' }}>{item.label}</div>
                    <p style={{ fontSize:'0.8125rem', color:'var(--text-secondary)', lineHeight:1.7, flex:1 }}>{item.desc}</p>
                  </motion.div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TISDRUS ACRONYM — BENTO STYLE
      ══════════════════════════════════════════ */}
      <section className="section" style={{ background:'var(--bg-surface)' }}>
        <div className="container section-inner">
          <AnimatedSection>
            <div style={{ textAlign:'center', maxWidth:680, margin:'0 auto', marginBottom:'clamp(2.5rem,5vw,4rem)' }}>
              <div className="eyebrow">{t('tisdrus.label')}</div>
              <h2 className="t-h2" style={{ color:'var(--text-primary)', marginBottom:'1rem' }}>{t('tisdrus.title')}</h2>
              <p className="t-body-lg" style={{ color:'var(--text-secondary)' }}>{t('tisdrus.subtitle')}</p>
            </div>
          </AnimatedSection>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))', gap:'0.875rem' }} className="stagger">
            {letters.map((item, i) => (
              <AnimatedSection key={i} delay={i * 55} direction="up">
                <motion.div
                  onHoverStart={() => setActiveIdx(i)}
                  onHoverEnd={()  => setActiveIdx(null)}
                  whileHover={{ y:-6, scale:1.02 }}
                  transition={{ duration:0.25 }}
                  style={{
                    position:'relative', overflow:'hidden',
                    background: activeIdx===i ? `linear-gradient(135deg,${letterColors[i]}15,${letterColors[i]}06)` : 'var(--card-bg)',
                    border:`1px solid ${activeIdx===i ? letterColors[i]+'45' : 'var(--card-border)'}`,
                    borderRadius:'var(--r-xl)', padding:'1.75rem',
                    cursor:'default', transition:'all 0.3s ease',
                    display:'flex', flexDirection:'column', gap:'0.625rem',
                    boxShadow: activeIdx===i ? `0 12px 40px ${letterColors[i]}20` : 'none',
                  }}
                >
                  {/* Gradient top line */}
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${letterColors[i]},transparent)`, opacity: activeIdx===i ? 1 : 0, transition:'opacity 0.3s' }} />

                  <div style={{ fontSize:'3.25rem', fontWeight:900, letterSpacing:'-0.05em', lineHeight:1, color:letterColors[i], textShadow:`0 0 24px ${letterColors[i]}60` }}>
                    {item.letter}
                  </div>
                  <div style={{ fontSize:'1rem', fontWeight:700, color:'var(--text-primary)' }}>{item.word}</div>
                  <p style={{ fontSize:'0.8125rem', color:'var(--text-secondary)', lineHeight:1.65, flex:1 }}>{item.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VALUE PROPOSITION — BENTO GRID
      ══════════════════════════════════════════ */}
      <section className="section bg-base">
        <div className="container section-inner">
          <AnimatedSection>
            <div style={{ maxWidth:600, marginBottom:'clamp(2.5rem,5vw,4rem)' }}>
              <div className="eyebrow">{t('values.label')}</div>
              <h2 className="t-h2" style={{ color:'var(--text-primary)' }}>{t('values.title')}</h2>
            </div>
          </AnimatedSection>

          {/* Bento-style 2-col grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1.25rem' }}>
            {[...valueItems].map((item, i) => {
              const icons  = [Target, TrendingUp, CheckCircle, Users]
              const colors = ['var(--blue)','var(--orange)','var(--cyan)','var(--violet)']
              const bgs    = ['var(--blue-subtle)','var(--orange-subtle)','var(--cyan-subtle)','var(--violet-subtle)']
              const Ico = icons[i % icons.length]
              return (
                <AnimatedSection key={i} delay={i*80} direction={i%2===0?'left':'right'}>
                  <motion.div
                    whileHover={{ y:-5 }}
                    className="card card-accent"
                    style={{ height:'100%', display:'flex', flexDirection:'column', gap:'1rem', background:'var(--card-bg)' }}
                  >
                    <div className="icon-box icon-box-md" style={{ background:bgs[i%4], color:colors[i%4], border:`1px solid ${colors[i%4]}30` }}>
                      <Ico size={20} />
                    </div>
                    <h3 className="t-h4" style={{ color:'var(--text-primary)' }}>{item.title}</h3>
                    <p className="t-sm" style={{ color:'var(--text-secondary)', lineHeight:1.75, flex:1 }}>{item.description}</p>
                  </motion.div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES PREVIEW
      ══════════════════════════════════════════ */}
      <section className="section" style={{ background:'var(--bg-surface)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div className="container section-inner">
          <AnimatedSection>
            <div style={{ textAlign:'center', maxWidth:680, margin:'0 auto', marginBottom:'clamp(2.5rem,5vw,4rem)' }}>
              <div className="eyebrow">{t('servicesPreview.label')}</div>
              <h2 className="t-h2" style={{ color:'var(--text-primary)', marginBottom:'1rem' }}>{t('servicesPreview.title')}</h2>
              <p className="t-body-lg" style={{ color:'var(--text-secondary)' }}>{t('servicesPreview.subtitle')}</p>
            </div>
          </AnimatedSection>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1.25rem' }} className="stagger">
            {services.map((svc, i) => {
              const Ico = ICON_MAP[svc.icon] || Shield
              const palette = [
                { bg:'var(--blue-subtle)',   color:'var(--blue)',   glow:'rgba(59,130,246,0.15)',  border:'rgba(59,130,246,0.2)' },
                { bg:'var(--orange-subtle)', color:'var(--orange)', glow:'rgba(249,115,22,0.15)',  border:'rgba(249,115,22,0.2)' },
                { bg:'var(--cyan-subtle)',   color:'var(--cyan)',   glow:'rgba(6,182,212,0.15)',   border:'rgba(6,182,212,0.2)' },
                { bg:'var(--violet-subtle)', color:'var(--violet-light)', glow:'rgba(124,58,237,0.15)', border:'rgba(124,58,237,0.2)' },
              ]
              const p = palette[i % palette.length]
              return (
                <AnimatedSection key={i} delay={i*80} direction="up">
                  <Link to={svc.link || '/services'} style={{ textDecoration:'none', display:'block', height:'100%' }}>
                    <motion.div
                      whileHover={{ y:-8 }}
                      transition={{ duration:0.25 }}
                      style={{
                        background:'var(--card-bg)', border:'1px solid var(--card-border)',
                        borderRadius:'var(--r-xl)', padding:'2rem',
                        height:'100%', display:'flex', flexDirection:'column', gap:'1rem',
                        cursor:'pointer', position:'relative', overflow:'hidden',
                        transition:'all 0.3s ease',
                      }}
                      onHoverStart={e => {
                        e.currentTarget.style.borderColor = p.border
                        e.currentTarget.style.boxShadow = `0 20px 60px ${p.glow}, 0 4px 16px rgba(0,0,0,0.2)`
                      }}
                      onHoverEnd={e => {
                        e.currentTarget.style.borderColor = ''
                        e.currentTarget.style.boxShadow = ''
                      }}
                    >
                      <div className="icon-box icon-box-lg" style={{ background:p.bg, color:p.color, border:`1px solid ${p.border}` }}>
                        <Ico size={26} />
                      </div>
                      <h3 className="t-h4" style={{ color:'var(--text-primary)' }}>{svc.title}</h3>
                      <p className="t-sm" style={{ color:'var(--text-secondary)', lineHeight:1.7, flex:1 }}>{svc.description}</p>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.375rem', color:p.color, fontSize:'0.8125rem', fontWeight:600, marginTop:'auto' }}>
                        Explorer <ChevronRight size={14} />
                      </div>
                    </motion.div>
                  </Link>
                </AnimatedSection>
              )
            })}
          </div>

          <AnimatedSection>
            <div style={{ textAlign:'center', marginTop:'3rem' }}>
              <Link to="/services" className="btn btn-ghost">
                Voir tous les services <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROCESS — HOW WE WORK
      ══════════════════════════════════════════ */}
      <section className="section" style={{ background:'var(--bg-surface)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div className="container section-inner">
          <AnimatedSection>
            <div style={{ textAlign:'center', maxWidth:600, margin:'0 auto', marginBottom:'clamp(2.5rem,5vw,4rem)' }}>
              <div className="eyebrow">{t('process.label')}</div>
              <h2 className="t-h2" style={{ color:'var(--text-primary)', marginBottom:'1rem' }}>{t('process.title')}</h2>
              <p className="t-body-lg" style={{ color:'var(--text-secondary)' }}>{t('process.subtitle')}</p>
            </div>
          </AnimatedSection>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'0', position:'relative' }}>
            {/* Connector line */}
            <div className="hide-mobile" style={{ position:'absolute', top:52, left:'12.5%', right:'12.5%', height:1, background:'linear-gradient(90deg,transparent,var(--border-strong),var(--border-strong),transparent)', zIndex:0 }} />

            {processItems.map((item, i) => {
              const stepColors = ['var(--blue)','var(--orange)','var(--cyan)','var(--violet-light)']
              const sc = stepColors[i % stepColors.length]
              return (
                <AnimatedSection key={i} delay={i * 100} direction="up">
                  <motion.div whileHover={{ y:-6 }} style={{ padding:'0 1.5rem', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:'1rem', position:'relative', zIndex:1 }}>
                    {/* Step circle */}
                    <motion.div
                      whileHover={{ scale:1.1 }}
                      style={{
                        width:64, height:64, borderRadius:'50%',
                        background:`linear-gradient(135deg,${sc}25,${sc}10)`,
                        border:`2px solid ${sc}60`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:'1.125rem', fontWeight:900, color:sc,
                        boxShadow:`0 0 24px ${sc}25`,
                        letterSpacing:'-0.03em',
                      }}
                    >
                      {item.step}
                    </motion.div>
                    <div style={{ fontSize:'1.0625rem', fontWeight:700, color:'var(--text-primary)' }}>{item.title}</div>
                    <p style={{ fontSize:'0.875rem', color:'var(--text-secondary)', lineHeight:1.72 }}>{item.desc}</p>
                  </motion.div>
                </AnimatedSection>
              )
            })}
          </div>

          <AnimatedSection delay={200}>
            <div style={{ textAlign:'center', marginTop:'3rem' }}>
              <Link to="/contact" className="btn btn-primary">
                Démarrer votre projet <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROBLEMS WE SOLVE
      ══════════════════════════════════════════ */}
      <section className="section bg-base">
        <div className="container section-inner">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center' }}>

            {/* Left — Problem list */}
            <AnimatedSection direction="left">
              <div className="eyebrow" style={{ marginBottom:'0.75rem' }}>{t('problems.label')}</div>
              <h2 className="t-h2" style={{ color:'var(--text-primary)', marginBottom:'1rem' }}>{t('problems.title')}</h2>
              <p style={{ color:'var(--text-secondary)', lineHeight:1.75, marginBottom:'2.5rem' }}>{t('problems.subtitle')}</p>

              <div style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
                {problemItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity:0, x:-16 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }}
                    transition={{ delay: i * 0.07, duration:0.5 }}
                    style={{
                      background:'var(--card-bg)', border:'1px solid var(--card-border)',
                      borderRadius:'var(--r-lg)', padding:'1.125rem 1.375rem',
                      display:'flex', alignItems:'flex-start', gap:'1rem',
                      transition:'all 0.2s',
                    }}
                  >
                    <div style={{ width:28, height:28, borderRadius:8, background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.18)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <XCircle size={14} style={{ color:'#ef4444' }} />
                    </div>
                    <div>
                      <div style={{ fontSize:'0.9rem', fontWeight:600, color:'var(--text-primary)', marginBottom:'0.2rem' }}>{item.challenge}</div>
                      <div style={{ fontSize:'0.8125rem', color:'var(--text-muted)', lineHeight:1.5 }}>{item.solution}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Right — Solution summary card */}
            <AnimatedSection direction="right">
              <div style={{ background:'linear-gradient(135deg,rgba(59,130,246,0.08),rgba(6,182,212,0.05))', border:'1px solid rgba(59,130,246,0.18)', borderRadius:'var(--r-xl)', padding:'2.5rem', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:'linear-gradient(90deg,var(--blue),var(--cyan),transparent)' }} />
                <div className="icon-box icon-box-lg icon-blue" style={{ marginBottom:'1.5rem' }}><CheckCircle size={24} /></div>
                <h3 className="t-h3" style={{ color:'var(--text-primary)', marginBottom:'1rem' }}>Notre solution : une approche structurée</h3>
                <p style={{ color:'var(--text-secondary)', lineHeight:1.8, marginBottom:'2rem' }}>
                  TISDRUS vous accompagne avec une méthode éprouvée pour transformer vos défis en opportunités mesurables. Pas de solutions génériques — une approche sur mesure pour votre réalité.
                </p>
                {[
                  { text:'Diagnostic complet en moins de 2 semaines' },
                  { text:'Feuille de route claire et priorisée' },
                  { text:'Résultats mesurables dès les 90 premiers jours' },
                  { text:'Transfert de compétences garanti' },
                ].map((item, i) => (
                  <div key={i} style={{ display:'flex', gap:'0.75rem', alignItems:'flex-start', marginBottom:'0.875rem' }}>
                    <CheckCircle size={16} style={{ color:'var(--cyan)', flexShrink:0, marginTop:1 }} />
                    <span style={{ fontSize:'0.9rem', color:'var(--text-secondary)' }}>{item.text}</span>
                  </div>
                ))}
                <Link to="/contact" className="btn btn-primary" style={{ marginTop:'1.5rem', display:'inline-flex' }}>
                  Parler à un expert <ArrowRight size={16} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INDUSTRIES
      ══════════════════════════════════════════ */}
      <section className="section bg-base">
        <div className="container section-inner">
          <AnimatedSection>
            <div style={{ textAlign:'center', maxWidth:600, margin:'0 auto', marginBottom:'clamp(2.5rem,5vw,3.5rem)' }}>
              <div className="eyebrow">{t('industries.label')}</div>
              <h2 className="t-h2" style={{ color:'var(--text-primary)' }}>{t('industries.title')}</h2>
            </div>
          </AnimatedSection>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:'0.875rem' }} className="stagger">
            {industries.map((ind, i) => {
              const Ico = ICON_MAP[ind.icon] || Building2
              return (
                <AnimatedSection key={i} delay={i*45} direction="scale">
                  <motion.div
                    whileHover={{ y:-4, borderColor:'var(--border-strong)' }}
                    transition={{ duration:0.2 }}
                    style={{ background:'var(--card-bg)', border:'1px solid var(--card-border)', borderRadius:'var(--r-lg)', padding:'1.375rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.75rem', cursor:'default', transition:'all 0.2s' }}
                  >
                    <div className="icon-box icon-box-md icon-blue"><Ico size={19} /></div>
                    <span className="t-xs" style={{ color:'var(--text-secondary)', fontWeight:500, textAlign:'center', lineHeight:1.4 }}>{ind.name}</span>
                  </motion.div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY TISDRUS — DIFFERENTIATORS
      ══════════════════════════════════════════ */}
      <section className="section" style={{ background:'var(--bg-surface)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'-20%', right:'-10%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(249,115,22,0.06) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div className="container section-inner">
          <AnimatedSection>
            <div style={{ textAlign:'center', maxWidth:620, margin:'0 auto', marginBottom:'clamp(2.5rem,5vw,4rem)' }}>
              <div className="eyebrow">{t('whyUs.label')}</div>
              <h2 className="t-h2" style={{ color:'var(--text-primary)', marginBottom:'1rem' }}>{t('whyUs.title')}</h2>
              <p className="t-body-lg" style={{ color:'var(--text-secondary)' }}>{t('whyUs.subtitle')}</p>
            </div>
          </AnimatedSection>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1.25rem' }} className="stagger">
            {whyUsItems.map((item, i) => {
              const whyIcons = [Target, Brain, Layers, TrendingUp, Users, MapPin]
              const whyColors = ['var(--blue)','var(--orange)','var(--cyan)','var(--blue)','var(--violet-light)','var(--orange)']
              const whyBgs   = ['var(--blue-subtle)','var(--orange-subtle)','var(--cyan-subtle)','var(--blue-subtle)','var(--violet-subtle)','var(--orange-subtle)']
              const Ico = whyIcons[i % whyIcons.length]
              const wc = whyColors[i % whyColors.length]
              const wb = whyBgs[i % whyBgs.length]
              return (
                <AnimatedSection key={i} delay={i * 70} direction="up">
                  <motion.div
                    whileHover={{ y:-6 }}
                    style={{
                      background:'var(--card-bg)', border:'1px solid var(--card-border)',
                      borderRadius:'var(--r-xl)', padding:'1.875rem',
                      display:'flex', flexDirection:'column', gap:'0.875rem',
                      height:'100%', transition:'all 0.25s',
                    }}
                  >
                    <div className="icon-box icon-box-md" style={{ background:wb, color:wc, border:`1px solid ${wc}30` }}>
                      <Ico size={20} />
                    </div>
                    <h4 style={{ fontSize:'1rem', fontWeight:700, color:'var(--text-primary)' }}>{item.title}</h4>
                    <p style={{ fontSize:'0.875rem', color:'var(--text-secondary)', lineHeight:1.72, flex:1 }}>{item.desc}</p>
                  </motion.div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CLIENT TYPES
      ══════════════════════════════════════════ */}
      <section className="section bg-base">
        <div className="container section-inner">
          <AnimatedSection>
            <div style={{ textAlign:'center', maxWidth:600, margin:'0 auto', marginBottom:'clamp(2.5rem,5vw,4rem)' }}>
              <div className="eyebrow">{t('clientTypes.label')}</div>
              <h2 className="t-h2" style={{ color:'var(--text-primary)', marginBottom:'1rem' }}>{t('clientTypes.title')}</h2>
              <p className="t-body-lg" style={{ color:'var(--text-secondary)' }}>{t('clientTypes.subtitle')}</p>
            </div>
          </AnimatedSection>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'1.25rem' }}>
            {clientItems.map((item, i) => {
              const clientIcons = [TrendingUp, Building2, Zap, Landmark]
              const Ico = clientIcons[i % clientIcons.length]
              const cc = item.color || 'var(--blue)'
              return (
                <AnimatedSection key={i} delay={i * 80} direction="scale">
                  <motion.div
                    whileHover={{ y:-6 }}
                    style={{
                      background:'var(--card-bg)', border:'1px solid var(--card-border)',
                      borderRadius:'var(--r-xl)', padding:'2rem',
                      display:'flex', flexDirection:'column', gap:'1rem',
                      height:'100%', transition:'all 0.25s', position:'relative', overflow:'hidden',
                    }}
                  >
                    <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${cc},transparent)` }} />
                    <div className="icon-box icon-box-lg" style={{ background:`${cc}18`, color:cc, border:`1px solid ${cc}30` }}>
                      <Ico size={22} />
                    </div>
                    <div>
                      <h4 style={{ fontSize:'1.0625rem', fontWeight:700, color:'var(--text-primary)', marginBottom:'0.5rem' }}>{item.type}</h4>
                      <p style={{ fontSize:'0.875rem', color:'var(--text-secondary)', lineHeight:1.72 }}>{item.desc}</p>
                    </div>
                    <Link to="/contact" style={{ display:'inline-flex', alignItems:'center', gap:'0.375rem', fontSize:'0.8125rem', fontWeight:600, color:cc, textDecoration:'none', marginTop:'auto' }}>
                      Nous parler <ChevronRight size={14} />
                    </Link>
                  </motion.div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          INSIGHTS / BLOG TEASER
      ══════════════════════════════════════════ */}
      <section className="section bg-base">
        <div className="container section-inner">
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem', marginBottom:'clamp(2.5rem,5vw,4rem)' }}>
            <AnimatedSection direction="left">
              <div className="eyebrow" style={{ marginBottom:'0.75rem' }}>{t('insights.label')}</div>
              <h2 className="t-h2" style={{ color:'var(--text-primary)', maxWidth:480 }}>{t('insights.title')}</h2>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <Link to="/services" className="btn btn-ghost">
                Voir tous les articles <ArrowRight size={15} />
              </Link>
            </AnimatedSection>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1.25rem' }}>
            {insightItems.map((item, i) => {
              const tagColors = ['var(--blue)','var(--orange)','var(--cyan)']
              const tagBgs    = ['var(--blue-subtle)','var(--orange-subtle)','var(--cyan-subtle)']
              const tc = tagColors[i % tagColors.length]
              const tb = tagBgs[i % tagBgs.length]
              return (
                <AnimatedSection key={i} delay={i * 80} direction="up">
                  <motion.div
                    whileHover={{ y:-7 }}
                    style={{
                      background:'var(--card-bg)', border:'1px solid var(--card-border)',
                      borderRadius:'var(--r-xl)', overflow:'hidden',
                      display:'flex', flexDirection:'column', height:'100%',
                      transition:'all 0.25s', cursor:'pointer',
                    }}
                  >
                    {/* Card top accent */}
                    <div style={{ height:3, background:`linear-gradient(90deg,${tc},transparent)` }} />

                    <div style={{ padding:'1.75rem', display:'flex', flexDirection:'column', gap:'0.875rem', flex:1 }}>
                      {/* Tag + read time */}
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                        <span style={{ padding:'0.2rem 0.625rem', borderRadius:'var(--r-full)', background:tb, color:tc, fontSize:'0.72rem', fontWeight:600 }}>
                          {item.tag}
                        </span>
                        <span style={{ display:'flex', alignItems:'center', gap:'0.3rem', fontSize:'0.75rem', color:'var(--text-muted)' }}>
                          <Clock size={11} /> {item.readTime}
                        </span>
                      </div>

                      <h4 style={{ fontSize:'1.0625rem', fontWeight:700, color:'var(--text-primary)', lineHeight:1.4 }}>{item.title}</h4>
                      <p style={{ fontSize:'0.875rem', color:'var(--text-secondary)', lineHeight:1.72, flex:1 }}>{item.desc}</p>

                      <div style={{ display:'flex', alignItems:'center', gap:'0.375rem', color:tc, fontSize:'0.8125rem', fontWeight:600, marginTop:'auto', paddingTop:'0.875rem', borderTop:'1px solid var(--border)' }}>
                        Lire l'article <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CEO MESSAGE — PREMIUM SPLIT LAYOUT
      ══════════════════════════════════════════ */}
      <section className="section bg-base" style={{ position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 50% 60% at 15% 50%, rgba(37,99,235,0.07) 0%, transparent 65%)', pointerEvents:'none' }} />

        <div className="container section-inner">
          <div className="eyebrow" style={{ marginBottom:'2.5rem' }}>{t('ceo.label')}</div>
          <div style={{ display:'grid', gridTemplateColumns:'280px 1fr', gap:'5rem', alignItems:'center' }}>

            {/* Portrait */}
            <AnimatedSection direction="left">
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1.5rem' }}>
                <motion.div whileHover={{ scale:1.03 }} style={{ position:'relative' }}>
                  <div style={{
                    width:200, height:200, borderRadius:'50%',
                    background:'linear-gradient(135deg, var(--bg-raised), var(--bg-surface))',
                    border:'1.5px solid var(--border-strong)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    boxShadow:'var(--shadow-glow-b), var(--shadow-xl)',
                    position:'relative', overflow:'hidden',
                  }}>
                    <span style={{ fontSize:'3.5rem', fontWeight:900, color:'var(--text-primary)', letterSpacing:'-0.06em' }}>RN</span>
                    <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 35% 25%, rgba(59,130,246,0.15), transparent 60%)', pointerEvents:'none' }} />
                  </div>
                  {/* Orbit ring */}
                  <div style={{ position:'absolute', inset:-8, borderRadius:'50%', border:'1px dashed var(--border-strong)', animation:'spin 20s linear infinite', opacity:0.5 }} />
                </motion.div>

                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:'1.0625rem', fontWeight:700, color:'var(--text-primary)', marginBottom:'0.25rem' }}>{t('ceo.name')}</div>
                  <div style={{ fontSize:'0.8125rem', color:'var(--orange)', fontWeight:500, marginBottom:'1rem' }}>{t('ceo.role')}</div>
                  <div style={{ display:'flex', gap:'0.5rem', justifyContent:'center' }}>
                    {[
                      { icon: Linkedin, label:'LinkedIn', href:`https://${t('ceo.linkedin')}` },
                      { icon: Mail,     label:'Email',    href:`mailto:${t('ceo.email')}` },
                    ].map(({ icon: Ico, label, href }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                        className="btn btn-ghost btn-sm"
                        style={{ display:'inline-flex', alignItems:'center', gap:'0.375rem' }}
                      >
                        <Ico size={13} /> {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Message */}
            <AnimatedSection direction="right">
              <h2 className="t-h2" style={{ color:'var(--text-primary)', marginBottom:'1.5rem' }}>{t('ceo.title')}</h2>
              <Quote size={36} style={{ color:'var(--blue)', opacity:0.35, marginBottom:'1rem' }} />
              <p style={{ fontSize:'1.0625rem', color:'var(--text-secondary)', lineHeight:1.85, fontStyle:'italic', marginBottom:'2rem' }}>
                {t('ceo.message')}
              </p>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                <div style={{ width:36, height:2, background:'var(--grad-blue)', borderRadius:2 }} />
                <span style={{ color:'var(--blue)', fontWeight:600, fontSize:'0.9375rem' }}>{t('ceo.name')}</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BOTTOM CTA BAND
      ══════════════════════════════════════════ */}
      <section style={{ background:'var(--grad-mixed)', padding:'clamp(3.5rem,7vw,5.5rem) 0', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 60%)', pointerEvents:'none' }} />
        <div className="bg-grid" style={{ position:'absolute', inset:0, opacity:0.12 }} />
        <div className="container section-inner" style={{ textAlign:'center' }}>
          <AnimatedSection>
            <span className="badge" style={{ background:'rgba(255,255,255,0.12)', color:'#fff', border:'1px solid rgba(255,255,255,0.2)', marginBottom:'1.5rem' }}>
              <Zap size={11} /> Prêt à transformer votre organisation ?
            </span>
            <h2 className="t-h2" style={{ color:'#fff', marginBottom:'1rem' }}>Consultation gratuite — 30 minutes</h2>
            <p style={{ color:'rgba(255,255,255,0.75)', maxWidth:500, margin:'0 auto 2.5rem', fontSize:'1.0625rem', lineHeight:1.7 }}>
              Échangez directement avec un expert TISDRUS sur vos défis actuels, sans engagement.
            </p>
            <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
              <Link to="/contact" className="btn btn-lg" style={{ background:'#fff', color:'var(--blue-dark)', fontWeight:700, boxShadow:'0 8px 30px rgba(0,0,0,0.2)' }}>
                Planifier un appel <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="btn btn-ghost btn-lg" style={{ color:'#fff', borderColor:'rgba(255,255,255,0.3)', background:'rgba(255,255,255,0.08)' }}>
                Nos services
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </motion.div>
  )
}
