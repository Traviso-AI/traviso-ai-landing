import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-beach-palms.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="AI Travel Planning" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <div className="absolute bottom-32 right-16 animate-float" style={{ animationDelay: '1s' }}>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Travel Planning
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Reimagined by AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Chat with our AI to plan and book complete trips. Discover creator itineraries. 
            Publish your own and earn from every booking.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-12 py-6 h-auto group"
            >
              <MessageCircle className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              Start Planning with AI
            </Button>
            
            <Button 
              variant="premium" 
              size="lg" 
              className="text-lg px-12 py-6 h-auto bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
            >
              Become a Creator
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;