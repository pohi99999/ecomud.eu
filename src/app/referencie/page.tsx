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

const sampleReferences = [
  {
    title: 'Biologická úprava jazera',
    location: 'Západné Slovensko',
    type: 'Biologická úprava kalov',
    description: 'Kompletná biologická úprava rekreačného jazera s rozlohou 12 ha. Aplikácia špeciálnych baktériových kultúr na redukciu organického zaťaženia a prevenciu kvitnenia rias.',
    result: '40% redukcia hrúbky kalov za 6 mesiacov, výrazné zlepšenie kvality vody.',
  },
  {
    title: 'Priemyselná sedimentačná nádrž',
    location: 'Česká republika',
    type: 'Automatizovaná údržba',
    description: 'Pravidelná údržba sedimentačnej nádrže chemického závodu pomocou diaľkovo ovládaných bagrov. Nebezpečné prostredie vylučovalo ľudský zásah.',
    result: 'Bezpečná a efektívna údržba bez prerušenia prevádzky.',
  },
  {
    title: 'Odvodňovací systém pre ČOV',
    location: 'Stredné Slovensko',
    type: 'Odvodňovacie systémy',
    description: 'Nasadenie geotextilných odvodňovacích vankúšov pre spracovanie kalov z čistiarne odpadových vôd. Gravitačné odvodnenie bez potreby energie.',
    result: '70% redukcia vodného obsahu, výrazné zníženie nákladov na likvidáciu.',
  },
  {
    title: 'Smart Lake pilotný projekt',
    location: 'Fiľakovo, Slovensko',
    type: 'Smart Lake systém',
    description: 'Pilotné nasadenie AI-založenej platformy pre manažment mestského jazera. Digitalizácia celej vedomostnej bázy a zavedenie automatizovaného monitoringu.',
    result: 'Kompletná digitalizácia 15 rokov prevádzkových dát, AI-asistent v prevádzke.',
  },
];

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
            {sampleReferences.map((ref, i) => (
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
                    Výsledok: <span className="font-normal text-[#4a5568]">{ref.result}</span>
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
