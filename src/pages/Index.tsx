import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import DirectorSection from "@/components/sections/DirectorSection";
import EventsCarousel from "@/components/sections/EventsCarousel";
import AchievementsSection from "@/components/sections/AchievementsSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <DirectorSection />
      <EventsCarousel />
      <AchievementsSection />
    </Layout>
  );
};

export default Index;
