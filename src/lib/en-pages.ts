/**
 * English landing pages for foreigners, expats and international companies in Istanbul.
 * Each page has a single canonical URL under /en and, where one exists, an hreflang link
 * to its Turkish counterpart (trPath).
 */

export type EnglishSection = { title: string; paragraphs: readonly string[]; bullets?: readonly string[] };
export type EnglishFaq = { question: string; answer: string };

export type EnglishPage = {
  slug: string;
  trPath?: string;
  eyebrow: string;
  title: string; // <title> and H1
  description: string; // meta description
  intro: string;
  image: string;
  highlights: readonly string[];
  sections: readonly EnglishSection[];
  faqs: readonly EnglishFaq[];
  keywords: readonly string[];
};

const contactFaq: EnglishFaq = {
  question: 'Can I send my documents online?',
  answer: 'Yes. Send a clear photo or PDF of your document via WhatsApp or e-mail. We review it and reply with the price, the delivery time and whether a sworn, notarized or apostilled translation is needed. Originals are only required when the receiving authority asks for them.',
};

export const englishHome = {
  title: 'Translation Office in Istanbul – Sworn & Notarized Translation | YP Metropol',
  h1: 'Translation office in Istanbul for sworn, notarized and certified translations',
  description: 'English-speaking translation office in Mecidiyeköy, Şişli, Istanbul. Sworn and notarized translation, apostille guidance, passport translation and interpreters. Send documents online for a quick quote.',
  intro: 'YP Metropol Tercüme is a professional translation office in Mecidiyeköy, Istanbul. We help foreigners, expats, students and international companies prepare documents that Turkish authorities, consulates, universities and courts will accept – in more than 20 languages.',
};

