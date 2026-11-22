'use client';
import { useEffect } from 'react';

/** Root layout <html lang="tr"> olarak sabit; İngilizce sayfalarda dili düzeltir. */
export default function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = previous;
    };
  }, [lang]);
  return null;
}
