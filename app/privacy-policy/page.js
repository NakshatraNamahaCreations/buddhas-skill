import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PrivacyPolicy from './_components/PrivacyPolicy';

export const metadata = {
  title: "Privacy Policy | Buddha's Skill Academy",
  description:
    "How Buddha's Skill Academy collects, uses, stores, discloses and protects personal information of students, learners, parents, guardians, instructors and visitors.",
  openGraph: {
    title: "Privacy Policy — Buddha's Skill Academy",
    description:
      "Our privacy practices for students, learners, parents, guardians, instructors and visitors.",
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main id="top">
        <PrivacyPolicy />
      </main>
      <Footer />
    </>
  );
}
