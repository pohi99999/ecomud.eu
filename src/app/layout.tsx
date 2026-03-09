import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/i18n/provider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ECOMUD group s.r.o. | Riešenia pre kal. Riešenia pre vodu.',
  description: 'Biologická úprava vôd, inovatívne textilné technológie a smart monitoring – z jednej ruky, v celej strednej Európe.',
  keywords: 'biologická úprava kalov, čistenie jazier, odvodňovanie kalov, smart lake, prieskum dna, environmentálne riešenia',
  openGraph: {
    title: 'ECOMUD group s.r.o.',
    description: 'Riešenia pre kal. Riešenia pre vodu.',
    url: 'https://ecomud.eu',
    siteName: 'ECOMUD group',
    locale: 'sk_SK',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" className={inter.className}>
      <body className="antialiased">
        <I18nProvider>
          <Header />
          <main className="pt-16 lg:pt-20">
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </I18nProvider>
      </body>
    </html>
  );
}
