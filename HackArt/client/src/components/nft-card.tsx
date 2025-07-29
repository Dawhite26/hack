import { Link } from "wouter";
import { type Nft } from "@shared/schema";
import { motion } from "framer-motion";

interface NftCardProps {
  nft: Nft;
}

export default function NftCard({ nft }: NftCardProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "LEGENDARY": return "matrix";
      case "ELITE": return "cyber";
      case "RARE": return "neon-pink";
      default: return "electric";
    }
  };

  const color = getRarityColor(nft.rarity);

  return (
    <Link href={`/nft/${nft.id}`}>
      <motion.div 
        className={`nft-card bg-dark-card border border-${color}/30 rounded-xl overflow-hidden hover:border-${color} hover:shadow-lg hover:shadow-${color}/20 transition-all cursor-pointer group`}
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative overflow-hidden">
          <img 
            src={nft.image} 
            alt={`${nft.name} - ${nft.description}`}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-orbitron font-bold text-lg group-hover:text-matrix transition-colors">
              {nft.name}
            </h3>
            <span className={`bg-${color} text-black text-xs px-2 py-1 rounded-full font-bold`}>
              {nft.rarity}
            </span>
          </div>
          
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {nft.description}
          </p>
          
          <div className="flex justify-between items-center">
            <span className="text-cyber font-bold">
              {nft.price} ETH
            </span>
            <span className="text-gray-500 text-sm">
              #{nft.tokenId}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
