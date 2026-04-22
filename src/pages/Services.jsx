import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Brain, Layers, GraduationCap,
  CheckCircle, ArrowRight, Clock, Users,
  ChevronDown, ChevronUp, Zap, ChevronRight,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import AnimatedSection from '../components/AnimatedSection'

/* ── helpers ── */
function hex(color) {
  const map = {
    'var(--blue)':   '59,130,246',
    'var(--orange)': '249,115,22',
    'var(--cyan)':   '6,182,212',
    'var(--violet-light)': '167,139,250',
  }
  return map[color] || '99,130,200'
}

/* ── Accordion item ── */
function AccordionItem({ title, desc, benefits, use, idx }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div layout transition={{ duration:0.3 }} style={{
      background: open ? 'var(--card-hover)' : 'var(--card-bg)',
      border:`1px solid ${open ? 'var(--border-strong)' : 'var(--card-border)'}`,
      borderRadius:'var(--r-lg)', overflow:'hidden', transition:'border-color 0.3s',
    }}>
      <button onClick={() => setOpen(v => !v)} style={{
        width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'1.375rem 1.625rem', background:'transparent', border:'none', cursor:'pointer', gap:'1rem',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'1.25rem', textAlign:'left' }}>
          <span style={{ fontSize:'0.6875rem', fontWeight:700, color:'var(--orange)', letterSpacing:'0.12em', textTransform:'uppercase', flexShrink:0 }}>
            0{idx + 1}
          </span>
          <span style={{ fontSize:'1rem', fontWeight:600, color:'var(--text-primary)' }}>{title}</span>
        </div>
        <div style={{ color:'var(--text-muted)', flexShrink:0 }}>
          {open ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height:0, opacity:0 }}
            animate={{ height:'auto', opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:0.35, ease:[0.16,1,0.3,1] }}
            style={{ overflow:'hidden' }}
          >
            <div style={{ padding:'0 1.625rem 1.75rem', borderTop:'1px solid var(--border)' }}>
              <p style={{ color:'var(--text-secondary)', fontSize:'0.9375rem', lineHeight:1.78, margin:'1.5rem 0' }}>{desc}</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
                <div>
                  <div className="t-label" style={{ color:'var(--text-muted)', marginBottom:'0.875rem' }}>Bénéfices clés</div>
                  {benefits?.map((b, i) => (
                    <div key={i} style={{ display:'flex', gap:'0.625rem', marginBottom:'0.5rem', alignItems:'flex-start' }}>
                      <CheckCircle size={14} style={{ color:'var(--cyan)', flexShrink:0, marginTop:2 }} />
                      <span style={{ fontSize:'0.875rem', color:'var(--text-secondary)', lineHeight:1.5 }}>{b}</span>
                    </div>
                  ))}
                </div>
                {use && (
                  <div>
                    <div className="t-label" style={{ color:'var(--text-muted)', marginBottom:'0.875rem' }}>Cas d'usage</div>
                    <div style={{ background:'var(--bg-raised)', border:'1px solid var(--border)', borderRadius:'var(--r-md)', padding:'1rem' }}>
                      <p style={{ fontSize:'0.875rem', color:'var(--text-secondary)', lineHeight:1.65, fontStyle:'italic' }}>{use}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Training card ── */
function TrainingCard({ item }) {
  return (
    <motion.div
      whileHover={{ y:-6, borderColor:'var(--border-strong)' }}
      transition={{ duration:0.22 }}
      style={{ background:'var(--card-bg)', border:'1px solid var(--card-border)', borderRadius:'var(--r-xl)', padding:'1.875rem', display:'flex', flexDirection:'column', gap:'1rem', height:'100%', transition:'all 0.25s' }}
    >
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <div className="icon-box icon-box-md icon-violet"><GraduationCap size={20} /></div>
        <span className="badge badge-violet">{item.level}</span>
      </div>
      <h4 style={{ fontSize:'1rem', fontWeight:700, color:'var(--text-primary)' }}>{item.title}</h4>
      <p style={{ fontSize:'0.875rem', color:'var(--text-secondary)', lineHeight:1.68, flex:1 }}>{item.desc}</p>
      <div style={{ display:'flex', gap:'1.25rem', borderTop:'1px solid var(--border)', paddingTop:'0.875rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.375rem', color:'var(--text-muted)', fontSize:'0.8rem' }}>
          <Clock size={12} /> {item.duration}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'0.375rem', color:'var(--text-muted)', fontSize:'0.8rem' }}>
          <Users size={12} /> {item.level}
        </div>
      </div>
      {item.benefits?.slice(0,2).map((b,i) => (
        <div key={i} style={{ display:'flex', gap:'0.5rem', alignItems:'flex-start' }}>
          <CheckCircle size={12} style={{ color:'var(--cyan)', flexShrink:0, marginTop:2 }} />
          <span style={{ fontSize:'0.78rem', color:'var(--text-secondary)' }}>{b}</span>
        </div>
      ))}
    </motion.div>
  )
}

