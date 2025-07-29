import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import CollectionGallery from "@/components/collection-gallery";
import StoryTimeline from "@/components/story-timeline";
import CharacterProfiles from "@/components/character-profiles";
import MintingInterface from "@/components/minting-interface";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Matrix Background Effect */}
      <div className="fixed inset-0 matrix-bg opacity-10 pointer-events-none"></div>
      
      <Navigation />
      <HeroSection />
      <CollectionGallery />
      <StoryTimeline />
      <CharacterProfiles />
      <MintingInterface />
      <Footer />
    </div>
  );
}
