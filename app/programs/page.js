import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryCTA from '@/components/sections/EnquiryCTA';
import { tracks } from '@/lib/content';
import ProgramsHero from './_components/ProgramsHero';
import ProgramsCatalog from './_components/ProgramsCatalog';
import ProgramDetail from './_components/ProgramDetail';
import ProgramsCompare from './_components/ProgramsCompare';

export const metadata = {
  title: "Programs | Buddha's Skill Academy",
  description:
    "Five programs. One outcome: a real career. Explore Java Full Stack, Python Full Stack, Data Science, Cyber Security, and Software Testing — curriculum, career paths, and side-by-side comparison.",
  openGraph: {
    title: "Programs — Buddha's Skill Academy",
    description:
      "Five full-stack career programs — code, data, security, testing. Curriculum, mentorship, and placement in one.",
    type: 'website',
  },
};

export default function ProgramsPage() {
  return (
    <>
      <Navbar />
      <main id="top">
        <ProgramsHero />
        <ProgramsCatalog />
        {tracks.map((p, i) => (
          <ProgramDetail
            key={p.id}
            program={p}
            order={i}
            total={tracks.length}
            band={i % 2 === 0 ? 'paper' : 'soft'}
          />
        ))}
        <ProgramsCompare />
        <EnquiryCTA />
      </main>
      <Footer />
    </>
  );
}
