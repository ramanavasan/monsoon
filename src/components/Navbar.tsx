import { motion } from 'framer-motion'
import type { TabType } from './InfoModal'

const INK = '#1f1f1f'
const navItems: { label: string; tab: TabType }[] = [
  { label: 'Product', tab: 'products' },
  { label: 'About', tab: 'about' },
  { label: 'Contact', tab: 'contact' },
]

interface NavbarProps {
  onOpenModal?: (tab: TabType) => void
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  return (
    <div style={{ position: 'fixed', top: '18px', left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
      <motion.nav
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          display: 'flex', alignItems: 'center', gap: '36px',
          padding: '11px 22px',
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.55)',
          border: '1px solid rgba(255,255,255,0.65)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
        }}
      >
        <span style={{ fontSize: '17px', fontWeight: 700, color: INK, letterSpacing: '-0.01em', cursor: 'pointer' }} onClick={() => onOpenModal?.('about')}>
          Monsoon
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onOpenModal?.(item.tab)}
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: 'rgba(40,40,40,0.72)',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = INK }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(40,40,40,0.72)' }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </motion.nav>
    </div>
  )
}
