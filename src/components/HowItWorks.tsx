import { Card } from "@/components/ui/card";
import { MessageCircle, Globe, DollarSign, Bot, Users, Trophy } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Chat & Plan",
    description: "Tell our AI agent where you want to go. It researches, plans, and books flights, hotels, events, and activities."
  },
  {
    icon: Globe,
    title: "Discover Trips",
    description: "Browse curated itineraries from top travel creators. Find your perfect adventure with verified reviews."
  },
  {
    icon: DollarSign,
    title: "Create & Earn",
    description: "Publish your own travel packages and earn commissions when others book them. The better your content, the more you earn."
  }
];

const features = [
  {
    icon: Bot,
    title: "AI Concierge",
    description: "24/7 intelligent support during your travels"
  },
  {
    icon: Users,
    title: "Creator Network",
    description: "Connect with verified travel influencers"
  },
  {
    icon: Trophy,
    title: "Leaderboards",
    description: "Compete for the world's best travel packages"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Three Ways to Travel Smarter
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're planning, discovering, or creating - Traviso AI revolutionizes every aspect of travel
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
          {steps.map((step, index) => (
            <Card key={index} className="p-8 bg-gradient-card border-border hover:shadow-card transition-all duration-300 group hover:scale-105">
              <div className="bg-gradient-primary p-4 rounded-2xl w-fit mb-6 group-hover:shadow-glow transition-all duration-300">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </Card>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-accent/20 p-6 rounded-2xl w-fit mx-auto mb-4 group-hover:bg-accent/30 transition-colors">
                <feature.icon className="w-10 h-10 text-accent mx-auto" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h4>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;