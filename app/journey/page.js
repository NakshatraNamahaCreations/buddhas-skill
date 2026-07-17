import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryCTA from '@/components/sections/EnquiryCTA';
import JourneyHero from './_components/JourneyHero';
import JourneyPath from './_components/JourneyPath';
import JourneyPhases from './_components/JourneyPhases';
import JourneyPromise from './_components/JourneyPromise';

export const metadata = {
  title: "Journey | Buddha's Skill Academy",
  description:
    "The path from your first class to your first offer letter — a focused, week-by-week journey through enrollment, live projects, mock interviews, and placement drives.",
  openGraph: {
    title: "Journey — Buddha's Skill Academy",
    description:
      "The shortest path from you to hired. Every phase mapped, every week accounted for.",
    type: 'website',
  },
};

export default function JourneyPage() {
  return (
    <>
      <Navbar />
      <main id="top">
        <JourneyHero />
        <JourneyPath />
        <JourneyPhases />
        {/* <JourneyPromise /> */}
        <EnquiryCTA />
      </main>
      <Footer />
    </>
  );
}
