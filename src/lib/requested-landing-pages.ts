import type { LandingFaq, LandingPage, LandingSection } from '@/lib/landing-pages';

const languageFaqs = (language: string): readonly LandingFaq[] => [
  {
    question: `${language} tercüme ücreti nasıl hesaplanır?`,
    answer: 'Fiyat; metnin uzunluğu, uzmanlık alanı, dosya biçimi, teslim süresi ve yeminli veya noter onaylı nüsha ihtiyacına göre belge incelendikten sonra belirlenir.',
  },
  {
    question: 'Belgeyi online gönderebilir miyim?',
    answer: 'Evet. Okunaklı fotoğraf veya PDF dosyasını WhatsApp ya da e-posta üzerinden göndererek süre ve fiyat bilgisi alabilirsiniz.',
  },
  {
    question: 'Noter onayı veya apostil gerekir mi?',
    answer: 'Gerekli onay, belgeyi kabul edecek kurumun ve kullanılacağı ülkenin şartlarına bağlıdır. İşlemden önce kabul makamının güncel talebi doğrulanmalıdır.',
  },
];

type LanguageConfig = {
  slug: string;
  language: string;
  country: string;
  intro: string;
  specialistNote: string;
  highlights: readonly string[];
  keywords: readonly string[];
};

function createLanguagePage(config: LanguageConfig): LandingPage {
  const { slug, language, country, intro, specialistNote, highlights, keywords } = config;
  return {
    slug,
    kind: 'language',
    eyebrow: 'TERCÜME DİLİ',
    title: `${language} Tercüme`,
    description: `${language}-Türkçe ve Türkçe-${language} yazılı, yeminli, noter onaylı, sözlü ve kurumsal tercüme hizmetleri.`,
    intro,
    image: '/yp-metropol/home/interpreting-meeting-v2.webp',
    imageAlt: `${language} Türkçe profesyonel tercüme hizmeti`,
    highlights,
    keywords,
    sections: [
      {
        title: `Mecidiyeköy’de profesyonel ${language} tercüme`,
        paragraphs: [
          `YP Metropol Tercüme, ${language}-Türkçe ve Türkçe-${language} yönlerinde bireysel ve kurumsal çeviri desteği sunar. Dosya; konusu, hedef kitlesi ve kullanılacağı kurum dikkate alınarak uygun tercümana yönlendirilir.`,
          'Belgelerinizi ofisimize elden bırakabilir veya ön inceleme için WhatsApp ve e-posta üzerinden iletebilirsiniz.',
        ],
        bullets: ['Yazılı ve yeminli tercüme', 'Noter onayı ve apostil süreç desteği', 'Online belge gönderimi', 'Teslim öncesi redaksiyon'],
      },
      {
        title: `${language} tercüme neden uzmanlık gerektirir?`,
        paragraphs: [specialistNote, 'Doğru kelime karşılığının yanında metnin amacı, hedef kitlesi, terminolojisi ve resmî biçimi de korunmalıdır.'],
      },
      {
        title: 'Hukuki, akademik ve teknik belgeler',
        paragraphs: [
          `Sözleşme, vekâletname, mahkeme evrakı, diploma, transkript, makale, kullanım kılavuzu ve teknik raporlar ${language} terminolojisine ve ilgili alana hâkim tercümanlarla hazırlanır.`,
          'İsim, tarih, sayı, mühür, tablo ve belge düzeni teslimden önce kaynak metinle karşılaştırılır.',
        ],
        bullets: ['Sözleşme ve şirket evrakları', 'Diploma ve akademik metinler', 'Teknik dokümanlar', 'Sağlık raporları'],
      },
      {
        title: `Yeminli ${language} tercüme ve resmî kullanım`,
        paragraphs: [
          `Pasaport, nüfus kaydı, diploma, sabıka kaydı, doğum veya evlilik belgesi Türkiye’de ya da ${country} sınırları içinde resmî bir kuruma sunulacaksa yeminli tercüman imzası, noter tasdiki veya apostil istenebilir.`,
          'Onay türü kabul makamından teyit edildikten sonra tercüme ve tasdik sırası birlikte planlanır.',
        ],
      },
      {
        title: 'Sözlü ve kurumsal tercüme',
        paragraphs: [
          `İş görüşmesi, noter işlemi, fuar, toplantı ve saha ziyareti için ${language} sözlü tercüman desteği sağlanabilir.`,
          'Web sitesi, katalog, sunum ve kurumsal içeriklerde terim birliği korunarak hedef kitleye uygun lokalizasyon yapılır.',
        ],
      },
    ],
    faqs: languageFaqs(language),
  };
}

type ServiceConfig = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  image: string;
  highlights: readonly string[];
  scope: readonly string[];
  expertise: string;
  keywords: readonly string[];
  extra?: readonly LandingSection[];
  faqs?: readonly LandingFaq[];
};

function createServicePage(config: ServiceConfig): LandingPage {
  return {
    slug: config.slug,
    kind: 'service',
    eyebrow: 'PROFESYONEL TERCÜME',
    title: config.title,
    description: config.description,
    intro: config.intro,
    image: config.image,
    imageAlt: `${config.title} profesyonel hizmeti`,
    highlights: config.highlights,
    keywords: config.keywords,
    sections: [
      {
        title: `${config.title} hizmet kapsamı`,
        paragraphs: [config.intro, 'Her dosya kullanım amacı, hedef kitle, uzmanlık alanı ve teslim beklentisi yönünden incelenerek uygun iş akışına alınır.'],
        bullets: config.scope,
      },
      {
        title: 'Uzmanlık ve kalite kontrol',
        paragraphs: [config.expertise, 'Çeviri veya düzenleme tamamlandığında anlam, terminoloji, isim, sayı, tarih ve biçim kontrolleri uygulanır.'],
      },
      {
        title: 'Süreç nasıl ilerler?',
        paragraphs: ['Dosyanızı ve beklentinizi iletmenizden sonra kapsam belirlenir, uygun uzman görevlendirilir ve teslim planı paylaşılır. Süreç boyunca gerekli sorular tek iletişim noktası üzerinden yönetilir.'],
        bullets: ['Dosya ve ihtiyaç analizi', 'Uzman eşleştirme', 'Üretim ve ara kontrol', 'Son okuma ve teslim'],
      },
      ...(config.extra ?? []),
      {
        title: 'Teslim süresi ve fiyatlandırma',
        paragraphs: ['Süre ve ücret; dosyanın uzunluğu, teknik yoğunluğu, kaynak ve hedef dil, teslim biçimi ile varsa onay ihtiyacına göre belirlenir. Okunaklı dosyayı gönderdiğinizde net teklif hazırlanır.'],
      },
    ],
    faqs: config.faqs ?? [
      { question: `${config.title} için nasıl teklif alabilirim?`, answer: 'Dosyayı WhatsApp veya e-posta ile gönderip hedef dili, kullanım amacını ve teslim tarihinizi belirtmeniz yeterlidir.' },
      { question: 'Acil teslim mümkün mü?', answer: 'Dosyanın uzunluğu, dili ve uzmanlık alanı incelendikten sonra mümkün olan en hızlı ve güvenli teslim planı paylaşılır.' },
      { question: 'Kurumsal ve düzenli projeler kabul ediliyor mu?', answer: 'Evet. Düzenli projelerde terminoloji listesi, teslim takvimi ve kalite standardı oluşturularak süreklilik sağlanabilir.' },
    ],
  };
}

type LocationConfig = { slug: string; name: string; nearby: string; local?: LandingSection; title?: string; description?: string };

function createLocationPage({ slug, name, nearby, local, title, description }: LocationConfig): LandingPage {
  return {
    slug,
    kind: 'location',
    eyebrow: 'HİZMET BÖLGESİ',
    title: title ?? `${name} Tercüme Bürosu`,
    description: description ?? `${name} ve çevresinde yeminli, noter onaylı, hukuki, akademik, teknik ve sözlü tercüme hizmetleri.`,
    intro: `Mecidiyeköy merkezli YP Metropol Tercüme, ${name} ve çevresindeki bireysel ve kurumsal müşterilere ofiste ve online belge kabulüyle profesyonel destek sunar.`,
    image: '/yp-metropol/home/hero-office-v2.webp',
    imageAlt: `${name} tercüme bürosu ve profesyonel çeviri hizmeti`,
    highlights: [`${name} bölgesine yakın merkezi ofis`, 'Online ön inceleme ve teklif', 'Yeminli ve noter onaylı tercüme'],
    keywords: [`${name.toLocaleLowerCase('tr-TR')} tercume`, `${name.toLocaleLowerCase('tr-TR')} tercume burosu`, `${name.toLocaleLowerCase('tr-TR')} yeminli tercuman`],
    sections: [
      {
        title: `${name} yeminli ve noter onaylı tercüme`,
        paragraphs: ['Pasaport, diploma, nüfus kaydı, vekâletname ve diğer resmî belgeler alanına uygun yeminli tercümanla hazırlanır. Kurum talebine göre noter tasdiki ve apostil adımları planlanır.'],
        bullets: ['Yeminli tercüme', 'Noter tasdikli tercüme', 'Apostil yönlendirmesi', 'Konsolosluk ve başvuru belgeleri'],
      },
      ...(local ? [local] : []),
      {
        title: `${name} ve yakın çevresine hizmet`,
        paragraphs: [`${name}, ${nearby} çevresindeki kişi, şirket, hukuk bürosu, eğitim ve sağlık kuruluşları için yazılı ve sözlü tercüme desteği sağlanır.`, 'Belgenin aslının gerekmediği ön inceleme ve teklif aşamaları tamamen online yürütülebilir.'],
      },
      {
        title: 'Uzmanlık gerektiren tercüme projeleri',
        paragraphs: ['Hukuki, akademik, teknik, tıbbi ve finansal dosyalar ilgili alanın terminolojisine hâkim tercümanlara yönlendirilir.'],
        bullets: ['Sözleşme ve mahkeme evrakları', 'Diploma ve akademik belgeler', 'Teknik rapor ve kılavuzlar', 'Sağlık ve finans belgeleri', 'Toplantı ve noter işlemlerinde sözlü tercüme'],
      },
      {
        title: 'Ofise gelmeden teklif alın',
        paragraphs: ['Belgenizin okunaklı fotoğrafını veya PDF dosyasını WhatsApp ya da e-posta ile gönderin. Dil, alan, teslim tarihi ve onay ihtiyacı incelendikten sonra kapsam ve fiyat bilgisi paylaşılır.'],
      },
    ],
    faqs: [
      { question: `${name} bölgesinden nasıl belge gönderebilirim?`, answer: 'Belgenizi WhatsApp veya e-posta üzerinden ön incelemeye gönderebilir, gerekiyorsa aslını Mecidiyeköy’deki ofisimize teslim edebilirsiniz.' },
      { question: 'Aynı gün tercüme yapılabilir mi?', answer: 'Belgenin dili, uzunluğu, alanı ve onay ihtiyacına göre aynı gün teslim mümkün olabilir. Kesin süre incelemeden sonra bildirilir.' },
      { question: 'Kurumsal projelerde düzenli destek veriliyor mu?', answer: 'Evet. Tekrarlayan projeler için terminoloji birliği, dosya planı ve teslim takvimi oluşturulabilir.' },
    ],
  };
}

type GuideConfig = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  highlights: readonly string[];
  keywords: readonly string[];
  items: readonly { title: string; text: string }[];
  faqs: readonly LandingFaq[];
};

function createGuidePage(config: GuideConfig): LandingPage {
  const sections: readonly LandingSection[] = config.items.map((item, index) => ({
    title: `${index + 1}. ${item.title}`,
    paragraphs: [item.text],
  }));
  return {
    slug: config.slug,
    kind: 'guide',
    eyebrow: 'TERCÜME REHBERİ',
    title: config.title,
    description: config.description,
    intro: config.intro,
    image: '/yp-metropol/blog-hero-v2.webp',
    imageAlt: `${config.title} rehberi`,
    highlights: config.highlights,
    keywords: config.keywords,
    publishedAt: '2026-09-08',
    sections,
    faqs: config.faqs,
  };
}

