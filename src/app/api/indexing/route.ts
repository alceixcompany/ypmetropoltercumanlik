import { NextRequest, NextResponse } from "next/server";
import {
  getUrlStatus,
  isAllowedSiteUrl,
  isIndexingConfigured,
  publishUrl,
  INDEXING_DOMAINS,
  type IndexingType,
} from "@/lib/google-indexing";
import { normalizeHost } from "@/lib/domain-seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_URLS_PER_REQUEST = 50;
const URL_COOLDOWN_MS = 10 * 60 * 1000; // aynı URL 10 dk içinde tekrar gönderilmez
const recentlySent = new Map<string, number>();

/**
 * İstek ya sitenin kendi admin panelinden (aynı origin) ya da
 * x-indexing-secret başlığıyla (CLI / cron) gelmeli.
 */
function isAuthorized(req: NextRequest) {
  const secret = process.env.INDEXING_API_SECRET;
  const provided = req.headers.get("x-indexing-secret");
  if (secret && provided && provided === secret) return true;

  const origin = req.headers.get("origin") || req.headers.get("referer");
  if (!origin) return false;
  try {
    const host = normalizeHost(new URL(origin).host);
    const allowed = INDEXING_DOMAINS.includes(host);
    const isLocal = process.env.NODE_ENV !== "production" && (host === "localhost" || host === "127.0.0.1");
    return allowed || isLocal;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ success: false, message: "Yetkisiz istek." }, { status: 401 });
  }
  if (!isIndexingConfigured()) {
    return NextResponse.json(
      { success: false, message: "Google Indexing anahtarı sunucuda tanımlı değil." },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);
  const type: IndexingType = body?.type === "URL_DELETED" ? "URL_DELETED" : "URL_UPDATED";
  const urls: string[] = Array.from(
    new Set(
      (Array.isArray(body?.urls) ? body.urls : [body?.url])
        .filter((u: unknown): u is string => typeof u === "string")
        .map((u: string) => u.trim())
        .filter(Boolean)
    )
  );

  if (urls.length === 0) {
    return NextResponse.json({ success: false, message: "url veya urls alanı gerekli." }, { status: 400 });
  }
  if (urls.length > MAX_URLS_PER_REQUEST) {
    return NextResponse.json(
      { success: false, message: `Tek istekte en fazla ${MAX_URLS_PER_REQUEST} URL gönderilebilir.` },
      { status: 400 }
    );
  }

  const now = Date.now();
  const results = [];
  for (const url of urls) {
    if (!isAllowedSiteUrl(url)) {
      results.push({ url, type, ok: false, status: 400, message: "URL ypmetropoltercume.com adresine ait değil (https olmalı)." });
      continue;
    }
    const key = `${type}:${url}`;
    const last = recentlySent.get(key);
    if (last && now - last < URL_COOLDOWN_MS) {
      results.push({ url, type, ok: true, status: 208, message: "Son 10 dakikada zaten gönderildi, atlandı." });
      continue;
    }
    const result = await publishUrl(url, type);
    if (result.ok) recentlySent.set(key, now);
    results.push(result);
  }

  const okCount = results.filter((r) => r.ok).length;
  return NextResponse.json({ success: okCount === results.length, okCount, total: results.length, results });
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ success: false, message: "Yetkisiz istek." }, { status: 401 });
  }
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ success: true, configured: isIndexingConfigured() });
  }
  try {
    const status = await getUrlStatus(url);
    return NextResponse.json({ success: true, status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Bilinmeyen hata" },
      { status: 400 }
    );
  }
}
