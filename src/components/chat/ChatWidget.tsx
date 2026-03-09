'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { useTranslations } from '@/i18n/provider';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const knowledgeBase: Record<string, string[]> = {
  'biologick|kal|iszap|biol': [
    'Ponúkame biologickú úpravu kalov – prirodzenou cestou znižujeme organické zaťaženie jazier, priemyselných nádrží a hnojiskových zásobníkov. Bez bagrovania, špeciálnymi baktériovými kultúrami.',
  ],
  'odvodn|dehydrat|texti|vankúš': [
    'Naše odvodňovacie systémy využívajú textilnú technológiu – gravitačné odvodňovacie vankúše a korámy, brehovú ochranu. Minimálna spotreba energie, jednoduché nasadenie.',
  ],
  'automat|bagr|nádrž|diaľkov': [
    'Automatizovaná údržba nádrží zahŕňa diaľkovo ovládané bagre pre odstraňovanie kalov v priemyselných nádržiach – aj tam, kde je ľudský zásah rizikový alebo neefektívny.',
  ],
  'smart|lake|jazero|okos|monitor|AI|digitáln': [
    'Smart Lake systém je naša AI-založená platforma pre manažment vodných telies. Obsahuje digitálny denník, interaktívnu mapu, správu úloh a inteligentný asistent. Neskôr pridáme IoT senzory a prediktívnu analytiku.',
  ],
  'prieskum|diagnostik|meranie|vzork|ultrazvu': [
    'Ponúkame profesionálne prieskumy a diagnostiku: bodové merania hrúbky kalov, ultrazvukové zobrazovanie dna, odber vzoriek a kompletné diagnostické správy.',
  ],
  'cen|ponuk|stoj|koľko|pric': [
    'Pre cenovú ponuku nás prosím kontaktujte cez formulár na stránke /kontakt alebo na info@ecomud.eu. Každý projekt je individuálny, radi pripravíme ponuku na mieru.',
  ],
  'kontakt|adres|telefón|email': [
    'ECOMUD group s.r.o., Tulipánova 990/36, 986 01 Fiľakovo, Slovensko. IČO: 51028379. E-mail: info@ecomud.eu. Použite aj náš kontaktný formulár na stránke /kontakt.',
  ],
  'kto|o nás|tím|skúsen|rok': [
    'ECOMUD group s.r.o. vznikla v roku 2017. Náš medzinárodný tím má 20+ rokov skúseností v úprave kalov, vodnom hospodárstve a environmentálnych technológiách. Pôsobíme v 3 krajinách: Slovensko, Česko, Rakúsko.',
  ],
};

function findAnswer(query: string): string {
  const q = query.toLowerCase();
  for (const [pattern, answers] of Object.entries(knowledgeBase)) {
    const keywords = pattern.split('|');
    if (keywords.some((kw) => q.includes(kw))) {
      return answers[0];
    }
  }
  return 'Ďakujem za otázku! Bohužiaľ, na túto tému nemám konkrétnu odpoveď. Odporúčam kontaktovať nás priamo cez formulár na stránke /kontakt alebo na info@ecomud.eu – radi vám pomôžeme osobne.';
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslations();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: t.chat.greeting }]);
    }
  }, [isOpen, messages.length, t.chat.greeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    setTimeout(() => {
      const answer = findAnswer(userMessage);
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <>
      {/* Chat bubble button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
            aria-label="Open chat"
          >
            <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#40916C] rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1B4332] text-white p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#40916C] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/ecomud-logo.jpg"
                    alt="ECOMUD"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-cover brightness-0 invert"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{t.chat.title}</h3>
                  <span className="text-xs text-[#74C69D] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#74C69D] rounded-full inline-block" />
                    Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#1B4332] text-white rounded-br-sm'
                        : 'bg-[#F0F7F0] text-[#1a1a2e] rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#F0F7F0] px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-[#40916C] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-[#40916C] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-[#40916C] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-100 flex-shrink-0">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.chat.placeholder}
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#40916C] focus:ring-1 focus:ring-[#40916C]/20 bg-gray-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="bg-[#1B4332] hover:bg-[#2D6A4F] disabled:bg-gray-300 text-white p-2.5 rounded-xl transition-colors"
                  aria-label={t.chat.send}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
