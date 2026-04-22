import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Target, Eye, Heart, Zap, Linkedin } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import AnimatedSection from '../components/AnimatedSection'

const VALUE_ICONS = [Target, Eye, Zap, Heart, ArrowRight, Target]
const VALUE_COLORS = [
  { color:'var(--blue)',   bg:'var(--blue-subtle)',   border:'rgba(59,130,246,0.22)' },
  { color:'var(--orange)', bg:'var(--orange-subtle)', border:'rgba(249,115,22,0.22)' },
  { color:'var(--cyan)',   bg:'var(--cyan-subtle)',   border:'rgba(6,182,212,0.22)' },
  { color:'var(--violet-light)', bg:'var(--violet-subtle)', border:'rgba(124,58,237,0.22)' },
  { color:'var(--emerald)', bg:'var(--emerald-subtle)', border:'rgba(16,185,129,0.22)' },
  { color:'var(--orange)', bg:'var(--orange-subtle)', border:'rgba(249,115,22,0.22)' },
]

function TeamCard({ member, idx }) {
  const initials = member.name?.split(' ').map(n => n[0]).join('').slice(0,2)
  const gradient = [
    'linear-gradient(135deg,#2563EB,#3B82F6)',
    'linear-gradient(135deg,#EA6800,#F97316)',
    'linear-gradient(135deg,#0891B2,#06B6D4)',
    'linear-gradient(135deg,#6D28D9,#7C3AED)',
    'linear-gradient(135deg,#047857,#10B981)',
    'linear-gradient(135deg,#B45309,#F59E0B)',
  ]
  return (
    <AnimatedSection delay={idx * 75} direction="up">
      <motion.div
        whileHover={{ y:-7, borderColor:'var(--border-strong)' }}
        transition={{ duration:0.22 }}
        style={{
          background:'var(--card-bg)', border:'1px solid var(--card-border)',
          borderRadius:'var(--r-xl)', padding:'2rem',
          display:'flex', flexDirection:'column', alignItems:'center',
          gap:'1.125rem', height:'100%', textAlign:'center',
          transition:'all 0.25s', backdropFilter:'blur(16px)',
        }}
      >
        <div style={{ position:'relative' }}>
          <div style={{
            width:84, height:84, borderRadius:'50%',
            background: gradient[idx % gradient.length],
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#fff', fontSize:'1.625rem', fontWeight:800, letterSpacing:'-0.05em',
            boxShadow:`0 8px 24px rgba(0,0,0,0.25)`,
          }}>
            {initials}
          </div>
          <div style={{ position:'absolute', inset:-4, borderRadius:'50%', border:'1.5px dashed var(--border-strong)', animation:'spin 20s linear infinite', opacity:0.5 }} />
        </div>

        <div>
          <div style={{ fontSize:'1rem', fontWeight:700, color:'var(--text-primary)', marginBottom:'0.25rem' }}>{member.name}</div>
          <div style={{ fontSize:'0.8rem', color:'var(--orange)', fontWeight:500 }}>{member.role}</div>
        </div>

        <p style={{ fontSize:'0.8125rem', color:'var(--text-secondary)', lineHeight:1.68, flex:1 }}>{member.bio}</p>

        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.375rem', justifyContent:'center' }}>
          {member.specialties?.map((sp, i) => (
            <span key={i} style={{ padding:'0.2rem 0.625rem', borderRadius:'var(--r-full)', background:'var(--bg-raised)', border:'1px solid var(--border)', color:'var(--text-muted)', fontSize:'0.7rem', fontWeight:500 }}>
              {sp}
            </span>
          ))}
        </div>

        <a href="#" className="btn btn-ghost btn-sm" style={{ display:'inline-flex', alignItems:'center', gap:'0.375rem' }}>
          <Linkedin size={13} /> LinkedIn
        </a>
      </motion.div>
    </AnimatedSection>
  )
}

