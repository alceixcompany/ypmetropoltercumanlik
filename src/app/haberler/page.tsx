'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { FiArrowRight, FiCalendar, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Haber {
  id: string;
  slug?: string;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  imageUrl: string;
  tags: string[];
  featured: boolean;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const NewsPage = () => {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };
  
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const newsSnapshot = await getDocs(collection(db, 'haberler'));
        const newsData = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Haber[];
        const activeNews = newsData.filter(haber => haber.isActive);
        activeNews.sort((a, b) => (a.order || 0) - (b.order || 0));
        setHaberler(activeNews);
      } catch (error) {
        console.error('Haber verisi yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(haberler.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = haberler.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }
    try {
      setIsSubscribing(true);
      await addDoc(collection(db, 'newsletter_subscriptions'), {
        email: email.toLowerCase().trim(),
        createdAt: new Date().toISOString(),
        isActive: true,
        source: 'haberler_sayfasi'
      });
      setSubscriptionStatus('success');
      setSubscriptionMessage('E-posta adresiniz başarıyla kaydedildi! Teşekkürler.');
      setEmail('');
      setTimeout(() => {
        setSubscriptionStatus('idle');
        setSubscriptionMessage('');
      }, 5000);
    } catch (error) {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="lale-dark-section min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--lale-gold)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[rgba(251,250,246,0.72)] font-medium tracking-widest uppercase text-xs">Icerikler Yukleniyor</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3efe7]">
      <section className="relative flex min-h-[580px] items-end overflow-hidden bg-[#171512] pt-20 text-white sm:min-h-[640px]">
        <Image
          src="/yp-metropol/blog-hero-v2.webp"
          alt="YP Metropol tercüme rehberleri ve blog yazıları"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,11,10,0.48)_0%,rgba(12,11,10,0.22)_45%,rgba(12,11,10,0.04)_78%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 sm:px-7 sm:pb-20 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e1bd78]">Tercüme rehberi</p>
            <h1 className="mt-5 max-w-[11ch] font-serif text-[48px] font-normal leading-[1.02] tracking-[-0.035em] sm:text-[64px] lg:text-[76px]">
              Doğru belge, doğru süreç.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/76 sm:text-lg">
              Resmî evrak, vize, pasaport ve noter onaylı tercüme süreçleri hakkında anlaşılır rehberler.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <div className="mb-12 grid gap-6 border-b border-[#171614]/12 pb-9 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#916924]">Güncel içerikler</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#171614] sm:text-5xl">Rehberler ve duyurular</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#69635b] lg:justify-self-end">
              Belge hazırlığından noter ve apostil süreçlerine kadar sık sorulan konuları kısa ve anlaşılır biçimde derliyoruz.
            </p>
          </div>

          {haberler.length === 0 ? (
            <div className="rounded-[18px] border border-[#171614]/10 bg-[#fbfaf7] py-20 text-center">
              <h3 className="font-serif text-2xl text-[#171614]">Henüz yazı bulunmuyor</h3>
              <p className="mt-3 text-[#6b655d]">Yeni içerikler kısa süre içinde burada yayınlanacak.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {currentNews.map((haber, index) => (
                <motion.article
                  key={haber.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: Math.min(index * 0.04, 0.2) }}
                  className={`group flex min-h-full flex-col overflow-hidden rounded-[18px] border border-[#171614]/10 bg-[#fbfaf7] shadow-[0_16px_45px_rgba(23,22,20,0.06)] transition-shadow hover:shadow-[0_22px_55px_rgba(23,22,20,0.11)] ${index === 0 ? 'md:col-span-2' : ''}`}
                >
                  <div className={`relative overflow-hidden bg-[#d8d1c5] ${index === 0 ? 'aspect-[16/8] sm:aspect-[16/7]' : 'aspect-[16/10]'}`}>
                    {haber.imageUrl ? (
                      <Image
                        src={haber.imageUrl}
                        alt={haber.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes={index === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#2a261f] font-serif text-5xl text-[#d7af63]">
                        YP
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="rounded-full border border-white/25 bg-black/38 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                        {haber.tags?.[0] || 'Tercüme'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="mb-4 flex items-center gap-4 text-[11px] uppercase tracking-[0.14em] text-[#8d6a30]">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="h-3.5 w-3.5" />
                        <span>{new Date(haber.createdAt).toLocaleDateString('tr-TR')}</span>
                      </div>
                    </div>

                    <Link href={`/haberler/${haber.slug || createSlug(haber.title)}`}>
                      <h2 className={`font-serif leading-tight text-[#201e1a] transition-colors hover:text-[#916924] ${index === 0 ? 'text-3xl sm:text-4xl' : 'text-[27px]'}`}>
                        {haber.title}
                      </h2>
                    </Link>

                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#6b655d]">
                      {haber.description}
                    </p>

                    <Link 
                      href={`/haberler/${haber.slug || createSlug(haber.title)}`}
                      className="group/link mt-auto flex items-center justify-between border-t border-[#171614]/10 pt-5 text-sm font-semibold text-[#292722]"
                    >
                      Yazıyı okuyun
                      <FiArrowRight className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-3">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#171614]/15 text-[#292722] transition hover:border-[#916924] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <FiArrowRight className="rotate-180" />
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`h-11 w-11 rounded-full text-sm font-medium transition-all ${
                      currentPage === page
                        ? 'bg-[#1d1c19] text-white'
                        : 'border border-[#171614]/15 text-[#292722] hover:border-[#916924]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#171614]/15 text-[#292722] transition hover:border-[#916924] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <FiArrowRight />
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="lale-light-section px-5 pb-24">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[22px] border border-[rgba(195,149,58,0.18)] bg-[linear-gradient(135deg,#171717_0%,#262018_48%,#f8efe0_49%,#fffaf0_100%)] shadow-[0_28px_80px_rgba(17,17,17,0.14)]">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(195,149,58,0.82),transparent)]" />
          
          <div className="relative grid lg:grid-cols-2 gap-8 p-8 sm:p-12 items-center">
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(195,149,58,0.28)] bg-white/8 text-[var(--lale-gold)] mb-6">
                <FiMail className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[var(--lale-ivory)] mb-3">
                Bültenimize Abone Olun
              </h3>
              <p className="text-[rgba(251,250,246,0.68)] leading-relaxed text-sm sm:text-base">
                Tercüme süreçleri, belge hazırlığı ve yeni hizmet notlarından ilk siz haberdar olun.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubscription} className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  required
                  className="w-full rounded-full border border-[rgba(195,149,58,0.20)] bg-white/92 px-6 py-4 text-sm text-[var(--dream-dark)] placeholder:text-[rgba(109,102,93,0.58)] transition-all focus:border-[var(--lale-gold)] focus:outline-none"
                  disabled={isSubscribing}
                />
              </div>
              <button 
                type="submit"
                disabled={isSubscribing}
                className="w-full rounded-full bg-[var(--lale-gold)] py-4 text-xs font-bold tracking-[0.15em] text-black shadow-[0_15px_30px_rgba(195,149,58,0.16)] transition-all hover:bg-[var(--lale-gold-soft)] active:scale-[0.98]"
              >
                {isSubscribing ? 'KAYDEDİLİYOR...' : 'ŞİMDİ KAYDOL'}
              </button>
              
              {subscriptionMessage && (
                <p className={`text-center text-xs font-medium mt-1 ${
                  subscriptionStatus === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {subscriptionMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
