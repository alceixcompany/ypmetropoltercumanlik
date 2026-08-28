import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import PageHero from '@/components/PageHero';
import { createSeoMetadata } from '@/lib/seo';
import { getRequestSiteConfig } from '@/lib/server-seo';
import { getTranslationService, translationServices } from '@/lib/translation-services';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return translationServices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getTranslationService(slug);
  const site = await getRequestSiteConfig();

  if (!service) {
    return createSeoMetadata({
      title: 'Hizmet Bulunamadı',
      description: `${site.name} hizmet detayı bulunamadı.`,
      path: '/hizmetlerimiz',
      site,
    });
  }

  return createSeoMetadata({
    title: `${site.locationName} ${service.title}`,
    description: `${site.locationName} ${service.title.toLocaleLowerCase('tr-TR')}: ${service.description}`,
    path: `/hizmetlerimiz/${slug}`,
    image: service.image,
    keywords: [service.title.toLocaleLowerCase('tr-TR'), `${site.locationName.toLocaleLowerCase('tr-TR')} ${service.title.toLocaleLowerCase('tr-TR')}`],
    site,
  });
}

const ServiceDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  const service = getTranslationService(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="page-flow min-h-screen">
      <PageHero
        eyebrow="YP Metropol Hizmeti"
        title={service.title}
        description={service.description}
        image={service.image}
        imageAlt={service.title}
      />

      <section className="lale-light-section py-24 sm:py-28">
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 sm:px-7 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
          <div className="relative min-h-[420px] overflow-hidden rounded-[18px] border border-[rgba(195,149,58,0.18)] bg-white shadow-[0_24px_70px_rgba(17,17,17,0.10)]">
            <Image src={service.image} alt={service.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
          </div>

          <div className="self-center">
            <div className="lale-kicker">SÜREÇ</div>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-[var(--dream-dark)]">
              Belgeniz için net, hızlı ve kontrollü tercüme akışı
            </h2>
            <p className="mt-5 text-sm leading-8 text-[var(--dream-text)] sm:text-base">
              Belgenizi WhatsApp veya e-posta ile ilettiğinizde evrak türü, hedef dil,
              onay ihtiyacı ve teslim beklentisi birlikte değerlendirilir.
            </p>

            <div className="mt-8 space-y-4">
              {service.highlights.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-[14px] border border-[rgba(195,149,58,0.16)] bg-white/80 px-4 py-4">
                  <FiCheckCircle className="h-5 w-5 shrink-0 text-[var(--lale-gold)]" />
                  <span className="text-sm text-[var(--dream-dark)]">{point}</span>
                </div>
              ))}
            </div>

            <Link href="/iletisim" className="lale-gold-button mt-8 gap-3">
              Teklif Al
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetailPage;
