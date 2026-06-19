// src/components/layout/Header.tsx
import Link from 'next/link'
import { city } from '@/config/city'

const navLinks = [
  { href: '/gimnasios/', label: 'Gimnasios' },
  { href: '/estudios/', label: 'Estudios' },
  { href: '/entrenadores/', label: 'Entrenadores' },
  { href: '/eventos/', label: 'Eventos' },
  { href: '/bienestar/', label: 'Bienestar' },
]

export function Header() {
  return (
    <header className="header-root">
      <Link href="/" style={{ fontSize: 24, fontWeight: 800, color: 'white' }}>
        GYM<span style={{ color: 'var(--orange)' }}>{city.slug.toUpperCase()}</span>.{city.domain.split('.').slice(1).join('.').toUpperCase()}
      </Link>
      <nav className="header-nav" aria-label="Navegación principal">
        {navLinks.map(l => (
          <Link key={l.href} href={l.href} className="header-nav-link">
            {l.label}
          </Link>
        ))}
        <Link href="/agregar-negocio/" className="header-cta">
          Agregar negocio
        </Link>
      </nav>
    </header>
  )
}
