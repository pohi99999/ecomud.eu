'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from '@/i18n/provider';
import { Droplets, Factory, Cpu, Brain, Ruler, ArrowRight, CheckCircle } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const serviceDetails = [
  {
    key: 'bio' as const,
    icon: Droplets,
    color: '#40916C',
    items: [
      'Biologická úprava jazier – redukcia organického zaťaženia, prevencia kvitnenia rias',
      'Údržba priemyselných nádrží – biologická starostlivosť sedimentačných a chladiacich nádrží',
      'Úprava hnojiskových zásobníkov – rozklad organických látok, redukcia zápachu',
      'Dezodorácia kanálov – biologická úprava zápachu kanalizácií a otvorených vodných tokov',
      'Zlepšenie kvality zavlažovacej vody – biologické metódy zlepšenia kvality vody',
    ],
    target: 'Samosprávy, rybárske hospodárstva, priemyselní prevádzkovatelia, poľnohospodárske podniky, prevádzkovatelia ČOV.',
  },
  {
    key: 'dehydration' as const,
    icon: Factory,
    color: '#2D6A4F',
    items: [
      'Odvodňovacie vankúše – geotextilné vankúše rôznych veľkostí pre gravitačné odvodnenie',
      'Odvodňovacie korámy a kontajnery – systémy pre väčšie objemy, aj pre lokálne odvodnenie',
      'Textilné odvodňovacie systémy – trvanlivé riešenia pre priemyselné a komunálne aplikácie',
      'Brehová ochrana – protieerózna ochrana, stabilizácia brehov geotextilnou technológiou',
      'Stabilizácia dna – prevencia pohybu dnového materiálu a ochrana vodných stavieb',
    ],
    target: 'Stavebné firmy, vodohospodárske správy, samosprávy, ČOV, banské spoločnosti.',
  },
  {
    key: 'automated' as const,
    icon: Cpu,
    color: '#1B4332',
    items: [
      'Automatizované bagovanie v priemyselných sedimentáciach – programovateľné a diaľkovo ovládané stroje',
      'Diaľkovo ovládaná práca v nebezpečnom prostredí – chemické závody, elektrárne',
      'Pravidelné programy údržby – plánovaná preventívna čistenie nádrží',
      'Logistika nakladania s kalmi – preprava, odvodnenie a uloženie odstráneného kalu',
    ],
    target: 'Chemické a petrochemické závody, elektrárne, kovospracujúce podniky, ČOV.',
  },
  {
    key: 'smartlake' as const,
    icon: Brain,
    color: '#40916C',
    items: [
      'Digitálny denník – denné záznamy textom, obrázkami alebo hlasom, dostupný aj z mobilu',
      'Interaktívna mapa – body na mape vodného telesa s priloženými informáciami a fotkami',
      'Správa úloh a upomienky – plánovanie pravidelnej údržby, automatické pripomienky',
      'AI-asistent – inteligentné vyhľadávanie vo vedomostnej báze vodného telesa',
      'Generovanie správ – automatizované úradné a interné správy z vložených dát',
    ],
    target: 'Rybárske hospodárstva, rybárske spolky, samosprávy, vodohospodárske organizácie, výskumné ústavy.',
    future: 'IoT senzorová integrácia (bóje na meranie kvality vody, snímače teploty a kyslíka), prediktívna analytika a modul rybárskeho turizmu.',
  },
  {
    key: 'survey' as const,
    icon: Ruler,
    color: '#2D6A4F',
    items: [
      'Bodové meranie hrúbky kalov – rýchle merania na mieste',
      'Ultrazvukové zobrazovanie dna – detailné profily a 3D modely pomocou USV technológie',
      'Odber vzoriek vody a kalov – vzorky pre laboratórnu analýzu',
      'Dnové morfologické mapovanie – mapovanie tvaru, hĺbky a zloženia dna',
      'Diagnostické správy – podrobné hodnotenie s odporúčaniami a rozpočtom',
    ],
    target: 'Všetky sektory: samosprávy, priemyselné závody, poľnohospodárstvo, rybárske hospodárstva, environmentálne úrady, projekčné kancelárie.',
  },
];

export default function ServicesPage() {
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
            <h1 className="text-4xl lg:text-5xl font-bold text-white">{t.services.title}</h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 lg:py-16 bg-[#FAFDF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p {...fadeInUp} className="text-lg text-[#4a5568] leading-relaxed">
            ECOMUD ponúka riešenia v piatich vzájomne sa dopĺňajúcich oblastiach služieb. Každá sa zameriava na iný aspekt úpravy vody a kalov – spoločne pokrývajú celý životný cyklus vodných telies a priemyselných nádrží.
          </motion.p>
        </div>
      </section>

      {/* Service details */}
      {serviceDetails.map((service, idx) => {
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
                    <h3 className="text-lg font-semibold text-[#1B4332] mb-4">Služby</h3>
                    <ul className="space-y-3">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <CheckCircle className="w-5 h-5 text-[#40916C] flex-shrink-0 mt-0.5" />
                          <span className="text-[#4a5568] text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[#1B4332] mb-4">Pre koho?</h3>
                    <p className="text-[#4a5568] leading-relaxed">{service.target}</p>

                    {service.future && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-[#1B4332] mb-3">Budúci vývoj</h3>
                        <p className="text-[#4a5568] leading-relaxed">{service.future}</p>
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