const languagePages: readonly LandingPage[] = [
  createLanguagePage({ slug: 'portekizce-tercume', language: 'Portekizce', country: 'Portekiz ve Brezilya', intro: 'Portekiz ve Brezilya varyantları arasındaki kelime, yazım ve kullanım farkları hedef ülkeye göre değerlendirilir.', specialistNote: 'Avrupa ve Brezilya Portekizcesi telaffuzun yanında kelime seçimi, dil bilgisi ve resmiyet düzeyinde de ayrılır. Metin hedef pazara göre yerelleştirilmelidir.', highlights: ['Portekiz ve Brezilya varyantları', 'Hukuki ve ticari terminoloji', 'Yeminli ve noter onaylı tercüme'], keywords: ['portekizce tercume', 'portekizce yeminli tercuman', 'brezilya portekizcesi tercume'] }),
  createLanguagePage({ slug: 'ozbekce-tercume', language: 'Özbekçe', country: 'Özbekistan', intro: 'Özbekçe belgelerde Latin ve Kiril alfabeleri ile resmî terminoloji kullanım amacına göre birlikte değerlendirilir.', specialistNote: 'Özbekçede Latin ve Kiril yazı sistemleriyle hazırlanmış belgeler görülebilir. Özel adların aktarımı ve resmî kurum terimleri belge boyunca tutarlı tutulmalıdır.', highlights: ['Latin ve Kiril alfabesi', 'Resmî belge tercümesi', 'Ticari ve sözlü tercüme'], keywords: ['ozbekce tercume', 'ozbekce yeminli tercuman', 'turkce ozbekce ceviri'] }),
  createLanguagePage({ slug: 'sirpca-tercume', language: 'Sırpça', country: 'Sırbistan', intro: 'Sırpça çevirilerde Kiril ve Latin alfabeleri, bölgesel kullanım ve resmî belge formatı dikkate alınır.', specialistNote: 'Sırpça hem Kiril hem Latin alfabesiyle yazılır. Hedef kurumun tercih ettiği alfabe ve Balkan dilleri arasındaki yakın fakat farklı terminoloji baştan belirlenmelidir.', highlights: ['Kiril ve Latin alfabesi', 'Hukuki ve resmî belgeler', 'Yeminli tercüme desteği'], keywords: ['sirpca tercume', 'sirpca yeminli tercuman', 'turkce sirpca ceviri'] }),
  createLanguagePage({ slug: 'rusca-tercume', language: 'Rusça', country: 'Rusya', intro: 'Rusça resmî, ticari, teknik ve akademik metinler alan terminolojisine ve hedef kurum formatına uygun hazırlanır.', specialistNote: 'Rusçanın çekim sistemi, teknik terimleri ve resmî yazışma kalıpları Türkçeden önemli ölçüde farklıdır. İsimlerin Kiril ve Latin alfabeleri arasındaki aktarımı ayrıca kontrol edilmelidir.', highlights: ['Kiril alfabesi ve isim kontrolü', 'Teknik ve ticari uzmanlık', 'Yeminli ve noter onaylı tercüme'], keywords: ['rusca tercume', 'rusca yeminli tercuman', 'rusca noter onayli tercume'] }),
  createLanguagePage({ slug: 'korece-tercume', language: 'Korece', country: 'Güney Kore', intro: 'Korece çeviride Hangul yazı sistemi, hitap düzeyleri ve kurumsal iletişim kültürü metnin amacıyla birlikte ele alınır.', specialistNote: 'Korecede cümle yapısı, saygı düzeyi ve bağlama bağlı anlatım Türkçeden farklı çalışır. Teknik ve kurumsal metinlerde yerleşik Korece karşılıkların kullanılması gerekir.', highlights: ['Hangul yazı sistemi', 'Teknik ve kurumsal içerik', 'Kültürel lokalizasyon'], keywords: ['korece tercume', 'korece yeminli tercuman', 'turkce korece ceviri'] }),
  createLanguagePage({ slug: 'almanca-tercume', language: 'Almanca', country: 'Almanya, Avusturya ve İsviçre', intro: 'Almanca belgeler hukuk, eğitim, sağlık, ticaret ve göç süreçlerinin terminolojisine uygun biçimde çevrilir.', specialistNote: 'Uzun birleşik kelimeler, resmî kurum dili ve Almanya, Avusturya ile İsviçre arasındaki kullanımlar bağlama göre değerlendirilmelidir.', highlights: ['Hukuki ve resmî belgeler', 'Eğitim ve göç dosyaları', 'Yeminli ve noter onaylı tercüme'], keywords: ['almanca tercume', 'almanca yeminli tercuman', 'almanca noter onayli tercume'] }),
  createLanguagePage({ slug: 'hintce-tercume', language: 'Hintçe', country: 'Hindistan', intro: 'Hintçe tercümede Devanagari yazısı, bölgesel dil etkileri ve hedef kitlenin kullanım alışkanlıkları dikkate alınır.', specialistNote: 'Hintçe, Devanagari alfabesiyle yazılır ve gündelik kullanımda farklı bölgesel dillerle etkileşim gösterir. Özel adlar ile resmî terimlerin aktarımı dikkatle yapılmalıdır.', highlights: ['Devanagari alfabesi', 'Ticari ve resmî içerik', 'Sözlü tercüman desteği'], keywords: ['hintce tercume', 'hintce yeminli tercuman', 'turkce hintce ceviri'] }),
  createLanguagePage({ slug: 'ingilizce-tercume', language: 'İngilizce', country: 'İngilizce konuşulan ülkeler', intro: 'İngilizce tercümeler hedef ülke, sektör ve kullanım amacına göre terminoloji ile üslup yönünden yerelleştirilir.', specialistNote: 'İngiliz ve Amerikan İngilizcesi başta olmak üzere farklı bölgelerde yazım, kelime seçimi ve resmî belge kalıpları değişebilir. Hedef ülke proje başında belirlenmelidir.', highlights: ['İngiliz ve Amerikan İngilizcesi', 'Tüm uzmanlık alanları', 'Yeminli, noter onaylı ve sözlü tercüme'], keywords: ['ingilizce tercume', 'ingilizce yeminli tercuman', 'ingilizce noter onayli tercume'] }),
  createLanguagePage({ slug: 'ibranice-tercume', language: 'İbranice', country: 'İsrail', intro: 'İbranice metinler sağdan sola yazı düzeni, resmî terminoloji ve bağlama dayalı anlam özellikleri korunarak hazırlanır.', specialistNote: 'İbranicede ünlü işaretlerinin çoğu metinde yazılmaması ve sağdan sola sayfa düzeni bağlama hâkimiyet gerektirir. Resmî ve teknik belgelerde terim seçimi ayrıca doğrulanmalıdır.', highlights: ['Sağdan sola belge düzeni', 'Resmî ve hukuki terminoloji', 'Yeminli tercüme desteği'], keywords: ['ibranice tercume', 'ibranice yeminli tercuman', 'turkce ibranice ceviri'] }),
  createLanguagePage({ slug: 'fransizca-tercume', language: 'Fransızca', country: 'Fransa, Belçika, İsviçre ve Kanada', intro: 'Fransızca belgeler; Fransa, Belçika, İsviçre, Kanada ve Kuzey Afrika’daki kullanım farkları ile hedef kurumun resmî dil kalıpları dikkate alınarak hazırlanır.', specialistNote: 'Fransızcada resmî yazışma dili, hukuki kalıplar ve ülkeye göre değişen terminoloji (örneğin Fransa ile Kanada arasındaki farklar) metnin amacına göre seçilmelidir.', highlights: ['Konsolosluk ve vize dosyaları', 'Hukuki ve akademik belgeler', 'Yeminli ve noter onaylı tercüme'], keywords: ['fransizca tercume', 'fransizca yeminli tercuman', 'fransizca noter onayli tercume'] }),
  createLanguagePage({ slug: 'lehce-tercume', language: 'Lehçe', country: 'Polonya', intro: 'Lehçe tercümelerde özel karakterler, çekim yapısı ve Polonya’daki resmî kurumların belge formatı birlikte değerlendirilir.', specialistNote: 'Lehçede isimlerin çekime göre değişmesi ve özel harflerin doğru yazımı belge tutarlılığı için kritiktir. Ticari ve resmî metinlerde yerleşik karşılıklar kullanılmalıdır.', highlights: ['Özel karakter ve isim kontrolü', 'Ticari ve resmî belgeler', 'Yeminli tercüme desteği'], keywords: ['lehce tercume', 'lehce yeminli tercuman', 'turkce lehce ceviri'] }),
  createLanguagePage({ slug: 'yunanca-tercume', language: 'Yunanca', country: 'Yunanistan ve Kıbrıs', intro: 'Yunanca belgeler Yunan alfabesiyle yazılmış isimlerin doğru aktarımı ve Yunanistan ile Kıbrıs’taki resmî kullanım dikkate alınarak çevrilir.', specialistNote: 'Yunan alfabesindeki isimlerin Latin harflerine aktarımı, kişinin diğer belgeleriyle tutarlı olmalıdır. Tapu, miras ve vatandaşlık belgelerinde eski terminoloji de görülebilir.', highlights: ['Yunan alfabesi ve isim aktarımı', 'Tapu ve miras belgeleri', 'Yeminli ve noter onaylı tercüme'], keywords: ['yunanca tercume', 'yunanca yeminli tercuman', 'yunanca noter onayli tercume'] }),
  createLanguagePage({ slug: 'cekce-tercume', language: 'Çekçe', country: 'Çekya', intro: 'Çekçe tercümelerde aksanlı harfler, isim çekimleri ve Çekya’daki kurumların belge biçimi kaynakla uyumlu şekilde korunur.', specialistNote: 'Çekçede aksanlı harflerin eksik yazılması isim ve adreslerde hataya yol açabilir. Teknik ve ticari metinlerde sektörde yerleşik Çekçe karşılıklar tercih edilmelidir.', highlights: ['Aksanlı harf ve isim kontrolü', 'Ticari ve teknik metinler', 'Yeminli tercüme desteği'], keywords: ['cekce tercume', 'cekce yeminli tercuman', 'turkce cekce ceviri'] }),
];

