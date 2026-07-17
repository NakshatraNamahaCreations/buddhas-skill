import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryCTA from '@/components/sections/EnquiryCTA';
import WhyHero from './_components/WhyHero';
import WhyProof from './_components/WhyProof';
import WhyPillars from './_components/WhyPillars';
import WhyCompare from './_components/WhyCompare';
import WhyPromise from './_components/WhyPromise';

export const metadata = {
  title: "Why Buddha's | Buddha's Skill Academy",
  description:
    "Seven pillars we don't compromise on — industry-curated curriculum, corporate-certified mentors, live projects, and placement support until the offer letter is signed.",
  openGraph: {
    title: "Why Buddha's Skill Academy",
    description:
      "The method behind the outcomes: seven pillars that separate a career from a certificate.",
    type: 'website',
  },
};

export default function WhyUsPage() {
  return (
    <>
      <Navbar />
      <main id="top">
        <WhyHero />
        <WhyProof />
        <WhyPillars />
        {/* <WhyCompare /> */}
        <EnquiryCTA />
      </main>
      <Footer />
    </>
  );
}
