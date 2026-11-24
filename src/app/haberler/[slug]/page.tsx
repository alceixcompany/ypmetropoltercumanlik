import { notFound, permanentRedirect } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import NewsDetailClient from './NewsDetailClient';
import { getNewsBySlug } from '@/lib/news-server';
import { absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';
import { getRequestSiteConfig } from '@/lib/server-seo';

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 600;

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const [{ haber, related, loaded, canonicalSlug }, site] = await Promise.all([getNewsBySlug(slug), getRequestSiteConfig()]);

  // Veritabanı okunabildiyse ve haber yoksa gerçek 404 döndür (soft-404 yerine)
  if (loaded && !haber) notFound();
  // Eski slug ile gelindiyse kalıcı olarak asıl adrese yönlendir (sitemap ile aynı adres)
  if (haber && canonicalSlug !== slug) permanentRedirect(`/haberler/${canonicalSlug}`);

  const path = `/haberler/${slug}`;
  const jsonLd = haber
    ? [
        breadcrumbJsonLd([
          { name: 'Ana Sayfa', path: '/' },
          { name: 'Blog', path: '/haberler' },
          { name: haber.title, path },
        ], site),
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: haber.title,
          description: haber.subtitle || haber.description,
          image: absoluteUrl(haber.imageUrl.startsWith('http') || haber.imageUrl.startsWith('/') ? haber.imageUrl : site.defaultImage, site),
          datePublished: haber.createdAt || undefined,
          dateModified: haber.updatedAt || haber.createdAt || undefined,
          author: { '@type': 'Organization', name: site.name, url: site.url },
          publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: absoluteUrl(site.logo, site) } },
          mainEntityOfPage: absoluteUrl(path, site),
          inLanguage: 'tr-TR',
        },
      ]
    : [];

  return (
    <>
      {jsonLd.length > 0 && <JsonLd data={jsonLd} />}
      <NewsDetailClient initialHaber={haber} initialRelated={related} />
    </>
  );
}
