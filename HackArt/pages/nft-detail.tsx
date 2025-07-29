import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Nft } from "@shared/schema";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function NftDetail() {
  const { id } = useParams();
  
  const { data: nft, isLoading, error } = useQuery<Nft>({
    queryKey: ["/api/nfts", id],
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg text-white">
        <div className="fixed inset-0 matrix-bg opacity-10 pointer-events-none"></div>
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="w-full h-96 bg-dark-card" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4 bg-dark-card" />
              <Skeleton className="h-6 w-1/2 bg-dark-card" />
              <Skeleton className="h-24 w-full bg-dark-card" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !nft) {
    return (
      <div className="min-h-screen bg-dark-bg text-white">
        <div className="fixed inset-0 matrix-bg opacity-10 pointer-events-none"></div>
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 py-20">
          <Card className="bg-dark-card border-red-500/30">
            <CardContent className="pt-6">
              <h1 className="text-2xl font-orbitron font-bold text-red-500 mb-4">NFT Not Found</h1>
              <p className="text-gray-400">The requested NFT could not be found.</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "LEGENDARY": return "bg-matrix text-black";
      case "ELITE": return "bg-cyber text-black";
      case "RARE": return "bg-neon-pink text-black";
      default: return "bg-electric text-black";
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <div className="fixed inset-0 matrix-bg opacity-10 pointer-events-none"></div>
      
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* NFT Image */}
          <div className="holographic p-1 rounded-2xl">
            <img 
              src={nft.image} 
              alt={nft.name}
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>

          {/* NFT Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-orbitron font-bold text-matrix">
                  {nft.name}
                </h1>
                <Badge className={`${getRarityColor(nft.rarity)} font-bold`}>
                  {nft.rarity}
                </Badge>
              </div>
              <p className="text-xl text-gray-300 mb-2">{nft.description}</p>
              <p className="text-sm text-gray-500">Token ID: #{nft.tokenId}</p>
            </div>

            <div className="bg-dark-card border border-cyber/30 rounded-xl p-6">
              <h3 className="text-xl font-orbitron font-bold text-cyber mb-4">Price</h3>
              <p className="text-3xl font-orbitron font-bold text-white">{nft.price} ETH</p>
            </div>

            {nft.story && (
              <div className="bg-dark-card border border-matrix/30 rounded-xl p-6">
                <h3 className="text-xl font-orbitron font-bold text-matrix mb-4">Story</h3>
                <p className="text-gray-300 leading-relaxed">{nft.story}</p>
              </div>
            )}

            {/* Attributes */}
            {nft.attributes && typeof nft.attributes === 'object' && (
              <div className="bg-dark-card border border-neon-pink/30 rounded-xl p-6">
                <h3 className="text-xl font-orbitron font-bold text-neon-pink mb-4">Attributes</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(nft.attributes as Record<string, any>).map(([key, value]) => (
                    <div key={key} className="bg-dark-bg p-3 rounded-lg">
                      <p className="text-gray-500 text-sm capitalize">{key}</p>
                      <p className="text-white font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex-1 bg-gradient-to-r from-matrix to-cyber text-black font-bold py-4 px-6 rounded-lg hover:shadow-lg hover:shadow-matrix/30 transition-all">
                Purchase NFT
              </button>
              <button className="border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-black font-bold py-4 px-6 rounded-lg transition-all">
                Make Offer
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
