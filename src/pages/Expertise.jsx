import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Brain, Database, Layers, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import AnimatedSection from '../components/AnimatedSection'

/* ── Animated skill bar ── */
function SkillBar({ label, value, color, delay = 0 }) {
  return (
    <AnimatedSection delay={delay}>
      <div style={{ marginBottom:'1rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.4rem' }}>
          <span style={{ fontSize:'0.8125rem', fontWeight:500, color:'var(--text-secondary)' }}>{label}</span>
          <span style={{ fontSize:'0.75rem', fontWeight:700, color }}>{value}%</span>
        </div>
        <div style={{ height:6, background:'var(--border)', borderRadius:4, overflow:'hidden' }}>
          <motion.div
            initial={{ width:0 }}
            whileInView={{ width:`${value}%` }}
            viewport={{ once:true }}
            transition={{ duration:1.3, delay: delay/1000, ease:[0.16,1,0.3,1] }}
            style={{ height:'100%', background:`linear-gradient(90deg,${color},${color}99)`, borderRadius:4 }}
          />
        </div>
      </div>
    </AnimatedSection>
  )
}

/* ── Stat card ── */
function StatCard({ value, label, color, delay }) {
  return (
    <AnimatedSection delay={delay} direction="scale">
      <motion.div
        whileHover={{ y:-4 }}
        style={{ background:'var(--card-bg)', border:'1px solid var(--card-border)', borderRadius:'var(--r-lg)', padding:'1.5rem', textAlign:'center', transition:'all 0.2s' }}
      >
        <div style={{ fontSize:'clamp(1.75rem,3vw,2.25rem)', fontWeight:900, letterSpacing:'-0.04em', lineHeight:1.1, color, marginBottom:'0.5rem' }}>{value}</div>
        <div style={{ fontSize:'0.8rem', color:'var(--text-muted)', fontWeight:500 }}>{label}</div>
      </motion.div>
    </AnimatedSection>
  )
}

const LEVELS = {
  'NIST Cybersecurity Framework':95,'ISO 27001 / 27005':92,'SIEM & SOC':88,'Threat Intelligence':85,
  'Zero Trust Architecture':90,'Penetration Testing':87,'Incident Response':93,'Cloud Security (AWS, Azure)':89,
  'Machine Learning & Deep Learning':91,'NLP & LLM':88,'MLOps & DataOps':86,'AI Ethics & Bias':90,
  'Generative AI':85,'Computer Vision':82,'Model Governance':88,'Cloud AI Platforms':87,
  'DAMA-DMBOK':90,'Data Catalog & Lineage':87,'Master Data Management':92,'Data Quality':94,
  'Loi 25 / PIPEDA':95,'Data Mesh Architecture':83,'Lakehouse Design':86,'BI & Analytics':90,
  'Digital Strategy':95,'Change Management':92,'Cloud Migration':89,'Process Automation (RPA)':88,
  'ERP Transformation':91,'Legacy Modernization':85,'DevOps & CI/CD':88,'Customer Experience':90,
}

