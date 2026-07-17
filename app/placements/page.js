import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Placements from '@/components/sections/Placements';
import StudentLifeCycle from '@/components/sections/StudentLifeCycle';
import HiringPartners from '@/components/sections/HiringPartners';
import PlacedStudents from '@/components/sections/PlacedStudents';
import Testimonials from '@/components/sections/Testimonials/Testimonials';
import EnquiryCTA from '@/components/sections/EnquiryCTA';
import PlacementsHero from './_components/PlacementsHero';

export const metadata = {
  title: "Placements | Buddha's Skill Academy",
  description:
    "1200+ verified placements, 300+ hiring partners, and a placement team that stays on the call until the CTC is signed. See the numbers, the journey, and the companies hiring our graduates.",
  openGraph: {
    title: "Placements — Buddha's Skill Academy",
    description:
      "Where our learners get hired. Every number backed by a signed offer letter.",
    type: 'website',
  },
};

export default function PlacementsPage() {
  return (
    <>
      <Navbar />
      <main id="top">
        <PlacementsHero />
        <Placements />
        {/* <StudentLifeCycle /> */}
        <HiringPartners />
        <PlacedStudents />
        <Testimonials />
        <EnquiryCTA />
      </main>
      <Footer />
    </>
  );
}