const servicePages: readonly LandingPage[] = [
  createServicePage({ slug: 'sozlu-tercume', title: 'Sözlü Tercüme', description: 'Toplantı, noter, fuar, sağlık görüşmesi ve saha çalışmalarında profesyonel sözlü tercüman desteği.', intro: 'Sözlü tercümede doğru anlam kadar konuşmanın tonu, amacı ve taraflar arasındaki iletişim akışı da korunur.', image: '/yp-metropol/interpreting.webp', highlights: ['Ardıl ve refakat tercümesi', 'Toplantı ve noter işlemleri', 'Alanına uygun tercüman'], scope: ['İş toplantıları ve müzakereler', 'Noter ve resmî kurum işlemleri', 'Fuar, saha ve fabrika ziyaretleri', 'Sağlık ve eğitim görüşmeleri'], expertise: 'Tercüman; dil çiftinin yanında toplantının konusu, sektör terminolojisi, gizlilik ihtiyacı ve çalışma ortamı dikkate alınarak seçilir.', keywords: ['sozlu tercume', 'sozlu tercuman', 'toplanti tercumani', 'noter tercumani'] }),
  createServicePage({ slug: 'redaksiyon', title: 'Redaksiyon', description: 'Çevrilmiş veya özgün metinlerde anlam, dil bilgisi, üslup, tutarlılık ve terminoloji kontrolü.', intro: 'Redaksiyon, metni yalnızca yazım hatalarından arındırmaz; anlatımın amaca ve hedef kitleye uygun, açık ve tutarlı olmasını sağlar.', image: '/yp-metropol/document.webp', highlights: ['Dil ve anlam kontrolü', 'Terminoloji tutarlılığı', 'Yayın öncesi son okuma'], scope: ['Çeviri kontrolü', 'Akademik ve kurumsal metinler', 'Web sitesi ve kataloglar', 'Rapor, sunum ve yayın içerikleri'], expertise: 'Editör kaynak metin varsa çeviriyle karşılaştırma yapar; anlam kayması, eksik ifade, ton, terim ve biçim sorunlarını birlikte değerlendirir.', keywords: ['redaksiyon', 'ceviri redaksiyonu', 'metin duzeltme', 'son okuma'] }),
  createServicePage({ slug: 'desifre', title: 'Deşifre', description: 'Ses ve video kayıtlarının eksiksiz, düzenli ve gerektiğinde zaman kodlu metne dönüştürülmesi.', intro: 'Deşifre hizmetinde konuşmalar kayıt amacına uygun biçimde çözümlenir; konuşmacılar, zaman kodları ve anlaşılmayan bölümler açıkça işaretlenir.', image: '/yp-metropol/transcription.webp', highlights: ['Ses ve video çözümleme', 'Konuşmacı ayrımı', 'Zaman kodlu teslim'], scope: ['Toplantı ve röportaj kayıtları', 'Duruşma ve ifade kayıtları', 'Akademik araştırma görüşmeleri', 'Altyazı öncesi metin hazırlığı'], expertise: 'Kayıt kalitesi, konuşmacı sayısı, aksan, arka plan sesi ve teknik terminoloji teslim süresini etkiler. Hassas kayıtlar gizlilik içinde işlenir.', keywords: ['desifre', 'ses kaydi desifre', 'video desifre', 'transkripsiyon hizmeti'] }),
  createServicePage({ slug: 'kurumsal-tercume', title: 'Kurumsal Tercüme', description: 'Şirketlerin düzenli belge, iletişim ve lokalizasyon ihtiyaçları için tutarlı ve ölçeklenebilir tercüme desteği.', intro: 'Kurumsal projelerde marka dili, sektör terminolojisi, gizlilik ve teslim takvimi tek bir sürdürülebilir iş akışı içinde yönetilir.', image: '/yp-metropol/translation.webp', highlights: ['Marka dili ve terim birliği', 'Düzenli proje yönetimi', 'Gizli ve kontrollü iş akışı'], scope: ['Sözleşme ve şirket belgeleri', 'Rapor, sunum ve yazışmalar', 'Web sitesi ve pazarlama içerikleri', 'Teknik doküman ve eğitim materyalleri'], expertise: 'Tekrarlayan projelerde müşteri terim listesi ve yazım tercihleri oluşturulur; yeni dosyalarda aynı dil standardı korunur.', keywords: ['kurumsal tercume', 'sirket tercume hizmeti', 'kurumsal ceviri', 'tercume proje yonetimi'] }),
  createServicePage({ slug: 'apostil-onayi', title: 'Apostil Onayı', description: 'Yurt dışında kullanılacak resmî belgelerde apostil gerekliliğinin ve doğru işlem sırasının planlanması.', intro: 'Apostil, bir resmî belgedeki imza ve makam bilgisinin anlaşmaya taraf başka bir ülkede tanınmasını kolaylaştıran tasdik yöntemidir.', image: '/yp-metropol/document.webp', highlights: ['Belge ve ülke kontrolü', 'Doğru tasdik sırası', 'Tercüme süreciyle koordinasyon'], scope: ['Doğum ve evlilik belgeleri', 'Diploma ve transkriptler', 'Adli sicil ve nüfus kayıtları', 'Noter belgeleri ve vekâletnameler'], expertise: 'Apostil ihtiyacı; belgenin düzenlendiği ve kullanılacağı ülkeye, belge türüne ve kabul makamına göre değişir. Güncel şartlar yetkili kurumdan doğrulanmalıdır.', keywords: ['apostil onayi', 'apostil islemleri', 'apostil tercume', 'yurt disi belge tasdiki'] }),
  createServicePage({ slug: 'yazili-tercume', title: 'Yazılı Tercüme', description: 'Bireysel ve kurumsal metinlerde uzmanlık alanına, hedef kitleye ve kullanım amacına uygun kontrollü çeviri.', intro: 'Yazılı tercümede içerik analizi, doğru uzmanla eşleştirme, terminoloji yönetimi ve son kontrol bir bütün olarak yürütülür.', image: '/yp-metropol/translation.webp', highlights: ['Uzman tercüman eşleştirmesi', 'Terminoloji ve biçim kontrolü', 'Dijital ve basılı teslim'], scope: ['Hukuki ve resmî belgeler', 'Akademik ve tıbbi metinler', 'Teknik ve finansal dokümanlar', 'Web sitesi ve kurumsal içerikler'], expertise: 'Belgenin alanına hâkim tercüman seçilir; çok sayfalı dosyalarda terim birliği ve sayfa düzeni proje boyunca korunur.', keywords: ['yazili tercume', 'profesyonel ceviri', 'belge tercumesi', 'kurumsal yazili tercume'] }),
  createServicePage({ slug: 'ekonomi-ve-finans-tercume', title: 'Ekonomi ve Finans Tercümesi', description: 'Finansal rapor, bilanço, yatırım, denetim ve bankacılık belgelerinde terminoloji odaklı profesyonel tercüme.', intro: 'Finans metinlerinde rakamsal bütünlük, dönem ve para birimi ifadeleri ile yerleşik muhasebe terminolojisi titizlikle korunur.', image: '/yp-metropol/document.webp', highlights: ['Finansal terminoloji', 'Rakam ve tablo kontrolü', 'Gizli dosya yönetimi'], scope: ['Faaliyet ve denetim raporları', 'Bilanço ve gelir tabloları', 'Yatırımcı sunumları', 'Banka ve sigorta belgeleri'], expertise: 'Finansal kavramların ülkelere göre farklılaşabilen karşılıkları bağlama göre seçilir; tablo, dipnot, yüzde ve para birimleri ayrıca kontrol edilir.', keywords: ['ekonomi tercume', 'finans tercume', 'bilanço tercumesi', 'finansal rapor cevirisi'] }),
  createServicePage({ slug: 'patent-tercume', title: 'Patent Tercümesi', description: 'Patent başvurusu, tarifname, istem ve teknik çizim açıklamalarında doğru ve tutarlı terminoloji.', intro: 'Patent metinlerinde teknik ayrıntı ile hukuki kapsam birlikte korunmalı; aynı kavram belge boyunca tek ve açık bir karşılıkla kullanılmalıdır.', image: '/yp-metropol/document.webp', highlights: ['Teknik ve hukuki uzmanlık', 'İstemlerde terim tutarlılığı', 'Başvuru formatına uygunluk'], scope: ['Patent tarifnameleri', 'İstemler ve özetler', 'Teknik çizim açıklamaları', 'Araştırma ve inceleme raporları'], expertise: 'Patent tercümanı buluşun teknik alanını ve başvuru dilini birlikte değerlendirir. Belirsiz veya değişken terim kullanımı istem kapsamını etkileyebileceğinden çapraz kontrol yapılır.', keywords: ['patent tercume', 'patent cevirisi', 'patent tarifnamesi tercumesi', 'teknik istem cevirisi'] }),
  createServicePage({ slug: 'akademik-tercume', title: 'Akademik Tercüme', description: 'Makale, tez, bildiri, burs ve üniversite başvurularında alan terminolojisine ve akademik üsluba uygun profesyonel tercüme.', intro: 'Akademik tercümede amaç, metni yalnızca başka bir dile aktarmak değil; hedef dergi, üniversite veya kurumun beklediği akademik dil ve biçimle yeniden kurmaktır.', image: '/yp-metropol/document.webp', highlights: ['Alanında uzman akademik tercüman', 'Dergi ve üniversite formatı', 'Redaksiyon ve son okuma'], scope: ['Makale ve bildiri tercümesi', 'Tez ve tez özeti', 'Burs, niyet ve referans mektupları', 'Diploma, transkript ve ders içerikleri'], expertise: 'Tercüman makalenin bilim alanına göre seçilir; atıf düzeni, kısaltmalar, tablo ve şekil açıklamaları kaynakla karşılaştırılarak kontrol edilir.', keywords: ['akademik tercume', 'makale tercumesi', 'tez tercumesi', 'akademik ceviri'], extra: [{ title: 'Yayın ve başvuru odaklı hazırlık', paragraphs: ['Hedef derginin yazım kılavuzu, kelime sınırı ve İngiliz/Amerikan İngilizcesi tercihi proje başında belirlenir. Hakem değerlendirmesinden dönen düzeltmelerde aynı terminoloji korunur.', 'Yurt dışı üniversite başvurularında diploma ve transkript için yeminli tercüme, noter tasdiki veya apostil gerekip gerekmediği başvuru yapılacak kurumun şartlarına göre planlanır.'], bullets: ['Dergi yazım kılavuzuna uyum', 'Hakem düzeltmelerinde süreklilik', 'Denklik ve kayıt belgeleri'] }] }),
  createServicePage({ slug: 'tibbi-tercume', title: 'Tıbbi Tercüme', description: 'Epikriz, sağlık raporu, tahlil sonucu, klinik araştırma ve medikal cihaz dokümanlarında hassas ve gizli tercüme.', intro: 'Tıbbi tercümede tek bir kelime hatası teşhis veya tedavi anlamını değiştirebilir; bu nedenle metinler tıbbi terminolojiye hâkim tercümanlarla ve gizlilik esasıyla hazırlanır.', image: '/yp-metropol/document.webp', highlights: ['Tıbbi terminoloji uzmanlığı', 'Hasta verisi gizliliği', 'Bağımsız kalite kontrolü'], scope: ['Epikriz ve taburcu raporları', 'Sağlık kurulu ve heyet raporları', 'Tahlil, patoloji ve görüntüleme sonuçları', 'Klinik araştırma ve ilaç prospektüsleri'], expertise: 'Kısaltmalar branşa göre farklı anlamlara gelebileceği için bağlama göre çözülür; dozaj, birim ve sayısal değerler kaynakla tek tek karşılaştırılır.', keywords: ['tibbi tercume', 'saglik raporu tercumesi', 'epikriz tercumesi', 'medikal ceviri'], extra: [{ title: 'Yurt dışında tedavi ve sağlık turizmi', paragraphs: ['Yurt dışında tedavi olacak hastaların raporları ile Türkiye’ye tedavi için gelen yabancı hastaların tedavi planı, onam formu ve faturaları hedef ülkenin kurumlarına uygun dille hazırlanır.', 'Sigorta şirketleri veya resmî kurumlar yeminli tercüme talep ettiğinde tercüman imzası ve gerekirse noter tasdiki birlikte planlanır.'], bullets: ['Tedavi planı ve onam formları', 'Sigorta ve fatura belgeleri', 'Yeminli tıbbi tercüme'] }] }),
  createServicePage({ slug: 'teknik-tercume', title: 'Teknik Tercüme', description: 'Kullanım kılavuzu, teknik şartname, proje dosyası, güvenlik bilgi formu ve mühendislik dokümanlarında uzman tercüme.', intro: 'Teknik tercümede doğruluk kadar tutarlılık da önemlidir: aynı parça, işlem veya ölçü birimi belge boyunca tek ve doğru karşılıkla kullanılmalıdır.', image: '/yp-metropol/document.webp', highlights: ['Sektörel terminoloji', 'Terim listesi ve tutarlılık', 'Tablo ve çizim düzeni korunur'], scope: ['Kullanım ve bakım kılavuzları', 'Teknik şartname ve ihale dosyaları', 'Güvenlik bilgi formları (SDS)', 'Makine, enerji, inşaat ve bilişim dokümanları'], expertise: 'Mühendislik alanına göre tercüman seçilir; ölçü birimleri, standart numaraları, uyarı ifadeleri ve parça adları terim listesiyle kontrol edilir.', keywords: ['teknik tercume', 'kullanim kilavuzu tercumesi', 'teknik sartname cevirisi', 'muhendislik tercumesi'], extra: [{ title: 'Uzun ve tekrarlayan teknik projeler', paragraphs: ['Çok ciltli kılavuz veya sürekli güncellenen dokümanlarda müşteriye özel terim listesi oluşturulur; yeni sürümlerde yalnızca değişen bölümler çevrilerek süre ve maliyet azaltılır.', 'Word, Excel, PDF ve düzenlenebilir formatlarda gelen dosyalar mümkün olduğunca orijinal sayfa düzeniyle teslim edilir.'], bullets: ['Müşteriye özel terim listesi', 'Sürüm güncellemelerinde fark çevirisi', 'Orijinal formatta teslim'] }] }),
  createServicePage({ slug: 'simultane-tercume', title: 'Simultane Tercüme', description: 'Konferans, kongre, seminer ve hibrit etkinliklerde kabin ve ekipman desteğiyle eş zamanlı profesyonel tercüme.', intro: 'Simultane tercümede konuşma kesintisiz akarken tercüman aynı anda hedef dile aktarır; bu nedenle tercüman seçimi, hazırlık materyali ve teknik altyapı etkinliğin başarısını doğrudan belirler.', image: '/yp-metropol/interpreting.webp', highlights: ['Deneyimli konferans tercümanları', 'Kabin ve ekipman koordinasyonu', 'Hibrit ve online etkinlikler'], scope: ['Uluslararası kongre ve konferanslar', 'Bayi toplantıları ve lansmanlar', 'Eğitim ve seminerler', 'Online ve hibrit toplantılar'], expertise: 'Uzun oturumlarda tercümanlar dönüşümlü çalışır; konuşma metinleri, sunumlar ve özel isim listesi etkinlikten önce tercümanlarla paylaşılır.', keywords: ['simultane tercume', 'simultane tercuman', 'konferans tercumani', 'es zamanli tercume'], extra: [{ title: 'Etkinlik öncesi planlama', paragraphs: ['Etkinlik tarihi, süresi, dil çiftleri, katılımcı sayısı ve salon bilgisi alındıktan sonra tercüman sayısı ve ekipman ihtiyacı belirlenir.', 'Sunum dosyaları ve konuşmacı notları önceden iletildiğinde tercümanlar terminolojiye hazırlıklı gelir; bu da çevirinin akıcılığını artırır.'], bullets: ['Tercüman sayısı ve vardiya planı', 'Kabin, kulaklık ve ses sistemi', 'Hazırlık materyali paylaşımı'] }] }),
  createServicePage({ slug: 'ardil-tercume', title: 'Ardıl Tercüme', description: 'İş görüşmesi, noter işlemi, fabrika ziyareti ve küçük toplantılarda konuşmacının ardından profesyonel sözlü tercüme.', intro: 'Ardıl tercümede konuşmacı belirli aralıklarla durur ve tercüman söyleneni hedef dile aktarır; ekipman gerektirmediği için küçük grup toplantıları ve resmî işlemler için idealdir.', image: '/yp-metropol/interpreting.webp', highlights: ['Ekipman gerektirmez', 'Noter ve resmî işlemler', 'Sektöre uygun tercüman'], scope: ['İş görüşmeleri ve müzakereler', 'Noterde vekâletname ve satış işlemleri', 'Fabrika ve saha ziyaretleri', 'Basın toplantıları ve röportajlar'], expertise: 'Tercüman toplantının konusu ve tarafları hakkında önceden bilgilendirilir; teknik veya hukuki görüşmelerde ilgili alanda deneyimli tercüman görevlendirilir.', keywords: ['ardil tercume', 'ardil tercuman', 'noter tercumani', 'is gorusmesi tercumani'], extra: [{ title: 'Noter işlemlerinde tercüman', paragraphs: ['Türkçe bilmeyen kişilerin noterde vekâletname, satış veya muvafakatname gibi işlemleri için yeminli tercüman eşliği gerekebilir. Tercümanın ilgili noterde yeminli olup olmadığı işlemden önce kontrol edilir.', 'İşlem saati, noter adresi ve belge içeriği önceden paylaşıldığında süreç tek seferde tamamlanabilir.'], bullets: ['Noterde yeminli tercüman', 'Vekâletname ve satış işlemleri', 'Randevu ve belge hazırlığı'] }] }),
  createServicePage({ slug: 'acil-tercume', title: 'Acil Tercüme', description: 'Zaman kritik belge, başvuru ve ihale dosyaları için öncelikli planlama, hızlı ve kontrollü tercüme teslimi.', intro: 'Acil tercümede hız, kaliteden ödün vermeden sağlanmalıdır; bu nedenle dosya önce kapsam yönünden incelenir, gerekirse birden fazla tercüman ve ayrı bir editörle çalışılır.', image: '/yp-metropol/translation.webp', highlights: ['Öncelikli iş akışı', 'Net teslim saati', 'Hızlı ama kontrollü süreç'], scope: ['Vize ve konsolosluk randevusu yaklaşan belgeler', 'İhale ve teklif dosyaları', 'Mahkeme ve resmî kurum son tarihleri', 'Aynı gün noter onayı gereken belgeler'], expertise: 'Uzun dosyalar bölümlere ayrılarak paralel çalışılır; terim birliği ortak bir terim listesiyle korunur ve teslimden önce tek editör tüm metni kontrol eder.', keywords: ['acil tercume', 'hizli tercume', 'ayni gun tercume', 'acil yeminli tercume'], extra: [{ title: 'Acil işlerde en hızlı yol', paragraphs: ['Belgenin okunaklı fotoğrafını veya PDF dosyasını WhatsApp ya da e-posta ile göndermek süreci başlatmanın en hızlı yoludur. Hedef dil, kullanım yeri ve son teslim saati belirtildiğinde gerçekçi bir teslim zamanı hemen paylaşılır.', 'Kısa resmî belgelerde aynı gün teslim çoğu zaman mümkündür; noter onayı gereken işlerde noterin çalışma saatleri de plana dahil edilir.'], bullets: ['WhatsApp ile anında gönderim', 'Gerçekçi teslim saati', 'Noter saatlerine göre planlama'] }] }),
  createServicePage({ slug: 'web-site-tercume', title: 'Web Sitesi Tercümesi', description: 'Web sitesi, e-ticaret ve dijital içeriklerin hedef pazara uygun çeviri, lokalizasyon ve çok dilli SEO uyumu.', intro: 'Web sitesi tercümesi, sayfaları kelime kelime çevirmekten öte; hedef ülkenin arama alışkanlıklarına, kültürüne ve satın alma diline uygun bir yerelleştirme çalışmasıdır.', image: '/yp-metropol/translation.webp', highlights: ['Lokalizasyon ve kültürel uyum', 'Çok dilli SEO', 'CMS ve dosya formatı desteği'], scope: ['Kurumsal web siteleri', 'E-ticaret ürün ve kategori metinleri', 'Uygulama ve yazılım arayüzleri', 'Blog, kampanya ve e-posta içerikleri'], expertise: 'Hedef pazarda kullanılan anahtar kelimeler araştırılır; başlık, meta açıklama, URL ve görsel alt metinleri de çevrilerek arama motorlarında görünürlük korunur.', keywords: ['web sitesi tercumesi', 'web site cevirisi', 'lokalizasyon', 'e-ticaret tercumesi'], extra: [{ title: 'Çok dilli SEO ve teknik uyum', paragraphs: ['Her dil için ayrı sayfa yapısı, hreflang etiketleri ve yerel anahtar kelimeler planlanarak çevrilmiş sayfaların ilgili ülkelerin aramalarında çıkması hedeflenir.', 'XML, JSON, PO, XLIFF veya CSV gibi dosya formatlarıyla çalışılabilir; çeviri sonrası metinlerin arayüzde taşma veya bozulma yapmadığı kontrol edilir.'], bullets: ['Hreflang ve URL yapısı', 'Yerel anahtar kelime araştırması', 'Dosya formatı ve arayüz kontrolü'] }] }),
  createServicePage({ slug: 'pasaport-tercumesi', title: 'Pasaport Tercümesi', description: 'Vize, oturum izni, evlilik, noter ve resmî başvurular için yeminli ve noter onaylı pasaport tercümesi.', intro: 'Pasaport tercümesi kısa bir belge gibi görünse de isimlerin, doğum yerinin ve belge numaralarının hatasız aktarılması başvurunun kabulü için kritik önemdedir.', image: '/yp-metropol/document.webp', highlights: ['İsim ve numara kontrolü', 'Yeminli ve noter onaylı', 'Hızlı teslim'], scope: ['Oturum izni ve ikamet başvuruları', 'Yabancı evlilik işlemleri', 'Noterde kimlik tespiti', 'Banka, tapu ve şirket işlemleri'], expertise: 'Latin dışı alfabelerle yazılmış isimlerin Türkçe yazımı, kişinin diğer belgeleriyle tutarlı olacak şekilde belirlenir; pasaport numarası ve tarihler iki kez kontrol edilir.', keywords: ['pasaport tercumesi', 'pasaport cevirisi', 'noter onayli pasaport tercumesi', 'yeminli pasaport tercumesi'], extra: [{ title: 'Pasaport tercümesi hangi işlemlerde istenir?', paragraphs: ['Türkiye’de oturum izni, yabancı evlilik, noter işlemleri, tapu devri, banka hesabı açılışı ve şirket kuruluşu gibi işlemlerde yabancı pasaportun noter onaylı Türkçe tercümesi sıklıkla talep edilir.', 'İşlemi yapacağınız kurumun yeminli tercüme mi yoksa noter onaylı tercüme mi istediğini önceden öğrenmeniz gereksiz masrafı önler.'], bullets: ['Oturum izni ve ikamet', 'Evlilik ve noter işlemleri', 'Tapu, banka ve şirket kuruluşu'] }] }),
  createServicePage({ slug: 'diploma-transkript-tercumesi', title: 'Diploma ve Transkript Tercümesi', description: 'Denklik, yurt dışı eğitim, iş başvurusu ve göç süreçleri için yeminli, noter onaylı ve apostilli diploma ve transkript tercümesi.', intro: 'Diploma ve transkript tercümesinde ders adları, not sistemleri ve derece unvanları hedef ülkenin eğitim terminolojisine uygun aktarılmalıdır.', image: '/yp-metropol/document.webp', highlights: ['Eğitim terminolojisi', 'Not ve kredi tabloları', 'Apostil ve denklik desteği'], scope: ['Lise ve üniversite diplomaları', 'Transkript ve not dökümleri', 'Ders içerikleri ve müfredat', 'Öğrenci belgesi ve mezuniyet yazıları'], expertise: 'Tablo yapısı, ders kodları, kredi ve not değerleri kaynakla birebir korunur; derece unvanlarının karşılıkları hedef ülkenin sistemine göre seçilir.', keywords: ['diploma tercumesi', 'transkript tercumesi', 'denklik belgesi tercumesi', 'diploma apostil'], extra: [{ title: 'Denklik ve yurt dışı başvuru süreci', paragraphs: ['Yurt dışında alınan diplomaların Türkiye’de denkliği veya Türkiye’de alınan diplomaların yurt dışında kullanımı için genellikle yeminli tercüme, noter tasdiki ve apostil sırası birlikte planlanır.', 'Başvuru yapılacak üniversite veya kurumun güncel şartları teyit edildikten sonra belge hazırlığı tek seferde tamamlanır.'], bullets: ['Yeminli ve noter onaylı tercüme', 'Apostil yönlendirmesi', 'Kurum şartlarının teyidi'] }] }),
  createServicePage({ slug: 'vize-evraklari-tercumesi', title: 'Vize Evrakları Tercümesi', description: 'Schengen, ABD, İngiltere ve diğer ülke vize başvuruları için nüfus, banka, iş ve destek evraklarının tercümesi.', intro: 'Vize dosyalarında her konsolosluğun istediği belge listesi ve tercüme şartı farklıdır; eksik veya hatalı tercüme başvurunun gecikmesine yol açabilir.', image: '/yp-metropol/document.webp', highlights: ['Konsolosluğa uygun format', 'Eksiksiz dosya kontrolü', 'Randevu tarihine göre teslim'], scope: ['Tam vukuatlı nüfus kayıt örneği', 'Banka hesap dökümü ve maaş bordrosu', 'SGK hizmet dökümü ve işveren yazısı', 'Tapu, araç ruhsatı ve öğrenci belgesi'], expertise: 'Belgedeki isim, tarih ve tutarlar kaynakla karşılaştırılır; konsolosluğun yeminli tercüme veya noter onayı talebi başvuru öncesi kontrol edilir.', keywords: ['vize evraklari tercumesi', 'vize tercumesi', 'schengen vize tercume', 'konsolosluk evrak tercumesi'], extra: [{ title: 'Randevu tarihinize göre planlama', paragraphs: ['Vize randevu tarihinizi paylaştığınızda tüm belgelerin tercümesi bu tarihe göre planlanır. Birden fazla aile üyesinin dosyası tek seferde hazırlanabilir.', 'Almanca, Fransızca, İtalyanca, İspanyolca, Hollandaca ve İngilizce başta olmak üzere konsoloslukların talep ettiği dillerde tercüme yapılır.'], bullets: ['Randevuya göre teslim', 'Aile dosyalarının toplu hazırlığı', 'Konsolosluk dillerinde tercüme'] }] }),
];

