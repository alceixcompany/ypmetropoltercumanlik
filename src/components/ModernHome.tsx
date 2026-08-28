'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiCheck,
  FiChevronRight,
  FiClock,
  FiFileText,
  FiGlobe,
  FiMapPin,
  FiMessageCircle,
  FiSend,
  FiShield,
} from 'react-icons/fi';
import News from '@/components/News';
import { siteConfig } from '@/lib/seo';

const services = [
  {
    number: '01',
    title: 'Yeminli Tercüme',
    description: 'Resmî kurumlarda kullanılacak belgeler için imzalı ve kontrollü çeviri.',
    href: '/hizmetlerimiz/yeminli-tercume',
    icon: FiShield,
    image: '/yp-metropol/home/document-review-v2.webp',
  },
  {
    number: '02',
    title: 'Noter Onaylı Tercüme',
    description: 'Belgenizin kullanım amacına göre noter sürecine uygun hazırlık.',
    href: '/hizmetlerimiz/noter-onayli-tercume',
    icon: FiFileText,
    image: '/yp-metropol/home/legal-review-v2.webp',
  },
  {
    number: '03',
    title: 'Hukuki Tercüme',
    description: 'Sözleşme, vekâletname ve mahkeme evraklarında terminoloji hassasiyeti.',
    href: '/hizmetlerimiz/hukuki-tercume',
    icon: FiCheck,
    image: '/yp-metropol/home/legal-review-v2.webp',
  },
  {
    number: '04',
    title: 'Teknik Tercüme',
    description: 'Kılavuz, şartname ve proje dosyalarında alan uzmanlığı ve tutarlılık.',
    href: '/hizmetlerimiz/teknik-tercume',
    icon: FiGlobe,
    image: '/yp-metropol/home/technical-review-v2.webp',
  },
  {
    number: '05',
    title: 'Sözlü Tercüme',
    description: 'Toplantı, noter, fuar ve etkinliklerde ardıl veya simultane destek.',
    href: '/hizmetlerimiz/sozlu-tercume',
    icon: FiMessageCircle,
    image: '/yp-metropol/home/interpreting-meeting-v2.webp',
  },
  {
    number: '06',
    title: 'Web Sitesi Lokalizasyonu',
    description: 'Dijital içerikler için hedef pazara ve arama diline uyarlanmış çeviri.',
    href: '/hizmetlerimiz/web-site-tercume',
    icon: FiSend,
    image: '/yp-metropol/home/hero-office-v2.webp',
  },
] as const;

const languages = [
  ['🇬🇧', 'İngilizce'],
  ['🇩🇪', 'Almanca'],
  ['🇫🇷', 'Fransızca'],
  ['🇸🇦', 'Arapça'],
  ['🇷🇺', 'Rusça'],
  ['🇨🇳', 'Çince'],
  ['🇪🇸', 'İspanyolca'],
  ['🇮🇹', 'İtalyanca'],
  ['🇦🇿', 'Azerice'],
  ['🇯🇵', 'Japonca'],
] as const;

const processSteps = [
  { step: '01', title: 'Belgenizi iletin', text: 'PDF veya okunaklı fotoğrafı WhatsApp ya da e-posta üzerinden paylaşın.' },
  { step: '02', title: 'İhtiyaç netleşsin', text: 'Hedef dil, uzmanlık alanı, noter ve apostil gereksinimi birlikte değerlendirilsin.' },
  { step: '03', title: 'Tercüme ve kontrol', text: 'Belgeniz uygun tercümana yönlendirilsin, terminoloji ve biçim kontrolü yapılsın.' },
  { step: '04', title: 'Planlı teslim', text: 'Çalışmanız kararlaştırılan formatta ve teslim kanalında size ulaştırılsın.' },
] as const;

const faqs = [
  ['Tercüme fiyatı nasıl belirlenir?', 'Ücret; kaynak ve hedef dil, belge uzunluğu, uzmanlık alanı, teslim süresi ve noter/apostil ihtiyacına göre belirlenir. Belgeyi ilettiğinizde net teklif paylaşılır.'],
  ['Belgeyi online gönderebilir miyim?', 'Evet. Belgenizin okunaklı fotoğrafını veya PDF dosyasını WhatsApp ve e-posta üzerinden ileterek süreci ofise gelmeden başlatabilirsiniz.'],
  ['Yeminli tercüme ile noter onayı aynı şey mi?', 'Hayır. Yeminli tercüme, yeminli tercümanın imza ve kaşesini taşır. Noter onayı ise tercümanın imzasının noter tarafından tasdik edilmesidir.'],
  ['Acil tercüme hizmetiniz var mı?', 'Belgenin dili, uzunluğu ve mevcut iş planına göre acil teslim seçeneği sunulabilir. Kesin süre belge incelendikten sonra paylaşılır.'],
] as const;

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, ease: 'easeOut' as const },
};

