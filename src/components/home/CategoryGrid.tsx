// src/components/home/CategoryGrid.tsx
import Link from 'next/link'
import { categories } from '@/data'

export function CategoryGrid() {
  return (
    <section style={{ maxWidth: 1180, margin: '42px auto', padding: '0 24px' }}>
      <h2 style={{ fontSize: 30, marginBottom: 24 }}>Explora por categoría</h2>
      <div className="category-grid">
        {categories.map(cat => (
          <Link
            key={cat.slug}
            href={`/${cat.slug}/`}
            style={{
              background: 'white',
              borderRadius: 18,
              padding: '28px 18px',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(15,23,42,.06)',
              border: '1px solid var(--border)',
              display: 'block',
              transition: 'transform .15s, box-shadow .15s',
            }}
          >
            <div style={{ fontSize: 38, marginBottom: 14 }}>{cat.icon}</div>
            <h3 style={{ margin: '0 0 6px', fontSize: 16 }}>{cat.label}</h3>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13 }}>{cat.count.toLocaleString('es-CO')} lugares</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