const locationPages: readonly LandingPage[] = [
  createLocationPage({
    slug: 'mecidiyekoy-tercume',
    name: 'Mecidiyeköy',
    nearby: 'Şişli, Gayrettepe, Esentepe ve Fulya',
    title: 'Mecidiyeköy Tercüme Bürosu',
    description: 'Mecidiyeköy’deki ofisimizde yeminli, noter onaylı, hukuki, akademik ve sözlü tercüme. Online belge gönderimi ve hızlı teklif.',
    local: {
      title: 'Ofisimiz Mecidiyeköy’de: elden teslim ve hızlı randevu',
      paragraphs: [
        'YP Metropol Tercüme’nin ofisi doğrudan Mecidiyeköy’dedir. Belgenizin aslını elden bırakabilir, yeminli tercüme ve noter onayı gereken işlemleri tek noktadan planlayabilirsiniz. Bölgedeki noterlere yakınlık, noter tasdikli tercümelerde gidiş-geliş süresini kısaltır.',
        'Mecidiyeköy; M2 Yenikapı–Hacıosman ve M7 metro hatlarının ve metrobüsün kesiştiği bir aktarma noktası olduğu için İstanbul’un pek çok semtinden kolayca ulaşılabilir. Ofise gelemeyen müşteriler için ön inceleme ve teklif tamamen online yürütülür.',
      ],
      bullets: ['Belge aslının elden teslimi', 'Yakın noterlerle tasdik planlaması', 'Metro ve metrobüs ile kolay ulaşım', 'Online ön inceleme ve teklif'],
    },
  }),
  createLocationPage({
    slug: 'sisli-tercume-burosu',
    name: 'Şişli',
    nearby: 'Mecidiyeköy, Fulya ve Bomonti',
    local: {
      title: 'Şişli’de şirketler, hukuk büroları ve bireysel başvurular için',
      paragraphs: [
        'Şişli; plaza ofisleri, hukuk büroları, hastaneler ve konsolosluk başvurularına hazırlanan bireysel müşterilerin yoğun olduğu bir ilçedir. Ofisimiz Şişli sınırları içindeki Mecidiyeköy’de bulunduğundan ilçe genelindeki taleplere aynı gün içinde dönüş yapılabilir.',
        'Şirket evrakı, vekâletname, sağlık raporu ve vize dosyası gibi belgelerde yeminli tercüme ve noter tasdiki birlikte planlanır.',
      ],
      bullets: ['Şirket ve ticaret sicil evrakları', 'Hukuk bürolarına dava ve sözleşme tercümesi', 'Sağlık raporu ve epikriz tercümesi', 'Vize ve konsolosluk dosyaları'],
    },
  }),
  createLocationPage({
    slug: 'taksim-tercume',
    name: 'Taksim',
    nearby: 'Beyoğlu, Harbiye ve Cihangir',
    local: {
      title: 'Taksim ve Beyoğlu’ndaki konsolosluk başvurularına destek',
      paragraphs: [
        'Taksim ve Beyoğlu çevresi, birçok ülkenin İstanbul başkonsolosluğuna ve otel, turizm, etkinlik sektörüne yakınlığıyla bilinir. Vize, oturum, evlilik veya vatandaşlık başvurusu için hazırlanan belgelerin hangi onayla sunulacağı başvurudan önce netleştirilir.',
        'Taksim’den M2 metro hattıyla Osmanbey üzerinden Şişli-Mecidiyeköy durağına kısa sürede ulaşarak belgenizi ofisimize teslim edebilirsiniz.',
      ],
      bullets: ['Konsolosluk ve vize dosyaları', 'Turizm ve otelcilik metinleri', 'Etkinlik ve kongre tercümanlığı', 'M2 ile kolay ulaşım'],
    },
  }),
  createLocationPage({
    slug: 'etiler-tercume',
    name: 'Etiler',
    nearby: 'Levent, Bebek ve Akatlar',
    local: {
      title: 'Etiler’de kurumsal ve bireysel tercüme ihtiyaçları',
      paragraphs: [
        'Etiler ve Akatlar çevresindeki şirket merkezleri, klinikler, okullar ve aileler için özellikle akademik başvuru, sağlık ve yurt dışı eğitim belgelerinde tercüme desteği verilir.',
        'Diploma, transkript, okul kayıt ve aşı belgeleri gibi evraklar yurt dışındaki kurumun istediği formata göre hazırlanır; gerektiğinde apostil adımı da planlanır.',
      ],
      bullets: ['Yurt dışı eğitim başvuruları', 'Klinik ve sağlık belgeleri', 'Kurumsal sözleşmeler', 'Apostil yönlendirmesi'],
    },
  }),
  createLocationPage({
    slug: 'caglayan-tercume',
    name: 'Çağlayan',
    nearby: 'Şişli, Kağıthane ve Mecidiyeköy',
    local: {
      title: 'Çağlayan Adliyesi’ne yakın hukuki tercüme',
      paragraphs: [
        'Çağlayan, İstanbul Adalet Sarayı’nın bulunduğu bölge olduğu için dava dosyası, bilirkişi raporu, mahkeme kararı, tebligat ve vekâletname tercümelerinin en sık talep edildiği yerlerden biridir.',
        'Hukuki metinlerde terminoloji, tarih, dosya numarası ve taraf isimleri kaynakla tek tek karşılaştırılır. Çağlayan’dan M7 metro hattıyla Mecidiyeköy’e bir durakta ulaşabilirsiniz.',
      ],
      bullets: ['Mahkeme kararı ve dava dosyaları', 'Bilirkişi raporları', 'Tebligat ve vekâletname', 'M7 ile bir durak mesafe'],
    },
  }),
  createLocationPage({
    slug: 'okmeydani-tercume',
    name: 'Okmeydanı',
    nearby: 'Şişli, Çağlayan ve Kasımpaşa',
    local: {
      title: 'Okmeydanı’nda sağlık ve resmî belge tercümesi',
      paragraphs: [
        'Okmeydanı ve çevresindeki hastaneler nedeniyle epikriz, sağlık kurulu raporu, tahlil sonucu ve tedavi planı gibi tıbbi belgelerin tercümesi bölgede sık talep edilir. Tıbbi metinler alanında deneyimli tercümanlarla, hasta gizliliğine dikkat edilerek hazırlanır.',
        'Yurt dışında tedavi, sigorta veya resmî başvuru için gereken onay türü ilgili kurumdan teyit edilerek süreç planlanır.',
      ],
      bullets: ['Epikriz ve sağlık raporları', 'Tahlil ve görüntüleme sonuçları', 'Sigorta ve tedavi belgeleri', 'Gizlilik esaslı çalışma'],
    },
  }),
  createLocationPage({
    slug: 'bomonti-tercume',
    name: 'Bomonti',
    nearby: 'Şişli, Osmanbey ve Kurtuluş',
    local: {
      title: 'Bomonti’de otel, kongre ve kurumsal etkinlik tercümesi',
      paragraphs: [
        'Bomonti’deki oteller ve kongre alanları uluslararası toplantı, lansman ve eğitim etkinliklerine ev sahipliği yapar. Bu etkinlikler için ardıl veya simultane tercüman, sunum ve katılımcı materyali çevirisi planlanabilir.',
        'Bölgedeki ofis ve yeni konut projelerinde çalışan yabancı uyruklu kişilerin oturum izni, kira sözleşmesi ve banka belgeleri de yeminli olarak hazırlanır.',
      ],
      bullets: ['Kongre ve lansman tercümanlığı', 'Sunum ve etkinlik materyalleri', 'Oturum izni belgeleri', 'Kira ve banka evrakı'],
    },
  }),
  createLocationPage({
    slug: 'maslak-tercume',
    name: 'Maslak',
    nearby: 'Levent, Ayazağa ve İstinye',
    local: {
      title: 'Maslak’taki şirket merkezleri için kurumsal tercüme',
      paragraphs: [
        'Maslak, banka, holding ve teknoloji şirketlerinin genel müdürlüklerinin bulunduğu bir iş merkezidir. Finansal rapor, yönetim kurulu kararı, iç politika, teknik doküman ve ihale dosyalarında terminoloji birliği korunarak kurumsal tercüme yapılır.',
        'Maslak’tan M2 metro hattıyla Levent ve Gayrettepe üzerinden Şişli-Mecidiyeköy’e doğrudan ulaşılır. Düzenli işlerde terim listesi ve teslim takvimi oluşturulur.',
      ],
      bullets: ['Finansal rapor ve denetim belgeleri', 'Yönetim kurulu kararları', 'Teknik ve yazılım dokümanları', 'İhale ve teklif dosyaları'],
    },
  }),
  createLocationPage({
    slug: 'osmanbey-tercume',
    name: 'Osmanbey',
    nearby: 'Nişantaşı, Şişli ve Harbiye',
    local: {
      title: 'Osmanbey’de tekstil ve dış ticaret evrakı tercümesi',
      paragraphs: [
        'Osmanbey ve Halaskargazi Caddesi çevresi tekstil, hazır giyim ve toptan ticaretle bilinir. İhracat yapan firmalar için proforma fatura, menşe belgesi, ürün kataloğu, gümrük ve sözleşme tercümeleri hazırlanır.',
        'Osmanbey, M2 hattında Şişli-Mecidiyeköy’e komşu duraktır; belgelerinizi kısa sürede ofisimize ulaştırabilirsiniz.',
      ],
      bullets: ['Proforma fatura ve menşe belgesi', 'Ürün kataloğu ve etiket metinleri', 'Dış ticaret sözleşmeleri', 'Rusça, Arapça, İngilizce ticari tercüme'],
    },
  }),
  createLocationPage({
    slug: 'harbiye-tercume',
    name: 'Harbiye',
    nearby: 'Taksim, Nişantaşı ve Elmadağ',
    local: {
      title: 'Harbiye’de kongre, konferans ve resmî belge tercümesi',
      paragraphs: [
        'Harbiye’deki kongre ve kültür merkezleri uluslararası konferans, sempozyum ve törenlere ev sahipliği yapar. Bu tür etkinlikler için simultane ve ardıl tercüman, konuşma metni ve sunum çevirisi planlanabilir.',
        'Bölgedeki oteller ve konsolosluklara yakınlık nedeniyle vize, evlilik ve kimlik belgeleri için yeminli ve noter onaylı tercüme de sık talep edilir.',
      ],
      bullets: ['Simultane ve ardıl tercüman', 'Konuşma ve sunum çevirisi', 'Vize ve evlilik belgeleri', 'Noter onaylı tercüme'],
    },
  }),
  createLocationPage({
    slug: 'fulya-tercume',
    name: 'Fulya',
    nearby: 'Şişli, Mecidiyeköy ve Gayrettepe',
    local: {
      title: 'Fulya’dan ofisimize birkaç dakikada ulaşın',
      paragraphs: [
        'Fulya, Mecidiyeköy’e yürüme mesafesinde olan ve M7 metro hattında Mecidiyeköy’ün komşu durağı bulunan bir semttir. Bu yakınlık sayesinde belge aslının teslimi ve teslim alınması çoğu zaman aynı gün içinde tamamlanabilir.',
        'Bölgedeki ofis kuleleri ve sağlık kuruluşları için kurumsal yazışma, sözleşme ve tıbbi rapor tercümeleri yapılır.',
      ],
      bullets: ['Yürüme mesafesinde ofis', 'Aynı gün teslim planlaması', 'Kurumsal yazışma ve sözleşmeler', 'Tıbbi rapor tercümesi'],
    },
  }),
  createLocationPage({
    slug: 'levent-tercume',
    name: 'Levent',
    nearby: '4. Levent, Esentepe ve Etiler',
    local: {
      title: 'Levent ve Büyükdere Caddesi plazalarına kurumsal tercüme',
      paragraphs: [
        'Levent ve Büyükdere Caddesi boyunca uzanan plazalar; banka, sigorta, danışmanlık ve hukuk firmalarının yoğun olduğu bir iş bölgesidir. Şirket ana sözleşmesi, imza sirküleri, finansal tablolar ve uluslararası yazışmalar uzman tercümanlarla hazırlanır.',
        'Levent, M2 hattında Gayrettepe’den sonra Şişli-Mecidiyeköy’e iki durak mesafededir. Gizlilik gerektiren dosyalarda erişim proje ekibiyle sınırlandırılır.',
      ],
      bullets: ['Ana sözleşme ve imza sirküleri', 'Finansal tablo ve raporlar', 'Hukuk firması dosyaları', 'Gizlilik sözleşmeli çalışma'],
    },
  }),
  createLocationPage({
    slug: 'bebek-tercume',
    name: 'Bebek',
    nearby: 'Arnavutköy, Rumelihisarı ve Etiler',
    local: {
      title: 'Bebek’te akademik ve yurt dışı eğitim tercümesi',
      paragraphs: [
        'Bebek ve Rumelihisarı çevresi, köklü üniversiteleri ve okullarıyla akademik çevrenin yoğun olduğu bir bölgedir. Makale, tez özeti, burs başvurusu, referans mektubu, diploma ve transkript tercümeleri akademik terminolojiye uygun hazırlanır.',
        'Yurt dışındaki üniversitelerin istediği yeminli tercüme, noter tasdiki veya apostil şartı başvurudan önce kontrol edilir.',
      ],
      bullets: ['Makale ve tez özeti', 'Burs ve referans mektupları', 'Diploma ve transkript', 'Apostil ve denklik desteği'],
    },
  }),
  createLocationPage({
    slug: 'ortakoy-tercume',
    name: 'Ortaköy',
    nearby: 'Beşiktaş, Kuruçeşme ve Yıldız',
    local: {
      title: 'Ortaköy’de turizm, etkinlik ve kişisel belge tercümesi',
      paragraphs: [
        'Ortaköy ve Kuruçeşme çevresindeki etkinlik mekânları, oteller ve restoranlar için menü, tanıtım metni ve etkinlik materyali çevirisi yapılır. Yabancı ziyaretçilerin katıldığı organizasyonlarda refakat tercümanı da planlanabilir.',
        'Bölgede yaşayan yabancı uyruklu kişiler için evlilik, oturum ve noter işlemlerinde yeminli tercüme ve sözlü tercüman desteği verilir.',
      ],
      bullets: ['Menü ve tanıtım metinleri', 'Etkinlik ve refakat tercümanı', 'Evlilik ve oturum belgeleri', 'Noterde sözlü tercüman'],
    },
  }),
  createLocationPage({
    slug: 'pangalti-tercume',
    name: 'Pangaltı',
    nearby: 'Harbiye, Kurtuluş ve Osmanbey',
    local: {
      title: 'Pangaltı’nda bireysel ve resmî belge tercümesi',
      paragraphs: [
        'Pangaltı, Harbiye ile Osmanbey arasında yer alan ve okulları, sağlık kuruluşları ve konut alanlarıyla öne çıkan bir semttir. Okul kaydı, denklik, nüfus kaydı ve sağlık belgeleri gibi bireysel evraklarda yeminli tercüme yapılır.',
        'Osmanbey metro durağına yakınlık sayesinde Mecidiyeköy’deki ofisimize bir durakla ulaşabilirsiniz.',
      ],
      bullets: ['Okul kaydı ve denklik', 'Nüfus ve kimlik belgeleri', 'Sağlık evrakları', 'Osmanbey üzerinden kolay ulaşım'],
    },
  }),
  createLocationPage({
    slug: 'gayrettepe-tercume',
    name: 'Gayrettepe',
    nearby: 'Esentepe, Zincirlikuyu ve Mecidiyeköy',
    local: {
      title: 'Gayrettepe’de iş merkezlerine yakın hızlı tercüme',
      paragraphs: [
        'Gayrettepe, M2 hattında Şişli-Mecidiyeköy’ün hemen sonraki durağıdır ve yoğun iş merkezleriyle çevrilidir. Şirketlerin acil sözleşme, teklif ve yazışma ihtiyaçları için öncelikli iş akışı planlanabilir.',
        'Zincirlikuyu ve Esentepe’deki ofisler için düzenli tercüme işlerinde terminoloji listesi oluşturularak tutarlılık sağlanır.',
      ],
      bullets: ['Bir metro durağı mesafe', 'Acil sözleşme ve teklif tercümesi', 'Düzenli kurumsal işler', 'Terminoloji yönetimi'],
    },
  }),
  createLocationPage({
    slug: 'kagithane-tercume',
    name: 'Kağıthane',
    nearby: 'Çağlayan, Seyrantepe ve Gültepe',
    local: {
      title: 'Kağıthane’de yeni iş merkezleri ve bireysel başvurular',
      paragraphs: [
        'Kağıthane, son yıllarda yeni ofis ve konut projeleriyle hızla büyüyen bir ilçedir. Bölgeye taşınan şirketler için kuruluş evrakı, iş sözleşmesi ve teknik doküman tercümesi; bireysel müşteriler için de nüfus, eğitim ve vize belgeleri hazırlanır.',
        'Kağıthane’den M7 hattıyla Çağlayan üzerinden Mecidiyeköy’e ulaşabilirsiniz.',
      ],
      bullets: ['Şirket kuruluş evrakları', 'İş ve kira sözleşmeleri', 'Vize ve eğitim belgeleri', 'M7 ile doğrudan ulaşım'],
    },
  }),
  createLocationPage({
    slug: 'nisantasi-tercume',
    name: 'Nişantaşı',
    nearby: 'Teşvikiye, Maçka ve Osmanbey',
    local: {
      title: 'Nişantaşı’nda moda, klinik ve kişisel belge tercümesi',
      paragraphs: [
        'Nişantaşı ve Teşvikiye çevresi moda markaları, estetik ve sağlık klinikleri ile bilinir. Marka kataloğu, ürün açıklaması, klinik bilgilendirme formu ve hasta onam metni gibi içerikler hedef kitleye uygun dille çevrilir.',
        'Sağlık turizmi kapsamında gelen yabancı hastalar için tedavi planı ve rapor tercümeleri de gizlilik esasıyla hazırlanır.',
      ],
      bullets: ['Marka ve ürün metinleri', 'Klinik ve onam formları', 'Sağlık turizmi belgeleri', 'Web sitesi lokalizasyonu'],
    },
  }),
];

