'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from '@/i18n/provider';
import { Droplets, Factory, Cpu, Brain, Ruler, ArrowRight, Clock, Leaf, ShieldCheck } from 'lucide-react';
import HeroSection from '@/components/layout/HeroSection';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true },
  transition: { staggerChildren: 0.1 },
};

const serviceIcons = [Droplets, Factory, Cpu, Brain, Ruler];
const serviceKeys = ['bio', 'dehydration', 'automated', 'smartlake', 'survey'] as const;

export default function HomePage() {
  const { t } = useTranslations();

  return (
    <>
      {/* === HERO SECTION === */}
      <HeroSection video="/videos/hero-main.mp4" fullHeight>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight"
            >
              {t.hero.title}
              <br />
              <span className="text-[#74C69D]">{t.hero.titleAccent}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/sluzby"
                className="bg-[#40916C] hover:bg-[#52B788] text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all hover:shadow-lg hover:shadow-[#40916C]/30 inline-flex items-center gap-2"
              >
                {t.hero.ctaServices}
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/kontakt"
                className="border-2 border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all hover:bg-white/10"
              >
                {t.hero.ctaContact}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-white/60 rounded-full mt-1.5"
            />
          </div>
        </motion.div>
      </HeroSection>

      {/* === INTRO SECTION === */}
      <section className="py-16 lg:py-24 bg-[#FAFDF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            {...fadeInUp}
            className="text-lg text-[#4a5568] leading-relaxed"
          >
            {t.intro.text}
          </motion.p>
        </div>
      </section>

      {/* === SERVICES SECTION === */}
      <section className="py-16 lg:py-24 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1B4332]">{t.services.title}</h2>
            <p className="mt-3 text-lg text-[#4a5568]">{t.services.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {serviceKeys.map((key, i) => {
              const Icon = serviceIcons[i];
              const service = t.services[key];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    href={`/sluzby#${key}`}
                    className="group block h-full p-6 lg:p-8 rounded-2xl border border-gray-100 hover:border-[#40916C]/30 bg-white hover:bg-[#F0F7F0] transition-all duration-300 hover:shadow-lg hover:shadow-[#40916C]/10"
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#F0F7F0] group-hover:bg-[#40916C] flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-7 h-7 text-[#40916C] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-[#1B4332] group-hover:text-[#2D6A4F]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[#4a5568] text-sm leading-relaxed">
                      {service.short}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-[#40916C] text-sm font-medium group-hover:gap-2 transition-all">
                      {t.services.more}
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === WHY ECOMUD SECTION === */}
      <section className="py-16 lg:py-24 bg-[#F0F7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1B4332]">{t.why.title}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { data: t.why.experience, icon: Clock },
              { data: t.why.biological, icon: Leaf },
              { data: t.why.fullservice, icon: ShieldCheck },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#1B4332] mx-auto flex items-center justify-center mb-5">
                  <item.icon className="w-8 h-8 text-[#74C69D]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1B4332] mb-3">{item.data.title}</h3>
                <p className="text-[#4a5568] leading-relaxed">{item.data.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === REFERENCES TEASER === */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1B4332] mb-6">
              {t.references.title}
            </h2>
            <p className="text-lg text-[#4a5568] leading-relaxed mb-8">
              {t.references.subtitle}
            </p>
            <Link
              href="/referencie"
              className="inline-flex items-center gap-2 text-[#40916C] hover:text-[#2D6A4F] font-semibold text-lg transition-colors"
            >
              {t.references.cta}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* === CTA BAND === */}
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
