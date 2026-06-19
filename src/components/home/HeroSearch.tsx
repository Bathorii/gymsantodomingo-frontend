// src/components/home/HeroSearch.tsx
import { homeContent, localidades } from '@/data'

export function HeroSearch() {
  return (
    <section
      style={{
        minHeight: 430,
        background: 'linear-gradient(rgba(0,0,0,.62), rgba(0,0,0,.72)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&fm=webp&auto=format") center/cover',
        color: 'white',
        padding: '90px 32px',
      }}
    >
      <div style={{ maxWidth: 920, margin: 'auto', textAlign: 'center' }}>
        <h1 className="hero-h1">{homeContent.hero.h1}</h1>
        <p className="hero-subtitle">{homeContent.hero.subtitle}</p>

        <div className="hero-search-box">
          <input
            type="text"
            placeholder="¿Qué estás buscando?"
            className="hero-search-input"
          />
          <select className="hero-search-input" style={{ minWidth: 160 }} aria-label="Selecciona un sector">
            <option>Todos los sectores</option>
            {localidades.slice(0, 4).map(loc => (
              <option key={loc.slug}>{loc.name}</option>
            ))}
          </select>
          <button className="hero-search-btn">
            Buscar
          </button>
        </div>
      </div>
    </section>
  )
}