const guidePages: readonly LandingPage[] = [
  createGuidePage({
    slug: 'akademik-tercume-yaparken-kacinilmasi-gereken-10-hata',
    title: 'Akademik Tercümede Kaçınılması Gereken 10 Hata',
    description: 'Makale, tez ve bildiri çevirilerinde anlamı, akademik tonu ve yayın kalitesini zedeleyen on yaygın hatayı öğrenin.',
    intro: 'Akademik tercüme yalnızca iki dili bilmekle tamamlanmaz. Alan terminolojisi, kaynak kullanımı, akademik üslup ve dergi kuralları birlikte yönetilmelidir.',
    highlights: ['Alan terminolojisini koruyun', 'Atıf ve biçimi değiştirmeyin', 'Son okumayı atlamayın'],
    keywords: ['akademik tercume hatalari', 'makale tercumesi', 'tez cevirisi', 'akademik ceviri'],
    items: [
      { title: 'Alan uzmanlığı olmayan tercümanla çalışmak', text: 'Metnin disiplinine uzak bir tercüman doğru görünen ancak bilimsel bağlamda hatalı terimler seçebilir. Dosya ilgili alanda deneyimli uzmana yönlendirilmelidir.' },
      { title: 'Terimleri metin boyunca değiştirmek', text: 'Aynı kavram için farklı karşılıklar kullanmak argümanın takibini zorlaştırır. Proje başında terim listesi oluşturulmalı ve tutarlılık korunmalıdır.' },
      { title: 'Kelimesi kelimesine çeviri yapmak', text: 'Kaynak dilin cümle yapısını aynen taşımak hedef dilde belirsiz ve ağır bir anlatım doğurabilir. Anlam korunurken akademik söylem doğal kurulmalıdır.' },
      { title: 'Özet ile ana metin arasında uyumsuzluk oluşturmak', text: 'Başlık, özet, anahtar kelimeler ve sonuç bölümündeki temel kavramlar aynı karşılıklarla aktarılmalıdır.' },
      { title: 'Atıf ve kaynakçayı bozmak', text: 'Yazar adları, eser başlıkları, DOI bilgileri ve atıf düzeni keyfî biçimde değiştirilmemeli; hedef yayının kuralları izlenmelidir.' },
      { title: 'Tablo ve şekilleri gözden kaçırmak', text: 'Başlıklar, eksenler, dipnotlar ve metin içi yönlendirmeler çeviri kapsamına dahil edilmeli ve numaraları korunmalıdır.' },
      { title: 'Kısaltmaları açıklamadan kullanmak', text: 'Kısaltmanın hedef dilde yerleşik karşılığı kontrol edilmeli, ilk kullanımda açık biçimi verilmeli ve devamında aynı kullanım sürdürülmelidir.' },
      { title: 'Dergi yazım kurallarını dikkate almamak', text: 'Kelime sınırı, başlık düzeni, İngilizce varyantı ve biçim şartları teslimden önce hedef derginin güncel kılavuzuyla karşılaştırılmalıdır.' },
      { title: 'Yazarla belirsizlikleri paylaşmamak', text: 'Kaynak metindeki eksik veya çok anlamlı ifadeler tahminle çözülmemeli; gerekli noktalarda yazardan bağlam istenmelidir.' },
      { title: 'Bağımsız son okumayı atlamak', text: 'Çeviri bittikten sonra terminoloji, akış, sayı, özel ad ve biçim yönünden ayrı bir kontrol turu yapılmalıdır.' },
    ],
    faqs: [
      { question: 'Akademik tercümeyi alan uzmanı mı yapmalı?', answer: 'Tercümanın ilgili disiplinin kavramlarına ve akademik anlatımına hâkim olması hata riskini önemli ölçüde azaltır.' },
      { question: 'Kaynakça da çevrilir mi?', answer: 'Kaynakça çoğunlukla özgün künyeyi korur; hedef dergi özel bir format veya çevrilmiş başlık istiyorsa onun kuralları uygulanır.' },
      { question: 'Makale gönderime hazır teslim edilir mi?', answer: 'Talep edilirse çeviri, redaksiyon ve hedef dergi biçim kontrolü ayrı kapsamlar olarak planlanabilir.' },
    ],
  }),
  createGuidePage({
    slug: 'sozlu-tercumede-etkili-iletisim-kurmanin-10-sirri',
    title: 'Sözlü Tercümede Etkili İletişimin 10 Sırrı',
    description: 'Toplantı ve görüşmelerde tercümanla daha açık, doğru ve verimli iletişim kurmak için uygulanabilir on öneri.',
    intro: 'Başarılı sözlü tercüme, tercümanın hazırlığı kadar konuşmacıların temposuna, açık anlatımına ve toplantı planına da bağlıdır.',
    highlights: ['Tercümanı önceden bilgilendirin', 'Kısa ve açık konuşun', 'Soru için zaman bırakın'],
    keywords: ['sozlu tercume iletisim', 'sozlu tercuman', 'ardil tercume', 'toplanti tercumesi'],
    items: [
      { title: 'Toplantının amacını önceden paylaşın', text: 'Katılımcılar, gündem, hedef ve beklenen sonuç hakkında verilen kısa bir brifing tercümanın doğru hazırlık yapmasını sağlar.' },
      { title: 'Terim ve belgeleri erkenden gönderin', text: 'Sunum, ürün adı, kişi unvanı ve teknik terimlerin önceden paylaşılması görüşme sırasında hız ve tutarlılık sağlar.' },
      { title: 'Kısa ve tamamlanmış cümleler kurun', text: 'Ardıl tercümede anlamlı duraklar vermek, uzun konuşma bloklarından kaynaklanan bilgi kaybını önler.' },
      { title: 'Doğrudan muhatabınıza konuşun', text: 'Göz temasını ve doğal iletişimi karşı tarafla sürdürün; tercümanı konuşmanın merkezine yerleştirmeyin.' },
      { title: 'Deyim ve kelime oyunlarını sınırlayın', text: 'Kültüre özgü ifadeler gerektiğinde açıklanmalı; doğrudan karşılığı olmayan esprilerin yanlış anlaşılabileceği unutulmamalıdır.' },
      { title: 'Sayı ve özel adları net söyleyin', text: 'Tarih, tutar, ölçü, e-posta adresi ve kişi adları yavaş söylenmeli, önemli bilgiler mümkünse yazılı da paylaşılmalıdır.' },
      { title: 'Tercümanın not almasına izin verin', text: 'Not alma, özellikle rakamların, görevlerin ve kararların eksiksiz aktarılmasına yardımcı olan profesyonel bir tekniktir.' },
      { title: 'Tek seferde tek kişinin konuşmasını sağlayın', text: 'Üst üste konuşmalar ve araya girmeler anlamın ayrıştırılmasını güçleştirir; toplantı moderasyonu iletişim kalitesini artırır.' },
      { title: 'Anlaşılmayan noktaların sorulmasına alan açın', text: 'Tercümanın kısa bir açıklama istemesi süreci aksatmak değil, anlam doğruluğunu güvenceye almak içindir.' },
      { title: 'Toplantı sonunda kararları özetleyin', text: 'Tarih, görev ve sonraki adımların iki dilde kısaca tekrarlanması tarafların aynı sonuçla ayrılmasını sağlar.' },
    ],
    faqs: [
      { question: 'Sözlü tercümana hangi bilgiler önceden verilmeli?', answer: 'Gündem, katılımcılar, sektör, süre, konum ve varsa sunum veya terim listesi paylaşılmalıdır.' },
      { question: 'Ardıl ve simultane tercüme arasındaki fark nedir?', answer: 'Ardıl tercümede konuşmacı belirli aralıklarla durur; simultane tercümede çeviri konuşmayla eş zamanlı yürür.' },
      { question: 'Online toplantıda tercüme yapılabilir mi?', answer: 'Evet. Platformun ses ve kanal imkânları kontrol edilerek ardıl veya eş zamanlı çalışma planlanabilir.' },
    ],
  }),
  createGuidePage({
    slug: 'apostil-onayi-surecinde-bilmeniz-gereken-6-onemli-nokta',
    title: 'Apostil Onayı Sürecinde Bilmeniz Gereken 6 Nokta',
    description: 'Apostil öncesinde ülke, belge, yetkili makam, tercüme ve işlem sırası hakkında kontrol edilmesi gereken temel noktalar.',
    intro: 'Yanlış makam veya işlem sırası, yurt dışında kullanılacak belgenin iadesine ve zaman kaybına neden olabilir. Süreç belge ve ülke özelinde doğrulanmalıdır.',
    highlights: ['Ülke uygunluğunu doğrulayın', 'Yetkili makamı belirleyin', 'İşlem sırasını kontrol edin'],
    keywords: ['apostil onayi sureci', 'apostil nasil yapilir', 'apostil tercume sirasi'],
    items: [
      { title: 'İki ülkenin apostil sistemine uygunluğunu kontrol edin', text: 'Apostilin kullanılabilmesi belgenin düzenlendiği ve sunulacağı ülkelerin ilgili anlaşma kapsamındaki durumuna bağlıdır.' },
      { title: 'Belge türünün apostile elverişli olduğunu doğrulayın', text: 'Her evrak aynı yöntemle tasdik edilmez. Özel belge, noter belgesi, adli veya idari evrak için farklı hazırlık gerekebilir.' },
      { title: 'Doğru yetkili makama başvurun', text: 'Apostili verecek makam belgenin türüne ve düzenlendiği yere göre değişebilir. Başvuru öncesinde güncel yetki bilgisi kontrol edilmelidir.' },
      { title: 'Asıl belge ve ön onay şartlarını inceleyin', text: 'Bazı belgelerde apostilden önce noter, kurum veya başka bir makam onayı gerekebilir; fotokopi her işlemde kabul edilmez.' },
      { title: 'Tercüme ile apostil sırasını belirleyin', text: 'Belgenin mi, tercümenin mi apostilleneceği kabul makamının talebine göre değişir. Çeviri yapılmadan önce sıra netleştirilmelidir.' },
      { title: 'Geçerlilik süresi ve teslim biçimini teyit edin', text: 'Apostilin kendisi için genel bir süre bulunmasa da temel belgenin güncellik şartı olabilir. Kurumun ıslak imza ve asıl nüsha beklentisi sorulmalıdır.' },
    ],
    faqs: [
      { question: 'Her yurt dışı belge için apostil gerekir mi?', answer: 'Hayır. Ülkeler arasındaki anlaşmalar, belge türü ve kabul makamının talebi uygulanacak yöntemi belirler.' },
      { question: 'Apostil belgenin içeriğini onaylar mı?', answer: 'Apostil esas olarak belgedeki imzanın, sıfatın ve mühür veya damganın kaynağını tasdik eder; içeriğin doğruluğunu değerlendirmez.' },
      { question: 'Apostilden önce tercüme yapılır mı?', answer: 'İşlem sırası ülke ve kurum şartına göre değişebilir. Kabul makamından teyit alınmadan işlem yapılmamalıdır.' },
    ],
  }),
  createGuidePage({
    slug: 'teknik-tercumede-terim-hatalarini-onlemenin-5-pratik-yolu',
    title: 'Teknik Tercümede Terim Hatalarını Önlemenin 5 Yolu',
    description: 'Teknik dokümanlarda yanlış ve tutarsız terim kullanımını azaltan beş uygulanabilir kalite yöntemi.',
    intro: 'Teknik tercümede küçük görünen bir terim hatası kullanım, bakım veya güvenlik talimatının yanlış anlaşılmasına yol açabilir.',
    highlights: ['Terim listesi oluşturun', 'Bağlamı doğrulayın', 'Uzman kontrolü uygulayın'],
    keywords: ['teknik tercume terim hatalari', 'teknik ceviri', 'terminoloji yonetimi'],
    items: [
      { title: 'Proje terim listesi oluşturun', text: 'Ürün parçaları, süreçler, ölçüler ve arayüz ifadeleri için onaylı karşılıklar belirlenmeli ve tüm dosyalarda aynı liste kullanılmalıdır.' },
      { title: 'Terimi yalnız değil bağlam içinde inceleyin', text: 'Aynı sözcük farklı mühendislik alanlarında başka anlam taşıyabilir. Şema, görsel ve çalışma prensibiyle birlikte değerlendirme yapılmalıdır.' },
      { title: 'Güvenilir kaynakları ve önceki belgeleri karşılaştırın', text: 'Üretici dokümanları, standartlar, müşteri terminolojisi ve daha önce onaylanmış çeviriler öncelikli referans olmalıdır.' },
      { title: 'Alan uzmanı çapraz kontrolü yapın', text: 'Kritik güvenlik ve kullanım metinlerinde çeviri, ilgili teknik alana hâkim ikinci bir uzman tarafından kontrol edilmelidir.' },
      { title: 'Revizyonları merkezi olarak yönetin', text: 'Onaylanan terim değişiklikleri bütün dosyalara uygulanmalı; farklı sürümlerin dolaşımda kalması engellenmelidir.' },
    ],
    faqs: [
      { question: 'Teknik terim listesi neden gereklidir?', answer: 'Aynı parçanın veya işlemin farklı adlarla çevrilmesini önler ve çok dosyalı projelerde tutarlılık sağlar.' },
      { question: 'Makine çevirisi teknik metinlerde kullanılabilir mi?', answer: 'Yardımcı araç olarak kullanılabilse de bağlam, güvenlik ve terminoloji açısından uzman kontrolünün yerini tutmaz.' },
      { question: 'Teknik çizimler de kontrol edilir mi?', answer: 'Kapsama dahil edildiğinde çizim başlıkları, etiketler, ölçüler ve metin içi referanslar birlikte kontrol edilir.' },
    ],
  }),
  createGuidePage({
    slug: 'yazili-tercumede-sik-yapilan-10-hata-ve-cozum-yollari',
    title: 'Yazılı Tercümede Sık Yapılan 10 Hata ve Çözümleri',
    description: 'Yazılı çeviride anlam, terminoloji, biçim ve teslim kalitesini etkileyen on hata ile uygulanabilir çözüm önerileri.',
    intro: 'Kaliteli yazılı tercüme, metni kelime kelime aktarmak yerine amacı ve bağlamı hedef dilde doğru biçimde yeniden kurmayı gerektirir.',
    highlights: ['Bağlamı koruyun', 'Terimleri tutarlı kullanın', 'Teslim öncesi kontrol yapın'],
    keywords: ['yazili tercume hatalari', 'ceviri hatalari', 'profesyonel yazili tercume'],
    items: [
      { title: 'Bağlamı incelemeden başlamak', text: 'Metnin hedef kitlesi, amacı ve yayın yeri anlaşılmadan seçilen karşılıklar doğru olsa bile uygun olmayabilir.' },
      { title: 'Kelimesi kelimesine çeviri yapmak', text: 'Kaynak dilin yapısını aynen taşımak doğal olmayan cümleler üretir. Anlam ve işlev hedef dilin kurallarıyla kurulmalıdır.' },
      { title: 'Terminolojiyi tutarsız kullanmak', text: 'Aynı kavram için tek onaylı karşılık kullanılmalı; uzun projelerde terim listesi tutulmalıdır.' },
      { title: 'Özel ad ve sayıları yanlış aktarmak', text: 'Kişi, kurum, tarih, ölçü ve tutarlar kaynak belgeyle ayrı bir turda karşılaştırılmalıdır.' },
      { title: 'Hedef kitleye uygun olmayan ton seçmek', text: 'Hukuki, akademik, pazarlama veya kullanıcı metinleri aynı üslupla çevrilemez; ton kullanım amacına göre ayarlanmalıdır.' },
      { title: 'Belge biçimini ihmal etmek', text: 'Tablo, başlık, dipnot, numaralandırma ve sayfa ilişkileri mümkün olduğunca kaynakla uyumlu korunmalıdır.' },
      { title: 'Eksik bölümleri fark etmemek', text: 'Metin kutuları, görsellerdeki yazılar, üst bilgi ve ekler teslim kontrol listesine dahil edilmelidir.' },
      { title: 'Kısaltmaları kontrol etmemek', text: 'Kısaltmaların hedef dildeki yerleşik biçimi araştırılmalı ve ilk kullanımda açıklama gerekip gerekmediği değerlendirilmelidir.' },
      { title: 'Araç çıktısına kontrolsüz güvenmek', text: 'Çeviri araçları bağlam, ton ve çok anlamlı ifadelerde hata yapabilir. Her çıktı insan uzman tarafından gözden geçirilmelidir.' },
      { title: 'Son okumayı atlamak', text: 'Çeviri tamamlandıktan sonra metin kaynakla karşılaştırılmalı ve ardından hedef dilde bağımsız bir metin gibi okunmalıdır.' },
    ],
    faqs: [
      { question: 'Yazılı tercümede kalite nasıl kontrol edilir?', answer: 'Kaynak-hedef karşılaştırması, terminoloji kontrolü ve hedef dil son okuması birbirini tamamlayan ayrı aşamalardır.' },
      { question: 'Belge düzeni korunabilir mi?', answer: 'Dosya biçimi uygunsa başlık, tablo ve temel sayfa düzeni büyük ölçüde korunabilir; özel masaüstü yayıncılık ayrıca planlanabilir.' },
      { question: 'Çeviri sonrası düzeltme yapılır mı?', answer: 'Teslim kapsamı ve kaynak değişiklikleri değerlendirilerek gerekli düzeltmeler proje ekibiyle koordine edilir.' },
    ],
  }),
  createGuidePage({
    slug: 'yeminli-tercume-belgelerinde-sikca-sorulan-8-soru',
    title: 'Yeminli Tercüme Belgelerinde Sık Sorulan 8 Soru',
    description: 'Yeminli tercüman, noter tasdiki, apostil, belge aslı, teslim ve ücret hakkında en sık sorulan sekiz sorunun yanıtları.',
    intro: 'Resmî belge süreçlerinde yeminli tercüme, noter onayı ve apostil sıkça birbirine karıştırılır. Gereken işlem kabul makamının talebine göre belirlenmelidir.',
    highlights: ['Yeminli tercümenin kapsamını öğrenin', 'Noter farkını anlayın', 'Belge şartını önceden doğrulayın'],
    keywords: ['yeminli tercume sorulari', 'yeminli tercume belgeleri', 'noter onayli tercume farki'],
    items: [
      { title: 'Yeminli tercüme nedir?', text: 'Noter huzurunda yemin etmiş tercümanın kaynak metne uygunluğunu imzası ve kaşesiyle beyan ettiği çeviridir.' },
      { title: 'Her yeminli tercüme noter onaylı mıdır?', text: 'Hayır. Noter onaylı tercümede yeminli tercümanın imzası, yemin kaydının bulunduğu noter tarafından ayrıca tasdik edilir.' },
      { title: 'Hangi belgelerde yeminli tercüme istenir?', text: 'Pasaport, diploma, nüfus kaydı, sözleşme ve başvuru belgelerinde talep edilebilir; kesin şartı belgeyi kabul eden kurum belirler.' },
      { title: 'Belgenin aslı gerekli midir?', text: 'Ön inceleme için okunaklı kopya yeterli olabilir. Noter veya başvuru işlemi için aslın gerekip gerekmediği ayrıca doğrulanmalıdır.' },
      { title: 'Apostil ne zaman gerekir?', text: 'Belge başka bir ülkede kullanılacaksa ülke, evrak türü ve kabul makamına göre apostil veya farklı bir tasdik istenebilir.' },
      { title: 'Dijital teslim kabul edilir mi?', text: 'Ön kopya dijital gönderilebilir; ıslak imzalı veya noter tasdikli fiziksel nüsha ihtiyacını kabul makamı belirler.' },
      { title: 'Teslim süresi neye göre değişir?', text: 'Dil, sayfa yoğunluğu, uzmanlık alanı, biçim ve noter işlemi süreyi etkiler. Kesin plan belge görüldükten sonra verilir.' },
      { title: 'Ücret nasıl hesaplanır?', text: 'Tercüme bedeli ile noter ve diğer resmî masraflar farklı kalemlerdir; kapsam inceleme sonrasında açıklanır.' },
    ],
    faqs: [
      { question: 'Yeminli tercüman her noterde işlem yapabilir mi?', answer: 'Noter tasdiki genellikle tercümanın yemin kaydının bulunduğu noter üzerinden yürütülür.' },
      { question: 'Yeminli tercümenin geçerlilik süresi var mı?', answer: 'Çeviriden çok temel belgenin güncellik şartı önemlidir. Kabul kurumu belirli tarih aralığında düzenlenmiş belge isteyebilir.' },
      { question: 'Fotoğraf üzerinden teklif alınabilir mi?', answer: 'Evet. Tüm sayfaları görünen okunaklı fotoğraf veya PDF ön inceleme için yeterlidir.' },
    ],
  }),
  createGuidePage({
    slug: 'tibbi-tercumede-dikkat-edilmesi-gereken-7-hayati-detay',
    title: 'Tıbbi Tercümede Dikkat Edilmesi Gereken 7 Detay',
    description: 'Sağlık belgelerinde terminoloji, doz, ölçü, gizlilik ve uzman kontrolü açısından kritik yedi noktayı öğrenin.',
    intro: 'Tıbbi metinlerde belirsiz bir terim, atlanan olumsuzluk veya yanlış aktarılan ölçü ciddi sonuçlar doğurabilir. Çeviri alan uzmanlığı ve çok aşamalı kontrol gerektirir.',
    highlights: ['Tıbbi terminolojiyi doğrulayın', 'Doz ve ölçüleri kontrol edin', 'Hasta gizliliğini koruyun'],
    keywords: ['tibbi tercume detaylari', 'medikal tercume', 'saglik raporu tercumesi'],
    items: [
      { title: 'Alan uzmanlığına uygun tercüman seçin', text: 'Radyoloji, onkoloji, farmakoloji ve klinik araştırma gibi alt alanların terminolojisi farklıdır; dosya doğru uzmana atanmalıdır.' },
      { title: 'Terimlerin yerleşik karşılıklarını doğrulayın', text: 'Hastalık, anatomi, işlem ve cihaz adları güvenilir tıbbi kaynaklarla kontrol edilmeli; günlük karşılıklarla yetinilmemelidir.' },
      { title: 'Doz, ölçü ve birimleri ayrı kontrol edin', text: 'Ondalık işaretleri, mg ve ml gibi birimler, sıklık ifadeleri ve referans aralıkları kaynakla birebir karşılaştırılmalıdır.' },
      { title: 'Olumsuzluk ve ihtimal ifadelerini koruyun', text: '“Yoktur”, “dışlanamaz” veya “şüpheli” gibi ifadelerde küçük bir değişiklik klinik anlamı tersine çevirebilir.' },
      { title: 'Kısaltmaları bağlama göre çözün', text: 'Aynı kısaltma farklı branşlarda başka anlama gelebilir. Bağlam doğrulanmadan açık karşılık yazılmamalıdır.' },
      { title: 'Hasta verilerinin gizliliğini sağlayın', text: 'Kimlik, teşhis ve tedavi bilgilerine erişim proje ekibiyle sınırlandırılmalı; dosya aktarımı kontrollü yürütülmelidir.' },
      { title: 'Bağımsız kalite kontrolü uygulayın', text: 'Kritik rapor ve talimatlar ikinci bir uzman tarafından terminoloji, sayı, eksiksizlik ve biçim yönünden incelenmelidir.' },
    ],
    faqs: [
      { question: 'Tıbbi tercümeyi her tercüman yapabilir mi?', answer: 'Dil yeterliliğine ek olarak ilgili tıbbi alanın terminolojisi ve belge türü konusunda deneyim gerekir.' },
      { question: 'Sağlık raporu yeminli çevrilebilir mi?', answer: 'Evet. Sunulacağı kurum talep ederse yeminli tercüme ve gerektiğinde noter tasdiki hazırlanabilir.' },
      { question: 'Hasta bilgileri nasıl korunur?', answer: 'Dosyalar yalnızca yetkilendirilen proje ekibiyle paylaşılır ve kapsam dışı erişim sınırlandırılır.' },
    ],
  }),
];

