import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Nft } from "@shared/schema";
import NftCard from "./nft-card";
import { motion } from "framer-motion";

export default function CollectionGallery() {
  const [selectedRarity, setSelectedRarity] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(8);

  const { data: nfts = [], isLoading } = useQuery<Nft[]>({
    queryKey: ["/api/nfts", selectedRarity === "all" ? "" : selectedRarity],
    queryFn: async () => {
      const url = selectedRarity === "all" 
        ? "/api/nfts" 
        : `/api/nfts?rarity=${selectedRarity}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch NFTs");
      return response.json();
    }
  });

  const filteredNfts = nfts.slice(0, visibleCount);
  const hasMore = nfts.length > visibleCount;

  const rarityFilters = [
    { label: "All Hackers", value: "all", color: "matrix" },
    { label: "Legendary", value: "LEGENDARY", color: "matrix" },
    { label: "Elite", value: "ELITE", color: "cyber" },
    { label: "Rare", value: "RARE", color: "neon-pink" },
    { label: "Common", value: "COMMON", color: "electric" }
  ];

  return (
    <section id="collection" className="py-20 bg-gradient-to-b from-dark-bg to-dark-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-orbitron font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-matrix">Digital</span> <span className="text-cyber">Legends</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Each NFT represents a unique hacker persona with their own backstory, skills, and place in the digital revolution.
          </motion.p>
        </div>

        {/* Filter Controls */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {rarityFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => {
                setSelectedRarity(filter.value);
                setVisibleCount(8);
              }}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedRarity === filter.value
                  ? `bg-${filter.color}/20 border border-${filter.color} text-${filter.color}`
                  : "bg-dark-card border border-gray-600 text-gray-300 hover:border-cyber hover:text-cyber"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* NFT Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-dark-card border border-gray-600 rounded-xl overflow-hidden animate-pulse">
                <div className="w-full h-64 bg-gray-700"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-700 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {filteredNfts.map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <NftCard nft={nft} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <button 
              onClick={() => setVisibleCount(prev => prev + 8)}
              className="bg-gradient-to-r from-matrix to-cyber text-black font-bold py-4 px-8 rounded-lg hover:shadow-lg hover:shadow-matrix/30 transition-all"
            >
              Load More Hackers
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
