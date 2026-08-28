'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/seo';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') || false;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const contactOptions = [
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
        </svg>
      ),
      href: `https://wa.me/${siteConfig.whatsapp.replace('+', '')}`,
      color: 'bg-[#151412] border border-[rgba(199,155,67,0.42)]',
      angle: 220 // Sol üst (çeyrek daire)
    },
    {
      name: 'Telefon',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      ),
      href: `tel:${siteConfig.phone}`,
      color: 'bg-[#151412] border border-[rgba(199,155,67,0.42)]',
      angle: 260 // Sol üst (çeyrek daire)
    },
    {
      name: 'E-posta',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      href: `mailto:${siteConfig.email}`,
      color: 'bg-[#151412] border border-[rgba(199,155,67,0.42)]',
      angle: 180 // Sol (çeyrek daire)
    }
  ];

  // Admin sayfasında FloatingContact'ı gösterme
  if (isAdminPage) {
    return null;
  }

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  const radius = 110; // Daire yarıçapı

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Options - Quarter Circle Layout */}
      <div className="relative">
        {contactOptions.map((option, index) => {
          const angleRad = (option.angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * radius;
          const y = Math.sin(angleRad) * radius;
          
          return (
            <a
              key={option.name}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${option.color} text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ease-out transform absolute ${
                isOpen 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-0 pointer-events-none'
              } hover:scale-110 hover:rotate-12`}
              style={{
                left: `${x + 32}px`, // 32px = ana butonun yarı genişliği
                top: `${y + 32}px`, // 32px = ana butonun yarı yüksekliği
                transitionDelay: isOpen ? `${index * 150}ms` : '0ms',
                zIndex: isOpen ? 20 : -1
              }}
              title={option.name}
            >
              {option.icon}
            </a>
          );
        })}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={toggleMenu}
        className="relative z-30 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-[var(--lale-gold)] text-[var(--lale-emerald-deep)] shadow-2xl shadow-[rgba(212,175,55,0.28)] transition-all duration-300 hover:scale-110 hover:bg-[var(--lale-gold-soft)] active:scale-95"
        title="İletişim"
        type="button"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default FloatingContact;
