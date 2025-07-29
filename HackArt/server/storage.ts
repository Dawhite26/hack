import { type Nft, type InsertNft, type Character, type InsertCharacter, type StoryChapter, type InsertStoryChapter, type CollectionStats, type InsertCollectionStats } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // NFT operations
  getNfts(filters?: { rarity?: string; limit?: number; offset?: number }): Promise<Nft[]>;
  getNft(id: string): Promise<Nft | undefined>;
  getNftByTokenId(tokenId: number): Promise<Nft | undefined>;
  createNft(nft: InsertNft): Promise<Nft>;
  
  // Character operations
  getCharacters(): Promise<Character[]>;
  getCharacter(id: string): Promise<Character | undefined>;
  createCharacter(character: InsertCharacter): Promise<Character>;
  
  // Story operations
  getStoryChapters(): Promise<StoryChapter[]>;
  getStoryChapter(id: string): Promise<StoryChapter | undefined>;
  createStoryChapter(chapter: InsertStoryChapter): Promise<StoryChapter>;
  
  // Collection stats
  getCollectionStats(): Promise<CollectionStats>;
  updateCollectionStats(stats: Partial<InsertCollectionStats>): Promise<CollectionStats>;
}

export class MemStorage implements IStorage {
  private nfts: Map<string, Nft>;
  private characters: Map<string, Character>;
  private storyChapters: Map<string, StoryChapter>;
  private collectionStats: CollectionStats;

