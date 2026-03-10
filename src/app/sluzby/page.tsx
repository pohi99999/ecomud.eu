'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from '@/i18n/provider';
import { Droplets, Factory, Cpu, Brain, Ruler, ArrowRight, CheckCircle } from 'lucide-react';
import HeroSection from '@/components/layout/HeroSection';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const serviceConfig = [
  { key: 'bio' as const, icon: Droplets, color: '#40916C' },
  { key: 'dehydration' as const, icon: Factory, color: '#2D6A4F' },
  { key: 'automated' as const, icon: Cpu, color: '#1B4332' },
  { key: 'smartlake' as const, icon: Brain, color: '#40916C' },
  { key: 'survey' as const, icon: Ruler, color: '#2D6A4F' },
];

export default function ServicesPage() {
  const { t } = useTranslations();

  return (
    <>
      {/* Header */}
      <HeroSection images={['/images/heroes/bio-1.jpg', '/images/heroes/dehy-1.jpg', '/images/heroes/auto-1.jpg']}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white">{t.services.title}</h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </motion.div>
        </div>
      </HeroSection>

      {/* Intro */}
      <section className="py-12 lg:py-16 bg-[#FAFDF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p {...fadeInUp} className="text-lg text-[#4a5568] leading-relaxed">
            {t.services.introDetail}
          </motion.p>
        </div>
      </section>

      {/* Service details */}
      {serviceConfig.map((service, idx) => {
        const serviceT = t.services[service.key];
        const Icon = service.icon;
        const isEven = idx % 2 === 0;

        return (
          <section
            key={service.key}
            id={service.key}
            className={`py-16 lg:py-24 ${isEven ? 'bg-white' : 'bg-[#F0F7F0]'}`}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div {...fadeInUp}>
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: service.color + '15' }}
                  >
                    <Icon className="w-7 h-7" style={{ color: service.color }} />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-[#1B4332]">
                    {serviceT.title}
                  </h2>
                </div>

                <p className="text-lg text-[#4a5568] mb-8 leading-relaxed max-w-3xl">
                  {serviceT.short}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1B4332] mb-4">{t.services.detailsLabel}</h3>
                    <ul className="space-y-3">
                      {serviceT.items.map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <CheckCircle className="w-5 h-5 text-[#40916C] flex-shrink-0 mt-0.5" />
                          <span className="text-[#4a5568] text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[#1B4332] mb-4">{t.services.targetLabel}</h3>
                    <p className="text-[#4a5568] leading-relaxed">{serviceT.target}</p>

                    {service.key === 'smartlake' && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-[#1B4332] mb-3">{t.services.futureLabel}</h3>
                        <p className="text-[#4a5568] leading-relaxed">{t.services.smartlake.future}</p>
                      </div>
                    )}

                    <Link
                      href="/kontakt"
                      className="inline-flex items-center gap-2 mt-6 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-medium px-6 py-3 rounded-xl transition-colors"
                    >
                      {t.nav.cta}
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}
    </>
  );
}
