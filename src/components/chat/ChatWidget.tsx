'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { useTranslations } from '@/i18n/provider';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Multilingual keyword patterns mapped to answer keys
const topicPatterns: { keywords: string[]; answerKey: string }[] = [
  {
    keywords: [
      // general services
      'služb', 'sluzb', 'slu\u017eb', 'ponúk', 'ponuk', 'nabíz', 'nabiz',
      'dienstleist', 'angebot', 'bieten',
      'szolgáltat', 'szolgaltat', 'kínál', 'kinal',
      'service', 'offer', 'provide',
      'čo robíte', 'co robite', 'co děláte', 'was machen', 'mit csinálnak', 'what do you do',
    ],
    answerKey: 'services_overview',
  },
  {
    keywords: [
      'biologick', 'biol\u00f3g', 'biológ', 'biolog',
      'kal', 'schlam', 'sludge', 'iszap',
      'baktéri', 'bakteri', 'bakterien', 'bacteria',
      'jazier', 'jazero', 'jezer', 'jezero', 'see', 'lake', 'tav', 'tó',
    ],
    answerKey: 'bio',
  },
  {
    keywords: [
      'odvodn', 'odvod\u0148', 'entwässer', 'entwasser', 'dewat',
      'dehidrat', 'víztelen', 'viztelen',
      'textiln', 'textil', 'geotextil',
      'vankúš', 'vankus', 'polštář', 'polstar', 'kissen', 'bag', 'párna', 'parna',
      'brehov', 'břehov', 'ufer', 'shore', 'partv',
    ],
    answerKey: 'dehydration',
  },
  {
    keywords: [
      'automat', 'diaľkov', 'dialkovo', 'dálkov', 'dalkove', 'ferngest', 'remote',
      'távvez', 'tavvez',
      'bagr', 'bagger', 'dredg', 'kotr',
      'nádrž', 'nadrz', 'becken', 'basin', 'medenc',
    ],
    answerKey: 'automated',
  },
  {
    keywords: [
      'smart', 'lake', 'okos', 'okos-tó', 'okosto',
      'digitáln', 'digitaln', 'digital',
      'platforma', 'platform',
      'ai-asist', 'ai asist', 'ki-assist', 'ai assist', 'assziszt',
      'denník', 'dennik', 'deník', 'denik', 'tagebuch', 'logbook', 'napló', 'naplo',
      'monitoring', 'monitor',
    ],
    answerKey: 'smartlake',
  },
  {
    keywords: [
      'prieskum', 'průzkum', 'pruzkum', 'untersuch', 'survey', 'felmér', 'felmer',
      'diagnostik', 'diagnos',
      'ultrazvuk', 'ultraschall', 'ultrasonic', 'ultrahang',
      'meranie', 'měření', 'mereni', 'messung', 'measurement', 'mérés', 'meres',
      'vzork', 'vzoriek', 'vzorek', 'probe', 'sample', 'minta',
    ],
    answerKey: 'survey',
  },
  {
    keywords: [
      'kontakt', 'kontaktov', 'contact', 'erreichen', 'elér', 'eler',
      'adres', 'address', 'anschrift', 'cím', 'cim',
      'email', 'e-mail', 'mail',
      'telefón', 'telefon', 'phone', 'tel',
      'kde ste', 'kde jste', 'wo sind', 'where are', 'hol van',
    ],
    answerKey: 'contact',
  },
  {
    keywords: [
      'o nás', 'o nas', 'über uns', 'uber uns', 'about us', 'rólunk', 'rolunk',
      'kto ste', 'kdo jste', 'wer sind', 'who are', 'kik vagytok', 'ki az ecomud',
      'tím', 'tým', 'team', 'csapat',
      'skúsenos', 'zkušenos', 'erfahrung', 'experience', 'tapasztal',
      'histór', 'história', 'historie', 'history', 'történet', 'tortenet',
      'krajin', 'zem', 'country', 'länder', 'ország', 'orszag',
      'hodnot', 'werte', 'value', 'érték', 'ertek',
    ],
    answerKey: 'about',
  },
  {
    keywords: [
      'cen', 'cena', 'ponuk', 'ponúk', 'nabíd', 'nabid',
      'stoj', 'koľko', 'kolko', 'kolik',
      'preis', 'kosten', 'angebot',
      'price', 'cost', 'quote', 'how much',
      'ár', 'mennyibe', 'árajánlat', 'arajanlat',
    ],
    answerKey: 'pricing',
  },
  {
    keywords: [
      'referenc', 'reference', 'referenz',
      'projekt', 'project',
      'výsledok', 'vysledok', 'výsledek', 'vysledek', 'ergebnis', 'result', 'eredmény', 'eredmeny',
      'realizáci', 'realizaci', 'realizac',
    ],
    answerKey: 'references',
  },
];

function findAnswerKey(query: string): string | null {
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const qOriginal = query.toLowerCase();

  for (const topic of topicPatterns) {
    for (const kw of topic.keywords) {
      const kwNorm = kw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (q.includes(kwNorm) || qOriginal.includes(kw)) {
        return topic.answerKey;
      }
    }
  }
  return null;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
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

  const processMessage = useCallback((text: string) => {
    const answerKey = findAnswerKey(text);
    if (answerKey && t.chat.answers[answerKey]) {
      return t.chat.answers[answerKey];
    }
    return t.chat.fallback;
  }, [t]);

  const handleSend = useCallback((text?: string) => {
    const userMessage = (text || input).trim();
    if (!userMessage) return;

    setInput('');
    setShowSuggestions(false);
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    setTimeout(() => {
      const answer = processMessage(userMessage);
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
      setIsTyping(false);
    }, 600 + Math.random() * 600);
  }, [input, processMessage]);

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
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
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
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-[#1B4332] text-white rounded-br-sm'
                        : 'bg-[#F0F7F0] text-[#1a1a2e] rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Quick suggestion chips */}
              {showSuggestions && messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {t.chat.suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(suggestion)}
                      className="text-xs px-3 py-1.5 rounded-full border border-[#40916C]/30 text-[#2D6A4F] hover:bg-[#F0F7F0] hover:border-[#40916C] transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

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
