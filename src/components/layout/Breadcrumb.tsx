// src/components/layout/Breadcrumb.tsx
import Link from 'next/link'
import { city } from '@/config/city'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: Props) {
  const all = [{ label: city.name, href: '/' }, ...items]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href ? `${city.baseUrl}${item.href}` : undefined,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Navegación de migas de pan"
        style={{ background: 'white', borderBottom: '1px solid var(--border-2)', padding: '10px 32px', fontSize: 13, color: 'var(--muted)' }}
      >
        {all.map((item, i) => (
          <span key={i}>
            {i > 0 && <span style={{ margin: '0 6px' }}>›</span>}
            {item.href
              ? <Link href={item.href} style={{ color: 'var(--orange)' }}>{item.label}</Link>
              : <span>{item.label}</span>
            }
          </span>
        ))}
      </nav>
    </>
  )
}
