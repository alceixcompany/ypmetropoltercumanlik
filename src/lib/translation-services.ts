export type TranslationService = {
  slug: string;
  title: string;
  description: string;
  highlights: readonly string[];
  image: string;
};

const documentImage = '/beyvip/legal.png';
const globalImage = '/beyvip/passport.png';
const officeImage = '/beyvip/about.png';

export const translationServices: readonly TranslationService[] = [
  { slug: 'acil-tercume', title: 'Acil Tercüme', description: 'Zaman kritik belge ve metinler için öncelikli planlama ve hızlı teslim.', highlights: ['Öncelikli iş akışı', 'Net teslim süresi', 'Kalite kontrol'], image: globalImage },
  { slug: 'ardil-tercume', title: 'Ardıl Tercüme', description: 'Toplantı, görüşme ve saha çalışmalarında profesyonel sözlü tercüman desteği.', highlights: ['İş görüşmeleri', 'Resmî işlemler', 'Yerinde destek'], image: officeImage },
  { slug: 'akademik-tercume', title: 'Akademik Tercüme', description: 'Makale, tez, bildiri ve araştırma metinlerinde alan terminolojisine uygun çeviri.', highlights: ['Makale ve tez', 'Akademik terminoloji', 'Redaksiyon'], image: documentImage },
  { slug: 'desifre', title: 'Deşifre', description: 'Ses ve video kayıtlarının düzenli, okunabilir ve zaman kodlu metne dönüştürülmesi.', highlights: ['Ses kayıtları', 'Video kayıtları', 'Zaman kodu'], image: officeImage },
  { slug: 'ekonomi-ve-finans-tercume', title: 'Ekonomi ve Finans Tercümesi', description: 'Finansal rapor, bilanço, yatırım ve bankacılık belgelerinde uzman çeviri.', highlights: ['Finansal raporlar', 'Bilanço ve tablolar', 'Terminoloji kontrolü'], image: documentImage },
  { slug: 'hukuki-tercume', title: 'Hukuki Tercüme', description: 'Sözleşme, vekâletname, mahkeme ve şirket evraklarında titiz terminoloji.', highlights: ['Sözleşmeler', 'Vekâletnameler', 'Mahkeme evrakları'], image: documentImage },
  { slug: 'noter-onayli-tercume', title: 'Noter Onaylı Tercüme', description: 'Noter onayı gerektiren belgelerde doğru hazırlık ve süreç yönlendirmesi.', highlights: ['Noter uygunluğu', 'Onay süreci', 'Eksiksiz dosya'], image: documentImage },
  { slug: 'redaksiyon', title: 'Redaksiyon', description: 'Çevrilmiş veya özgün metinlerin dil, anlam, üslup ve terminoloji denetimi.', highlights: ['Dil kontrolü', 'Anlam bütünlüğü', 'Yayın kalitesi'], image: officeImage },
  { slug: 'simultane-tercume', title: 'Simultane Tercüme', description: 'Konferans, seminer ve canlı etkinliklerde eş zamanlı profesyonel tercüme.', highlights: ['Konferanslar', 'Canlı etkinlikler', 'Ekipman desteği'], image: officeImage },
  { slug: 'sozlu-tercume', title: 'Sözlü Tercüme', description: 'Toplantı, noter, fuar ve bire bir görüşmelerde akıcı iletişim desteği.', highlights: ['Toplantılar', 'Noter işlemleri', 'Fuar ve saha'], image: officeImage },
  { slug: 'teknik-tercume', title: 'Teknik Tercüme', description: 'Mühendislik, üretim, enerji, inşaat ve bilişim belgelerinde uzman çeviri.', highlights: ['Teknik kılavuzlar', 'Proje dosyaları', 'Sektör terminolojisi'], image: documentImage },
  { slug: 'tibbi-tercume', title: 'Tıbbi Tercüme', description: 'Sağlık raporu, klinik belge ve medikal içeriklerde hassas ve gizli çeviri.', highlights: ['Sağlık raporları', 'Klinik belgeler', 'Veri gizliliği'], image: documentImage },
  { slug: 'yazili-tercume', title: 'Yazılı Tercüme', description: 'Bireysel ve kurumsal metinlerde amaca uygun, kontrollü yazılı çeviri.', highlights: ['Belge analizi', 'Uzman eşleştirme', 'Son kontrol'], image: documentImage },
  { slug: 'yeminli-tercume', title: 'Yeminli Tercüme', description: 'Resmî kurumlarda kullanılacak belgeler için yeminli tercüman imzalı çeviri.', highlights: ['Resmî format', 'İmzalı teslim', 'Belge kontrolü'], image: documentImage },
  { slug: 'kurumsal-tercume', title: 'Kurumsal Tercüme', description: 'Şirket yazışmaları, raporlar, sunumlar ve sürekli projeler için kurumsal destek.', highlights: ['Marka dili', 'Terminoloji yönetimi', 'Sürekli destek'], image: officeImage },
  { slug: 'web-site-tercume', title: 'Web Sitesi Tercümesi', description: 'Web sitesi ve dijital içeriklerin hedef pazara uygun çeviri ve lokalizasyonu.', highlights: ['SEO uyumlu içerik', 'Lokalizasyon', 'Dijital yayın'], image: globalImage },
  { slug: 'apostil-onayi', title: 'Apostil Onayı', description: 'Yurt dışında kullanılacak resmî belgeler için apostil süreci yönlendirmesi.', highlights: ['Belge kontrolü', 'Onay yönlendirmesi', 'Yurt dışı kullanım'], image: documentImage },
  { slug: 'patent-tercume', title: 'Patent Tercümesi', description: 'Patent başvurusu, tarifname ve teknik istemlerde terminoloji odaklı çeviri.', highlights: ['Patent tarifnamesi', 'Teknik istemler', 'Terminoloji tutarlılığı'], image: documentImage },
  { slug: 'pasaport-tercumesi', title: 'Pasaport Tercümesi', description: 'Vize, ikamet, seyahat ve resmî başvuru süreçleri için pasaport çevirisi.', highlights: ['Vize başvuruları', 'İkamet işlemleri', 'Hızlı teslim'], image: globalImage },
  { slug: 'diploma-transkript-tercumesi', title: 'Diploma ve Transkript Tercümesi', description: 'Eğitim, denklik, iş ve yurt dışı başvuruları için akademik belge çevirileri.', highlights: ['Akademik belgeler', 'Denklik dosyası', 'Başvuru formatı'], image: officeImage },
  { slug: 'vize-evraklari-tercumesi', title: 'Vize Evrakları Tercümesi', description: 'Konsolosluk dosyaları için nüfus, banka, iş ve destek evrakı çevirileri.', highlights: ['Konsolosluk dosyası', 'Başvuru evrakları', 'Kontrollü teslim'], image: globalImage },
];

export function getTranslationService(slug: string) {
  return translationServices.find((service) => service.slug === slug);
}
