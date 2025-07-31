
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-beach-paradise.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/20" />
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="AI Travel Planning" 
          className="w-full h-full object-cover opacity-40 brightness-110 contrast-110"
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="animate-fade-in space-y-8">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
              <span className="bg-gradient-to-r from-blue-200 via-white to-cyan-200 bg-clip-text text-transparent">
                Your trip finally made it out of the group chat.
              </span>
            </h1>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-white/95 leading-relaxed font-light">
                Automate planning with AI. Book creator-curated itineraries. Or publish your own and earn.
              </p>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-10 py-4 h-auto font-semibold tracking-wide shadow-xl hover:shadow-blue-500/25 transition-all duration-500"
            >
              JOIN WAITLIST
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
