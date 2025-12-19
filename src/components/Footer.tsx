import { Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 justify-items-center md:justify-items-start">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-6">
              <img 
                src="/images/logo.png" 
                alt="Traviso AI" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-foreground/60 leading-relaxed max-w-xs font-light">
              Revolutionizing travel through AI, social discovery, and the creator economy.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground">Product</h4>
            <ul className="space-y-3 text-foreground/60">
              <li><a href="#" className="hover:text-foreground transition-colors font-light">AI Planning</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors font-light">Creator Tools</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors font-light">Leaderboards</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors font-light">Mobile App</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground">Company</h4>
            <ul className="space-y-3 text-foreground/60">
              <li><a href="#" className="hover:text-foreground transition-colors font-light">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors font-light">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors font-light">Press</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors font-light">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground">Support</h4>
            <ul className="space-y-3 text-foreground/60">
              <li><a href="#" className="hover:text-foreground transition-colors font-light">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors font-light">Community</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors font-light">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors font-light">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50">
          <p className="text-foreground/60 text-sm mb-4 md:mb-0 font-light">
            © 2025 Traviso AI. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