/* ── PAGE ── */
export default function Services() {
  const { t } = useLanguage()

  const blocks = [
    { id:'cybersecurity', icon:Shield, color:'var(--blue)',       label:t('services.cyber.label'),          title:t('services.cyber.title'),          subtitle:t('services.cyber.subtitle'),          items:t('services.cyber.items')||[],          type:'accordion' },
    { id:'ai',            icon:Brain,  color:'var(--orange)',      label:t('services.ai.label'),             title:t('services.ai.title'),             subtitle:t('services.ai.subtitle'),             items:t('services.ai.items')||[],             type:'accordion' },
    { id:'transformation',icon:Layers, color:'var(--cyan)',        label:t('services.transformation.label'), title:t('services.transformation.title'), subtitle:t('services.transformation.subtitle'), items:t('services.transformation.items')||[], type:'accordion' },
    { id:'training',      icon:GraduationCap, color:'var(--violet-light)', label:t('services.training.label'), title:t('services.training.title'), subtitle:t('services.training.subtitle'), items:t('services.training.items')||[], type:'cards' },
  ]

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.35 }}>

      {/* ── Hero ── */}
      <section className="bg-hero-mesh noise" style={{ minHeight:'42vh', display:'flex', alignItems:'center', position:'relative', paddingTop:90, paddingBottom:60 }}>
        <div className="bg-grid" style={{ position:'absolute', inset:0, opacity:0.3 }} />
        <div className="container section-inner">
          <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, ease:[0.16,1,0.3,1] }} style={{ maxWidth:680 }}>
            <div className="eyebrow">{t('services.hero.label')}</div>
            <h1 className="t-h1" style={{ color:'var(--text-primary)', marginTop:'0.75rem', marginBottom:'1.25rem' }}>
              {t('services.hero.title')}
            </h1>
            <p className="t-body-lg" style={{ color:'var(--text-secondary)', maxWidth:560 }}>
              {t('services.hero.subtitle')}
            </p>
          </motion.div>

          {/* Quick pills */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
            style={{ display:'flex', gap:'0.75rem', marginTop:'2.5rem', flexWrap:'wrap' }}
          >
            {blocks.map(b => {
              const Ico = b.icon
              return (
                <a key={b.id} href={`#${b.id}`} style={{
                  display:'inline-flex', alignItems:'center', gap:'0.5rem',
                  padding:'0.5rem 1.125rem', borderRadius:'var(--r-full)',
                  background:`rgba(${hex(b.color)},0.10)`, border:`1px solid rgba(${hex(b.color)},0.22)`,
                  color:b.color, fontSize:'0.875rem', fontWeight:500, textDecoration:'none', transition:'all 0.2s',
                }}>
                  <Ico size={14} /> {b.id === 'cybersecurity' ? 'Cybersécurité' : b.id === 'ai' ? 'IA' : b.id === 'transformation' ? 'Transformation' : 'Formation'}
                </a>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Service Blocks ── */}
      {blocks.map((block, bi) => {
        const Ico = block.icon
        const isEven = bi % 2 === 0
        return (
          <section key={block.id} id={block.id} className="section" style={{ background: isEven ? 'var(--bg-base)' : 'var(--bg-surface)', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', width:500, height:500, borderRadius:'50%', background:`radial-gradient(circle,rgba(${hex(block.color)},0.07) 0%,transparent 70%)`, top:'50%', right:'-80px', transform:'translateY(-50%)', pointerEvents:'none' }} />

            <div className="container section-inner">
              {/* Block header */}
              <AnimatedSection direction={isEven ? 'left' : 'right'}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:'1.5rem', marginBottom:'3rem' }}>
                  <div className="icon-box icon-box-xl" style={{ background:`rgba(${hex(block.color)},0.10)`, color:block.color, border:`1px solid rgba(${hex(block.color)},0.20)`, flexShrink:0 }}>
                    <Ico size={28} />
                  </div>
                  <div>
                    <div className="eyebrow">{block.label}</div>
                    <h2 className="t-h2" style={{ color:'var(--text-primary)', marginTop:'0.5rem', marginBottom:'0.875rem' }}>{block.title}</h2>
                    <p style={{ color:'var(--text-secondary)', maxWidth:560, lineHeight:1.75 }}>{block.subtitle}</p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Content */}
              <AnimatedSection delay={100} direction="up">
                {block.type === 'accordion' ? (
                  <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                    {block.items.map((item, i) => (
                      <AccordionItem key={i} idx={i} title={item.title} desc={item.desc} benefits={item.benefits} use={item.use} />
                    ))}
                  </div>
                ) : (
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(256px,1fr))', gap:'1.25rem' }}>
                    {block.items.map((item, i) => <TrainingCard key={i} item={item} />)}
                  </div>
                )}
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <div style={{ marginTop:'2.5rem' }}>
                  <Link to="/contact" className="btn btn-primary">
                    {t('nav.cta')} <ArrowRight size={16} />
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </section>
        )
      })}

      {/* ── Bottom CTA ── */}
      <section style={{ background:'var(--grad-mixed)', padding:'clamp(4rem,8vw,7rem) 0', position:'relative', overflow:'hidden' }}>
        <div className="bg-grid" style={{ position:'absolute', inset:0, opacity:0.12 }} />
        <div className="container section-inner" style={{ textAlign:'center', position:'relative', zIndex:2 }}>
          <AnimatedSection>
            <span className="badge" style={{ background:'rgba(255,255,255,0.12)', color:'#fff', border:'1px solid rgba(255,255,255,0.2)', marginBottom:'1.5rem' }}>
              <Zap size={11} /> Prêt à démarrer ?
            </span>
            <h2 className="t-h2" style={{ color:'#fff', marginBottom:'1rem' }}>Parlons de votre projet</h2>
            <p style={{ color:'rgba(255,255,255,0.72)', marginBottom:'2.5rem', maxWidth:480, margin:'0 auto 2.5rem', lineHeight:1.75 }}>
              Chaque organisation est unique. Découvrons ensemble la bonne approche pour vous.
            </p>
            <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
              <Link to="/contact" className="btn btn-lg" style={{ background:'#fff', color:'var(--blue-dark)', fontWeight:700 }}>
                Consultation gratuite <ArrowRight size={18} />
              </Link>
              <Link to="/expertise" className="btn btn-ghost btn-lg" style={{ color:'#fff', borderColor:'rgba(255,255,255,0.3)', background:'rgba(255,255,255,0.08)' }}>
                Notre expertise <ChevronRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  )
}
