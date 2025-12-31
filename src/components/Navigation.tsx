import { useState, useEffect } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition >= 10);
    };

    window.addEventListener('scroll', handleScroll);
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/20' : 'bg-transparent border-b-0'}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center hover:opacity-80 transition-opacity duration-200 cursor-pointer flex-shrink-0"
          >
            <img 
              src="/images/logo.png" 
              alt="Traviso AI" 
              className="h-8 w-auto"
            />
          </a>

          <div className="hidden md:flex items-center space-x-8 flex-shrink-0">
            <a 
              href="#how-it-works" 
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('how-it-works');
                if (element) {
                  const offset = 80; // Account for fixed nav height
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 relative group"
            >
              How it Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a 
              href="#features" 
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('features');
                if (element) {
                  const offset = 80; // Account for fixed nav height
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a 
              href="#top-trips" 
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('top-trips');
                if (element) {
                  const offset = 80; // Account for fixed nav height
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 relative group"
            >
              Top Trips
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-foreground/5 transition-colors duration-200"
          >
            <div className="relative w-5 h-5">
              <span className={`absolute block h-0.5 w-5 bg-foreground transform transition-all duration-300 ${isOpen ? 'rotate-45 top-2.5' : 'top-1'}`} />
              <span className={`absolute block h-0.5 w-5 bg-foreground transform transition-all duration-300 ${isOpen ? 'opacity-0' : 'top-2.5'}`} />
              <span className={`absolute block h-0.5 w-5 bg-foreground transform transition-all duration-300 ${isOpen ? '-rotate-45 top-2.5' : 'top-4'}`} />
            </div>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-border/50 glass-strong">
            <div className="px-6 py-6 space-y-5">
              <a 
                href="#how-it-works" 
                className="block text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  const element = document.getElementById('how-it-works');
                  if (element) {
                    const offset = 80; // Account for fixed nav height
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
              >
                How it Works
              </a>
              <a 
                href="#features" 
                className="block text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  const element = document.getElementById('features');
                  if (element) {
                    const offset = 80; // Account for fixed nav height
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
              >
                Features
              </a>
              <a 
                href="#top-trips" 
                className="block text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  const element = document.getElementById('top-trips');
                  if (element) {
                    const offset = 80; // Account for fixed nav height
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
              >
                Top Trips
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