function TimelineItem({ item, idx }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'72px 32px 1fr', gap:0, alignItems:'stretch' }}>
      {/* Year */}
      <div style={{ paddingTop:'1.375rem', paddingRight:'1rem', textAlign:'right' }}>
        <span style={{ fontSize:'1.125rem', fontWeight:900, letterSpacing:'-0.04em', color:'var(--orange)', lineHeight:1 }}>{item.year}</span>
      </div>

      {/* Center line + dot */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{ width:2, flex:1, minHeight:20, background:'linear-gradient(180deg,transparent,var(--border-strong))', marginBottom:0 }} />
        <div style={{ width:14, height:14, borderRadius:'50%', background:'var(--blue)', flexShrink:0, boxShadow:'0 0 0 3px var(--bg-base), 0 0 0 5px var(--border-strong)' }} />
        <div style={{ width:2, flex:1, minHeight:20, background:'linear-gradient(180deg,var(--border-strong),transparent)', marginTop:0 }} />
      </div>

      {/* Content */}
      <AnimatedSection direction={idx%2===0?'right':'left'} delay={idx*60}>
        <div style={{ padding:'0 0 1.75rem 1.5rem' }}>
          <motion.div
            whileHover={{ x:4 }}
            style={{ background:'var(--card-bg)', border:'1px solid var(--card-border)', borderRadius:'var(--r-lg)', padding:'1.375rem', backdropFilter:'blur(12px)' }}
          >
            <div className="t-label" style={{ color:'var(--blue)', marginBottom:'0.375rem' }}>{item.year}</div>
            <div style={{ fontSize:'1rem', fontWeight:700, color:'var(--text-primary)', marginBottom:'0.5rem' }}>{item.title}</div>
            <p style={{ fontSize:'0.875rem', color:'var(--text-secondary)', lineHeight:1.7 }}>{item.desc}</p>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  )
}

