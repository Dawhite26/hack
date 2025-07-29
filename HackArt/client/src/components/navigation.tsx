import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location !== "/") {
      // If not on home page, navigate to home first
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative z-50 bg-dark-card/80 backdrop-blur-md border-b border-matrix/30 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <h1 className="text-2xl font-orbitron font-bold text-matrix animate-glow cursor-pointer">
                HackChain
              </h1>
            </Link>
            <span className="text-cyber text-sm font-light">Elite Hacker Collection</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection("collection")}
              className="hover:text-matrix transition-colors cursor-pointer"
            >
              Collection
            </button>
            <button 
              onClick={() => scrollToSection("story")}
              className="hover:text-cyber transition-colors cursor-pointer"
            >
              Story
            </button>
            <button 
              onClick={() => scrollToSection("characters")}
              className="hover:text-neon-pink transition-colors cursor-pointer"
            >
              Characters
            </button>
            <button 
              onClick={() => scrollToSection("mint")}
              className="hover:text-electric transition-colors cursor-pointer"
            >
              Mint
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-matrix"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-matrix/30">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection("collection")}
                className="text-left hover:text-matrix transition-colors"
              >
                Collection
              </button>
              <button 
                onClick={() => scrollToSection("story")}
                className="text-left hover:text-cyber transition-colors"
              >
                Story
              </button>
              <button 
                onClick={() => scrollToSection("characters")}
                className="text-left hover:text-neon-pink transition-colors"
              >
                Characters
              </button>
              <button 
                onClick={() => scrollToSection("mint")}
                className="text-left hover:text-electric transition-colors"
              >
                Mint
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
