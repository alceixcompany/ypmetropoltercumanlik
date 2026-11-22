// Tarayıcı (admin paneli) tarafı yardımcı: /api/indexing'e bildirim gönderir.
// Hata olsa bile kayıt işlemini bozmaz; sonucu konsola yazar.

export type IndexingType = "URL_UPDATED" | "URL_DELETED";

export function createSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/** Sayfa yolunu (/haberler/abc) mevcut domainle tam URL'ye çevirir. */
export function siteUrl(pathname: string) {
  const origin = typeof window !== "undefined" ? window.location.origin.replace("://www.", "://") : "";
  return `${origin}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export async function requestIndexing(urls: string | string[], type: IndexingType = "URL_UPDATED") {
  const list = (Array.isArray(urls) ? urls : [urls]).filter(Boolean);
  if (list.length === 0) return null;
  try {
    const res = await fetch("/api/indexing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls: list, type }),
    });
    const data = await res.json();
    if (data?.results) {
      for (const r of data.results) {
        console[r.ok ? "info" : "warn"](`[Google Indexing] ${r.ok ? "✓" : "✗"} ${r.url} — ${r.message}`);
      }
    }
    return data;
  } catch (error) {
    console.warn("[Google Indexing] bildirim gönderilemedi:", error);
    return null;
  }
}
