import ChatWidget from '@/components/ChatWidget';
import LogoMarquee from '@/components/LogoMarquee';
import { HeroSection } from '@/components/home/HeroSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { HomeFAQSection } from '@/components/home/HomeFAQSection';

export default function Home() {
  return (
    <main style={{ backgroundColor: 'var(--color-bg-light)' }}>
      <HeroSection />
      <LogoMarquee />
      <ProcessSection />
      <HomeFAQSection />
      <ChatWidget />
    </main>
  );
}
