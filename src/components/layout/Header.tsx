'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useTranslations } from '@/i18n/provider';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, locale, setLocale } = useTranslations();

  const navItems = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.services, href: '/sluzby' },
    { label: t.nav.about, href: '/o-nas' },
    { label: t.nav.references, href: '/referencie' },
    { label: t.nav.contact, href: '/kontakt' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/ecomud-logo.jpg"
              alt="ECOMUD group"
              width={160}
              height={48}
              className="h-10 lg:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-[#1B4332] transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#40916C] transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right side: Language switcher + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 text-xs">
              {locales.map((loc, i) => (
                <span key={loc} className="flex items-center">
                  <button
                    onClick={() => setLocale(loc)}
                    className={cn(
                      'px-1 py-0.5 uppercase transition-colors',
                      locale === loc
                        ? 'text-[#1B4332] font-bold'
                        : 'text-gray-400 hover:text-gray-700'
                    )}
                  >
                    {loc}
                  </button>
                  {i < locales.length - 1 && (
                    <span className="text-gray-300">|</span>
                  )}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/kontakt"
              className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              {t.nav.cta}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-700"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-[#1B4332] py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 py-2 px-3 mt-2 border-t border-gray-100">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => { setLocale(loc); setMobileOpen(false); }}
                  className={cn(
                    'px-2 py-1 text-sm uppercase rounded transition-colors',
                    locale === loc
                      ? 'bg-[#1B4332] text-white font-bold'
                      : 'text-gray-500 hover:bg-gray-100'
                  )}
                >
                  {loc}
                </button>
              ))}
            </div>
            <Link
              href="/kontakt"
              onClick={() => setMobileOpen(false)}
              className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-center font-medium px-5 py-3 rounded-lg mt-2 transition-colors"
            >
              {t.nav.cta}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
