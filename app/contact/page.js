import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryCTA from '@/components/sections/EnquiryCTA';
import ContactHero from './_components/ContactHero';

export const metadata = {
  title: "Contact | Buddha's Skill Academy",
  description:
    "Call, WhatsApp, email, or visit us. Pick the channel that suits you — the admissions team responds within a business day.",
  openGraph: {
    title: "Contact — Buddha's Skill Academy",
    description:
      "A call, message, or email away. Book a free consultation with the admissions team.",
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="top">
        <ContactHero />
        <EnquiryCTA />
      </main>
      <Footer />
    </>
  );
}
