#!/usr/bin/env node
/**
 * Google Indexing API — komut satırı aracı (ek paket gerekmez)
 *
 * Kullanım:
 *   node scripts/google-index.mjs https://ypmetropoltercume.com/haberler/ornek
 *   node scripts/google-index.mjs --delete https://ypmetropoltercume.com/eski-sayfa
 *   node scripts/google-index.mjs --sitemap https://ypmetropoltercume.com/sitemap.xml --limit 200
 *   node scripts/google-index.mjs --status https://ypmetropoltercume.com/haberler/ornek
 *
 * Anahtar: GOOGLE_INDEXING_KEY_FILE (varsayılan secrets/google-indexing-key.json)
 */
import { createSign } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const keyFile = path.resolve(process.env.GOOGLE_INDEXING_KEY_FILE || "secrets/google-indexing-key.json");
if (!existsSync(keyFile)) {
  console.error(`Anahtar dosyası yok: ${keyFile}`);
  process.exit(1);
}
const { client_email, private_key } = JSON.parse(readFileSync(keyFile, "utf8"));

const b64 = (v) => Buffer.from(v).toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");

async function getToken() {
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${b64(
    JSON.stringify({
      iss: client_email,
      scope: "https://www.googleapis.com/auth/indexing",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  )}`;
  const signature = b64(createSign("RSA-SHA256").update(unsigned).sign(private_key));
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`Token alınamadı: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function main() {
  const token = await getToken();
  console.log(`Servis hesabı: ${client_email}\n`);

  if (flag("--status")) {
    const url = args[args.indexOf("--status") + 1];
    const res = await fetch(
      `https://indexing.googleapis.com/v3/urlNotifications/metadata?url=${encodeURIComponent(url)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(res.status, JSON.stringify(await res.json(), null, 2));
    return;
  }

  let urls = args.filter((a) => a.startsWith("http") && a !== option("--sitemap"));
  const sitemap = option("--sitemap");
  if (sitemap) {
    const xml = await (await fetch(sitemap)).text();
    urls.push(...Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1].trim()));
  }
  urls = Array.from(new Set(urls)).slice(0, Number(option("--limit", 200)));
  if (urls.length === 0) {
    console.log("URL verilmedi. Örnek: node scripts/google-index.mjs https://ypmetropoltercume.com/");
    return;
  }

  const type = flag("--delete") ? "URL_DELETED" : "URL_UPDATED";
  let ok = 0;
  for (const url of urls) {
    const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ url, type }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      ok++;
      console.log(`✓ ${url}`);
    } else {
      console.log(`✗ ${url} → ${res.status} ${data?.error?.message || ""}`);
      if (res.status === 429) {
        console.log("Günlük kota doldu, durduruluyor.");
        break;
      }
    }
  }
  console.log(`\n${ok}/${urls.length} URL bildirildi (${type}).`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
