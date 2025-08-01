import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo - Far Left */}
          <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200 cursor-pointer flex-shrink-0">
            <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-lg shadow-lg border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Traviso AI
            </span>
          </a>

          {/* Desktop Navigation - Far Right */}
          <div className="hidden md:flex items-center space-x-8 flex-shrink-0">
            <a 
              href="#how-it-works" 
              className="text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 relative group"
            >
              How it Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a 
              href="#creators" 
              className="text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 relative group"
            >
              For Creators
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a 
              href="#features" 
              className="text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-white/20 transition-colors duration-200"
          >
            <div className="relative w-5 h-5">
              <span className={`absolute block h-0.5 w-5 bg-white transform transition-all duration-300 ${isOpen ? 'rotate-45 top-2.5' : 'top-1'}`} />
              <span className={`absolute block h-0.5 w-5 bg-white transform transition-all duration-300 ${isOpen ? 'opacity-0' : 'top-2.5'}`} />
              <span className={`absolute block h-0.5 w-5 bg-white transform transition-all duration-300 ${isOpen ? '-rotate-45 top-2.5' : 'top-4'}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/20 backdrop-blur-md">
            <div className="px-6 py-6 space-y-5">
              <a 
                href="#how-it-works" 
                className="block text-sm font-medium text-white/90 hover:text-white transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                How it Works
              </a>
              <a 
                href="#creators" 
                className="block text-sm font-medium text-white/90 hover:text-white transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                For Creators
              </a>
              <a 
                href="#features" 
                className="block text-sm font-medium text-white/90 hover:text-white transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;