const languagesIndexPage: LandingPage = {
  slug: 'hizmet-dillerimiz',
  kind: 'service',
  eyebrow: 'TERCÜME DİLLERİ',
  title: 'Hizmet Dillerimiz',
  description: 'Avrupa, Asya ve Orta Doğu dillerinde yazılı, sözlü, yeminli ve noter onaylı profesyonel tercüme desteği.',
  intro: 'YP Metropol Tercüme, yaygın dünya dillerinin yanında farklı dil çiftlerinde de belgenin alanına uygun tercüman eşleştirmesi yapar.',
  image: '/yp-metropol/home/interpreting-meeting-v2.webp',
  imageAlt: 'Farklı dillerde profesyonel tercüme hizmetleri',
  highlights: ['20’den fazla tercüme dili', 'Alanına uygun uzman eşleştirmesi', 'Yazılı, sözlü ve yeminli tercüme'],
  keywords: ['hizmet dillerimiz', 'tercume dilleri', 'yabanci dil tercume', 'yeminli tercume dilleri'],
  sections: [
    { title: 'Avrupa dilleri', paragraphs: ['İngilizce, Almanca, Fransızca, İspanyolca, İtalyanca, Portekizce, Hollandaca, Rusça, Lehçe, Sırpça, Yunanca ve Çekçe projelerinde yazılı ve sözlü destek sağlanır.'], bullets: ['Resmî ve hukuki belgeler', 'Akademik ve teknik metinler', 'Kurumsal iletişim ve lokalizasyon'] },
    { title: 'Asya ve Orta Doğu dilleri', paragraphs: ['Arapça, Çince, Japonca, Korece, Hintçe, İbranice, Azerice ve Özbekçe dosyalar yazı sistemi, hedef bölge ve kullanım amacı dikkate alınarak hazırlanır.'], bullets: ['Yeminli ve noter onaylı tercüme', 'Ticari ve teknik dokümanlar', 'Toplantı ve refakat tercümesi'] },
    { title: 'Doğru tercüman nasıl belirlenir?', paragraphs: ['Dil bilgisi tek başına yeterli değildir. Belgenin hukuk, tıp, mühendislik, finans veya akademi alanı incelenerek konuya hâkim uzman seçilir.'] },
    { title: 'Listede olmayan diller', paragraphs: ['İhtiyaç duyduğunuz dil listede görünmüyorsa dosya, dil çifti ve teslim beklentinizi iletin. Güncel tercüman uygunluğu kontrol edilerek size bilgi verilir.'] },
  ],
  faqs: [
    { question: 'Hangi dillerde yeminli tercüme yapılıyor?', answer: 'Yaygın dillerin çoğunda yeminli tercüman desteği bulunur; noter kaydı ve müsaitlik belgeyle birlikte kontrol edilir.' },
    { question: 'İki yabancı dil arasında tercüme yapılabilir mi?', answer: 'Dil çiftine ve konu alanına göre doğrudan veya kontrollü ara dil süreci planlanabilir.' },
    { question: 'Listede olmayan bir dil için teklif alabilir miyim?', answer: 'Evet. Dil çifti, belge ve teslim tarihini paylaşmanız halinde uygun uzman ağı kontrol edilir.' },
  ],
};

export const requestedLandingPages: readonly LandingPage[] = [
  ...languagePages,
  ...servicePages,
  ...locationPages,
  ...guidePages,
  languagesIndexPage,
];
