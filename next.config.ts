import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 92],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  // SEO: kalıcı (301/308) yönlendirmeler
  async redirects() {
    const r = (source: string, destination: string) => ({ source, destination, permanent: true });
    return [
      // Aynı siteyi gösteren ek domainler → ana domain (kopya içerik önlenir)
      {
        source: '/:path*',
        has: [{ type: 'host' as const, value: '(?:www\\.)?(?:tercumeofisi\\.net\\.tr|konsoloslukonaylari\\.com|noteronaylitercume\\.net|yeminlitercume\\.net\\.tr|apostilislemleri\\.net|ypmetropoltercumanlik\\.vercel\\.app)' }],
        destination: 'https://ypmetropoltercume.com/:path*',
        permanent: true,
      },

      // Çakışan alt dizin sayfaları → tek kanonik kök sayfa
      r('/hizmetlerimiz/:slug', '/:slug'),
      r('/dillerimiz/:slug', '/:slug'),
      r('/hizmet-dillerimiz/:slug', '/:slug'),
      r('/hizmet-bolgelerimiz/sisli', '/sisli-tercume-burosu'),
      r('/hizmet-bolgelerimiz/:slug', '/:slug-tercume'),

      // Eski WordPress hizmet adresleri
      r('/mecidiyekoy-tercume-hizmetleri/sozlu-tercume-hizmeti', '/sozlu-tercume'),
      r('/mecidiyekoy-tercume-hizmetleri/yeminli-tercume-hizmeti', '/yeminli-tercume'),
      r('/mecidiyekoy-tercume-hizmetleri/yabanci-evlilik-hizmeti', '/yabanci-evlilik'),
      r('/mecidiyekoy-tercume-hizmetleri/kurumsal-tercume-hizmeti', '/kurumsal-tercume'),
      r('/mecidiyekoy-tercume-hizmetleri/akademik-tercume-hizmeti', '/akademik-tercume'),
      r('/mecidiyekoy-tercume-hizmetleri/noter-onayli-tercume-hizmeti', '/noter-onayli-tercume'),
      r('/mecidiyekoy-tercume-hizmetleri/:path*', '/hizmetlerimiz'),
      r('/noter-onayli-tercume-hizmeti', '/noter-onayli-tercume'),
      r('/tercume-hizmetleri', '/hizmetlerimiz'),

      // Eski WordPress blog yazıları → en yakın güncel sayfa
      r('/desifre-hizmetinde-verimliligi-artirmanin-6-profesyonel-yontemi', '/desifre'),
      r('/hukuki-tercumede-mutlaka-bilinmesi-gereken-7-temel-kural', '/hukuki-tercume'),
      r('/yapay-zeka-caginda-insan-tercumanlarin-degerini-gosteren-7-gercek', '/haberler/yapay-zeka-caginda-insan-tercumanin-rolu'),
      r('/finansal-tercume-belgelerinin-hatasiz-olmasi-icin-8-uzman-onerisi', '/ekonomi-ve-finans-tercume'),
      r('/redaksiyon-surecinde-ceviri-kalitesini-yuzde-100-artirmanin-9-yolu', '/redaksiyon'),
      r('/simultane-tercumede-kusursuz-performans-icin-7-profesyonel-tavsiye', '/simultane-tercume'),
      r('/toplantilarda-profesyonel-ardil-tercume-icin-5-altin-kural', '/ardil-tercume'),
      r('/web-site-tercumesinde-seoyu-guclendiren-7-akilli-adim', '/web-site-tercume'),
      r('/acil-tercume-hizmetlerinde-hiz-ve-kaliteyi-dengede-tutmanin-7-yolu', '/acil-tercume'),

      // WordPress arşiv / feed / sistem adresleri
      r('/category/:path*', '/haberler'),
      r('/author/:path*', '/haberler'),
      r('/tag/:path*', '/haberler'),
      r('/page/:num', '/haberler'),
      r('/feed', '/haberler'),
      r('/comments/feed', '/haberler'),
      r('/:slug/feed', '/:slug'),
      r('/pages', '/'),
      r('/cerez-politikasi', '/iletisim'),
    ];
  },
  // iframe'ler için güvenlik ayarları
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://www.google.com https://maps.google.com https://*.google.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
