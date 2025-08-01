import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 animate-float opacity-30">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
      </div>
      
      <div className="absolute bottom-20 right-20 animate-float opacity-30" style={{ animationDelay: '2s' }}>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <Card className="p-12 bg-white/10 backdrop-blur-lg border-white/20 shadow-premium">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Ready to Transform
            <span className="block">Your Travel Experience?</span>
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of travelers and creators who are already planning smarter, 
            discovering better, and earning more with Traviso AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg" 
              className="px-10 py-4 bg-white text-primary hover:bg-white/90 transform hover:scale-105"
            >
              Get Early Access
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/70 text-sm">
              🚀 Launching Q2 2024 • ✨ Limited Early Access Available • 🎯 No Credit Card Required
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTA;