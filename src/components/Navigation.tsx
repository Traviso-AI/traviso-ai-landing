import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-primary p-2.5 rounded-2xl shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Traviso AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#how-it-works" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
            >
              How it Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a 
              href="#creators" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
            >
              For Creators
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a 
              href="#features" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-muted/80 transition-colors duration-200"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute block h-0.5 w-6 bg-foreground transform transition-all duration-300 ${isOpen ? 'rotate-45 top-3' : 'top-1'}`} />
              <span className={`absolute block h-0.5 w-6 bg-foreground transform transition-all duration-300 ${isOpen ? 'opacity-0' : 'top-3'}`} />
              <span className={`absolute block h-0.5 w-6 bg-foreground transform transition-all duration-300 ${isOpen ? '-rotate-45 top-3' : 'top-5'}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/98 backdrop-blur-md">
            <div className="px-6 py-8 space-y-6">
              <a 
                href="#how-it-works" 
                className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                How it Works
              </a>
              <a 
                href="#creators" 
                className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                For Creators
              </a>
              <a 
                href="#features" 
                className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
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