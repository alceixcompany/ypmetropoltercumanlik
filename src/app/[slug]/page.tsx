import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowRight, FiCheckCircle, FiMessageCircle } from 'react-icons/fi';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import { getLandingPage, landingPages } from '@/lib/landing-pages';
import { absoluteUrl, breadcrumbJsonLd, createSeoMetadata } from '@/lib/seo';
import { getRequestSiteConfig } from '@/lib/server-seo';
import { englishAlternateForTrPath } from '@/lib/en-pages';

type Props = { params: Promise<{ slug: string }> };

// Arama sonuçlarında tıklanma oranını artırmak için öncelikli sayfalara özel başlıklar
const seoTitles: Record<string, string> = {
  'noter-onayli-tercume': 'Noter Onaylı Tercüme Mecidiyeköy – Online Belge, Hızlı Teklif',
  'yeminli-tercume': 'Yeminli Tercüme Bürosu Şişli Mecidiyeköy – 20+ Dil',
  'mecidiyekoy-tercume': 'Mecidiyeköy Tercüme Bürosu – Yeminli & Noter Onaylı Tercüme',
  'sisli-tercume-burosu': 'Şişli Tercüme Bürosu – Yeminli ve Noter Onaylı Tercüme',
  'pasaport-tercumesi': 'Noter Onaylı Pasaport Tercümesi – Aynı Gün Teslim İmkânı',
  'apostil-onayi': 'Apostil Onayı Nasıl Alınır? Belge ve Tercüme Süreci',
  'ingilizce-tercume': 'İngilizce Yeminli Tercüme – Noter Onaylı, Hızlı Teslim',
  'arapca-tercume': 'Arapça Yeminli Tercüme – Noter Onaylı Belge Çevirisi',
  'rusca-tercume': 'Rusça Yeminli Tercüme – Noter Onaylı Belge Çevirisi',
  'almanca-tercume': 'Almanca Yeminli Tercüme – Vize ve Resmî Belgeler',
  'yabanci-evlilik': 'Yabancı Evlilik İşlemleri – Belge Tercümesi ve Tercüman',
  'vize-evraklari-tercumesi': 'Vize Evrakları Tercümesi – Randevu Tarihine Göre Teslim',
};

