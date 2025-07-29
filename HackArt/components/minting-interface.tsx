import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { type CollectionStats } from "@shared/schema";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function MintingInterface() {
  const [mintQuantity, setMintQuantity] = useState(1);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { toast } = useToast();

  const { data: stats } = useQuery<CollectionStats>({
    queryKey: ["/api/collection-stats"]
  });

  const mintMutation = useMutation({
    mutationFn: async (data: { quantity: number; walletAddress?: string }) => {
      return apiRequest("POST", "/api/mint", data);
    },
    onSuccess: () => {
      toast({
        title: "Minting Successful!",
        description: `Successfully minted ${mintQuantity} NFT(s)`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/collection-stats"] });
    },
    onError: () => {
      toast({
        title: "Minting Failed",
        description: "Failed to mint NFTs. Please try again.",
        variant: "destructive"
      });
    }
  });

  const basePrice = 0.08;
  const gasEstimate = 0.005;
  const totalPrice = (basePrice * mintQuantity) + gasEstimate;
  const mintProgress = stats ? (stats.minted / stats.totalSupply) * 100 : 0;

  const increaseQuantity = () => {
    if (mintQuantity < 10) {
      setMintQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (mintQuantity > 1) {
      setMintQuantity(prev => prev - 1);
    }
  };

  const connectWallet = () => {
    // Mock wallet connection
    setIsWalletConnected(true);
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to your wallet",
    });
  };

  const handleMint = () => {
    if (!isWalletConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    mintMutation.mutate({
      quantity: mintQuantity,
      walletAddress: "0x1234...5678" // Mock address
    });
  };

  const rarityDistribution = [
    { name: "Common", percentage: 60, color: "gray-500" },
    { name: "Rare", percentage: 25, color: "electric" },
    { name: "Elite", percentage: 12, color: "cyber" },
    { name: "Legendary", percentage: 3, color: "matrix" }
  ];

  return (
    <section id="mint" className="py-20 bg-gradient-to-b from-dark-card/50 to-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-orbitron font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-cyber">Join</span> <span className="text-matrix">The</span> <span className="text-neon-pink">Revolution</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Mint your own legendary hacker NFT and become part of the digital underground. Each mint reveals a unique character with their own story.
          </motion.p>
        </div>

        {/* Minting Interface */}
        <motion.div 
          className="bg-dark-card border border-matrix/30 rounded-2xl p-8 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Preview Area */}
            <div className="space-y-6">
              <h3 className="text-2xl font-orbitron font-bold text-matrix mb-4">Mystery Hacker Preview</h3>
              <div className="holographic p-1 rounded-xl">
                <div className="bg-gradient-to-br from-dark-bg to-dark-card h-64 rounded-lg flex items-center justify-center border-2 border-dashed border-matrix/50">
                  <div className="text-center">
                    <div className="text-6xl font-orbitron font-bold text-matrix mb-4 animate-glow">?</div>
                    <p className="text-gray-400">Your unique hacker awaits...</p>
                  </div>
                </div>
              </div>
              
              {/* Rarity Distribution */}
              <div className="space-y-3">
                <h4 className="font-orbitron font-bold text-lg">Rarity Distribution</h4>
                <div className="space-y-2 text-sm">
                  {rarityDistribution.map((rarity) => (
                    <div key={rarity.name} className="flex justify-between items-center">
                      <span className={`text-${rarity.color}`}>{rarity.name} ({rarity.percentage}%)</span>
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div 
                          className={`bg-${rarity.color} h-2 rounded-full transition-all duration-1000`}
                          style={{ width: `${rarity.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Minting Controls */}
            <div className="space-y-6">
              <h3 className="text-2xl font-orbitron font-bold text-cyber mb-4">Mint Configuration</h3>
              
              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Quantity</label>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={decreaseQuantity}
                    className="bg-dark-bg border border-matrix text-matrix w-10 h-10 rounded-lg hover:bg-matrix hover:text-black transition-all disabled:opacity-50"
                    disabled={mintQuantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-2xl font-orbitron font-bold w-12 text-center">{mintQuantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    className="bg-dark-bg border border-matrix text-matrix w-10 h-10 rounded-lg hover:bg-matrix hover:text-black transition-all disabled:opacity-50"
                    disabled={mintQuantity >= 10}
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Max 10 per transaction</p>
              </div>

              {/* Price Calculation */}
              <div className="bg-dark-bg border border-cyber/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Price per NFT:</span>
                  <span className="font-bold text-cyber">{basePrice} ETH</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Quantity:</span>
                  <span className="font-bold">{mintQuantity}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Gas Fee (est):</span>
                  <span className="font-bold text-electric">{gasEstimate} ETH</span>
                </div>
                <hr className="border-gray-600 my-3" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-orbitron font-bold">Total:</span>
                  <span className="text-xl font-orbitron font-bold text-matrix">{totalPrice.toFixed(3)} ETH</span>
                </div>
              </div>

              {/* Wallet Connection */}
              <div className="space-y-4">
                {!isWalletConnected ? (
                  <button 
                    onClick={connectWallet}
                    className="w-full bg-gradient-to-r from-matrix to-cyber text-black font-bold py-4 px-6 rounded-lg hover:shadow-lg hover:shadow-matrix/30 transition-all"
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <div className="w-full bg-matrix/20 border border-matrix text-matrix py-4 px-6 rounded-lg text-center">
                    Wallet Connected: 0x1234...5678
                  </div>
                )}
                
                <button 
                  onClick={handleMint}
                  disabled={!isWalletConnected || mintMutation.isPending}
                  className="w-full bg-neon-pink hover:bg-neon-pink/80 text-black font-bold py-4 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {mintMutation.isPending ? "Minting..." : "Mint HackChain NFT"}
                </button>
              </div>

              {/* Status Information */}
              {stats && (
                <div className="text-center text-sm text-gray-400">
                  <p>
                    <span className="text-matrix font-bold">{stats.minted.toLocaleString()}</span> / 
                    <span className="ml-1">{stats.totalSupply.toLocaleString()}</span> minted
                  </p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-matrix to-cyber h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${mintProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div 
          className="mt-12 grid md:grid-cols-3 gap-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="holographic p-6 rounded-xl">
            <div className="text-3xl font-orbitron font-bold text-matrix mb-2">10,000</div>
            <div className="text-gray-400">Unique NFTs</div>
          </div>
          <div className="holographic p-6 rounded-xl">
            <div className="text-3xl font-orbitron font-bold text-cyber mb-2">50+</div>
            <div className="text-gray-400">Trait Combinations</div>
          </div>
          <div className="holographic p-6 rounded-xl">
            <div className="text-3xl font-orbitron font-bold text-neon-pink mb-2">∞</div>
            <div className="text-gray-400">Story Possibilities</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
