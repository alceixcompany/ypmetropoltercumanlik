import JsonLd from '@/components/JsonLd';
import ModernHome from '@/components/ModernHome';
import { localBusinessJsonLd, websiteJsonLd } from '@/lib/seo';
import { getRequestSiteConfig } from '@/lib/server-seo';

export default async function Home() {
  const site = await getRequestSiteConfig();

  return (
    <>
      <JsonLd data={[localBusinessJsonLd(site), websiteJsonLd(site)]} />
      <ModernHome />
    </>
  );
}
