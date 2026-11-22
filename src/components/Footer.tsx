'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FiInstagram, FiMail, FiMapPin, FiMessageCircle, FiPhone } from 'react-icons/fi';
import { siteConfig } from '@/lib/seo';
import { useLanguage } from '@/components/LanguageProvider';

const pageLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/hizmetlerimiz', label: 'Hizmetlerimiz' },
  { href: '/dillerimiz', label: 'Dillerimiz' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/iletisim', label: 'İletişim' },
] as const;

const footerServices = [
  { label: 'Pasaport Tercümesi', href: '/pasaport-tercumesi' },
  { label: 'Yeminli Tercüme', href: '/yeminli-tercume' },
  { label: 'Noter Onaylı Tercüme', href: '/noter-onayli-tercume' },
  { label: 'Diploma Tercümesi', href: '/diploma-transkript-tercumesi' },
  { label: 'Vize Evrakları', href: '/vize-evraklari-tercumesi' },
  { label: 'Hukuki Tercüme', href: '/hukuki-tercume' },
  { label: 'Arapça Tercüme', href: '/arapca-tercume' },
  { label: 'İngilizce Tercüme', href: '/ingilizce-tercume' },
  { label: 'Rusça Tercüme', href: '/rusca-tercume' },
  { label: 'Almanca Tercüme', href: '/almanca-tercume' },
  { label: 'Fransızca Tercüme', href: '/fransizca-tercume' },
  { label: 'Apostil Süreci', href: '/apostil-onayi' },
];

const footerAreas = [
  { label: 'Mecidiyeköy', href: '/mecidiyekoy-tercume' },
  { label: 'Şişli', href: '/sisli-tercume-burosu' },
  { label: 'Gayrettepe', href: '/gayrettepe-tercume' },
  { label: 'Levent', href: '/levent-tercume' },
  { label: 'Maslak', href: '/maslak-tercume' },
  { label: 'Çağlayan', href: '/caglayan-tercume' },
  { label: 'Fulya', href: '/fulya-tercume' },
  { label: 'Nişantaşı', href: '/nisantasi-tercume' },
  { label: 'Taksim', href: '/taksim-tercume' },
  { label: 'Beşiktaş', href: '/besiktas-tercume' },
  { label: 'Kağıthane', href: '/kagithane-tercume' },
  { label: 'Etiler', href: '/etiler-tercume' },
];

const Footer = () => {
  const pathname = usePathname();
  const { t } = useLanguage();
  const isAdminPage = pathname?.startsWith('/admin') || false;

  if (isAdminPage) {
    return null;
  }

  return (
    <footer className="lale-light-section text-[var(--dream-dark)]">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="border-t border-[rgba(223,167,69,0.18)] py-16">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.78fr_1.22fr_1fr] lg:gap-12">
            <div>
              <Link href="/" className="inline-flex items-center">
                <Image src={siteConfig.logo} alt={siteConfig.name} width={64} height={64} className="h-14 w-14 rounded-sm object-contain" />
                <span className="ml-3">
                  <strong className="block text-sm tracking-[0.08em]">YP METROPOL</strong>
                  <span className="text-[11px] tracking-[0.18em] text-[var(--lale-gold)]">TERCÜME</span>
                </span>
              </Link>
              <p className="mt-6 max-w-sm text-sm leading-7 text-[var(--dream-text)]">
                {t('Pasaport, vize, ikamet, diploma, sözleşme ve resmi evraklar için hızlı, dikkatli ve kabul odaklı tercüme hizmeti sunuyoruz.')}
              </p>

              <div className="mt-6 flex items-center gap-3">
                {siteConfig.instagram && (
                  <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(223,167,69,0.24)] bg-white/88 text-[var(--lale-gold)] transition-colors hover:bg-[rgba(223,167,69,0.10)]" title="Instagram">
                    <FiInstagram className="h-4 w-4" />
                  </a>
                )}
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(223,167,69,0.24)] bg-white/88 text-[var(--lale-gold)] transition-colors hover:bg-[rgba(223,167,69,0.10)]"
                  title="WhatsApp"
                >
                  <FiMessageCircle className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(223,167,69,0.24)] bg-white/88 text-[var(--lale-gold)] transition-colors hover:bg-[rgba(223,167,69,0.10)]"
                  title="E-posta"
                >
                  <FiMail className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-[var(--lale-gold)]">{t('Sayfalar')}</h3>
              <ul className="mt-5 space-y-3 text-sm text-[var(--dream-text)]">
                {pageLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-[var(--lale-gold)]">
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-[var(--lale-gold)]">{t('Hizmetler')}</h3>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-[var(--dream-text)]">
                {footerServices.map((service) => (
                  <li key={service.href}>
                    <Link href={service.href} className="transition-colors hover:text-[var(--lale-gold)]">{t(service.label)}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-[var(--lale-gold)]">{t('İletişim')}</h3>
              <ul className="mt-5 space-y-4 text-sm text-[var(--dream-text)]">
                <li className="flex items-start gap-3">
                  <FiMapPin className="mt-1 h-4 w-4 text-[var(--lale-gold)]" />
                  <span>{siteConfig.address.display}</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiPhone className="h-4 w-4 text-[var(--lale-gold)]" />
                  <a href={`tel:${siteConfig.phone}`} className="transition-colors hover:text-[var(--lale-gold)]">
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FiMessageCircle className="h-4 w-4 text-[var(--lale-gold)]" />
                  <a href={`https://wa.me/${siteConfig.whatsapp.replace('+', '')}`} className="transition-colors hover:text-[var(--lale-gold)]">
                    {siteConfig.whatsappDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FiMail className="h-4 w-4 text-[var(--lale-gold)]" />
                  <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-[var(--lale-gold)]">
                    {siteConfig.email}
                  </a>
                </li>
                {siteConfig.instagram && (
                  <li className="flex items-center gap-3">
                    <FiInstagram className="h-4 w-4 text-[var(--lale-gold)]" />
                    <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--lale-gold)]">{siteConfig.instagramHandle}</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(223,167,69,0.18)] py-6">
          <nav aria-label="Hizmet bölgeleri" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[var(--dream-text)] md:justify-start">
            <span className="font-semibold text-[var(--lale-gold)]">Hizmet bölgeleri:</span>
            {footerAreas.map((area) => (
              <Link key={area.href} href={area.href} className="transition-colors hover:text-[var(--lale-gold)]">{area.label} Tercüme</Link>
            ))}
            <Link href="/hizmet-bolgelerimiz" className="transition-colors hover:text-[var(--lale-gold)]">Tüm bölgeler</Link>
            <Link href="/en" hrefLang="en" className="transition-colors hover:text-[var(--lale-gold)]">English</Link>
          </nav>
        </div>

        <div className="border-t border-[rgba(223,167,69,0.18)] py-6">
          <div className="flex flex-col gap-3 text-center text-sm text-[var(--dream-text)] md:flex-row md:items-center md:justify-between md:text-left">
            <p>
              © 2026 <span className="font-medium text-[var(--lale-gold)]">YP Metropol Tercüme</span>. {t('Tüm hakları saklıdır.')}
            </p>

            <div className="flex items-center justify-center gap-5 md:justify-end">
              <a
                href="https://www.alceix.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--lale-gold)]"
              >
                {t('Hakları Alceix tarafından saklıdır')}
              </a>
              <Link href="/hakkimizda" className="transition-colors hover:text-[var(--lale-gold)]">
                {t('Gizlilik Politikası')}
              </Link>
              <Link href="/iletisim" className="transition-colors hover:text-[var(--lale-gold)]">
                {t('İletişim')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
