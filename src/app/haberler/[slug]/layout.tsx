import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createSeoMetadata } from '@/lib/seo';
import { getRequestSiteConfig } from '@/lib/server-seo';
import { getNewsBySlug, stripHtml } from '@/lib/news-server';

type Props = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const [{ slug }, site] = await Promise.all([params, getRequestSiteConfig()]);
  const { haber } = await getNewsBySlug(slug);
  const title = haber?.title || titleFromSlug(slug);
  const summary = haber ? (haber.subtitle || haber.description || stripHtml(haber.content)) : '';
  const description = summary
    ? summary.slice(0, 155)
    : `${site.name} blog: ${title}. Yeminli tercüme, noter onaylı tercüme ve resmi evrak süreçleri hakkında bilgi alın.`;

  return createSeoMetadata({
    title,
    description,
    path: `/haberler/${slug}`,
    image: haber?.imageUrl && !haber.imageUrl.startsWith('data:') ? haber.imageUrl : '/yp-metropol/blog-hero-v2.webp',
    keywords: [...(haber?.tags ?? []), title.toLocaleLowerCase('tr-TR'), `${site.locationName.toLocaleLowerCase('tr-TR')} tercume`],
    type: 'article',
    publishedTime: haber?.createdAt || undefined,
    modifiedTime: haber?.updatedAt || undefined,
    site,
  });
}

export default function NewsDetailLayout({ children }: Props) {
  return children;
}
