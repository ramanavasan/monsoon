import { motion } from 'framer-motion'
import type { TabType } from './InfoModal'

const INK = '#1f1f1f'
const sponsors = ["Northwind", "Vantage", "Kestrel", "Meridian", "Sonaris"]

interface HeroProps {
  onOpenModal?: (tab: TabType) => void
}

export default function Hero({ onOpenModal }: HeroProps) {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <video style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} src="/hero.mp4" autoPlay muted loop playsInline />
      {/* Overlays — opacity reduced by 70% */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.13)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.17) 0%, transparent 22%, transparent 60%, rgba(0,0,0,0.25) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.10) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.10) 100%)' }} />
      <div style={{ position: 'absolute', top: '-14%', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '720px', background: 'radial-gradient(ellipse at 50% 30%, rgba(55,48,163,0.05) 0%, transparent 68%)', pointerEvents: 'none' }} />

      {/* Top-anchored content */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '15vh 24px 0' }}>
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 13px', borderRadius: '999px', background: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', fontSize: '11px', fontWeight: 500, color: 'rgba(40,40,40,0.78)', marginBottom: '20px' }}
        >
          For teams that never stop
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.22, ease: 'easeOut' }}
          style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 'clamp(1.9rem, 4.4vw, 3.1rem)', lineHeight: 1.08, letterSpacing: '-0.025em', color: INK }}
        >
          Weather any storm
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.38, ease: 'easeOut' }}
          style={{ margin: '16px 0 0', maxWidth: '460px', fontSize: '14px', lineHeight: 1.6, color: 'rgba(40,40,40,0.7)', fontWeight: 500 }}
        >
          Resilient operations software that keeps your business running through outages, spikes, and everything in between.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.52, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', gap: '13px', marginTop: '28px' }}
        >
          <motion.button
            onClick={() => onOpenModal?.('products')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '12px 24px',
              borderRadius: '9px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              color: '#fff',
              border: 'none',
              background: '#1a1a1a',
              boxShadow: '0 6px 20px rgba(0,0,0,0.22)',
              cursor: 'pointer'
            }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>

      {/* Sponsor strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, padding: '20px 24px 30px', textAlign: 'center' }}
      >
        <p style={{ margin: '0 0 16px', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>
          Trusted by teams at
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '44px', flexWrap: 'wrap', maxWidth: '820px', margin: '0 auto' }}>
          {sponsors.map((name) => (
            <span
              key={name}
              style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.02em', color: 'rgba(255,255,255,0.72)', transition: 'color 0.25s ease', cursor: 'default', textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = '#fff' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = 'rgba(255,255,255,0.72)' }}
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
