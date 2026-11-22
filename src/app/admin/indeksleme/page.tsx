'use client'
import React, { useEffect, useState } from 'react';
import { FiSend, FiTrash2, FiDownload, FiSearch, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

type Result = { url: string; type: string; ok: boolean; status: number; message: string; notifyTime?: string };

const DAILY_QUOTA = 200;

const AdminIndexing = () => {
  const [urlText, setUrlText] = useState('');
  const [type, setType] = useState<'URL_UPDATED' | 'URL_DELETED'>('URL_UPDATED');
  const [results, setResults] = useState<Result[]>([]);
  const [busy, setBusy] = useState(false);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [statusText, setStatusText] = useState('');

  useEffect(() => {
    fetch('/api/indexing')
      .then((r) => r.json())
      .then((d) => setConfigured(Boolean(d?.configured)))
      .catch(() => setConfigured(false));
  }, []);

  const urls = Array.from(new Set(urlText.split(/\s+/).map((u) => u.trim()).filter(Boolean)));

  const loadSitemap = async () => {
    setStatusText('Sitemap okunuyor...');
    try {
      const xml = await (await fetch('/sitemap.xml', { cache: 'no-store' })).text();
      const found = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1].trim());
      setUrlText(found.join('\n'));
      setStatusText(`${found.length} URL yüklendi. Günlük kota ${DAILY_QUOTA} — en önemlilerini bırakın.`);
    } catch {
      setStatusText('Sitemap okunamadı.');
    }
  };

  const submit = async () => {
    if (urls.length === 0) return;
    setBusy(true);
    setResults([]);
    const all: Result[] = [];
    // API tek istekte 50 URL kabul ediyor; parça parça gönder
    for (let i = 0; i < urls.length; i += 50) {
      const chunk = urls.slice(i, i + 50);
      setStatusText(`Gönderiliyor... ${Math.min(i + 50, urls.length)}/${urls.length}`);
      try {
        const res = await fetch('/api/indexing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ urls: chunk, type }),
        });
        const data = await res.json();
        if (data?.results) all.push(...data.results);
        else all.push(...chunk.map((url) => ({ url, type, ok: false, status: res.status, message: data?.message || 'Hata' })));
        if (data?.results?.some((r: Result) => r.status === 429)) break; // kota doldu
      } catch {
        all.push(...chunk.map((url) => ({ url, type, ok: false, status: 0, message: 'Ağ hatası' })));
      }
      setResults([...all]);
    }
    setStatusText(`${all.filter((r) => r.ok).length}/${all.length} URL başarıyla bildirildi.`);
    setBusy(false);
  };

  const checkStatus = async (url: string) => {
    const res = await fetch(`/api/indexing?url=${encodeURIComponent(url)}`);
    const data = await res.json();
    if (!data.success) return alert(data.message);
    const s = data.status;
    alert(
      s.notified
        ? `Son güncelleme bildirimi: ${s.latestUpdate?.notifyTime || '-'}\nSon silme bildirimi: ${s.latestRemove?.notifyTime || '-'}`
        : 'Bu URL için henüz Google\'a bildirim gönderilmemiş.'
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Google İndeksleme</h1>
          <p className="mt-1 text-sm text-gray-600">
            Yeni veya güncellenen sayfaları Google Indexing API ile anında bildirin. Haber ve hizmet bölgesi
            kaydettiğinizde bu işlem otomatik yapılır; burası toplu/manuel gönderim içindir.
          </p>
          {configured === false && (
            <p className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              Sunucuda Google anahtarı bulunamadı. <code>secrets/google-indexing-key.json</code> dosyasını veya
              GOOGLE_INDEXING_* ortam değişkenlerini kontrol edin.
            </p>
          )}
        </div>

        <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={loadSitemap} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <FiDownload /> Sitemap&apos;ten URL&apos;leri yükle
            </button>
            <select value={type} onChange={(e) => setType(e.target.value as typeof type)} className="rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900">
              <option value="URL_UPDATED">Yeni / güncellendi (URL_UPDATED)</option>
              <option value="URL_DELETED">Silindi (URL_DELETED)</option>
            </select>
            <span className="text-sm text-gray-500">{urls.length} URL</span>
          </div>

          <textarea
            value={urlText}
            onChange={(e) => setUrlText(e.target.value)}
            rows={10}
            placeholder={'Her satıra bir URL:\nhttps://ypmetropoltercume.com/haberler/ornek-haber'}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 font-mono text-sm text-gray-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          />

          <div className="flex items-center gap-3">
            <button
              onClick={submit}
              disabled={busy || urls.length === 0}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50 ${type === 'URL_DELETED' ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'}`}
            >
              {type === 'URL_DELETED' ? <FiTrash2 /> : <FiSend />} {busy ? 'Gönderiliyor...' : "Google'a gönder"}
            </button>
            {statusText && <span className="text-sm text-gray-600">{statusText}</span>}
          </div>
        </div>

        {results.length > 0 && (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-600">
                <tr><th className="px-4 py-3">Durum</th><th className="px-4 py-3">URL</th><th className="px-4 py-3">Mesaj</th><th className="px-4 py-3"></th></tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.url + r.type} className="border-t border-gray-100">
                    <td className="px-4 py-3">{r.ok ? <FiCheckCircle className="text-green-600" /> : <FiAlertCircle className="text-red-600" />}</td>
                    <td className="max-w-xs truncate px-4 py-3 font-mono text-gray-800">{r.url}</td>
                    <td className="px-4 py-3 text-gray-600">{r.message}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => checkStatus(r.url)} title="Google'daki bildirim durumunu sorgula" className="text-gray-500 hover:text-amber-600"><FiSearch /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminIndexing;
