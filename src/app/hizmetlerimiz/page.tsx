import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCheck, FiFileText, FiGlobe, FiShield } from 'react-icons/fi';
import JsonLd from '@/components/JsonLd';
import { absoluteUrl, createSeoMetadata } from '@/lib/seo';
import { getRequestSiteConfig } from '@/lib/server-seo';
import { translationServices } from '@/lib/translation-services';

export async function generateMetadata() {
  const site = await getRequestSiteConfig();

  return createSeoMetadata({
    title: `${site.locationName} Tercüme Hizmetleri`,
    description:
      `${site.name} pasaport, yeminli tercüme, noter onaylı tercüme, diploma, vize evrakı ve hukuki belge tercümesi hizmetleri.`,
    path: '/hizmetlerimiz',
    image: '/yp-metropol/home/legal-review-v2.webp',
    keywords: ['pasaport tercumesi', 'noter onayli tercume', 'yeminli tercume', `${site.locationName.toLocaleLowerCase('tr-TR')} tercume hizmetleri`],
    site,
  });
}

const serviceIcons = [FiGlobe, FiShield, FiFileText] as const;

const getServiceImage = (slug: string) => {
  if (['ardil-tercume', 'simultane-tercume', 'sozlu-tercume'].includes(slug)) {
    return '/yp-metropol/home/interpreting-meeting-v2.webp';
  }

  if (['teknik-tercume', 'patent-tercume'].includes(slug)) {
    return '/yp-metropol/home/technical-review-v2.webp';
  }

  if (['web-site-tercume', 'kurumsal-tercume'].includes(slug)) {
    return '/yp-metropol/home/hero-office-v2.webp';
  }

  if (['hukuki-tercume', 'noter-onayli-tercume', 'yeminli-tercume', 'apostil-onayi', 'pasaport-tercumesi', 'diploma-transkript-tercumesi', 'vize-evraklari-tercumesi'].includes(slug)) {
    return '/yp-metropol/home/legal-review-v2.webp';
  }

  return '/yp-metropol/home/document-review-v2.webp';
};

const services = translationServices.map((service, index) => ({
  ...service,
  icon: serviceIcons[index % serviceIcons.length],
  image: getServiceImage(service.slug),
}));

const ServicesPage = async () => {
  const activeSite = await getRequestSiteConfig();
  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'YP Metropol Tercüme Hizmetleri',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        url: absoluteUrl(`/hizmetlerimiz/${service.slug}`, activeSite),
        image: absoluteUrl(service.image, activeSite),
        provider: {
          '@type': 'ProfessionalService',
          name: activeSite.name,
          url: activeSite.url,
        },
        areaServed: activeSite.areaServed,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#f3efe7]">
      <JsonLd data={servicesJsonLd} />
      <section className="relative flex min-h-[580px] items-end overflow-hidden bg-[#1c1916] pt-20 text-white sm:min-h-[640px]">
        <Image
          src="/yp-metropol/home/legal-review-v2.webp"
          alt="YP Metropol profesyonel tercüme ve belge kontrol hizmetleri"
          fill
          priority
          className="object-cover object-[58%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,14,12,0.86)_0%,rgba(16,14,12,0.66)_38%,rgba(16,14,12,0.18)_72%,rgba(16,14,12,0.08)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 sm:px-7 sm:pb-20 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e1bd78]">Profesyonel tercüme hizmetleri</p>
            <h1 className="mt-5 max-w-[11ch] font-serif text-[48px] font-normal leading-[1.02] tracking-[-0.035em] sm:text-[64px] lg:text-[76px]">
              Her belgeye uygun uzmanlık.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/78 sm:text-lg">
              Resmî belgelerden teknik dokümanlara, yazılı çeviriden sözlü tercümeye kadar ihtiyacınıza uygun profesyonel destek.
            </p>
            <Link href="/iletisim" className="group mt-8 inline-flex items-center gap-3 border-b border-white/55 pb-2 text-sm font-semibold transition hover:border-[#e1bd78] hover:text-[#e1bd78]">
              Belgenizi gönderin, teklif alın
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <div className="grid gap-7 border-b border-[#171614]/12 pb-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#916924]">Hizmetlerimiz</p>
              <h2 className="mt-4 max-w-xl font-serif text-4xl leading-[1.08] tracking-[-0.025em] text-[#171614] sm:text-5xl">
                İhtiyacınıza göre planlanan çözümler
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#69635b] lg:justify-self-end">
              Belgenizin kullanım amacı, hedef dili ve varsa noter ya da apostil ihtiyacı değerlendirilir; uygun tercüman ve teslim planı başlangıçta belirlenir.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <article key={service.slug} className="group flex min-h-full flex-col overflow-hidden rounded-[18px] border border-[#171614]/10 bg-[#fbfaf7] shadow-[0_16px_45px_rgba(23,22,20,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#a77a2e]/35 hover:shadow-[0_22px_55px_rgba(23,22,20,0.10)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#d9d2c7]">
                    <Image src={service.image} alt={`${service.title} hizmeti`} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/32 via-transparent to-transparent" />
                    <span className="absolute bottom-4 right-5 font-serif text-3xl text-white/90">{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-center gap-3 text-[#976d27]">
                      <Icon className="h-4 w-4" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">YP Metropol</span>
                    </div>

                    <h3 className="mt-4 font-serif text-[27px] leading-tight text-[#201e1a]">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#6b655d]">{service.description}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.highlights.map((highlight) => (
                        <span key={highlight} className="inline-flex items-center gap-1.5 rounded-full border border-[#171614]/8 bg-white px-3 py-1.5 text-[11px] text-[#5d574f]">
                          <FiCheck className="h-3 w-3 text-[#9b712b]" />
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <Link href={`/hizmetlerimiz/${service.slug}`} className="mt-7 flex items-center justify-between border-t border-[#171614]/10 pt-5 text-sm font-semibold text-[#292722] transition group-hover:text-[#916924]">
                      Hizmeti inceleyin
                      <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