  constructor() {
    this.nfts = new Map();
    this.characters = new Map();
    this.storyChapters = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Initialize collection stats
    this.collectionStats = {
      id: randomUUID(),
      totalSupply: 10000,
      minted: 2847,
      owners: 1432,
      floorPrice: "0.08",
      volumeTraded: "1247.56"
    };

    // Initialize NFTs
    const sampleNfts: (InsertNft & { id: string })[] = [
      {
        id: randomUUID(),
        tokenId: 1,
        name: "The Matrix Breaker",
        description: "First to break the Pentagon's quantum encryption",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        rarity: "LEGENDARY",
        price: "2.5",
        attributes: {
          background: "Digital Matrix",
          clothing: "Cyber Jacket",
          eyes: "Neural Interface",
          accessory: "Quantum Decoder"
        },
        story: "The first hacker to successfully breach the Pentagon's quantum encryption system, opening the door to a new era of digital warfare.",
        isRevealed: 1
      },
      {
        id: randomUUID(),
        tokenId: 42,
        name: "Ghost Protocol",
        description: "Master of digital stealth and anonymity",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        rarity: "ELITE",
        price: "1.8",
        attributes: {
          background: "Stealth Mode",
          clothing: "Cloaking Suit",
          eyes: "Phantom Vision",
          accessory: "Invisibility Core"
        },
        story: "A master of digital invisibility who can navigate the darkest corners of cyberspace without leaving a trace.",
        isRevealed: 1
      },
      {
        id: randomUUID(),
        tokenId: 127,
        name: "Neon Phantom",
        description: "Underground network coordinator",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&sat=-100&hue=180",
        rarity: "RARE",
        price: "1.2",
        attributes: {
          background: "Neon City",
          clothing: "Street Tech",
          eyes: "Neon Glow",
          accessory: "Network Hub"
        },
        story: "Underground network coordinator who built the first decentralized hacker collective.",
        isRevealed: 1
      },
      {
        id: randomUUID(),
        tokenId: 203,
        name: "Code Weaver",
        description: "Reality manipulation through pure code",
        image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        rarity: "RARE",
        price: "0.9",
        attributes: {
          background: "Matrix Code",
          clothing: "Digital Robes",
          eyes: "Code Vision",
          accessory: "Reality Compiler"
        },
        story: "Believes that the digital and physical worlds are just different layers of the same cosmic program.",
        isRevealed: 1
      },
      {
        id: randomUUID(),
        tokenId: 304,
        name: "Quantum Sage",
        description: "Quantum computing pioneer",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&brightness=120",
        rarity: "ELITE",
        price: "2.1",
        attributes: {
          background: "Quantum Lab",
          clothing: "Lab Coat 2.0",
          eyes: "Quantum Sight",
          accessory: "Quantum Processor"
        },
        story: "Quantum computing pioneer who bridged classical hacking with quantum possibilities.",
        isRevealed: 1
      },
      {
        id: randomUUID(),
        tokenId: 456,
        name: "Digital Shaman",
        description: "Bridge between worlds digital and real",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&contrast=130",
        rarity: "RARE",
        price: "1.4",
        attributes: {
          background: "Spiritual Matrix",
          clothing: "Techno Mystic",
          eyes: "Third Eye Interface",
          accessory: "Digital Totem"
        },
        story: "A bridge between the digital and real worlds, understanding both technological and spiritual dimensions.",
        isRevealed: 1
      }
    ];

    sampleNfts.forEach(nft => {
      this.nfts.set(nft.id, nft);
    });

    // Initialize characters
    const sampleCharacters: (InsertCharacter & { id: string })[] = [
      {
        id: randomUUID(),
        name: "The Matrix Breaker",
        description: "The legendary hacker who first cracked the Pentagon's quantum encryption. Known for their ability to see patterns in chaos and turn digital nightmares into digital dreams.",
        image: "https://pixabay.com/get/g31ccf83b44e2739f0094577c08c2c4943bbb415756f62c1de9bb2b10d96fc3265f20a2ab7cc289d4370ee0bec5468807c1b59626d6d1dca003597f232d3fa94a_1280.jpg",
        specialty: "Quantum Encryption",
        era: "2045-2048",
        skillLevel: 5,
        rarity: "FOUNDER",
        backstory: "Born in the digital underground, The Matrix Breaker was the first to see through the illusion of digital security.",
        abilities: {
          hacking: 100,
          stealth: 85,
          leadership: 95,
          innovation: 100
        }
      },
      {
        id: randomUUID(),
        name: "Ghost Protocol",
        description: "Master of digital invisibility and stealth operations. Can navigate the darkest corners of cyberspace without leaving a trace, making them the perfect digital ghost.",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        specialty: "Stealth & Anonymity",
        era: "2046-2049",
        skillLevel: 4,
        rarity: "ELITE",
        backstory: "A former intelligence operative who turned to the digital underground after discovering government surveillance overreach.",
        abilities: {
          hacking: 90,
          stealth: 100,
          leadership: 70,
          innovation: 80
        }
      },
      {
        id: randomUUID(),
        name: "Neon Phantom",
        description: "Underground network coordinator who built the first decentralized hacker collective. Their neon-lit safe houses became legendary meeting points for digital rebels.",
        image: "https://pixabay.com/get/g669bc9388fa6e65759aed7ed4894a1e73346f9eca0aca99061160590e483cbecb09f6e4a3d246c70be38606e907e288787c504d1e4cd62009976448355fef6eb_1280.jpg",
        specialty: "Network Coordination",
        era: "2047-2050",
        skillLevel: 3,
        rarity: "RARE",
        backstory: "A street-smart organizer who saw the potential of connecting isolated hackers into a powerful collective.",
        abilities: {
          hacking: 75,
          stealth: 80,
          leadership: 95,
          innovation: 85
        }
      },
      {
        id: randomUUID(),
        name: "Code Weaver",
        description: "Reality manipulation through pure code. Believes that the digital and physical worlds are just different layers of the same cosmic program.",
        image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        specialty: "Reality Coding",
        era: "2049-Present",
        skillLevel: 4,
        rarity: "MYSTIC",
        backstory: "A philosopher-programmer who discovered the underlying code patterns that connect all digital systems.",
        abilities: {
          hacking: 95,
          stealth: 60,
          leadership: 65,
          innovation: 100
        }
      },
      {
        id: randomUUID(),
        name: "Quantum Sage",
        description: "Quantum computing pioneer who bridged classical hacking with quantum possibilities. Their research opened entirely new dimensions of digital exploration.",
        image: "https://pixabay.com/get/g0c2a8acbb69005ba7cca80e6827d9a56afb6f51366e79008e6bc286793fc26d45f3eb29e760402afda41b1b3500492c47e429376640659cff7143412248e7d83_1280.jpg",
        specialty: "Quantum Computing",
        era: "2048-Present",
        skillLevel: 5,
        rarity: "PIONEER",
        backstory: "A brilliant scientist who merged quantum physics with hacking, opening doorways to parallel digital dimensions.",
        abilities: {
          hacking: 100,
          stealth: 70,
          leadership: 80,
          innovation: 100
        }
      }
    ];

    sampleCharacters.forEach(character => {
      this.characters.set(character.id, character);
    });

    // Initialize story chapters
    const sampleChapters: (InsertStoryChapter & { id: string })[] = [
      {
        id: randomUUID(),
        chapterNumber: 1,
        title: "The First Breach",
        description: "In 2045, a group of rogue programmers discovered a vulnerability in the global quantum network. Their successful infiltration marked the beginning of the digital underground movement.",
        year: "2045",
        image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        unlockedBy: null,
        content: "The year 2045 marked a turning point in digital history. What started as a routine security audit by a small group of programmers became the catalyst for the greatest digital revolution of our time. The quantum network, thought to be impenetrable, revealed its first crack - and through that crack, everything changed."
      },
      {
        id: randomUUID(),
        chapterNumber: 2,
        title: "The Network Wars",
        description: "Corporate and government forces clashed with the emerging hacker collective. Digital territories were established, and the first cyber-nations declared independence.",
        year: "2047",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        unlockedBy: "RARE",
        content: "As the hacker collective grew stronger, traditional power structures began to crumble. Corporations and governments, once the undisputed rulers of the digital realm, found themselves fighting a war they didn't understand against enemies they couldn't see."
      },
      {
        id: randomUUID(),
        chapterNumber: 3,
        title: "The Great Convergence",
        description: "The boundaries between digital and physical reality blurred. Hackers evolved into digital architects, reshaping the very fabric of our interconnected world.",
        year: "2050",
        image: "https://pixabay.com/get/gbdfeee66a25e83df14ca61004e945b956e152b485a976441ff1046cd8ae195769d1d678357ca13de06443d9db38fc80523267a771d4850473bcdb239d0f6df2d_1280.jpg",
        unlockedBy: "ELITE",
        content: "By 2050, the distinction between the digital and physical worlds had become meaningless. The hackers, now calling themselves Digital Architects, had learned to reshape reality itself through pure code. The age of the cyber-physical convergence had begun."
      }
    ];

    sampleChapters.forEach(chapter => {
      this.storyChapters.set(chapter.id, chapter);
    });
  }

