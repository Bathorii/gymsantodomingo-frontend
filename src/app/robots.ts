// src/app/robots.ts
export const dynamic = 'force-static'

import type { MetadataRoute } from 'next'
import { city } from '@/config/city'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // AI keresőmotorok és válasz-motorok — explicit engedélyezve
      // Ezek a botok az AI-alapú keresési válaszokhoz (ChatGPT Search,
      // Perplexity, Copilot, Google AI Overviews) kellenek — nem training!
      {
        userAgent: 'OAI-SearchBot',   // ChatGPT Search real-time crawler
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',   // Perplexity AI
        allow: '/',
      },
      {
        userAgent: 'Bingbot',         // Bing / Microsoft Copilot
        allow: '/',
      },
      {
        userAgent: 'Googlebot',       // Google Search + AI Overviews
        allow: '/',
      },
      {
        userAgent: 'DuckDuckBot',     // DuckDuckGo (Bing alapú)
        allow: '/',
      },
      {
        userAgent: 'YouBot',          // You.com AI search
        allow: '/',
      },
      // Általános szabályok
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${city.baseUrl}/sitemap.xml`,
  }
}
