import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import StatsBand from '@/components/sections/StatsBand';
import AboutUs from '@/components/sections/AboutUs';
import Positioning from '@/components/sections/Positioning';
import Tracks from '@/components/sections/Tracks/Tracks';
import WhyChoose from '@/components/sections/WhyChoose';
import HiringPartners from '@/components/sections/HiringPartners';
import Journey from '@/components/sections/Journey';
import Placements from '@/components/sections/Placements';
import StudentLifeCycle from '@/components/sections/StudentLifeCycle';
import Testimonials from '@/components/sections/Testimonials/Testimonials';
import Team from '@/components/sections/Team';
import EnquiryCTA from '@/components/sections/EnquiryCTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <StatsBand />
        <AboutUs />
        
        <Positioning />
        <Tracks />
        <WhyChoose />
        <HiringPartners />
        <Journey />
        <Placements />
        <StudentLifeCycle />
        <Testimonials />
        {/* <Team /> */}
        <EnquiryCTA />
      </main>
      <Footer />
    </>
  );
}
