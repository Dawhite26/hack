import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all NFTs with optional filtering
  app.get("/api/nfts", async (req, res) => {
    try {
      const { rarity, limit, offset } = req.query;
      
      const filters: any = {};
      if (rarity && typeof rarity === 'string') {
        filters.rarity = rarity;
      }
      if (limit && typeof limit === 'string') {
        filters.limit = parseInt(limit);
      }
      if (offset && typeof offset === 'string') {
        filters.offset = parseInt(offset);
      }
      
      const nfts = await storage.getNfts(filters);
      res.json(nfts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch NFTs" });
    }
  });

  // Get single NFT by ID
  app.get("/api/nfts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const nft = await storage.getNft(id);
      
      if (!nft) {
        return res.status(404).json({ message: "NFT not found" });
      }
      
      res.json(nft);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch NFT" });
    }
  });

  // Get NFT by token ID
  app.get("/api/nfts/token/:tokenId", async (req, res) => {
    try {
      const tokenId = parseInt(req.params.tokenId);
      const nft = await storage.getNftByTokenId(tokenId);
      
      if (!nft) {
        return res.status(404).json({ message: "NFT not found" });
      }
      
      res.json(nft);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch NFT" });
    }
  });

  // Get all characters
  app.get("/api/characters", async (req, res) => {
    try {
      const characters = await storage.getCharacters();
      res.json(characters);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch characters" });
    }
  });

  // Get single character by ID
  app.get("/api/characters/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const character = await storage.getCharacter(id);
      
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }
      
      res.json(character);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch character" });
    }
  });

  // Get all story chapters
  app.get("/api/story-chapters", async (req, res) => {
    try {
      const chapters = await storage.getStoryChapters();
      res.json(chapters);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch story chapters" });
    }
  });

  // Get single story chapter by ID
  app.get("/api/story-chapters/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const chapter = await storage.getStoryChapter(id);
      
      if (!chapter) {
        return res.status(404).json({ message: "Story chapter not found" });
      }
      
      res.json(chapter);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch story chapter" });
    }
  });

  // Get collection statistics
  app.get("/api/collection-stats", async (req, res) => {
    try {
      const stats = await storage.getCollectionStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch collection stats" });
    }
  });

  // Mock minting endpoint (for demonstration)
  app.post("/api/mint", async (req, res) => {
    try {
      const { quantity = 1, walletAddress } = req.body;
      
      // Validate input
      const mintSchema = z.object({
        quantity: z.number().min(1).max(10),
        walletAddress: z.string().optional()
      });
      
      const validated = mintSchema.parse({ quantity, walletAddress });
      
      // In a real implementation, this would interact with smart contracts
      // For now, just return success response
      res.json({
        success: true,
        message: `Successfully minted ${validated.quantity} NFT(s)`,
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        tokenIds: Array.from({ length: validated.quantity }, (_, i) => 
          Math.floor(Math.random() * 10000) + 1
        )
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid minting request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
