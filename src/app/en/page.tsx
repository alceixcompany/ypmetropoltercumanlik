import Link from 'next/link';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import HtmlLang from '@/components/en/HtmlLang';
import EnglishContactBox from '@/components/en/EnglishContactBox';
import { englishHome, englishPages } from '@/lib/en-pages';
import { createSeoMetadata, localBusinessJsonLd } from '@/lib/seo';
import { getRequestSiteConfig } from '@/lib/server-seo';

const languages = ['English', 'Arabic', 'Russian', 'Persian', 'German', 'French', 'Spanish', 'Italian', 'Chinese', 'Japanese', 'Korean', 'Azerbaijani', 'Uzbek', 'Hebrew', 'Hindi', 'Portuguese', 'Dutch', 'Polish', 'Greek', 'Serbian'];

export async function generateMetadata() {
  const site = await getRequestSiteConfig();
  return createSeoMetadata({
    title: englishHome.title,
    description: englishHome.description,
    path: '/en',
    keywords: ['translation office istanbul', 'translator istanbul', 'sworn translator istanbul', 'english translation office turkey'],
    site,
    locale: 'en',
    alternateLanguages: { 'tr-TR': '/' },
  });
}

export default async function EnglishHome() {
  const site = await getRequestSiteConfig();
  return (
    <main lang="en" className="page-flow min-h-screen">
      <HtmlLang lang="en" />
      <JsonLd data={[{ ...localBusinessJsonLd(site), knowsLanguage: languages, description: englishHome.description }]} />
      <PageHero eyebrow="TRANSLATION OFFICE · ISTANBUL" title={englishHome.h1} description={englishHome.description} image="/yp-metropol/home/hero-office-v2.webp" imageAlt="YP Metropol translation office in Mecidiyeköy, Istanbul" />

      <section className="lale-light-section py-20 sm:py-24">
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 sm:px-7 lg:grid-cols-[1fr_0.72fr] lg:px-10">
          <div>
            <p className="text-lg leading-8 text-[var(--dream-text)]">{englishHome.intro}</p>
            <ul className="mt-8 space-y-3">
              {['Office in Mecidiyeköy, Şişli – next to the M2/M7 metro and metrobus', 'Sworn translators registered with Turkish notaries', 'Notarization and apostille guidance', 'Documents accepted online via WhatsApp and e-mail'].map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-[var(--dream-text)]">
                  <FiCheckCircle className="mt-1 h-5 w-5 shrink-0 text-[var(--lale-gold)]" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <EnglishContactBox site={site} topic="a translation" />
        </div>
      </section>

      <section className="lale-light-section pb-20">
        <div className="relative mx-auto max-w-6xl px-5 sm:px-7 lg:px-10">
          <h2 className="font-serif text-3xl text-[var(--dream-dark)] sm:text-4xl">Our services for foreigners and companies</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {englishPages.map((page) => (
              <Link key={page.slug} href={`/en/${page.slug}`} className="group rounded-[18px] border border-[rgba(195,149,58,0.16)] bg-white/88 p-6 shadow-[0_16px_45px_rgba(17,17,17,0.06)] transition hover:-translate-y-1 hover:border-[rgba(195,149,58,0.36)]">
                <h3 className="font-serif text-xl text-[var(--dream-dark)]">{page.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--dream-text)]">{page.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--lale-gold)]">Learn more <FiArrowRight className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="lale-light-section pb-24">
        <div className="relative mx-auto max-w-6xl px-5 sm:px-7 lg:px-10">
          <h2 className="font-serif text-3xl text-[var(--dream-dark)]">Languages</h2>
          <p className="mt-4 text-base leading-8 text-[var(--dream-text)]">We translate between Turkish and {languages.slice(0, -1).join(', ')} and {languages[languages.length - 1]}, as well as between many other language pairs on request.</p>
          <p className="mt-6 text-sm text-[var(--dream-text)]">Türkçe: <Link href="/" hrefLang="tr" className="text-[var(--lale-gold)] underline">ana sayfa</Link></p>
        </div>
      </section>
    </main>
  );
}
