// src/components/layout/BottomNav.tsx
import Link from 'next/link'

const items = [
  { href: '/gimnasios/', icon: '🏋️', label: 'Gimnasios' },
  { href: '/estudios/', icon: '🧘', label: 'Estudios' },
  { href: '/entrenadores/', icon: '🚶', label: 'Entrena.' },
  { href: '/eventos/', icon: '📅', label: 'Eventos' },
  { href: '/bienestar/', icon: '🌿', label: 'Bienestar' },
]

export function BottomNav() {
  return (
    <>
    <style>{`@media(min-width:850px){.bottom-nav{display:none!important}}`}</style>
    <nav
      aria-label="Navegación móvil"
      className="bottom-nav"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'white', display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        padding: '10px 4px',
        borderTop: '1px solid var(--border-2)',
        zIndex: 99,
      }}
    >
      {items.map(i => (
        <Link key={i.href} href={i.href} style={{ textAlign: 'center', fontSize: 11, color: 'var(--text)' }}>
          <span style={{ display: 'block', fontSize: 20 }}>{i.icon}</span>
          {i.label}
        </Link>
      ))}
    </nav>
    </>
  )
}
