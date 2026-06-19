// src/components/home/LocalidadStrip.tsx
import { localidades } from '@/data'

export function LocalidadStrip() {
  return (
    <div style={{ background: 'white', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '24px 0' }}>
      <div style={{ maxWidth: 1180, margin: 'auto', padding: '0 24px' }}>
        <p style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em', margin: '0 0 14px' }}>
          Busca por sector
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {localidades.map(loc => (
            <span
              key={loc.slug}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border-2)',
                borderRadius: 999,
                padding: '8px 16px',
                fontSize: 14,
                color: 'var(--text)',
              }}
            >
              {loc.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
