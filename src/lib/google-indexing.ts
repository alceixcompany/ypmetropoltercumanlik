import { createSign } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { normalizeHost } from "@/lib/domain-seo";

/** Indexing API şimdilik sadece bu domain için açık. */
export const INDEXING_DOMAINS = ["ypmetropoltercume.com"];

/**
 * Google Indexing API (v3) — sunucu tarafı yardımcı.
 *
 * Ek npm paketi gerekmez: servis hesabı JWT'si Node'un kendi `crypto` modülüyle
 * imzalanır, erişim token'ı ~55 dk önbellekte tutulur.
 *
 * Kimlik bilgisi sırası:
 *  1) GOOGLE_INDEXING_CLIENT_EMAIL + GOOGLE_INDEXING_PRIVATE_KEY (env)
 *  2) GOOGLE_INDEXING_CREDENTIALS_BASE64 (JSON anahtarın base64 hali, env)
 *  3) GOOGLE_INDEXING_KEY_FILE yolu (varsayılan: secrets/google-indexing-key.json)
 */

export type IndexingType = "URL_UPDATED" | "URL_DELETED";

export type IndexingResult = {
  url: string;
  type: IndexingType;
  ok: boolean;
  status: number;
  message: string;
  notifyTime?: string;
};

type ServiceAccount = { client_email: string; private_key: string };

const SCOPE = "https://www.googleapis.com/auth/indexing";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const PUBLISH_URL = "https://indexing.googleapis.com/v3/urlNotifications:publish";
const METADATA_URL = "https://indexing.googleapis.com/v3/urlNotifications/metadata";

let cachedAccount: ServiceAccount | null = null;
let cachedToken: { value: string; expiresAt: number } | null = null;

function loadServiceAccount(): ServiceAccount {
  if (cachedAccount) return cachedAccount;

  const envEmail = process.env.GOOGLE_INDEXING_CLIENT_EMAIL;
  const envKey = process.env.GOOGLE_INDEXING_PRIVATE_KEY;
  if (envEmail && envKey) {
    cachedAccount = { client_email: envEmail, private_key: envKey.replace(/\\n/g, "\n") };
    return cachedAccount;
  }

  const b64 = process.env.GOOGLE_INDEXING_CREDENTIALS_BASE64;
  if (b64) {
    const json = JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
    cachedAccount = { client_email: json.client_email, private_key: json.private_key };
    return cachedAccount;
  }

  const keyFile = path.resolve(
    process.cwd(),
    process.env.GOOGLE_INDEXING_KEY_FILE || "secrets/google-indexing-key.json"
  );
  if (!existsSync(keyFile)) {
    throw new Error(
      `Google Indexing anahtarı bulunamadı. GOOGLE_INDEXING_CLIENT_EMAIL/GOOGLE_INDEXING_PRIVATE_KEY tanımlayın veya ${keyFile} dosyasını ekleyin.`
    );
  }
  const json = JSON.parse(readFileSync(keyFile, "utf8"));
  cachedAccount = { client_email: json.client_email, private_key: json.private_key };
  return cachedAccount;
}

export function isIndexingConfigured() {
  try {
    loadServiceAccount();
    return true;
  } catch {
    return false;
  }
}

function base64url(input: Buffer | string) {
  return Buffer.from(input).toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;

  const account = loadServiceAccount();
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({ iss: account.client_email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 })
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const signature = base64url(signer.sign(account.private_key));
  const assertion = `${header}.${claims}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(`Google token alınamadı: ${data.error_description || data.error || res.status}`);
  }
  cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000 };
  return cachedToken.value;
}

/** Sadece INDEXING_DOMAINS (www dahil) altındaki https URL'lere izin verir. */
export function isAllowedSiteUrl(rawUrl: string): boolean {
  try {
    const url = new URL(rawUrl);
    if (url.protocol !== "https:") return false;
    const host = normalizeHost(url.host);
    return INDEXING_DOMAINS.includes(host);
  } catch {
    return false;
  }
}

function explainError(status: number, apiMessage: string) {
  if (status === 403) {
    return `Yetki yok (403). Servis hesabını (${loadServiceAccount().client_email}) Search Console'da bu mülke "Sahip" olarak ekleyin. Google: ${apiMessage}`;
  }
  if (status === 429) return `Günlük kota doldu (429). Varsayılan limit günde 200 URL. Google: ${apiMessage}`;
  return `Google hata ${status}: ${apiMessage}`;
}

export async function publishUrl(url: string, type: IndexingType = "URL_UPDATED"): Promise<IndexingResult> {
  if (!isAllowedSiteUrl(url)) {
    return { url, type, ok: false, status: 400, message: "Bu URL ypmetropoltercume.com adresine ait değil." };
  }
  try {
    const token = await getAccessToken();
    const res = await fetch(PUBLISH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ url, type }),
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { url, type, ok: false, status: res.status, message: explainError(res.status, data?.error?.message || "") };
    }
    const meta = data?.urlNotificationMetadata;
    const notifyTime = type === "URL_DELETED" ? meta?.latestRemove?.notifyTime : meta?.latestUpdate?.notifyTime;
    return { url, type, ok: true, status: 200, message: "Google'a bildirildi.", notifyTime };
  } catch (error) {
    return { url, type, ok: false, status: 500, message: error instanceof Error ? error.message : "Bilinmeyen hata" };
  }
}

export async function getUrlStatus(url: string) {
  if (!isAllowedSiteUrl(url)) throw new Error("Bu URL ypmetropoltercume.com adresine ait değil.");
  const token = await getAccessToken();
  const res = await fetch(`${METADATA_URL}?url=${encodeURIComponent(url)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 404) return { url, notified: false };
  if (!res.ok) throw new Error(explainError(res.status, data?.error?.message || ""));
  return { url, notified: true, ...data };
}
