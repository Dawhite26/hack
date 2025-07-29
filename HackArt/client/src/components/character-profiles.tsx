import { useQuery } from "@tanstack/react-query";
import { type Character } from "@shared/schema";
import { motion } from "framer-motion";

export default function CharacterProfiles() {
  const { data: characters = [] } = useQuery<Character[]>({
    queryKey: ["/api/characters"]
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "FOUNDER": return "matrix";
      case "ELITE": return "cyber";
      case "PIONEER": return "matrix";
      case "MYSTIC": return "electric";
      default: return "neon-pink";
    }
  };

  const renderSkillStars = (level: number, color: string) => {
    return (
      <div className="flex space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i}
            className={`w-3 h-3 rounded-full ${i < level ? `bg-${color}` : "bg-gray-600"}`}
          />
        ))}
      </div>
    );
  };

  // Split characters into main profiles and additional characters
  const mainCharacters = characters.slice(0, 3);
  const additionalCharacters = characters.slice(3);

  return (
    <section id="characters" className="py-20 bg-gradient-to-b from-dark-bg to-dark-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-orbitron font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-electric">Legendary</span> <span className="text-matrix">Hackers</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Meet the digital legends whose code changed the world. Each character brings unique skills and stories to the HackChain universe.
          </motion.p>
        </div>

        {/* Main Character Cards */}
        <motion.div 
          className="grid lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {mainCharacters.map((character, index) => {
            const color = getRarityColor(character.rarity);
            return (
              <motion.div
                key={character.id}
                className={`bg-dark-card border border-${color}/30 rounded-2xl overflow-hidden hover:border-${color} hover:shadow-xl hover:shadow-${color}/20 transition-all duration-300`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <img 
                    src={character.image} 
                    alt={`${character.name} - legendary cyberpunk hacker`}
                    className="w-full h-80 object-cover" 
                  />
                  <div className={`absolute top-4 right-4 bg-${color} text-black px-3 py-1 rounded-full text-sm font-bold`}>
                    {character.rarity}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-2xl font-orbitron font-bold mb-2 text-${color}`}>
                    {character.name}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {character.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Skill Level:</span>
                      {renderSkillStars(character.skillLevel, color)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Specialty:</span>
                      <span className={`text-${color}`}>{character.specialty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Era:</span>
                      <span className={`text-${color === "matrix" ? "cyber" : "matrix"}`}>{character.era}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional characters row */}
        {additionalCharacters.length > 0 && (
          <motion.div 
            className="grid lg:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {additionalCharacters.map((character, index) => {
              const color = getRarityColor(character.rarity);
              return (
                <motion.div
                  key={character.id}
                  className={`bg-dark-card border border-${color}/30 rounded-2xl overflow-hidden hover:border-${color} hover:shadow-xl hover:shadow-${color}/20 transition-all duration-300`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex">
                    <div className="w-1/3">
                      <img 
                        src={character.image} 
                        alt={`${character.name} - ${character.specialty} specialist`}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="w-2/3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className={`text-xl font-orbitron font-bold text-${color}`}>
                          {character.name}
                        </h3>
                        <span className={`bg-${color} text-black px-2 py-1 rounded text-xs font-bold`}>
                          {character.rarity}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">
                        {character.description}
                      </p>
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Specialty:</span>
                          <span className={`text-${color}`}>{character.specialty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Era:</span>
                          <span className={`text-${color === "matrix" ? "cyber" : "matrix"}`}>{character.era}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
