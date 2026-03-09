'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/i18n/provider';
import { Leaf, Lightbulb, ShieldCheck, Heart, Users, MapPin, Briefcase, Globe } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function AboutPage() {
  const { t } = useTranslations();

  const values = [
    { data: t.about.values.natural, icon: Leaf },
    { data: t.about.values.innovation, icon: Lightbulb },
    { data: t.about.values.reliability, icon: ShieldCheck },
    { data: t.about.values.fullcare, icon: Heart },
  ];

  const stats = [
    { value: t.about.stats.years, label: t.about.stats.yearsLabel, icon: Briefcase },
    { value: t.about.stats.team, label: t.about.stats.teamLabel, icon: Users },
    { value: t.about.stats.areas, label: t.about.stats.areasLabel, icon: MapPin },
    { value: t.about.stats.countries, label: t.about.stats.countriesLabel, icon: Globe },
  ];

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
            <h1 className="text-4xl lg:text-5xl font-bold text-white">{t.about.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 lg:py-24 bg-[#FAFDF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="space-y-6">
            <p className="text-lg text-[#4a5568] leading-relaxed">{t.about.intro}</p>
            <p className="text-lg text-[#4a5568] leading-relaxed">{t.about.intro2}</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 bg-[#1B4332]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-[#74C69D] mx-auto mb-3" />
                <div className="text-4xl lg:text-5xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1B4332]">{t.about.values.title}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {values.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-2xl bg-[#F0F7F0]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1B4332] flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-[#74C69D]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1B4332] mb-2">{item.data.title}</h3>
                  <p className="text-[#4a5568] leading-relaxed">{item.data.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
