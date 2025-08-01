import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Bot, Calendar, CreditCard, Shield, Zap, Globe2 } from "lucide-react";
import { useEffect, useState } from "react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Planning",
    description: "Our intelligent agent researches destinations, finds the best deals, and creates personalized itineraries in minutes."
  },
  {
    icon: Calendar,
    title: "Live Event Integration",
    description: "Automatically discover concerts, festivals, and local events happening during your trip dates."
  },
  {
    icon: CreditCard,
    title: "One-Click Booking",
    description: "Book flights, hotels, activities, and events all in one place with secure, instant payments."
  },
  {
    icon: Shield,
    title: "24/7 Concierge",
    description: "Real-time support during your travels with our AI concierge and human backup team."
  },
  {
    icon: Zap,
    title: "Instant Recommendations",
    description: "Get personalized suggestions based on your preferences, budget, and travel style."
  },
  {
    icon: Globe2,
    title: "Global Coverage",
    description: "Access to hotels, flights, and experiences in over 200 countries worldwide."
  }
];

const Features = () => {
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need to Travel
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From AI-powered planning to real-time support, we've built every tool you need for perfect trips
          </p>
        </div>

        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {features.map((feature, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="p-8 bg-gradient-card border-border hover:shadow-card transition-all duration-300 group hover:scale-105 h-full">
                    <div className="bg-gradient-primary p-4 rounded-2xl w-fit mb-6 group-hover:shadow-glow transition-all duration-300">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Features;