export default function ModernHome() {
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp.replace('+', '')}`;

  return (
    <main className="overflow-hidden bg-[#f5f1e8] text-[#171614]">
      <section className="relative min-h-[680px] overflow-hidden bg-[#24211d] pt-20 text-white sm:min-h-[760px] lg:min-h-[820px]">
        <motion.div
          initial={{ scale: 1.055 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/yp-metropol/home/hero-office-v2.webp"
            alt="YP Metropol uzman tercüman belge incelemesi"
            fill
            priority
            className="object-cover object-[62%_center] sm:object-[60%_center]"
            sizes="100vw"
          />
        </motion.div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,14,12,0.78)_0%,rgba(15,14,12,0.50)_38%,rgba(15,14,12,0.08)_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,14,12,0.18)_0%,transparent_38%,rgba(15,14,12,0.38)_100%)]" />

        <div className="relative mx-auto flex min-h-[600px] max-w-7xl items-end px-5 pb-14 sm:min-h-[680px] sm:px-7 sm:pb-20 lg:min-h-[740px] lg:px-10 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e1bd78]">YP Metropol Tercüme · İstanbul</p>
            <h1 className="mt-5 font-serif text-[48px] font-normal leading-[1.02] tracking-[-0.035em] text-white sm:text-[68px] lg:text-[82px]">
              Her dilde,<br />güvenilir tercüme.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/78 sm:text-lg">
              Yeminli, noter onaylı, yazılı ve sözlü tercüme hizmetleri.
            </p>
            <Link href="/iletisim" className="group mt-8 inline-flex items-center gap-3 border-b border-white/55 pb-2 text-sm font-semibold text-white transition hover:border-[#e1bd78] hover:text-[#e1bd78]">
              Belgeniz için teklif alın
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#171614]/8 bg-[#fcfaf5] py-7">
        <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <div className="mb-5 flex items-center justify-between gap-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9d762f]">Tercüme dilleri</p>
            <Link href="/dillerimiz" className="inline-flex items-center gap-2 text-xs font-semibold text-[#75684e] transition hover:text-[#9d762f]">Tüm diller <FiArrowRight /></Link>
          </div>
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#fcfaf5] to-transparent sm:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#fcfaf5] to-transparent sm:w-20" />
            <div className="flex w-max animate-[yp-marquee_28s_linear_infinite] gap-3 py-1">
              {[...languages, ...languages].map(([flag, language], index) => (
                <span key={`${language}-${index}`} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#171614]/8 bg-white px-4 py-2.5 text-sm text-[#4e4941] shadow-sm">
                  <span aria-hidden="true">{flag}</span>{language}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute right-[-12rem] top-12 h-[30rem] w-[30rem] rounded-full border border-[#c9973b]/12" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <motion.div {...reveal} className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#a87522]">Uzmanlık alanlarımız</p>
              <h2 className="mt-5 font-serif text-4xl leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-6xl">Belgenize uygun<br />uzmanlık, tek noktada.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#69635b] lg:justify-self-end">Resmî evraktan teknik dokümana, toplantı tercümesinden dijital lokalizasyona kadar her projeyi içeriğin alanına göre planlıyoruz.</p>
          </motion.div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  {...reveal}
                  transition={{ duration: 0.6, delay: index * 0.06, ease: 'easeOut' }}
                  className="group relative min-h-[430px] overflow-hidden rounded-[28px] border border-white/15 bg-[#171614] text-white shadow-[0_24px_70px_rgba(23,22,20,0.13)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(23,22,20,0.20)]"
                >
                  <Image src={service.image} alt={`${service.title} hizmeti`} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,22,20,0.06)_14%,rgba(23,22,20,0.30)_48%,rgba(23,22,20,0.96)_100%)]" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                  <div className="relative flex min-h-[430px] flex-col p-7">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/25 bg-[#171614]/55 text-[#e0b45f] shadow-lg backdrop-blur"><Icon className="h-5 w-5" /></div>
                      <span className="font-serif text-2xl text-white/48">{service.number}</span>
                    </div>
                    <div className="mt-auto pr-12">
                      <h3 className="font-serif text-3xl leading-tight">{service.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/64">{service.description}</p>
                    </div>
                  </div>
                  <Link href={service.href} aria-label={`${service.title} detayları`} className="absolute inset-0 z-10"><span className="sr-only">{service.title} detayları</span></Link>
                  <span className="pointer-events-none absolute bottom-7 right-7 z-[2] flex h-11 w-11 items-center justify-center rounded-full bg-[#d5aa56] text-[#171614] transition duration-300 group-hover:-rotate-12"><FiArrowRight /></span>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-9 text-center">
            <Link href="/hizmetlerimiz" className="inline-flex items-center gap-3 text-sm font-semibold text-[#8e6422] transition hover:gap-5">Tüm hizmetleri inceleyin <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="bg-[#171614] py-24 text-white sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-7 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:px-10">
          <motion.div {...reveal} className="relative">
            <div className="relative min-h-[560px] overflow-hidden rounded-[30px] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
              <Image src="/yp-metropol/home/document-review-v2.webp" alt="Tercüme kalite kontrolünde belge karşılaştırması" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171614]/46 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-3 max-w-[250px] rounded-[22px] border border-white/12 bg-[#d3a247] p-6 text-[#171614] shadow-2xl sm:-right-6">
              <FiClock className="h-6 w-6" />
              <p className="mt-4 font-serif text-2xl">Süre baştan net.</p>
              <p className="mt-2 text-sm leading-6 text-[#171614]/68">Belge incelendikten sonra teslim planı ve onay ihtiyacı birlikte paylaşılır.</p>
            </div>
          </motion.div>

          <div>
            <motion.div {...reveal}>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#d5aa56]">Nasıl çalışıyoruz?</p>
              <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl">Karmaşık belge süreçlerini sadeleştiriyoruz.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/57">Dosyanızın hangi tercümana gideceğinden nasıl teslim edileceğine kadar her aşamayı görünür ve kontrollü tutuyoruz.</p>
            </motion.div>

            <div className="mt-11">
              {processSteps.map((item, index) => (
                <motion.div key={item.step} {...reveal} transition={{ duration: 0.55, delay: index * 0.07, ease: 'easeOut' }} className="grid grid-cols-[48px_1fr] gap-5 border-t border-white/10 py-6 last:border-b">
                  <span className="font-serif text-xl text-[#d5aa56]">{item.step}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/50">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fcfaf5] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
            <motion.div {...reveal}>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#a87522]">Neden YP Metropol?</p>
              <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-[-0.035em] sm:text-5xl">Tercümeden fazlası:<br />doğru süreç yönetimi.</h2>
              <p className="mt-6 max-w-md text-base leading-8 text-[#6b655d]">Mecidiyeköy’deki ofisimiz ve online belge akışımızla bireysel ve kurumsal taleplere hızlıca cevap veriyoruz.</p>
              <div className="mt-9 flex items-start gap-4 rounded-[20px] border border-[#171614]/8 bg-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#171614] text-[#d5aa56]"><FiMapPin /></div>
                <div><p className="font-semibold">Merkez ofis</p><p className="mt-1 text-sm leading-6 text-[#6b655d]">{siteConfig.address.display}</p></div>
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Alan uzmanlığı', 'Belgeniz hukuk, tıp, teknik veya akademik alanına uygun tercümana yönlendirilir.'],
                ['Gizlilik', 'Kişisel ve kurumsal belgeler yalnızca ilgili çalışma ekibiyle paylaşılır.'],
                ['Kalite kontrol', 'Terminoloji, isim, tarih, sayı ve biçim ayrıntıları teslim öncesinde kontrol edilir.'],
                ['Esnek teslim', 'Dijital teslim, ofisten teslim ve onay süreçleri ihtiyaca göre planlanır.'],
              ].map(([title, text], index) => (
                <motion.article key={title} {...reveal} transition={{ duration: 0.55, delay: index * 0.06, ease: 'easeOut' }} className="rounded-[24px] border border-[#171614]/8 bg-white p-7 shadow-[0_18px_48px_rgba(23,22,20,0.05)]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#efe4cf] text-[#9a6a1d]"><FiCheck /></span>
                  <h3 className="mt-7 font-serif text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6b655d]">{text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <News />

      <section className="bg-[#f5f1e8] py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-5 sm:px-7 lg:px-10">
          <motion.div {...reveal} className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#a87522]">Sık sorulan sorular</p>
            <h2 className="mt-5 font-serif text-4xl tracking-[-0.035em] sm:text-5xl">Başlamadan önce merak ettikleriniz.</h2>
          </motion.div>
          <div className="mt-12 divide-y divide-[#171614]/10 border-y border-[#171614]/10">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-left text-lg font-semibold marker:hidden sm:text-xl">
                  {question}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#171614]/10 transition group-open:rotate-90 group-open:bg-[#171614] group-open:text-white"><FiChevronRight /></span>
                </summary>
                <p className="max-w-3xl pb-7 pr-14 text-sm leading-8 text-[#69635b] sm:text-base">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e8] px-5 pb-24 sm:px-7 sm:pb-32 lg:px-10">
        <motion.div {...reveal} className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#c9983d] px-6 py-14 text-[#171614] shadow-[0_30px_90px_rgba(99,72,22,0.18)] sm:px-10 lg:px-16 lg:py-16">
          <div className="pointer-events-none absolute -right-12 -top-28 h-80 w-80 rounded-full border border-[#171614]/12" />
          <div className="pointer-events-none absolute -right-3 -top-14 h-52 w-52 rounded-full border border-[#171614]/12" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em]">Belgeniz hazırsa başlayalım</p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] tracking-[-0.035em] sm:text-5xl">Belgenizi gönderin, süreci birlikte netleştirelim.</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#171614] px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1"><FiMessageCircle /> WhatsApp</a>
              <Link href="/iletisim" className="inline-flex items-center justify-center gap-3 rounded-full border border-[#171614]/18 bg-white/38 px-7 py-4 text-sm font-semibold transition hover:-translate-y-1 hover:bg-white/60">İletişim formu <FiArrowRight /></Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
