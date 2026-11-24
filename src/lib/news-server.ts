import { cache } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Haber } from '@/app/haberler/[slug]/NewsDetailClient';

export function createNewsSlug(title: string): string {
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
}

function toIso(value: unknown): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value !== null && 'toDate' in value && typeof (value as { toDate: unknown }).toDate === 'function') {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }
  return '';
}

/** Tüm haberleri sunucuda bir kez okur (aynı istek içinde önbelleklenir). */
export const getAllNews = cache(async (): Promise<Haber[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'haberler'));
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title ?? '',
        subtitle: data.subtitle ?? '',
        description: data.description ?? '',
        content: data.content ?? '',
        imageUrl: typeof data.imageUrl === 'string' ? data.imageUrl : '',
        slug: typeof data.slug === 'string' ? data.slug : '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        featured: Boolean(data.featured),
        isActive: data.isActive !== false,
        order: Number(data.order ?? 0),
        createdAt: toIso(data.createdAt),
        updatedAt: toIso(data.updatedAt),
      };
    });
  } catch (error) {
    console.error('Haberler sunucuda okunamadı:', error);
    return [];
  }
});

export async function getNewsBySlug(slug: string) {
  const all = await getAllNews();
  const primary = all.find((h) => h.isActive && (createNewsSlug(h.title) === slug)) ?? null;
  // Eski/özel slug alanıyla gelen istekleri başlıktan üretilen asıl adrese yönlendirmek için eşleştir
  const alt = primary
    ? null
    : all.find((h) => h.isActive && Boolean(h.title) && (h as Haber & { slug?: string }).slug === slug) ?? null;
  const haber = primary ?? alt;
  const canonicalSlug = alt ? createNewsSlug(alt.title) : slug;
  const related = haber
    ? all
        .filter((h) => h.isActive && h.id !== haber.id && h.tags.some((tag) => haber.tags.includes(tag)))
        .slice(0, 3)
    : [];
  return { haber, related, loaded: all.length > 0, canonicalSlug };
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}
