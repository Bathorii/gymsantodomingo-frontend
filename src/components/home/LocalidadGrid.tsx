// src/components/home/LocalidadGrid.tsx
import { localidades } from '@/data'

export function LocalidadGrid() {
  const top8 = localidades.slice(0, 8)
  return (
    <section style={{ maxWidth: 1180, margin: '42px auto', padding: '0 24px' }}>
      <h2 style={{ fontSize: 30, marginBottom: 24 }}>Gimnasios por sector</h2>
      <div className="localidad-grid">
        {top8.map(loc => (
          <div
            key={loc.slug}
            style={{
              background: 'white',
              borderRadius: 14,
              padding: 20,
              border: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(15,23,42,.04)',
            }}
          >
            <strong style={{ fontSize: 15 }}>{loc.name}</strong>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{loc.gymCount} gyms</span>
          </div>
        ))}
      </div>
    </section>
  )
}
