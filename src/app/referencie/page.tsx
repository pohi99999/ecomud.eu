'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/i18n/provider';
import { MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ReferencesPage() {
  const { t } = useTranslations();

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white">{t.references.title}</h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              {t.references.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* References grid */}
      <section className="py-16 lg:py-24 bg-[#FAFDF7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {t.references.items.map((ref, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-2 text-sm text-[#40916C] font-medium mb-3">
                  <span className="px-3 py-1 bg-[#F0F7F0] rounded-full">{ref.type}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1B4332] mb-2">{ref.title}</h3>
                <div className="flex items-center gap-1.5 text-sm text-[#4a5568] mb-4">
                  <MapPin size={14} />
                  {ref.location}
                </div>
                <p className="text-[#4a5568] text-sm leading-relaxed mb-4">{ref.description}</p>
                <div className="bg-[#F0F7F0] rounded-lg p-3">
                  <p className="text-sm font-medium text-[#1B4332]">
                    {t.references.resultLabel}: <span className="font-normal text-[#4a5568]">{ref.result}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-[#1B4332] to-[#2D6A4F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
              {t.nav.cta}
            </h2>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-white text-[#1B4332] font-semibold px-8 py-4 rounded-xl text-lg hover:bg-[#F0F7F0] transition-colors"
            >
              {t.hero.ctaContact}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
