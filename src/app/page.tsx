import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import ModernHome from '@/components/ModernHome';
import { localBusinessJsonLd, websiteJsonLd } from '@/lib/seo';
import { getRequestSiteConfig } from '@/lib/server-seo';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getRequestSiteConfig();
  return {
    alternates: {
      canonical: site.url,
      languages: { 'tr-TR': site.url, en: `${site.url}/en`, 'x-default': site.url },
    },
  };
}

export default async function Home() {
  const site = await getRequestSiteConfig();

  return (
    <>
      <JsonLd data={[localBusinessJsonLd(site), websiteJsonLd(site)]} />
      <ModernHome />
    </>
  );
}