  async getNfts(filters?: { rarity?: string; limit?: number; offset?: number }): Promise<Nft[]> {
    let nfts = Array.from(this.nfts.values());
    
    if (filters?.rarity) {
      nfts = nfts.filter(nft => nft.rarity === filters.rarity);
    }
    
    if (filters?.offset) {
      nfts = nfts.slice(filters.offset);
    }
    
    if (filters?.limit) {
      nfts = nfts.slice(0, filters.limit);
    }
    
    return nfts.sort((a, b) => a.tokenId - b.tokenId);
  }

  async getNft(id: string): Promise<Nft | undefined> {
    return this.nfts.get(id);
  }

  async getNftByTokenId(tokenId: number): Promise<Nft | undefined> {
    return Array.from(this.nfts.values()).find(nft => nft.tokenId === tokenId);
  }

  async createNft(insertNft: InsertNft): Promise<Nft> {
    const id = randomUUID();
    const nft: Nft = { 
      ...insertNft, 
      id,
      createdAt: new Date()
    };
    this.nfts.set(id, nft);
    return nft;
  }

  async getCharacters(): Promise<Character[]> {
    return Array.from(this.characters.values());
  }

  async getCharacter(id: string): Promise<Character | undefined> {
    return this.characters.get(id);
  }

  async createCharacter(insertCharacter: InsertCharacter): Promise<Character> {
    const id = randomUUID();
    const character: Character = { ...insertCharacter, id };
    this.characters.set(id, character);
    return character;
  }

  async getStoryChapters(): Promise<StoryChapter[]> {
    return Array.from(this.storyChapters.values())
      .sort((a, b) => a.chapterNumber - b.chapterNumber);
  }

  async getStoryChapter(id: string): Promise<StoryChapter | undefined> {
    return this.storyChapters.get(id);
  }

  async createStoryChapter(insertChapter: InsertStoryChapter): Promise<StoryChapter> {
    const id = randomUUID();
    const chapter: StoryChapter = { ...insertChapter, id };
    this.storyChapters.set(id, chapter);
    return chapter;
  }

  async getCollectionStats(): Promise<CollectionStats> {
    return this.collectionStats;
  }

  async updateCollectionStats(stats: Partial<InsertCollectionStats>): Promise<CollectionStats> {
    this.collectionStats = { ...this.collectionStats, ...stats };
    return this.collectionStats;
  }
}

export const storage = new MemStorage();
