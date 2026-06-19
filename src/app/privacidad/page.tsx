// src/app/privacidad/page.tsx
import type { Metadata } from 'next'
import { city } from '@/config/city'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { baseOpenGraph, OG_IMAGE } from '@/lib/metadata'

type CountryLaw = { law: string; authority: string; authorityUrl: string; residents: string }
const COUNTRY_LAWS: Record<string, CountryLaw> = {
  CO: { law: 'Ley Estatutaria 1581 de 2012', authority: 'Superintendencia de Industria y Comercio (SIC)', authorityUrl: 'sic.gov.co', residents: 'Colombia' },
  MX: { law: 'Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)', authority: 'Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI)', authorityUrl: 'inai.org.mx', residents: 'México' },
  PE: { law: 'Ley N.° 29733 de Protección de Datos Personales', authority: 'Autoridad Nacional de Protección de Datos Personales (ANPD)', authorityUrl: 'gob.pe/anpd', residents: 'Perú' },
  CL: { law: 'Ley N.° 19.628 sobre Protección de la Vida Privada', authority: 'Consejo para la Transparencia', authorityUrl: 'consejotransparencia.cl', residents: 'Chile' },
  AR: { law: 'Ley N.° 25.326 de Protección de los Datos Personales', authority: 'Agencia de Acceso a la Información Pública (AAIP)', authorityUrl: 'argentina.gob.ar/aaip', residents: 'Argentina' },
}
const LOCAL_LAW = COUNTRY_LAWS[city.country] ?? COUNTRY_LAWS.CO

export const metadata: Metadata = {
  title: `Política de privacidad`,
  description:
    `Conoce cómo ${city.siteName} recopila, usa y protege tus datos personales conforme al Reglamento General de Protección de Datos (RGPD) y la ${LOCAL_LAW.law}.`,
  alternates: { canonical: `${city.baseUrl}/privacidad/` },
  openGraph: baseOpenGraph({ url: `${city.baseUrl}/privacidad/` }),
  twitter: { card: 'summary_large_image' as const, images: [OG_IMAGE] },
}

const LAST_UPDATED = 'Mayo de 2026'
const CONTROLLER = 'Missing Technology'
const CONTROLLER_COUNTRY = 'Hungría, Unión Europea'
const BRAND = city.siteName
const PRIVACY_EMAIL = `privacidad@${city.domain}`

