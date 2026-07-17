import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Team from '@/components/sections/Team';
import EnquiryCTA from '@/components/sections/EnquiryCTA';
import AboutHero from './_components/AboutHero';
import AboutStory from './_components/AboutStory';
import AboutValues from './_components/AboutValues';
import AboutMilestones from './_components/AboutMilestones';

export const metadata = {
  title: "About | Buddha's Skill Academy",
  description:
    "The academy where careers actually get built. A decade of turning learners into professionals — our story, our values, and the road that got us here.",
  openGraph: {
    title: "About Buddha's Skill Academy",
    description:
      "A decade of turning learners into professionals — our story, mission, and milestones.",
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="top">
        <AboutHero />
        <AboutStory />
        <AboutValues />
        {/* <AboutMilestones /> */}
        {/* <Team /> */}
        <EnquiryCTA />
      </main>
      <Footer />
    </>
  );
}
