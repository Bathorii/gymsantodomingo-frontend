// src/components/home/FaqSection.tsx
import { JsonLd } from '@/components/seo/JsonLd'

interface FaqItem { q: string; a: string }

interface Props {
  title: string
  items: FaqItem[]
}

export function FaqSection({ title, items }: Props) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <>
      <JsonLd data={faqSchema} />
      <div style={{ background: 'white', borderTop: '1px solid var(--border)', padding: '48px 24px' }}>
        <div style={{ maxWidth: 780, margin: 'auto' }}>
          {title && <h2 style={{ fontSize: 28, marginBottom: 28, textAlign: 'center' }}>{title}</h2>}
          {items.map((item, i) => (
            <details
              key={i}
              style={{ border: '1px solid var(--border-2)', borderRadius: 14, marginBottom: 12, padding: '18px 20px' }}
            >
              <summary style={{ fontSize: 16, fontWeight: 600, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                {item.q}
                <span style={{ color: 'var(--orange)', fontSize: 20 }}>＋</span>
              </summary>
              <p style={{ marginTop: 12, color: '#4b5563', fontSize: 15, lineHeight: 1.7 }}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  )
}
