// src/app/agregar-negocio/page.tsx
import type { Metadata } from 'next'
import { city } from '@/config/city'
import { staticPageContent } from '@/data'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { baseOpenGraph, OG_IMAGE } from '@/lib/metadata'

const c = staticPageContent.agregarNegocio

export const metadata: Metadata = {
  title: `${c.title}`,
  description: `Agrega tu gimnasio, estudio o servicio fitness a ${city.siteName} de forma gratuita.`,
  alternates: { canonical: `${city.baseUrl}/agregar-negocio/` },
  openGraph: baseOpenGraph({ url: `${city.baseUrl}/agregar-negocio/` }),
  twitter: { card: 'summary_large_image' as const, images: [OG_IMAGE] },
}

export default function AgregarNegocioPage() {
  return (
    <>
      <Breadcrumb items={[{ label: c.title }]} />
      <section style={{ maxWidth: 780, margin: '48px auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 36, marginBottom: 24 }}>{c.h1}</h1>
        {c.body.split('\n\n').map((para, i) => (
          <p key={i} style={{ fontSize: 16, lineHeight: 1.8, color: '#374151', marginBottom: 20 }}>{para}</p>
        ))}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, marginTop: 32 }}>
          <h2 style={{ fontSize: 22, marginBottom: 20 }}>Envíanos los datos de tu negocio</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 20 }}>Completa el formulario y nuestro equipo revisará y publicará tu perfil en 24-48 horas.</p>
          <a
            href={`mailto:hola@${city.domain}?subject=Quiero agregar mi negocio`}
            style={{ display: 'inline-block', background: 'var(--orange)', color: 'white', padding: '14px 28px', borderRadius: 10, fontWeight: 700, fontSize: 16 }}
          >
            Enviar por email →
          </a>
        </div>
      </section>
    </>
  )
}