function DomainBlock({ domain, icon:Ico, color, idx }) {
  const reversed = idx % 2 !== 0
  const skills   = domain?.skills || []
  const stats    = domain?.stats  || []
  return (
    <section className="section" style={{ background: idx%2===0 ? 'var(--bg-base)' : 'var(--bg-surface)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', width:550, height:550, borderRadius:'50%', background:`radial-gradient(circle,rgba(${rgbOf(color)},0.07) 0%,transparent 70%)`, top:'50%', [reversed?'left':'right']:'-120px', transform:'translateY(-50%)', pointerEvents:'none' }} />

      <div className="container section-inner">
        <div style={{ display:'grid', gridTemplateColumns: reversed ? '1fr 380px' : '380px 1fr', gap:'5rem', alignItems:'start' }}>

          {/* ── Skill bars panel ── */}
          <div style={{ order: reversed ? 2 : 1 }}>
            <AnimatedSection direction={reversed ? 'right' : 'left'}>
              <div style={{ background:'var(--card-bg)', border:'1px solid var(--card-border)', borderRadius:'var(--r-xl)', padding:'2rem', backdropFilter:'blur(16px)' }}>
                <div className="t-label" style={{ color:'var(--text-muted)', marginBottom:'1.5rem' }}>Niveau d'expertise</div>
                {skills.slice(0,7).map((sk, i) => (
                  <SkillBar key={sk} label={sk} value={LEVELS[sk] || 86} color={color} delay={i*70} />
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* ── Text + stats ── */}
          <div style={{ order: reversed ? 1 : 2 }}>
            <AnimatedSection direction={reversed ? 'left' : 'right'}>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem' }}>
                <div className="icon-box icon-box-lg" style={{ background:`rgba(${rgbOf(color)},0.10)`, color, border:`1px solid rgba(${rgbOf(color)},0.20)` }}>
                  <Ico size={24} />
                </div>
                <h2 className="t-h2" style={{ color:'var(--text-primary)' }}>{domain?.title}</h2>
              </div>
              <p style={{ color:'var(--text-secondary)', lineHeight:1.82, fontSize:'1rem', marginBottom:'2.5rem', maxWidth:540 }}>{domain?.desc}</p>

              {/* Stats */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem', marginBottom:'2.5rem' }}>
                {stats.map((s, i) => <StatCard key={i} value={s.value} label={s.label} color={color} delay={i*80} />)}
              </div>
            </AnimatedSection>

            {/* Skill chips */}
            <AnimatedSection delay={120}>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
                {skills.map((sk, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale:1.04 }}
                    style={{ padding:'0.35rem 0.875rem', borderRadius:'var(--r-full)', background:`rgba(${rgbOf(color)},0.08)`, border:`1px solid rgba(${rgbOf(color)},0.18)`, fontSize:'0.78rem', fontWeight:500, color:'var(--text-secondary)', cursor:'default', transition:'all 0.2s' }}
                  >
                    {sk}
                  </motion.span>
                ))}
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </section>
  )
}

function rgbOf(varColor) {
  const map = {
    'var(--blue)':   '59,130,246',
    'var(--orange)': '249,115,22',
    'var(--cyan)':   '6,182,212',
    'var(--violet-light)':'167,139,250',
    '#3B82F6':'59,130,246','#F97316':'249,115,22',
    '#06B6D4':'6,182,212','#7C3AED':'124,58,237',
  }
  return map[varColor] || '99,130,200'
}

export default function Expertise() {
  const { t } = useLanguage()

  const domains = [
    { key:'cyber',   icon:Shield,   color:'var(--blue)',         data:t('expertise.cyber') },
    { key:'ai',      icon:Brain,    color:'var(--orange)',       data:t('expertise.ai') },
    { key:'data',    icon:Database, color:'var(--cyan)',         data:t('expertise.data') },
    { key:'digital', icon:Layers,   color:'var(--violet-light)', data:t('expertise.digital') },
  ]

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.35 }}>

      {/* Hero */}
      <section className="bg-hero-mesh noise" style={{ minHeight:'42vh', display:'flex', alignItems:'center', position:'relative', paddingTop:90, paddingBottom:60 }}>
        <div className="bg-grid" style={{ position:'absolute', inset:0, opacity:0.3 }} />
        <div className="container section-inner">
          <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }} style={{ maxWidth:680 }}>
            <div className="eyebrow">{t('expertise.hero.label')}</div>
            <h1 className="t-h1" style={{ color:'var(--text-primary)', marginTop:'0.75rem', marginBottom:'1.25rem' }}>
              {t('expertise.hero.title')}
            </h1>
            <p className="t-body-lg" style={{ color:'var(--text-secondary)', maxWidth:560 }}>
              {t('expertise.hero.subtitle')}
            </p>
          </motion.div>

          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
            style={{ display:'flex', gap:'0.75rem', marginTop:'2.5rem', flexWrap:'wrap' }}
          >
            {domains.map(d => {
              const Ico = d.icon
              return (
                <a key={d.key} href={`#${d.key}`} style={{
                  display:'inline-flex', alignItems:'center', gap:'0.5rem',
                  padding:'0.5rem 1.125rem', borderRadius:'var(--r-full)',
                  background:`rgba(${rgbOf(d.color)},0.10)`, border:`1px solid rgba(${rgbOf(d.color)},0.22)`,
                  color:d.color, fontSize:'0.875rem', fontWeight:500, textDecoration:'none',
                }}>
                  <Ico size={14} /> {d.data?.title}
                </a>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Domain blocks */}
      {domains.map((d, i) => (
        <div key={d.key} id={d.key}>
          <DomainBlock domain={d.data} icon={d.icon} color={d.color} idx={i} />
        </div>
      ))}

      {/* CTA */}
      <section style={{ background:'var(--grad-mixed)', padding:'clamp(4rem,8vw,7rem) 0', position:'relative', overflow:'hidden' }}>
        <div className="bg-grid" style={{ position:'absolute', inset:0, opacity:0.12 }} />
        <div className="container section-inner" style={{ textAlign:'center' }}>
          <AnimatedSection>
            <h2 className="t-h2" style={{ color:'#fff', marginBottom:'1rem' }}>Une expertise à votre service</h2>
            <p style={{ color:'rgba(255,255,255,0.72)', marginBottom:'2.5rem', maxWidth:480, margin:'0 auto 2.5rem', lineHeight:1.75 }}>
              Consultants certifiés, expérience terrain, résultats mesurables.
            </p>
            <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
              <Link to="/contact" className="btn btn-lg" style={{ background:'#fff', color:'var(--blue-dark)', fontWeight:700 }}>
                Consultation gratuite <ArrowRight size={18} />
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
