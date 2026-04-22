import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, X as XIcon, ArrowUpRight, Zap, Send, CheckCircle, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { LogoFull } from './Logo'

function NewsletterForm() {
  const [email, setEmail]     = useState('')
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 900)
  }

  return (
    <div style={{ marginTop:'1.5rem' }}>
      <div style={{ fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--text-muted)', marginBottom:'0.75rem' }}>
        Veille & Insights
      </div>
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.form
            key="form"
            initial={{ opacity:1 }} exit={{ opacity:0, y:-8 }}
            onSubmit={submit}
            style={{ display:'flex', gap:'0.5rem' }}
          >
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              style={{
                flex:1, padding:'0.6rem 0.875rem',
                background:'var(--card-bg)', border:'1px solid var(--card-border)',
                borderRadius:'var(--r-md)', color:'var(--text-primary)',
                fontSize:'0.8125rem', outline:'none',
                transition:'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor='var(--blue)'}
              onBlur={e => e.target.style.borderColor=''}
            />
            <motion.button
              type="submit"
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              disabled={loading}
              style={{
                padding:'0.6rem 0.875rem', borderRadius:'var(--r-md)',
                background:'var(--blue)', border:'none', color:'#fff',
                cursor:'pointer', display:'flex', alignItems:'center',
                opacity: loading ? 0.7 : 1, transition:'opacity 0.2s',
              }}
            >
              {loading
                ? <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:0.8, ease:'linear' }}><Send size={14} /></motion.div>
                : <Send size={14} />
              }
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
            style={{ display:'flex', alignItems:'center', gap:'0.5rem', color:'#22c55e', fontSize:'0.8125rem', fontWeight:600 }}
          >
            <CheckCircle size={16} /> Merci ! Vous êtes inscrit.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

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
      <div style={{ background:'linear-gradient(135deg,rgba(59,130,246,0.09),rgba(124,58,237,0.06))', borderBottom:'1px solid var(--border)', padding:'2.5rem 0', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(var(--border) 1px, transparent 1px)', backgroundSize:'24px 24px', opacity:0.4 }} />
        <div style={{ position:'absolute', top:'-30%', right:'-5%', width:320, height:320, borderRadius:'50%', background:'radial-gradient(circle,rgba(232,120,32,0.08) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1.5rem', flexWrap:'wrap' }}>
            <div>
              {/* Live badge */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.625rem', padding:'0.25rem 0.75rem', borderRadius:'var(--r-full)', background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.25)' }}>
                <span style={{ width:7, height:7, borderRadius:'50%', background:'#22c55e', display:'block', boxShadow:'0 0 8px rgba(34,197,94,0.8)', animation:'glow-pulse 1.8s ease-in-out infinite' }} />
                <span style={{ fontSize:'0.7rem', fontWeight:700, color:'#22c55e', letterSpacing:'0.05em', textTransform:'uppercase' }}>Disponible maintenant</span>
              </div>
              <h3 style={{ fontSize:'1.375rem', fontWeight:700, color:'var(--text-primary)', marginBottom:'0.25rem' }}>
                Prêt à accélérer votre transformation ?
              </h3>
              <p style={{ color:'var(--text-muted)', fontSize:'0.9rem' }}>{t('contact.consultation.desc')}</p>
            </div>
            <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', flexShrink:0 }}>
              <Link to="/contact" className="btn btn-primary btn-lg" style={{ whiteSpace:'nowrap' }}>
                <Zap size={16} /> {t('contact.consultation.cta')} <ArrowUpRight size={15} />
              </Link>
              <Link to="/services" className="btn btn-ghost btn-lg" style={{ whiteSpace:'nowrap' }}>
                Nos services <ArrowRight size={15} />
              </Link>
            </div>
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
                { href:'https://linkedin.com/company/tisdrus', icon:Linkedin, label:'LinkedIn', hoverColor:'#0077b5' },
                { href:'https://x.com/tisdrus',                icon:XIcon,    label:'X',        hoverColor:'var(--text-primary)' },
                { href:'mailto:info@tisdrus.com',              icon:Mail,     label:'Email',    hoverColor:'var(--blue)' },
              ].map(({ href, icon:Ico, label, hoverColor }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  whileHover={{ y:-3, scale:1.12 }}
                  style={{
                    width:36, height:36, borderRadius:8,
                    background:'var(--card-bg)', border:'1px solid var(--card-border)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'var(--text-muted)', transition:'all 0.2s', textDecoration:'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = hoverColor; e.currentTarget.style.borderColor = hoverColor + '60' }}
                  onMouseLeave={e => { e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = '' }}
                >
                  <Ico size={15} />
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <NewsletterForm />
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
