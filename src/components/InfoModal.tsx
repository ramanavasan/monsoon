import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Mail, Phone, Copy, Check, Sparkles, Code2, GraduationCap, Briefcase } from 'lucide-react'

export type TabType = 'products' | 'about' | 'contact'

interface InfoModalProps {
  isOpen: boolean
  activeTab: TabType
  onClose: () => void
  onSelectTab: (tab: TabType) => void
}

const INK = '#1f1f1f'

export default function InfoModal({ isOpen, activeTab, onClose, onSelectTab }: InfoModalProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(label)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const projects = [
    {
      id: 1,
      title: 'Ramanavasan Portfolio',
      url: 'https://ramanavasan-portfolio.vercel.app/',
      displayUrl: 'ramanavasan-portfolio.vercel.app',
      tag: 'Personal Portfolio',
      description: 'Custom portfolio platform showcasing engineering projects, interactive tools, and web applications.'
    },
    {
      id: 2,
      title: 'Developer Portfolio',
      url: 'https://portfolio-ramanavasan.vercel.app/',
      displayUrl: 'portfolio-ramanavasan.vercel.app',
      tag: 'Developer Showcase',
      description: 'Modern developer showcase highlighting full-stack projects, UI designs, and continuous learning.'
    },
    {
      id: 3,
      title: 'Aptitude EQAT',
      url: 'https://aptitude-eqat.vercel.app/',
      displayUrl: 'aptitude-eqat.vercel.app',
      tag: 'Web Application',
      description: 'Interactive aptitude testing and assessment platform designed for student practice and skill enhancement.'
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '640px',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '28px',
              background: 'rgba(255, 255, 255, 0.78)',
              border: '1px solid rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.4) inset',
              overflow: 'hidden',
              color: INK,
            }}
          >
            {/* Header with Navigation Tabs & Close */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 24px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.07)',
              }}
            >
              {/* Tab Selector Pills */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px',
                  borderRadius: '999px',
                  background: 'rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.04)',
                }}
              >
                {(['products', 'about', 'contact'] as TabType[]).map((tab) => {
                  const isActive = activeTab === tab
                  return (
                    <button
                      key={tab}
                      onClick={() => onSelectTab(tab)}
                      style={{
                        position: 'relative',
                        padding: '8px 18px',
                        borderRadius: '999px',
                        border: 'none',
                        background: 'transparent',
                        fontSize: '13px',
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? INK : 'rgba(31, 31, 31, 0.65)',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="modalTabIndicator"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '999px',
                            background: '#ffffff',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                            zIndex: 0,
                          }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span style={{ position: 'relative', zIndex: 1 }}>
                        {tab === 'products' ? 'Products' : tab === 'about' ? 'About' : 'Contact'}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(0, 0, 0, 0.05)',
                  color: INK,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.transform = 'scale(1.06)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div
              style={{
                padding: '24px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {/* PRODUCTS TAB */}
              {activeTab === 'products' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  <div style={{ marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Code2 size={18} style={{ color: '#3b82f6' }} />
                      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: INK }}>
                        Featured Products & Projects
                      </h3>
                    </div>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(40, 40, 40, 0.65)' }}>
                      Explore live web applications built and deployed by Ramanavasan.
                    </p>
                  </div>

                  {projects.map((proj) => (
                    <motion.div
                      key={proj.id}
                      whileHover={{ y: -2 }}
                      style={{
                        padding: '18px 20px',
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.65)',
                        border: '1px solid rgba(255, 255, 255, 0.9)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            padding: '3px 9px',
                            borderRadius: '999px',
                            background: 'rgba(59, 130, 246, 0.1)',
                            color: '#2563eb',
                          }}
                        >
                          {proj.tag}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            onClick={() => copyToClipboard(proj.url, `proj-${proj.id}`)}
                            title="Copy link"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '5px 10px',
                              borderRadius: '8px',
                              border: '1px solid rgba(0, 0, 0, 0.08)',
                              background: 'rgba(255, 255, 255, 0.8)',
                              fontSize: '12px',
                              fontWeight: 500,
                              color: 'rgba(40, 40, 40, 0.75)',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {copiedText === `proj-${proj.id}` ? (
                              <>
                                <Check size={13} style={{ color: '#16a34a' }} />
                                <span style={{ color: '#16a34a' }}>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy size={13} />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: INK }}>
                          {proj.title}
                        </h4>
                        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(40, 40, 40, 0.7)', lineHeight: 1.5 }}>
                          {proj.description}
                        </p>
                      </div>

                      <div style={{ paddingTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '12px', fontFamily: 'monospace', color: 'rgba(40, 40, 40, 0.55)' }}>
                          {proj.displayUrl}
                        </span>
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '7px 14px',
                            borderRadius: '999px',
                            background: INK,
                            color: '#ffffff',
                            fontSize: '12px',
                            fontWeight: 600,
                            textDecoration: 'none',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-1px)'
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.25)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          <span>Visit App</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* ABOUT TAB */}
              {activeTab === 'about' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #1f1f1f 0%, #434343 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '20px',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                      }}
                    >
                      R
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '19px', fontWeight: 700, color: INK }}>
                        Ramanavasan
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 500, color: 'rgba(40,40,40,0.7)' }}>
                          <GraduationCap size={14} style={{ color: '#4f46e5' }} />
                          3rd-Year CSE Student
                        </span>
                        <span style={{ fontSize: '12px', color: 'rgba(40,40,40,0.4)' }}>•</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 500, color: 'rgba(40,40,40,0.7)' }}>
                          <Briefcase size={14} style={{ color: '#059669' }} />
                          Web Tech & AI Mentor
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '20px 22px',
                      borderRadius: '18px',
                      background: 'rgba(255, 255, 255, 0.65)',
                      border: '1px solid rgba(255, 255, 255, 0.9)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      fontSize: '14.5px',
                      lineHeight: '1.65',
                      color: 'rgba(30, 30, 30, 0.88)',
                      fontWeight: 450,
                    }}
                  >
                    <p style={{ margin: 0 }}>
                      Hey! I'm Ramanavasan, a 3rd-year Computer Science Engineering student passionate about building practical software and teaching modern web tech.
                    </p>
                    <p style={{ margin: 0 }}>
                      I started coding because static theory bored me — so I jumped into real projects instead. Now I help other learners skip the confusion, build real applications, and master modern AI tools.
                    </p>
                    <p style={{ margin: 0 }}>
                      Whether I'm shipping products or mentoring students, I believe in hands-on experimentation, clean user interfaces, and continuous learning.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {['Hands-on Experimentation', 'Clean UI Design', 'Modern Web & AI', 'Practical Software'].map((skill) => (
                      <span
                        key={skill}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 13px',
                          borderRadius: '999px',
                          background: 'rgba(255, 255, 255, 0.8)',
                          border: '1px solid rgba(0, 0, 0, 0.06)',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: 'rgba(40, 40, 40, 0.8)',
                        }}
                      >
                        <Sparkles size={12} style={{ color: '#8b5cf6' }} />
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CONTACT TAB */}
              {activeTab === 'contact' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  <div style={{ marginBottom: '4px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: INK }}>
                      Get in Touch
                    </h3>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(40, 40, 40, 0.65)' }}>
                      Feel free to reach out for collaborations, project inquiries, or mentoring.
                    </p>
                  </div>

                  {/* Email Card */}
                  <div
                    style={{
                      padding: '18px 20px',
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.65)',
                      border: '1px solid rgba(255, 255, 255, 0.9)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          background: 'rgba(239, 68, 68, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#dc2626',
                        }}
                      >
                        <Mail size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(40,40,40,0.5)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Email Address
                        </div>
                        <a
                          href="mailto:ramanavasanmanivannan@gmail.com"
                          style={{ fontSize: '14px', fontWeight: 600, color: INK, textDecoration: 'none', wordBreak: 'break-all' }}
                        >
                          ramanavasanmanivannan@gmail.com
                        </a>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => copyToClipboard('ramanavasanmanivannan@gmail.com', 'email')}
                        title="Copy email"
                        style={{
                          padding: '7px 11px',
                          borderRadius: '8px',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          background: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: 'rgba(40, 40, 40, 0.8)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        {copiedText === 'email' ? <Check size={14} style={{ color: '#16a34a' }} /> : <Copy size={14} />}
                      </button>
                      <a
                        href="mailto:ramanavasanmanivannan@gmail.com"
                        style={{
                          padding: '7px 14px',
                          borderRadius: '8px',
                          background: INK,
                          color: '#fff',
                          fontSize: '12px',
                          fontWeight: 600,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        Send
                      </a>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div
                    style={{
                      padding: '18px 20px',
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.65)',
                      border: '1px solid rgba(255, 255, 255, 0.9)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          background: 'rgba(16, 185, 129, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#059669',
                        }}
                      >
                        <Phone size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(40,40,40,0.5)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Phone Number
                        </div>
                        <a
                          href="tel:+918870804734"
                          style={{ fontSize: '14px', fontWeight: 600, color: INK, textDecoration: 'none' }}
                        >
                          +91 8870804734
                        </a>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => copyToClipboard('+91 8870804734', 'phone')}
                        title="Copy phone"
                        style={{
                          padding: '7px 11px',
                          borderRadius: '8px',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          background: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: 'rgba(40, 40, 40, 0.8)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        {copiedText === 'phone' ? <Check size={14} style={{ color: '#16a34a' }} /> : <Copy size={14} />}
                      </button>
                      <a
                        href="tel:+918870804734"
                        style={{
                          padding: '7px 14px',
                          borderRadius: '8px',
                          background: INK,
                          color: '#fff',
                          fontSize: '12px',
                          fontWeight: 600,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        Call
                      </a>
                    </div>
                  </div>

                  {/* Summary Bar as requested */}
                  <div
                    style={{
                      padding: '14px 18px',
                      borderRadius: '14px',
                      background: 'rgba(0, 0, 0, 0.04)',
                      border: '1px dashed rgba(0, 0, 0, 0.15)',
                      textAlign: 'center',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'rgba(30, 30, 30, 0.8)',
                    }}
                  >
                    <a
                      href="mailto:ramanavasanmanivannan@gmail.com"
                      style={{ color: INK, fontWeight: 600, textDecoration: 'none' }}
                    >
                      (mailto:ramanavasanmanivannan@gmail.com)
                    </a>
                    {' • '}
                    <a
                      href="tel:+918870804734"
                      style={{ color: INK, fontWeight: 600, textDecoration: 'none' }}
                    >
                      +91 8870804734
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
