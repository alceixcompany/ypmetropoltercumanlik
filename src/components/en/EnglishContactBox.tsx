import { FiMail, FiMapPin, FiMessageCircle, FiPhone } from 'react-icons/fi';
import type { SiteConfig } from '@/lib/domain-seo';

export default function EnglishContactBox({ site, topic }: { site: SiteConfig; topic: string }) {
  const message = encodeURIComponent(`Hello, I would like a quote for ${topic}.`);
  return (
    <aside className="rounded-[20px] border border-[rgba(195,149,58,0.18)] bg-white/88 p-7 shadow-[0_18px_50px_rgba(17,17,17,0.07)]">
      <h2 className="font-serif text-2xl text-[var(--dream-dark)]">Get a quote</h2>
      <p className="mt-3 text-sm leading-7 text-[var(--dream-text)]">Send a photo or PDF of your document. We reply with price and delivery time.</p>
      <div className="mt-6 space-y-4 text-sm text-[var(--dream-text)]">
        <a href={`https://wa.me/${site.whatsapp.replace('+', '')}?text=${message}`} className="flex items-center gap-3 hover:text-[var(--lale-gold)]">
          <FiMessageCircle className="h-5 w-5 text-[var(--lale-gold)]" /> WhatsApp {site.whatsappDisplay}
        </a>
        <a href={`tel:${site.phone}`} className="flex items-center gap-3 hover:text-[var(--lale-gold)]">
          <FiPhone className="h-5 w-5 text-[var(--lale-gold)]" /> {site.phoneDisplay}
        </a>
        <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-[var(--lale-gold)]">
          <FiMail className="h-5 w-5 text-[var(--lale-gold)]" /> {site.email}
        </a>
        <p className="flex items-start gap-3">
          <FiMapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--lale-gold)]" /> {site.address.display}
        </p>
      </div>
      <a href={`https://wa.me/${site.whatsapp.replace('+', '')}?text=${message}`} className="lale-gold-button mt-8 w-full justify-center">Send documents on WhatsApp</a>
    </aside>
  );
}