const sections = [
  {
    title: '1. Responsable del tratamiento',
    body: `El responsable del tratamiento de los datos personales recopilados a través de ${BRAND} es:\n\n${CONTROLLER} · ${CONTROLLER_COUNTRY}\n\n${BRAND} es operado por ${CONTROLLER}, empresa con sede en la Unión Europea. Como empresa europea, el tratamiento de datos se rige principalmente por el Reglamento General de Protección de Datos (RGPD / GDPR, Reglamento UE 2016/679), aplicando además las disposiciones de la ${LOCAL_LAW.law} en lo que respecta a los usuarios residentes en ${LOCAL_LAW.residents}.\n\nPara cualquier consulta sobre privacidad: ${PRIVACY_EMAIL}`,
  },
  {
    title: '2. Datos que recopilamos',
    body: `Recopilamos únicamente los datos estrictamente necesarios para el funcionamiento del servicio:\n\n• Datos de navegación: dirección IP (anonimizada), tipo de navegador, páginas visitadas y duración de la sesión, recogidos a través de Google Analytics.\n\n• Datos de contacto: si nos escribes por correo electrónico o formulario de contacto, almacenamos tu nombre y dirección de email exclusivamente para responderte.\n\n• Datos de negocios: si registras un establecimiento en el directorio, almacenamos el nombre del negocio, dirección, teléfono y web con tu consentimiento expreso.`,
  },
  {
    title: '3. Finalidad y base legal del tratamiento',
    body: `Tratamos tus datos con las siguientes finalidades y bases legales:\n\n• Análisis estadístico del uso del sitio → base legal: interés legítimo (Art. 6.1.f RGPD).\n\n• Respuesta a consultas y solicitudes de soporte → base legal: ejecución de una relación precontractual o consentimiento (Art. 6.1.b y 6.1.a RGPD).\n\n• Gestión de perfiles de negocios en el directorio → base legal: consentimiento expreso (Art. 6.1.a RGPD y Art. 9 Ley 1581/2012).\n\n• Cumplimiento de obligaciones legales → base legal: obligación legal (Art. 6.1.c RGPD).`,
  },
  {
    title: '4. Terceros y transferencias internacionales',
    body: `Podemos compartir datos con los siguientes encargados del tratamiento:\n\n• Google LLC (Google Analytics): análisis estadístico de tráfico. Las IPs se anonimizan antes del almacenamiento. Google LLC participa en el marco EU-U.S. Data Privacy Framework, garantizando un nivel de protección adecuado conforme al RGPD.\n\n• Vercel Inc.: infraestructura y alojamiento del sitio web, con servidores en la UE o regiones con protección equivalente.\n\nLas transferencias internacionales de datos (UE → terceros países) se realizan únicamente con garantías adecuadas conforme al Art. 46 RGPD o en base a decisiones de adecuación de la Comisión Europea. No vendemos, alquilamos ni cedemos datos personales a terceros con fines comerciales.`,
  },
  {
    title: '5. Conservación de los datos',
    body: `Los datos de navegación se conservan de forma anonimizada por el período necesario para el análisis estadístico (máximo 26 meses en Google Analytics). Los datos de contacto se eliminan una vez resuelta la consulta, salvo obligación legal de conservación. Los perfiles de negocios se mantienen activos mientras el establecimiento permanezca en el directorio o hasta que el titular solicite su eliminación.`,
  },
  {
    title: '6. Tus derechos',
    body: `Como usuario, tienes los siguientes derechos sobre tus datos personales:\n\n• Acceso: conocer qué datos tenemos sobre ti.\n\n• Rectificación: corregir datos inexactos o incompletos.\n\n• Supresión ("derecho al olvido"): solicitar la eliminación de tus datos cuando no exista base legal para seguir tratándolos.\n\n• Limitación del tratamiento: solicitar que pausemos el uso de tus datos en determinadas circunstancias.\n\n• Portabilidad: recibir tus datos en formato estructurado y legible por máquina.\n\n• Oposición: oponerte al tratamiento basado en interés legítimo.\n\n• Revocación del consentimiento: retirar en cualquier momento el consentimiento otorgado, sin que ello afecte la licitud del tratamiento previo.\n\nEstos derechos están reconocidos por el RGPD (Arts. 15-21) y por la ${LOCAL_LAW.law}. Para ejercerlos, escríbenos a ${PRIVACY_EMAIL}. Atenderemos tu solicitud en un plazo máximo de 30 días.`,
  },
  {
    title: '7. Reclamaciones ante autoridades supervisoras',
    body: `Si consideras que el tratamiento de tus datos vulnera tus derechos, puedes presentar una reclamación ante:\n\n• Autoridad Nacional de Protección de Datos y Libertad de Información de Hungría (NAIH) · naih.hu — como autoridad de control del Estado miembro donde tiene sede el responsable del tratamiento.\n\n• ${LOCAL_LAW.authority}: ${LOCAL_LAW.authorityUrl} — como autoridad de protección de datos de ${LOCAL_LAW.residents}, para usuarios residentes en ${LOCAL_LAW.residents}.`,
  },
  {
    title: '8. Cookies',
    body: `Este sitio utiliza cookies técnicas (necesarias para el funcionamiento básico) y cookies analíticas de Google Analytics. Puedes desactivar las cookies analíticas desde la configuración de tu navegador en cualquier momento sin que esto afecte la funcionalidad principal del sitio. Próximamente implementaremos un banner de gestión de cookies conforme al RGPD.`,
  },
  {
    title: '9. Seguridad',
    body: `Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a accesos no autorizados, pérdida o alteración, conforme al Art. 32 RGPD. El sitio utiliza cifrado HTTPS en todas las comunicaciones.`,
  },
  {
    title: '10. Cambios en esta política',
    body: `Podemos actualizar esta política para reflejar cambios en el servicio o en la normativa aplicable. La fecha de "última actualización" al inicio del documento indicará siempre la versión vigente. Los cambios relevantes serán comunicados de forma visible en el sitio.`,
  },
]

export default function PrivacidadPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Política de privacidad' }]} />
      <section style={{ maxWidth: 780, margin: '48px auto', padding: '0 24px 64px' }}>
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>Política de privacidad</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 8, fontSize: 14 }}>
          Última actualización: {LAST_UPDATED}
        </p>
        <p style={{ color: 'var(--muted)', marginBottom: 40, fontSize: 14 }}>
          Responsable del tratamiento: <strong style={{ color: '#374151' }}>{CONTROLLER}</strong> · {CONTROLLER_COUNTRY}
        </p>

        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#374151', marginBottom: 40 }}>
          {BRAND} es operado por <strong>{CONTROLLER}</strong>, empresa con sede en Hungría (Unión Europea).
          Esta política explica qué datos recopilamos, cómo los usamos y qué derechos tienes sobre ellos,
          de acuerdo con el <strong>Reglamento General de Protección de Datos (RGPD)</strong> y la{' '}
          <strong>{LOCAL_LAW.law}</strong>.
        </p>

        {sections.map((s) => (
          <div key={s.title} style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 20, marginBottom: 12, color: 'var(--text)' }}>{s.title}</h2>
            {s.body.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontSize: 15, lineHeight: 1.8, color: '#374151', marginBottom: 12 }}>
                {para}
              </p>
            ))}
          </div>
        ))}

        <div
          style={{
            marginTop: 48,
            padding: '20px 24px',
            background: '#f5f6f8',
            borderRadius: 12,
            borderLeft: '4px solid var(--orange)',
          }}
        >
          <p style={{ margin: 0, fontSize: 15, color: '#374151' }}>
            <strong>¿Preguntas sobre privacidad?</strong> Escríbenos a{' '}
            <a href={`mailto:${PRIVACY_EMAIL}`} style={{ color: 'var(--orange)', fontWeight: 600 }}>
              {PRIVACY_EMAIL}
            </a>
            . Respondemos en un máximo de 30 días.
          </p>
        </div>
      </section>
    </>
  )
}