export const englishPages: readonly EnglishPage[] = [
  {
    slug: 'sworn-translator-istanbul',
    trPath: '/yeminli-tercume',
    eyebrow: 'SWORN TRANSLATION',
    title: 'Sworn Translator in Istanbul',
    description: 'Sworn (certified) translation in Istanbul for passports, diplomas, birth and marriage certificates, court and company documents. Online quote, office in Mecidiyeköy, Şişli.',
    intro: 'A sworn translation in Turkey is prepared and signed by a translator who has taken an oath before a Turkish notary. It is the standard format requested by Turkish public offices, courts, universities and many consulates.',
    image: '/yp-metropol/document.webp',
    highlights: ['Translators sworn before Turkish notaries', '20+ languages to and from Turkish', 'Notarization and apostille arranged on request'],
    keywords: ['sworn translator istanbul', 'certified translation istanbul', 'sworn translation turkey', 'turkish sworn translator'],
    sections: [
      {
        title: 'What is a sworn translation in Turkey?',
        paragraphs: [
          'In Turkey, a “yeminli tercüme” (sworn translation) is a translation signed and stamped by a translator registered with a notary. The translator certifies that the translation is complete and faithful to the original.',
          'Some institutions accept the sworn translation on its own; others additionally require the translator’s signature to be certified by a notary (notarized translation) or the original document to carry an apostille. We check which format your receiving authority needs before we start.',
        ],
      },
      {
        title: 'Documents we translate',
        paragraphs: ['We translate personal, academic, legal and corporate documents between Turkish and English, Arabic, Russian, German, French, Persian and many other languages.'],
        bullets: ['Passports and ID cards', 'Birth, marriage and divorce certificates', 'Diplomas, transcripts and school records', 'Criminal record certificates', 'Court decisions and powers of attorney', 'Company documents and contracts'],
      },
      {
        title: 'How it works',
        paragraphs: ['Send your document online, receive a quote and delivery time, approve, and collect the signed translation at our Mecidiyeköy office or receive it by courier. Short personal documents can often be completed on the same day.'],
        bullets: ['1. Send a photo or PDF', '2. Get price and delivery time', '3. Translation, proofreading and signature', '4. Pick up or courier delivery'],
      },
    ],
    faqs: [
      { question: 'Is a sworn translation the same as a certified translation?', answer: 'In practice, yes. What English-speaking countries call a “certified translation” corresponds to a sworn translation (yeminli tercüme) in Turkey. If the document will be used abroad, the receiving country may have additional requirements, which we help you check.' },
      { question: 'How long does a sworn translation take?', answer: 'Short documents such as passports or certificates are usually ready the same or next business day. Longer or technical documents take longer; we confirm the exact time with your quote.' },
      contactFaq,
    ],
  },
  {
    slug: 'notarized-translation-istanbul',
    trPath: '/noter-onayli-tercume',
    eyebrow: 'NOTARIZED TRANSLATION',
    title: 'Notarized Translation in Istanbul',
    description: 'Notarized translation (noter onaylı tercüme) in Istanbul for residence permits, marriage, property, banking and court procedures. Sworn translators and notary process handled for you.',
    intro: 'A notarized translation (noter onaylı tercüme) is a sworn translation whose translator signature is certified by a Turkish notary. It is required for many official procedures in Turkey, including residence permits, marriage applications, title deed transactions and bank accounts.',
    image: '/yp-metropol/document.webp',
    highlights: ['Sworn translation + notary certification', 'Notary process handled by us', 'Accepted by Turkish public offices'],
    keywords: ['notarized translation istanbul', 'noter onayli tercume', 'notary translation turkey', 'notarized passport translation'],
    sections: [
      {
        title: 'When do you need a notarized translation?',
        paragraphs: ['Turkish authorities usually ask for notarized translations of foreign documents. Typical cases include:'],
        bullets: ['Residence permit (ikamet) applications', 'Marriage at a Turkish marriage office', 'Title deed (tapu) and property purchases', 'Opening a bank account or company', 'Court cases and powers of attorney', 'Work permits and school enrolment'],
      },
      {
        title: 'How the notary step works',
        paragraphs: [
          'Our sworn translator prepares and signs the translation. The translation is then taken to the notary where the translator is registered, and the notary certifies the translator’s signature. We coordinate this step, so you do not need to visit the notary yourself.',
          'Notary fees are set by the official Turkish notary tariff and depend on the length of the document; we show them separately in your quote.',
        ],
      },
    ],
    faqs: [
      { question: 'Do I need to come to the notary?', answer: 'No. For notarized translations, the translator’s signature is certified, not yours, so we handle the notary step for you.' },
      { question: 'Does a notarized translation need an apostille?', answer: 'Not always. An apostille is placed on the original document by the issuing country when it will be used in another Hague Convention country. We tell you whether your document needs one before translation.' },
      contactFaq,
    ],
  },
  {
    slug: 'apostille-istanbul',
    trPath: '/apostil-onayi',
    eyebrow: 'APOSTILLE',
    title: 'Apostille and Document Legalization in Istanbul',
    description: 'Apostille guidance in Istanbul for diplomas, birth and marriage certificates, criminal records and notarial documents. We plan the correct order of apostille, translation and notarization.',
    intro: 'An apostille is a certificate that confirms the signature and seal on a public document so it is recognised in other countries that are party to the 1961 Hague Apostille Convention. Turkey is a party to the Convention.',
    image: '/yp-metropol/document.webp',
    highlights: ['Correct order of apostille and translation', 'Turkish and foreign documents', 'Guidance for non-Hague countries'],
    keywords: ['apostille istanbul', 'apostille turkey', 'document legalization istanbul', 'apostil onayi'],
    sections: [
      {
        title: 'Turkish documents to be used abroad',
        paragraphs: [
          'In Turkey, apostilles for administrative documents are generally issued by governorships and district governorships, while judicial documents are apostilled by the justice commissions of the courts. Documents prepared at a notary can also be apostilled.',
          'Depending on the destination country, the translation may need to be done before or after the apostille, and sometimes the translation itself must be apostilled. We plan this order with you so you do not pay twice.',
        ],
        bullets: ['Diplomas and transcripts', 'Birth and marriage certificates', 'Criminal record certificates', 'Powers of attorney and notarial deeds'],
      },
      {
        title: 'Foreign documents to be used in Turkey',
        paragraphs: ['Documents issued in another Hague Convention country should carry that country’s apostille before they are translated into Turkish. Documents from countries outside the Convention usually require consular legalization instead.'],
      },
    ],
    faqs: [
      { question: 'Can you get the apostille for me?', answer: 'We guide you through which office issues the apostille for your document and coordinate the translation and notary steps around it. Requirements change, so we always confirm them with the receiving authority.' },
      contactFaq,
    ],
  },
  {
    slug: 'passport-translation-istanbul',
    trPath: '/pasaport-tercumesi',
    eyebrow: 'PASSPORT TRANSLATION',
    title: 'Passport Translation in Istanbul',
    description: 'Notarized Turkish translation of your passport for residence permits, marriage, title deeds, bank accounts and notary procedures in Istanbul. Usually ready the same day.',
    intro: 'A notarized Turkish translation of your passport is one of the most frequently requested documents for foreigners in Turkey. Names, place of birth and passport numbers must match your other documents exactly.',
    image: '/yp-metropol/document.webp',
    highlights: ['Usually ready the same day', 'Name spelling checked against your other documents', 'Notarized for official use'],
    keywords: ['passport translation istanbul', 'notarized passport translation turkey', 'passport translation for residence permit'],
    sections: [
      {
        title: 'Where is a passport translation required?',
        paragraphs: ['Turkish institutions commonly request a notarized Turkish translation of a foreign passport for:'],
        bullets: ['Residence permit applications', 'Marriage applications', 'Title deed and property transactions', 'Notary procedures and powers of attorney', 'Opening bank accounts and companies', 'Vehicle registration and utilities'],
      },
      {
        title: 'Consistent spelling of names',
        paragraphs: ['Names written in Arabic, Cyrillic, Persian or other non-Latin scripts can be transliterated in different ways. We keep the spelling consistent with your residence permit, previous translations and other official records to avoid rejections.'],
      },
    ],
    faqs: [
      { question: 'Do you need my original passport?', answer: 'For the translation itself a clear colour copy is usually enough. Some notaries may ask to see the original; we let you know in advance.' },
      contactFaq,
    ],
  },
  {
    slug: 'residence-permit-translation',
    eyebrow: 'RESIDENCE PERMIT',
    title: 'Document Translation for Turkish Residence Permits',
    description: 'Notarized translations for Turkish residence permit (ikamet) applications in Istanbul: passport, birth and marriage certificates, student and family documents.',
    intro: 'Residence permit applications in Turkey are made to the Presidency of Migration Management. Foreign-language supporting documents are generally requested with a notarized Turkish translation.',
    image: '/yp-metropol/document.webp',
    highlights: ['Passport and civil status documents', 'Family and student residence permits', 'Fast delivery for appointment dates'],
    keywords: ['residence permit translation istanbul', 'ikamet translation', 'turkish residence permit documents', 'family residence permit translation'],
    sections: [
      {
        title: 'Documents often requested',
        paragraphs: ['The exact list depends on the permit type (short-term, family, student, long-term). Commonly translated documents include:'],
        bullets: ['Passport', 'Birth certificate for children', 'Marriage certificate for family permits', 'Student certificate or acceptance letter', 'Bank statements and income documents', 'Criminal record certificate (for some permit types)'],
      },
      {
        title: 'Plan around your appointment',
        paragraphs: ['Tell us your appointment date and we will schedule the translations and notary certification so everything is ready in time. Families can send all documents at once.'],
      },
    ],
    faqs: [
      { question: 'Do civil status documents need an apostille?', answer: 'Foreign birth or marriage certificates usually need an apostille (or consular legalization) from the issuing country before they are translated. We check your documents before translation.' },
      contactFaq,
    ],
  },
  {
    slug: 'marriage-in-turkey-translation',
    trPath: '/yabanci-evlilik',
    eyebrow: 'MARRIAGE IN TURKEY',
    title: 'Getting Married in Turkey as a Foreigner – Translation and Interpreter',
    description: 'Translation of marriage documents and sworn interpreter for foreigners getting married in Istanbul: certificate of no impediment, birth certificate, passport and ceremony interpreting.',
    intro: 'Foreigners can marry at a Turkish municipal marriage office. The application requires foreign documents translated into Turkish, and if one partner does not speak Turkish, a sworn interpreter must be present at the ceremony.',
    image: '/yp-metropol/interpreting.webp',
    highlights: ['Document translation and notarization', 'Sworn interpreter at the ceremony', 'Guidance on apostille requirements'],
    keywords: ['marriage in turkey foreigner', 'marriage documents translation istanbul', 'interpreter for wedding turkey', 'yabanci evlilik'],
    sections: [
      {
        title: 'Typical documents',
        paragraphs: ['Requirements vary between municipalities and nationalities, so always confirm the list with the marriage office. Typically requested are:'],
        bullets: ['Certificate of no impediment (single status), apostilled or legalized', 'Birth certificate', 'Passport', 'Divorce decree, if previously married', 'Health report from a Turkish health centre', 'Photographs'],
      },
      {
        title: 'Interpreter at the ceremony',
        paragraphs: ['If either partner does not speak Turkish, the marriage officer will ask for a sworn interpreter to translate the ceremony. We provide interpreters for English, Arabic, Russian, Persian, German, French and other languages.'],
      },
    ],
    faqs: [
      { question: 'Will my marriage in Turkey be recognised in my country?', answer: 'Turkish marriage certificates can be issued in an international format and apostilled. Recognition depends on your country’s rules, so check with your consulate before the wedding.' },
      contactFaq,
    ],
  },
  {
    slug: 'interpreter-istanbul',
    trPath: '/sozlu-tercume',
    eyebrow: 'INTERPRETING',
    title: 'Interpreter in Istanbul',
    description: 'Professional interpreters in Istanbul for notary appointments, business meetings, factory visits, hospitals, courts and conferences. Consecutive and simultaneous interpreting.',
    intro: 'We provide consecutive and simultaneous interpreters in Istanbul for business meetings, notary and title deed appointments, hospital visits, court hearings and conferences.',
    image: '/yp-metropol/interpreting.webp',
    highlights: ['Consecutive and simultaneous', 'Notary and title deed appointments', 'Business, medical and legal settings'],
    keywords: ['interpreter istanbul', 'translator for notary istanbul', 'business interpreter istanbul', 'simultaneous interpreter turkey'],
    sections: [
      {
        title: 'Where we interpret',
        paragraphs: ['Our interpreters are selected according to the subject of the meeting and the language pair.'],
        bullets: ['Notary appointments and powers of attorney', 'Title deed (tapu) office appointments', 'Business meetings and negotiations', 'Factory and site visits', 'Hospital and clinic visits', 'Conferences and training sessions'],
      },
      {
        title: 'Booking an interpreter',
        paragraphs: ['Share the date, time, address, language pair and topic of the meeting. For notary procedures, we check that the interpreter is sworn at the relevant notary. Sending documents or presentations in advance helps the interpreter prepare.'],
      },
    ],
    faqs: [
      { question: 'How far in advance should I book?', answer: 'For common languages a few days’ notice is usually enough. For conferences, rare languages or simultaneous interpreting, book as early as possible.' },
      contactFaq,
    ],
  },
];

export function getEnglishPage(slug: string) {
  return englishPages.find((page) => page.slug === slug);
}

/** Turkish path → English path, for hreflang on Turkish pages */
export const englishAlternateForTrPath: Record<string, string> = Object.fromEntries(
  englishPages.filter((page) => page.trPath).map((page) => [page.trPath as string, `/en/${page.slug}`]),
);