export function generateStaticParams() {
  return landingPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  const site = await getRequestSiteConfig();

  if (!page) return {};

  return createSeoMetadata({
    title: seoTitles[page.slug] ?? page.title,
    description: page.description,
    path: `/${page.slug}`,
    image: page.image,
    keywords: [...page.keywords],
    type: page.kind === 'guide' ? 'article' : 'website',
    publishedTime: page.publishedAt,
    site,
    alternateLanguages: englishAlternateForTrPath[`/${page.slug}`] ? { en: englishAlternateForTrPath[`/${page.slug}`] } : undefined,
  });
}

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  const site = await getRequestSiteConfig();
  const path = `/${page.slug}`;
  const structuredData = [
    breadcrumbJsonLd([
      { name: 'Ana Sayfa', path: '/' },
      { name: page.title, path },
    ], site),
    page.kind === 'guide'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: page.title,
          description: page.description,
          image: absoluteUrl(page.image, site),
          datePublished: page.publishedAt,
          dateModified: page.publishedAt,
          author: { '@type': 'Organization', name: site.name },
          publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: absoluteUrl(site.logo, site) } },
          mainEntityOfPage: absoluteUrl(path, site),
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: page.title,
          description: page.description,
          url: absoluteUrl(path, site),
          provider: { '@type': 'ProfessionalService', name: site.name, url: site.url },
          areaServed: site.areaServed,
        },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ];

  return (
    <main className="page-flow min-h-screen">
      <JsonLd data={structuredData} />
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        image={page.image}
        imageAlt={page.imageAlt}
      />

      <section className="lale-light-section py-20 sm:py-24">
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 sm:px-7 lg:grid-cols-[1fr_0.72fr] lg:px-10">
          <div>
            <div className="lale-kicker">YP METROPOL TERCÜME</div>
            <h2 className="mt-6 font-serif text-3xl leading-tight text-[var(--dream-dark)] sm:text-4xl">
              {page.kind === 'guide' ? 'Doğru belge, doğru sıra, güvenli süreç' : `${page.title} hizmet kapsamı`}
            </h2>
            <p className="mt-6 text-base leading-8 text-[var(--dream-text)]">{page.intro}</p>
          </div>

          <aside className="rounded-[20px] border border-[rgba(195,149,58,0.18)] bg-white/88 p-7 shadow-[0_18px_50px_rgba(17,17,17,0.07)]">
            <h3 className="font-serif text-2xl text-[var(--dream-dark)]">Öne çıkanlar</h3>
            <div className="mt-6 space-y-4">
              {page.highlights.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm leading-6 text-[var(--dream-text)]">
                  <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--lale-gold)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Link href="/iletisim" className="lale-gold-button mt-8 gap-3">
              Ücretsiz Teklif Al <FiArrowRight />
            </Link>
          </aside>
        </div>
      </section>

      <section className="lale-light-section pb-20 sm:pb-24">
        <div className="relative mx-auto max-w-6xl px-5 sm:px-7 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2">
            {page.sections.map((section, index) => (
              <article
                key={section.title}
                className={`rounded-[20px] border border-[rgba(195,149,58,0.16)] bg-white/86 p-6 shadow-[0_18px_50px_rgba(17,17,17,0.06)] sm:p-8 ${index === 0 && page.kind === 'guide' ? 'lg:col-span-2' : ''}`}
              >
                <span className="text-xs font-semibold tracking-[0.18em] text-[var(--lale-gold)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-3 font-serif text-2xl leading-tight text-[var(--dream-dark)] sm:text-3xl">{section.title}</h2>
                <div className="mt-5 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-7 text-[var(--dream-text)] sm:text-base sm:leading-8">{paragraph}</p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-6 grid gap-3">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[var(--dream-text)]">
                        <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--lale-gold)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lale-light-section pb-20 sm:pb-24">
        <div className="relative mx-auto max-w-4xl px-5 sm:px-7 lg:px-10">
          <div className="text-center">
            <div className="lale-kicker">SIK SORULAN SORULAR</div>
            <h2 className="mt-6 font-serif text-3xl text-[var(--dream-dark)] sm:text-4xl">{page.title} hakkında merak edilenler</h2>
          </div>
          <div className="mt-10 space-y-4">
            {page.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-[18px] border border-[rgba(195,149,58,0.18)] bg-white/88 p-5 shadow-[0_12px_34px_rgba(17,17,17,0.05)] open:border-[rgba(195,149,58,0.42)] sm:p-6">
                <summary className="cursor-pointer list-none pr-6 text-base font-medium text-[var(--dream-dark)] marker:hidden">
                  {faq.question}
                </summary>
                <p className="mt-4 border-t border-[rgba(195,149,58,0.12)] pt-4 text-sm leading-7 text-[var(--dream-text)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#17130f] py-16 text-white sm:py-20">
        <div className="absolute inset-0 opacity-20">
          <Image src="/yp-metropol/translation.webp" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 text-center sm:px-7">
          <FiMessageCircle className="h-8 w-8 text-[#e1bd78]" />
          <h2 className="mt-5 font-serif text-3xl sm:text-4xl">Belgenizi gönderin, süreci birlikte planlayalım</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">Belge türü, hedef dil ve teslim beklentinizi paylaşın; gerekli tercüme ve onay adımlarını inceleyip size net bilgi verelim.</p>
          <Link href="/iletisim" className="lale-gold-button mt-7 gap-3">İletişime Geçin <FiArrowRight /></Link>
        </div>
      </section>
    </main>
  );
}
