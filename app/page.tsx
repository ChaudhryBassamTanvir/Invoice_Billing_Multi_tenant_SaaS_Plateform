import NimbusLogo from '@/app/ui/Nimbus-logo';
import HeroSection from './ui/HeroSection';
import WhyChooseUs from './ui/WhyChooseUs';
import Footer from './ui/Footer';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
    <div className="flex h-20 shrink-0 items-end rounded-lg bg-violet-600 p-4 md:h-52">
      <NimbusLogo />
      </div>
      <HeroSection/>
      <WhyChooseUs/>
      <Footer/>
    </main>
  );
}
