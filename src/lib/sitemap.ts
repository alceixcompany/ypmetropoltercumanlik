import type { MetadataRoute } from 'next'
import { collection, DocumentData, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { siteConfig } from '@/lib/seo'
import type { SiteConfig } from '@/lib/domain-seo'
import { translationServices } from '@/lib/translation-services'
import { translationLanguages } from '@/lib/translation-languages'
import { serviceAreas } from '@/lib/service-areas'
import { landingPages } from '@/lib/landing-pages'
import { areaHref, languageHref, serviceHref } from '@/lib/site-links'
import { englishPages } from '@/lib/en-pages'

export type SitemapEntry = MetadataRoute.Sitemap[number]

function toDate(value: unknown): Date {
  if (!value) return new Date()
  if (value instanceof Date) return value
  if (typeof value === 'string' || typeof value === 'number') return new Date(value)
  if (typeof value === 'object' && value !== null && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate()
  }
  return new Date()
}

function createSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function absoluteSitemapUrl(path: string, site: SiteConfig = siteConfig) {
  return `${site.url}${path}`
}

export function getStaticPageEntries(site: SiteConfig = siteConfig): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteSitemapUrl('/hizmetlerimiz', site),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: absoluteSitemapUrl('/dillerimiz', site),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: absoluteSitemapUrl('/hizmet-bolgelerimiz', site),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: absoluteSitemapUrl('/galeri', site),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteSitemapUrl('/haberler', site),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: absoluteSitemapUrl('/hakkimizda', site),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: absoluteSitemapUrl('/iletisim', site),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}

export const staticPageEntries = getStaticPageEntries();

export function getLandingPageEntries(site: SiteConfig = siteConfig): MetadataRoute.Sitemap {
  return landingPages.map((page) => ({
    url: absoluteSitemapUrl(`/${page.slug}`, site),
    lastModified: page.publishedAt ? new Date(page.publishedAt) : new Date(),
    changeFrequency: page.kind === 'guide' ? 'yearly' as const : 'monthly' as const,
    priority: page.kind === 'guide' ? 0.7 : 0.9,
  }))
}

export function getServiceEntries(site: SiteConfig = siteConfig): MetadataRoute.Sitemap {
  return translationServices.map((service) => ({
    url: absoluteSitemapUrl(serviceHref(service.slug), site),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
}

export const serviceEntries = getServiceEntries();

export function getLanguageEntries(site: SiteConfig = siteConfig): MetadataRoute.Sitemap {
  return translationLanguages.map((language) => ({
    url: absoluteSitemapUrl(languageHref(language.slug), site),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
}

export function getEnglishEntries(site: SiteConfig = siteConfig): MetadataRoute.Sitemap {
  return [
    { url: absoluteSitemapUrl('/en', site), lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    ...englishPages.map((page) => ({
      url: absoluteSitemapUrl(`/en/${page.slug}`, site),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}

export async function getNewsEntries(site: SiteConfig = siteConfig): Promise<MetadataRoute.Sitemap> {
  const newsSnapshot = await getDocs(query(collection(db, 'haberler'), where('isActive', '==', true)))

  return newsSnapshot.docs
    .map((doc: DocumentData): SitemapEntry | null => {
      const data = doc.data()
      const slug = data.slug || createSlug(data.title || '')

      if (!slug) return null

      return {
        url: absoluteSitemapUrl(`/haberler/${slug}`, site),
        lastModified: toDate(data.updatedAt || data.createdAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      }
    })
    .filter((entry): entry is SitemapEntry => Boolean(entry))
}

export async function getServiceAreaEntries(site: SiteConfig = siteConfig): Promise<MetadataRoute.Sitemap> {
  return serviceAreas.map((area) => ({
    url: absoluteSitemapUrl(areaHref(area.slug), site),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
}

function dedupeEntries(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>()
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false
    seen.add(entry.url)
    return true
  })
}

export async function getAllSitemapEntries(site: SiteConfig = siteConfig): Promise<MetadataRoute.Sitemap> {
  const base = [
    ...getStaticPageEntries(site),
    ...getLandingPageEntries(site),
    ...getServiceEntries(site),
    ...getLanguageEntries(site),
    ...getEnglishEntries(site),
  ]
  try {
    const [newsEntries, serviceAreaEntries] = await Promise.all([
      getNewsEntries(site),
      getServiceAreaEntries(site),
    ])
    return dedupeEntries([...base, ...newsEntries, ...serviceAreaEntries])
  } catch (error) {
    console.error('Sitemap oluşturulurken hata:', error)
    return dedupeEntries(base)
  }
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function createUrlsetXml(entries: MetadataRoute.Sitemap): string {
  const urls = entries
    .map((entry) => {
      const lastModified = entry.lastModified ? new Date(entry.lastModified).toISOString() : undefined

      return [
        '<url>',
        `<loc>${escapeXml(entry.url)}</loc>`,
        lastModified ? `<lastmod>${lastModified}</lastmod>` : '',
        entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : '',
        typeof entry.priority === 'number' ? `<priority>${entry.priority}</priority>` : '',
        '</url>',
      ].filter(Boolean).join('')
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
}
