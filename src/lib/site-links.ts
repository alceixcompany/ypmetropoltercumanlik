/**
 * Her hizmet, dil ve bölgenin TEK kanonik adresi kök dizindeki sayfasıdır
 * (ör. /ingilizce-tercume, /noter-onayli-tercume, /harbiye-tercume).
 * Eski alt dizin adresleri next.config.ts içinde 301 ile buraya yönlenir.
 */
export const serviceHref = (slug: string) => `/${slug}`;
export const languageHref = (slug: string) => `/${slug}`;
export const areaLandingSlug = (areaSlug: string) => (areaSlug === 'sisli' ? 'sisli-tercume-burosu' : `${areaSlug}-tercume`);
export const areaHref = (areaSlug: string) => `/${areaLandingSlug(areaSlug)}`;
