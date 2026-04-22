import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, X as XIcon, ArrowUpRight, Zap } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { LogoFull } from './Logo'

export default function Footer() {
  const { t } = useLanguage()
  const scrollTop = () => window.scrollTo({ top:0, behavior:'smooth' })

  const services = [
    { label:'Cybersécurité',           href:'/services#cybersecurity' },
    { label:'Intelligence Artificielle', href:'/services#ai' },
    { label:'Transformation Numérique', href:'/services#transformation' },
    { label:'Formation & Coaching',     href:'/services#training' },
  ]
  const company = [
    { label: t('nav.about'),     href:'/about' },
    { label: t('nav.expertise'), href:'/expertise' },
    { label: t('nav.services'),  href:'/services' },
    { label: t('nav.contact'),   href:'/contact' },
  ]

  return (
    <footer style={{ background:'var(--bg-base)', borderTop:'1px solid var(--border)', position:'relative', overflow:'hidden' }}>

      {/* Top accent line */}
      <div style={{ height:2, background:'linear-gradient(90deg,transparent,var(--orange),var(--blue),transparent)', opacity:0.5 }} />

      {/* CTA Banner */}
      <div style={{ background:'linear-gradient(135deg,rgba(59,130,246,0.08),rgba(124,58,237,0.05))', borderBottom:'1px solid var(--border)', padding:'2.5rem 0', position:'relative' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(var(--border) 1px, transparent 1px)', backgroundSize:'24px 24px', opacity:0.4 }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1.5rem', flexWrap:'wrap' }}>
            <div>
              <h3 style={{ fontSize:'1.375rem', fontWeight:700, color:'var(--text-primary)', marginBottom:'0.25rem' }}>
                Prêt à accélérer votre transformation ?
              </h3>
              <p style={{ color:'var(--text-muted)', fontSize:'0.9rem' }}>{t('contact.consultation.desc')}</p>
            </div>
            <Link to="/contact" className="btn btn-primary btn-lg" style={{ flexShrink:0, whiteSpace:'nowrap' }}>
              <Zap size={16} /> {t('contact.consultation.cta')} <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container" style={{ padding:'3.5rem var(--container-px) 2.5rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'3rem' }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{ display:'inline-block', textDecoration:'none', marginBottom:'1.25rem' }}>
              <LogoFull fontSize="1.625rem" />
            </Link>
            <p style={{ color:'var(--text-muted)', fontSize:'0.875rem', lineHeight:1.65, marginBottom:'1.25rem', maxWidth:240 }}>{t('footer.tagline')}</p>
            <div style={{ display:'flex', gap:'0.5rem' }}>
              {[
                { href:'https://linkedin.com/company/tisdrus', icon:Linkedin, label:'LinkedIn' },
                { href:'https://x.com/tisdrus',                icon:XIcon,    label:'X' },
                { href:'mailto:info@tisdrus.com',              icon:Mail,     label:'Email' },
              ].map(({ href, icon:Ico, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  whileHover={{ y:-2, scale:1.08 }}
                  style={{
                    width:36, height:36, borderRadius:8,
                    background:'var(--card-bg)', border:'1px solid var(--card-border)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'var(--text-muted)', transition:'all 0.2s', textDecoration:'none',
                  }}
                >
                  <Ico size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize:'0.75rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--text-muted)', marginBottom:'1.25rem' }}>
              {t('footer.services')}
            </h4>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              {services.map(s => (
                <li key={s.href}>
                  <Link to={s.href} style={{ color:'var(--text-secondary)', fontSize:'0.9rem', textDecoration:'none', transition:'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color='var(--orange)'}
                    onMouseLeave={e => e.target.style.color='var(--text-secondary)'}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize:'0.75rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--text-muted)', marginBottom:'1.25rem' }}>
              {t('footer.company')}
            </h4>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              {company.map(c => (
                <li key={c.href}>
                  <Link to={c.href} style={{ color:'var(--text-secondary)', fontSize:'0.9rem', textDecoration:'none', transition:'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color='var(--blue)'}
                    onMouseLeave={e => e.target.style.color='var(--text-secondary)'}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize:'0.75rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--text-muted)', marginBottom:'1.25rem' }}>
              {t('footer.contact')}
            </h4>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'0.875rem' }}>
              {[
                { icon:MapPin, text:'Montréal, Québec, Canada',  href:null },
                { icon:Mail,   text:'info@tisdrus.com',           href:'mailto:info@tisdrus.com' },
                { icon:Phone,  text:'+1 (514) 000-0000',          href:'tel:+15140000000' },
              ].map(({ icon:Ico, text, href }, i) => (
                <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:'0.625rem', color:'var(--text-secondary)', fontSize:'0.875rem', lineHeight:1.5 }}>
                  <Ico size={13} style={{ color:'var(--orange)', flexShrink:0, marginTop:2 }} />
                  {href ? (
                    <a href={href} style={{ color:'var(--text-secondary)', textDecoration:'none', transition:'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color='var(--orange)'}
                      onMouseLeave={e => e.target.style.color='var(--text-secondary)'}
                    >{text}</a>
                  ) : text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem', paddingTop:'2rem', marginTop:'1rem', borderTop:'1px solid var(--border)' }}>
          <p style={{ color:'var(--text-muted)', fontSize:'0.8125rem' }}>{t('footer.rights')}</p>
          <div style={{ display:'flex', gap:'1.5rem' }}>
            <a href="#" style={{ color:'var(--text-muted)', fontSize:'0.8125rem', textDecoration:'none', transition:'color 0.2s' }}
              onMouseEnter={e => e.target.style.color='var(--text-primary)'}
              onMouseLeave={e => e.target.style.color='var(--text-muted)'}
            >{t('footer.privacy')}</a>
            <a href="#" style={{ color:'var(--text-muted)', fontSize:'0.8125rem', textDecoration:'none', transition:'color 0.2s' }}
              onMouseEnter={e => e.target.style.color='var(--text-primary)'}
              onMouseLeave={e => e.target.style.color='var(--text-muted)'}
            >{t('footer.terms')}</a>
          </div>
          <motion.button
            onClick={scrollTop}
            whileHover={{ y:-2, scale:1.05 }}
            aria-label="Scroll to top"
            style={{
              width:36, height:36, borderRadius:8,
              background:'var(--orange-subtle)', border:'1px solid rgba(249,115,22,0.22)',
              color:'var(--orange)', fontSize:'1rem', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all 0.2s',
            }}
          >
            ↑
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