export default function About() {
  const { t } = useLanguage()
  const values   = t('about.values.items') || []
  const team     = t('about.team.members') || []
  const timeline = t('about.timeline.items') || []

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.35 }}>

      {/* ── Hero ── */}
      <section className="bg-hero-mesh noise" style={{ minHeight:'42vh', display:'flex', alignItems:'center', position:'relative', paddingTop:90, paddingBottom:60 }}>
        <div className="bg-grid" style={{ position:'absolute', inset:0, opacity:0.3 }} />
        <div className="container section-inner">
          <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }} style={{ maxWidth:700 }}>
            <div className="eyebrow">{t('about.hero.label')}</div>
            <h1 className="t-h1" style={{ color:'var(--text-primary)', marginTop:'0.75rem', marginBottom:'1.25rem' }}>{t('about.hero.title')}</h1>
            <p className="t-body-lg" style={{ color:'var(--text-secondary)', maxWidth:580 }}>{t('about.hero.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="section bg-base">
        <div className="container section-inner">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1.5rem' }}>
            {[
              { key:'mission', color:'var(--blue)',   icon:Target, ...{title:t('about.mission.title'), text:t('about.mission.text')} },
              { key:'vision',  color:'var(--violet-light)', icon:Eye, ...{title:t('about.vision.title'),  text:t('about.vision.text')} },
            ].map((block, i) => {
              const Ico = block.icon
              return (
                <AnimatedSection key={block.key} direction={i===0?'left':'right'}>
                  <motion.div whileHover={{ y:-5 }} style={{
                    background:`linear-gradient(135deg, rgba(${i===0?'59,130,246':'124,58,237'},0.06), rgba(${i===0?'59,130,246':'124,58,237'},0.02))`,
                    border:`1px solid rgba(${i===0?'59,130,246':'124,58,237'},0.18)`,
                    borderRadius:'var(--r-xl)', padding:'2.25rem', position:'relative', overflow:'hidden',
                  }}>
                    <div className="icon-box icon-box-lg" style={{ background:`rgba(${i===0?'59,130,246':'124,58,237'},0.10)`, color:block.color, border:`1px solid rgba(${i===0?'59,130,246':'124,58,237'},0.20)`, marginBottom:'1.25rem' }}>
                      <Ico size={22} />
                    </div>
                    <h3 className="t-h3" style={{ color:'var(--text-primary)', marginBottom:'1rem' }}>{block.title}</h3>
                    <p style={{ color:'var(--text-secondary)', lineHeight:1.8, fontSize:'0.9375rem' }}>{block.text}</p>
                    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${block.color},transparent)` }} />
                  </motion.div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section" style={{ background:'var(--bg-surface)' }}>
        <div className="container section-inner">
          <AnimatedSection>
            <div style={{ textAlign:'center', maxWidth:580, margin:'0 auto', marginBottom:'clamp(2.5rem,5vw,4rem)' }}>
              <div className="eyebrow">Nos valeurs</div>
              <h2 className="t-h2" style={{ color:'var(--text-primary)' }}>{t('about.values.title')}</h2>
            </div>
          </AnimatedSection>
          <div className="grid-3 stagger" style={{ gap:'1.25rem' }}>
            {values.map((val, i) => {
              const Ico = VALUE_ICONS[i % VALUE_ICONS.length]
              const c   = VALUE_COLORS[i % VALUE_COLORS.length]
              return (
                <AnimatedSection key={i} delay={i*65} direction="up">
                  <motion.div
                    whileHover={{ y:-6 }}
                    style={{ background:'var(--card-bg)', border:'1px solid var(--card-border)', borderRadius:'var(--r-xl)', padding:'1.875rem', height:'100%', display:'flex', flexDirection:'column', gap:'0.875rem', backdropFilter:'blur(16px)', transition:'all 0.25s' }}
                  >
                    <div className="icon-box icon-box-md" style={{ background:c.bg, color:c.color, border:`1px solid ${c.border}` }}>
                      <Ico size={18} />
                    </div>
                    <h4 style={{ fontSize:'1rem', fontWeight:700, color:'var(--text-primary)' }}>{val.title}</h4>
                    <p style={{ fontSize:'0.875rem', color:'var(--text-secondary)', lineHeight:1.72, flex:1 }}>{val.description}</p>
                  </motion.div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section bg-base" style={{ position:'relative' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div className="container section-inner">
          <AnimatedSection>
            <div style={{ textAlign:'center', maxWidth:600, margin:'0 auto', marginBottom:'clamp(2.5rem,5vw,4rem)' }}>
              <div className="eyebrow">L'équipe</div>
              <h2 className="t-h2" style={{ color:'var(--text-primary)', marginBottom:'0.875rem' }}>{t('about.team.title')}</h2>
              <p style={{ color:'var(--text-secondary)', fontSize:'0.9375rem' }}>{t('about.team.subtitle')}</p>
            </div>
          </AnimatedSection>
          <div className="grid-3 stagger" style={{ gap:'1.5rem' }}>
            {team.map((m, i) => <TeamCard key={i} member={m} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section" style={{ background:'var(--bg-surface)' }}>
        <div className="container section-inner">
          <AnimatedSection>
            <div style={{ textAlign:'center', maxWidth:580, margin:'0 auto', marginBottom:'clamp(2.5rem,5vw,4rem)' }}>
              <div className="eyebrow">Notre histoire</div>
              <h2 className="t-h2" style={{ color:'var(--text-primary)' }}>{t('about.timeline.title')}</h2>
            </div>
          </AnimatedSection>
          <div style={{ maxWidth:760, margin:'0 auto' }}>
            {timeline.map((item, i) => <TimelineItem key={i} item={item} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background:'var(--grad-mixed)', padding:'clamp(4rem,8vw,7rem) 0', position:'relative', overflow:'hidden' }}>
        <div className="bg-grid" style={{ position:'absolute', inset:0, opacity:0.12 }} />
        <div className="container section-inner" style={{ textAlign:'center' }}>
          <AnimatedSection>
            <h2 className="t-h2" style={{ color:'#fff', marginBottom:'1rem' }}>Rejoignez notre aventure</h2>
            <p style={{ color:'rgba(255,255,255,0.72)', marginBottom:'2.5rem', maxWidth:480, margin:'0 auto 2.5rem', lineHeight:1.75 }}>
              Client, partenaire ou consultant — échangeons sur ce que nous pouvons accomplir ensemble.
            </p>
            <Link to="/contact" className="btn btn-lg" style={{ background:'#fff', color:'var(--blue-dark)', fontWeight:700 }}>
              Nous contacter <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  )
}
