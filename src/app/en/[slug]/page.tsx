import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import HtmlLang from '@/components/en/HtmlLang';
import EnglishContactBox from '@/components/en/EnglishContactBox';
import { englishPages, getEnglishPage } from '@/lib/en-pages';
import { absoluteUrl, breadcrumbJsonLd, createSeoMetadata } from '@/lib/seo';
import { getRequestSiteConfig } from '@/lib/server-seo';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return englishPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = getEnglishPage(slug);
  const site = await getRequestSiteConfig();
  if (!page) return {};
  return createSeoMetadata({
    title: `${page.title} | YP Metropol Translation`,
    description: page.description,
    path: `/en/${page.slug}`,
    image: page.image,
    keywords: [...page.keywords],
    site,
    locale: 'en',
    alternateLanguages: page.trPath ? { 'tr-TR': page.trPath } : undefined,
  });
}

export default async function EnglishLandingPage({ params }: Props) {
  const { slug } = await params;
  const page = getEnglishPage(slug);
  if (!page) notFound();
  const site = await getRequestSiteConfig();
  const path = `/en/${page.slug}`;

  const jsonLd = [
    breadcrumbJsonLd([{ name: 'Home', path: '/en' }, { name: page.title, path }], site),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.title,
      description: page.description,
      url: absoluteUrl(path, site),
      inLanguage: 'en',
      areaServed: { '@type': 'City', name: 'Istanbul' },
      provider: { '@type': 'ProfessionalService', '@id': `${site.url}/#business`, name: site.name, url: site.url, telephone: site.phone },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    },
  ];

  const others = englishPages.filter((p) => p.slug !== page.slug);

  return (
    <main lang="en" className="page-flow min-h-screen">
      <HtmlLang lang="en" />
      <JsonLd data={jsonLd} />
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} image={page.image} imageAlt={page.title} />

      <section className="lale-light-section py-20 sm:py-24">
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 sm:px-7 lg:grid-cols-[1fr_0.72fr] lg:px-10">
          <div>
            <div className="lale-kicker">YP METROPOL TRANSLATION · ISTANBUL</div>
            <p className="mt-6 text-lg leading-8 text-[var(--dream-text)]">{page.intro}</p>
            <ul className="mt-8 space-y-3">
              {page.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-[var(--dream-text)]">
                  <FiCheckCircle className="mt-1 h-5 w-5 shrink-0 text-[var(--lale-gold)]" /> {item}
                </li>
              ))}
            </ul>
            {page.trPath && (
              <p className="mt-8 text-sm text-[var(--dream-text)]">
                Türkçe: <Link href={page.trPath} hrefLang="tr" className="text-[var(--lale-gold)] underline">bu sayfanın Türkçe sürümü</Link>
              </p>
            )}
          </div>
          <EnglishContactBox site={site} topic={page.title.toLowerCase()} />
        </div>
      </section>

      <section className="lale-light-section pb-20 sm:pb-24">
        <div className="relative mx-auto grid max-w-6xl gap-6 px-5 sm:px-7 lg:grid-cols-2 lg:px-10">
          {page.sections.map((section) => (
            <article key={section.title} className="rounded-[20px] border border-[rgba(195,149,58,0.16)] bg-white/86 p-6 shadow-[0_18px_50px_rgba(17,17,17,0.06)] sm:p-8">
              <h2 className="font-serif text-2xl leading-tight text-[var(--dream-dark)] sm:text-3xl">{section.title}</h2>
              <div className="mt-5 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-[var(--dream-text)] sm:text-base sm:leading-8">{paragraph}</p>
                ))}
              </div>
              {section.bullets && (
                <ul className="mt-6 grid gap-3">
                  {section.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[var(--dream-text)]">
                      <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--lale-gold)]" /> {item}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="lale-light-section pb-20 sm:pb-24">
        <div className="relative mx-auto max-w-4xl px-5 sm:px-7 lg:px-10">
          <h2 className="text-center font-serif text-3xl text-[var(--dream-dark)] sm:text-4xl">Frequently asked questions</h2>
          <div className="mt-10 space-y-4">
            {page.faqs.map((faq) => (
              <details key={faq.question} className="rounded-[18px] border border-[rgba(195,149,58,0.18)] bg-white/88 p-5 sm:p-6">
                <summary className="cursor-pointer list-none text-base font-medium text-[var(--dream-dark)]">{faq.question}</summary>
                <p className="mt-4 border-t border-[rgba(195,149,58,0.12)] pt-4 text-sm leading-7 text-[var(--dream-text)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="lale-light-section pb-24">
        <div className="relative mx-auto max-w-6xl px-5 sm:px-7 lg:px-10">
          <h2 className="font-serif text-2xl text-[var(--dream-dark)]">More services for foreigners in Istanbul</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <Link key={other.slug} href={`/en/${other.slug}`} className="group flex items-center justify-between rounded-[16px] border border-[rgba(195,149,58,0.16)] bg-white/88 p-5 text-sm font-medium text-[var(--dream-dark)] hover:border-[rgba(195,149,58,0.4)]">
                {other.title} <FiArrowRight className="text-[var(--lale-gold)] transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
