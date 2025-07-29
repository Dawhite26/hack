import { Twitter, Github, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-matrix/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <h3 className="text-2xl font-orbitron font-bold text-matrix mb-4">HackChain</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              The premier NFT collection telling the story of digital legends who shaped our cyber reality. 
              Join the revolution and own a piece of hacker history.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-matrix transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyber transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-pink transition-colors">
                <MessageSquare className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron font-bold text-lg mb-4 text-cyber">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#collection" className="hover:text-matrix transition-colors">Collection</a></li>
              <li><a href="#story" className="hover:text-matrix transition-colors">Story</a></li>
              <li><a href="#characters" className="hover:text-matrix transition-colors">Characters</a></li>
              <li><a href="#mint" className="hover:text-matrix transition-colors">Mint</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-orbitron font-bold text-lg mb-4 text-neon-pink">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-matrix transition-colors">Whitepaper</a></li>
              <li><a href="#" className="hover:text-matrix transition-colors">Roadmap</a></li>
              <li><a href="#" className="hover:text-matrix transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-matrix transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2024 HackChain. All rights reserved. | Powered by blockchain technology.</p>
        </div>
      </div>
    </footer>
  );
}
