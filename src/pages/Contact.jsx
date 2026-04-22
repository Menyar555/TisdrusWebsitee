import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Mail, Phone, Clock, Linkedin, X as XIcon, Send, CheckCircle, Calendar, ArrowRight, Zap } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import AnimatedSection from '../components/AnimatedSection'

export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', company:'', service:'', message:'' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const serviceOptions = t('contact.form.services') || []

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Requis'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide'
    if (!form.company.trim()) e.company = 'Requis'
    if (!form.message.trim()) e.message = 'Requis'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const inputStyle = (hasError) => ({
    width: '100%', padding: '0.7rem 1rem',
    background: hasError ? 'rgba(239,68,68,0.04)' : 'var(--bg-raised)',
    border: `1px solid ${hasError ? 'rgba(239,68,68,0.5)' : 'var(--border)'}`,
    borderRadius: 'var(--r-md)',
    color: 'var(--text-primary)', fontSize: '0.9rem',
    outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box',
  })

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.35 }}>

      {/* ── Hero ── */}
      <section className="bg-hero-mesh noise" style={{ minHeight:'42vh', display:'flex', alignItems:'center', position:'relative', paddingTop:90, paddingBottom:60 }}>
        <div className="bg-grid" style={{ position:'absolute', inset:0, opacity:0.3 }} />
        <div className="container section-inner">
          <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }} style={{ maxWidth:680 }}>
            <div className="eyebrow">{t('contact.hero.label')}</div>
            <h1 className="t-h1" style={{ color:'var(--text-primary)', marginTop:'0.75rem', marginBottom:'1.25rem' }}>
              {t('contact.hero.title')}
            </h1>
            <p className="t-body-lg" style={{ color:'var(--text-secondary)', maxWidth:560 }}>
              {t('contact.hero.subtitle')}
            </p>
          </motion.div>

          {/* Quick stats */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}
            style={{ display:'flex', gap:'2rem', marginTop:'2.5rem', flexWrap:'wrap' }}
          >
            {[
              { val:'< 24h', label:'Temps de réponse' },
              { val:'100%', label:'Confidentialité' },
              { val:'Gratuit', label:'Première consultation' },
            ].map((s, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.625rem' }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--blue)', flexShrink:0 }} />
                <span style={{ fontSize:'0.875rem', color:'var(--text-secondary)' }}>
                  <strong style={{ color:'var(--text-primary)' }}>{s.val}</strong> {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="section bg-base">
        <div className="container section-inner">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:'2.5rem', alignItems:'start' }}>

            {/* ── Form ── */}
            <AnimatedSection direction="left">
              <div style={{ background:'var(--card-bg)', border:'1px solid var(--card-border)', borderRadius:'var(--r-xl)', padding:'2.5rem', backdropFilter:'blur(16px)' }}>
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form key="form" initial={{ opacity:1 }} exit={{ opacity:0 }} onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
                      <div>
                        <h3 style={{ fontSize:'1.25rem', fontWeight:700, color:'var(--text-primary)', marginBottom:'0.25rem' }}>Envoyez-nous un message</h3>
                        <p style={{ fontSize:'0.875rem', color:'var(--text-muted)' }}>Réponse garantie sous 24 heures ouvrables</p>
                      </div>

                      {/* Name Row */}
                      <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                        <div style={{ flex:1, minWidth:140, display:'flex', flexDirection:'column', gap:'0.375rem' }}>
                          <label style={{ fontSize:'0.8rem', fontWeight:500, color:'var(--text-secondary)', letterSpacing:'0.03em' }}>{t('contact.form.firstName')} *</label>
                          <input value={form.firstName} onChange={handleChange('firstName')} placeholder="Jean" style={inputStyle(errors.firstName)} />
                          {errors.firstName && <span style={{ fontSize:'0.75rem', color:'#ef4444' }}>{errors.firstName}</span>}
                        </div>
                        <div style={{ flex:1, minWidth:140, display:'flex', flexDirection:'column', gap:'0.375rem' }}>
                          <label style={{ fontSize:'0.8rem', fontWeight:500, color:'var(--text-secondary)', letterSpacing:'0.03em' }}>{t('contact.form.lastName')}</label>
                          <input value={form.lastName} onChange={handleChange('lastName')} placeholder="Tremblay" style={inputStyle(false)} />
                        </div>
                      </div>

                      {/* Email */}
                      <div style={{ display:'flex', flexDirection:'column', gap:'0.375rem' }}>
                        <label style={{ fontSize:'0.8rem', fontWeight:500, color:'var(--text-secondary)', letterSpacing:'0.03em' }}>{t('contact.form.email')} *</label>
                        <input type="email" value={form.email} onChange={handleChange('email')} placeholder="j.tremblay@entreprise.com" style={inputStyle(errors.email)} />
                        {errors.email && <span style={{ fontSize:'0.75rem', color:'#ef4444' }}>{errors.email}</span>}
                      </div>

                      {/* Company & Phone */}
                      <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                        <div style={{ flex:1, minWidth:140, display:'flex', flexDirection:'column', gap:'0.375rem' }}>
                          <label style={{ fontSize:'0.8rem', fontWeight:500, color:'var(--text-secondary)', letterSpacing:'0.03em' }}>{t('contact.form.company')} *</label>
                          <input value={form.company} onChange={handleChange('company')} placeholder="Mon Entreprise Inc." style={inputStyle(errors.company)} />
                          {errors.company && <span style={{ fontSize:'0.75rem', color:'#ef4444' }}>{errors.company}</span>}
                        </div>
                        <div style={{ flex:1, minWidth:140, display:'flex', flexDirection:'column', gap:'0.375rem' }}>
                          <label style={{ fontSize:'0.8rem', fontWeight:500, color:'var(--text-secondary)', letterSpacing:'0.03em' }}>{t('contact.form.phone')}</label>
                          <input type="tel" value={form.phone} onChange={handleChange('phone')} placeholder="+1 (514) 000-0000" style={inputStyle(false)} />
                        </div>
                      </div>

                      {/* Service */}
                      <div style={{ display:'flex', flexDirection:'column', gap:'0.375rem' }}>
                        <label style={{ fontSize:'0.8rem', fontWeight:500, color:'var(--text-secondary)', letterSpacing:'0.03em' }}>{t('contact.form.service')}</label>
                        <select value={form.service} onChange={handleChange('service')} style={{ ...inputStyle(false), cursor:'pointer' }}>
                          <option value="">-- Choisissez un service --</option>
                          {serviceOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                        </select>
                      </div>

                      {/* Message */}
                      <div style={{ display:'flex', flexDirection:'column', gap:'0.375rem' }}>
                        <label style={{ fontSize:'0.8rem', fontWeight:500, color:'var(--text-secondary)', letterSpacing:'0.03em' }}>{t('contact.form.message')} *</label>
                        <textarea
                          value={form.message} onChange={handleChange('message')}
                          placeholder="Décrivez votre projet, vos défis actuels ou vos questions..."
                          rows={5}
                          style={{ ...inputStyle(errors.message), resize:'vertical', lineHeight:1.65 }}
                        />
                        {errors.message && <span style={{ fontSize:'0.75rem', color:'#ef4444' }}>{errors.message}</span>}
                      </div>

                      <motion.button
                        type="submit"
                        className="btn btn-primary"
                        whileHover={{ scale:1.02 }}
                        whileTap={{ scale:0.98 }}
                        style={{ justifyContent:'center', padding:'0.875rem', opacity: loading ? 0.72 : 1 }}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <div style={{ width:16, height:16, borderRadius:'50%', border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', animation:'spin 0.7s linear infinite' }} />
                            Envoi en cours...
                          </>
                        ) : (
                          <><Send size={16} /> {t('contact.form.submit')}</>
                        )}
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div key="success" initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                      style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:340, gap:'1.25rem', textAlign:'center' }}
                    >
                      <motion.div
                        initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', stiffness:260, damping:20, delay:0.15 }}
                        style={{ width:84, height:84, borderRadius:'50%', background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.25)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--emerald)' }}
                      >
                        <CheckCircle size={38} />
                      </motion.div>
                      <div>
                        <h3 style={{ fontSize:'1.5rem', fontWeight:700, color:'var(--text-primary)', marginBottom:'0.5rem' }}>Message envoyé !</h3>
                        <p style={{ color:'var(--text-secondary)', maxWidth:360, lineHeight:1.7 }}>{t('contact.form.success')}</p>
                      </div>
                      <button
                        onClick={() => { setSubmitted(false); setForm({ firstName:'', lastName:'', email:'', phone:'', company:'', service:'', message:'' }) }}
                        className="btn btn-ghost"
                      >
                        Nouveau message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>

            {/* ── Right Info Column ── */}
            <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>

              {/* Contact Info */}
              <AnimatedSection direction="right">
                <div style={{ background:'var(--card-bg)', border:'1px solid var(--card-border)', borderRadius:'var(--r-xl)', padding:'2rem', backdropFilter:'blur(16px)' }}>
                  <h3 style={{ fontSize:'1rem', fontWeight:700, color:'var(--text-primary)', marginBottom:'1.5rem' }}>{t('contact.info.title')}</h3>
                  <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem', marginBottom:'1.5rem' }}>
                    {[
                      { icon:MapPin, label:'Adresse', val:t('contact.info.address'), href:null },
                      { icon:Mail,   label:'Email',   val:t('contact.info.email'),   href:`mailto:${t('contact.info.email')}` },
                      { icon:Phone,  label:'Téléphone', val:t('contact.info.phone'), href:`tel:${t('contact.info.phone')}` },
                      { icon:Clock,  label:"Heures d'ouverture", val:t('contact.info.hours'), href:null },
                    ].map(({ icon:Ico, label, val, href }, i) => (
                      <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'0.875rem' }}>
                        <div className="icon-box icon-box-sm" style={{ background:'var(--orange-subtle)', color:'var(--orange)', border:'1px solid rgba(249,115,22,0.2)', flexShrink:0 }}>
                          <Ico size={14} />
                        </div>
                        <div>
                          <div style={{ fontSize:'0.7rem', color:'var(--text-muted)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.15rem' }}>{label}</div>
                          {href ? (
                            <a href={href} style={{ fontSize:'0.875rem', color:'var(--orange)', textDecoration:'none', lineHeight:1.5 }}>{val}</a>
                          ) : (
                            <div style={{ fontSize:'0.875rem', color:'var(--text-secondary)', lineHeight:1.5 }}>{val}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display:'flex', gap:'0.5rem', paddingTop:'1.25rem', borderTop:'1px solid var(--border)' }}>
                    <a href="https://linkedin.com/company/tisdrus" target="_blank" rel="noopener noreferrer"
                      className="btn btn-ghost btn-sm"
                      style={{ flex:1, justifyContent:'center' }}
                    >
                      <Linkedin size={13} /> LinkedIn
                    </a>
                    <a href="https://twitter.com/tisdrus" target="_blank" rel="noopener noreferrer"
                      className="btn btn-ghost btn-sm"
                      style={{ flex:1, justifyContent:'center' }}
                    >
                      <XIcon size={13} /> X
                    </a>
                  </div>
                </div>
              </AnimatedSection>

              {/* Free Consultation */}
              <AnimatedSection direction="right" delay={120}>
                <motion.div
                  whileHover={{ y:-4 }}
                  style={{
                    background:'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(124,58,237,0.08))',
                    border:'1px solid rgba(59,130,246,0.22)',
                    borderRadius:'var(--r-xl)', padding:'2rem',
                    display:'flex', flexDirection:'column', gap:'0.875rem',
                    position:'relative', overflow:'hidden',
                  }}
                >
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:'linear-gradient(90deg,var(--blue),var(--violet-light),transparent)' }} />
                  <div className="icon-box icon-box-md" style={{ background:'rgba(59,130,246,0.1)', color:'var(--blue)', border:'1px solid rgba(59,130,246,0.2)' }}>
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize:'1rem', fontWeight:700, color:'var(--text-primary)', marginBottom:'0.375rem' }}>{t('contact.consultation.title')}</h4>
                    <p style={{ fontSize:'0.875rem', color:'var(--text-secondary)', lineHeight:1.65 }}>{t('contact.consultation.desc')}</p>
                  </div>
                  <a href="#" className="btn btn-primary btn-sm" style={{ alignSelf:'flex-start' }}>
                    <Zap size={13} /> {t('contact.consultation.cta')}
                  </a>
                </motion.div>
              </AnimatedSection>

              {/* Map Placeholder */}
              <AnimatedSection direction="right" delay={220}>
                <div style={{ background:'var(--card-bg)', border:'1px solid var(--card-border)', borderRadius:'var(--r-xl)', overflow:'hidden' }}>
                  <div style={{
                    height:180,
                    background:'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(59,130,246,0.12) 0%, transparent 70%), var(--bg-surface)',
                    display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'0.625rem', position:'relative',
                  }}>
                    <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(59,130,246,0.07) 1px, transparent 1px)', backgroundSize:'22px 22px' }} />
                    <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem' }}>
                      <div style={{ width:40, height:40, borderRadius:'50%', background:'rgba(249,115,22,0.12)', border:'1px solid rgba(249,115,22,0.25)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--orange)' }}>
                        <MapPin size={18} />
                      </div>
                      <span style={{ fontSize:'0.9rem', fontWeight:600, color:'var(--text-primary)' }}>Montréal, QC</span>
                      <a
                        href="https://maps.google.com/?q=Montreal,QC,Canada"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-sm"
                      >
                        Voir sur Google Maps <ArrowRight size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background:'var(--grad-mixed)', padding:'clamp(4rem,8vw,7rem) 0', position:'relative', overflow:'hidden' }}>
        <div className="bg-grid" style={{ position:'absolute', inset:0, opacity:0.12 }} />
        <div className="container section-inner" style={{ textAlign:'center', position:'relative', zIndex:2 }}>
          <AnimatedSection>
            <h2 className="t-h2" style={{ color:'#fff', marginBottom:'1rem' }}>Prêt à transformer votre organisation ?</h2>
            <p style={{ color:'rgba(255,255,255,0.72)', marginBottom:'2.5rem', maxWidth:480, margin:'0 auto 2.5rem', lineHeight:1.75 }}>
              Rejoignez les entreprises qui nous font confiance pour leur sécurité, leur transformation numérique et leur croissance.
            </p>
            <a href="mailto:contact@tisdrus.com" className="btn btn-lg" style={{ background:'#fff', color:'var(--blue-dark)', fontWeight:700, display:'inline-flex', gap:'0.5rem' }}>
              <Mail size={18} /> Nous écrire directement
            </a>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  )
}
