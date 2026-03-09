'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from '@/i18n/provider';

export default function Footer() {
  const { t } = useTranslations();

  return (
    <footer className="bg-[#1B4332] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Company info */}
          <div>
            <Image
              src="/images/ecomud-logo.jpg"
              alt="ECOMUD group"
              width={140}
              height={42}
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 text-sm mt-3">
              {t.contact.company.name}<br />
              {t.contact.company.address}<br />
              {t.contact.company.city}<br />
              {t.contact.company.ico}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.nav.services}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/sluzby#bio" className="hover:text-[#74C69D] transition-colors">
                  {t.services.bio.title}
                </Link>
              </li>
              <li>
                <Link href="/sluzby#dehydration" className="hover:text-[#74C69D] transition-colors">
                  {t.services.dehydration.title}
                </Link>
              </li>
              <li>
                <Link href="/sluzby#automated" className="hover:text-[#74C69D] transition-colors">
                  {t.services.automated.title}
                </Link>
              </li>
              <li>
                <Link href="/sluzby#smartlake" className="hover:text-[#74C69D] transition-colors">
                  {t.services.smartlake.title}
                </Link>
              </li>
              <li>
                <Link href="/sluzby#survey" className="hover:text-[#74C69D] transition-colors">
                  {t.services.survey.title}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.nav.contact}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>E-mail: info@ecomud.eu</li>
              <li>Tel: +421 XXX XXX XXX</li>
            </ul>
            <Link
              href="/kontakt"
              className="inline-block mt-4 bg-[#40916C] hover:bg-[#52B788] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              {t.nav.cta}
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 mt-10 pt-6">
          <p className="text-center text-xs text-gray-400">
            {t.footer.rights}
          </p>
          <p className="text-center text-xs text-gray-500 mt-1">
            {t.footer.services}
          </p>
        </div>
      </div>
    </footer>
  );
}
