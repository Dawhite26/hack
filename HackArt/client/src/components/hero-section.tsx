import { useQuery } from "@tanstack/react-query";
import { type CollectionStats } from "@shared/schema";
import { motion } from "framer-motion";

export default function HeroSection() {
  const { data: stats } = useQuery<CollectionStats>({
    queryKey: ["/api/collection-stats"]
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cyberpunk background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Cyberpunk hacker in neon-lit environment" 
          className="w-full h-full object-cover opacity-30" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/70 to-transparent"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.h1 
          className="text-5xl md:text-7xl font-orbitron font-black mb-6 animate-float"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-matrix">HACK</span>
          <span className="text-cyber">CHAIN</span>
        </motion.h1>

        <motion.div 
          className="text-xl md:text-2xl mb-8 font-mono overflow-hidden border-r-2 border-matrix animate-typewriter whitespace-nowrap mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ width: "fit-content" }}
        >
          Elite Hacker NFT Collection - 10,000 Digital Personas
        </motion.div>

        <motion.p 
          className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          Enter the digital underground. Each NFT tells the story of a legendary hacker who shaped the cyberspace. 
          Collect, trade, and unlock their secrets.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <button 
            onClick={() => scrollToSection("collection")}
            className="bg-matrix hover:bg-matrix/80 text-black font-bold py-4 px-8 rounded-lg transition-all hover:animate-glitch"
          >
            Explore Collection
          </button>
          <button 
            onClick={() => scrollToSection("story")}
            className="border-2 border-cyber text-cyber hover:bg-cyber hover:text-black font-bold py-4 px-8 rounded-lg transition-all"
          >
            Read the Story
          </button>
        </motion.div>
      </div>
      
      {/* Stats overlay */}
      {stats && (
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-4 sm:gap-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <div className="holographic p-4 rounded-lg backdrop-blur-sm">
            <div className="text-2xl font-orbitron font-bold text-matrix">
              {stats.totalSupply.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Total Supply</div>
          </div>
          <div className="holographic p-4 rounded-lg backdrop-blur-sm">
            <div className="text-2xl font-orbitron font-bold text-cyber">
              {stats.minted.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Minted</div>
          </div>
          <div className="holographic p-4 rounded-lg backdrop-blur-sm">
            <div className="text-2xl font-orbitron font-bold text-neon-pink">
              {stats.owners.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Owners</div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
