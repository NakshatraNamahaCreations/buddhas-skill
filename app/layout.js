import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import SmoothScroll from '@/components/layout/SmoothScroll';
import BackToTop from '@/components/layout/BackToTop';
import WhatsAppChat from '@/components/layout/WhatsAppChat';
import './globals.css';

const jakartaBody = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
});

const jakartaDisplay = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata = {
  title: "Buddha's Skill Academy | Job-Ready Tech Training & Placements",
  description:
    "Industry-ready training in code, data, and security — built on live projects, real mentorship, and placement support that doesn't quit.",
  openGraph: {
    title: "Buddha's Skill Academy | Skills That Matter",
    description:
      "Job-ready tech training with live projects, mentorship, and dedicated placement support.",
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#04070C',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${jakartaBody.variable} ${jakartaDisplay.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <BackToTop />
        <WhatsAppChat />
      </body>
    </html>
  );
}
