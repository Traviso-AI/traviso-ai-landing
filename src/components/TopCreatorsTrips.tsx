import BlurText from "./BlurText";
import { ChevronRight, Heart } from "lucide-react";
import { motion } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

const TopCreatorsTrips = () => {
  const trips = [
    {
      id: 1,
      title: "Tokyo Adventure",
      creator: "Sarah Chen",
      description: "A 7-day journey through Tokyo's hidden gems.",
      image: "/images/hotel_card_1.png",
      rating: 4.8
    },
    {
      id: 2,
      title: "Mediterranean Escape",
      creator: "Marco Rossi",
      description: "Explore the stunning coastlines of Greece and Italy with curated local experiences.",
      image: "/images/hotel_card_2.png",
      rating: 4.9
    },
    {
      id: 3,
      title: "Mountain Retreat",
      creator: "Alex Thompson",
      description: "Swiss Alps adventure with hiking, skiing, and luxury mountain lodges.",
      image: "/images/hotel_card_3.png",
      rating: 4.7
    },
  ];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400 text-sm">★</span>
        ))}
        {hasHalfStar && (
          <span className="text-yellow-400 text-sm">☆</span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300 text-sm">★</span>
        ))}
        <span className="ml-1 text-white text-sm font-sans">{rating}</span>
      </div>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <BlurText
            text="Top creators' trips."
            delay={150}
            animateBy="words"
            direction="top"
            as="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-4 font-sans"
          />
          <BlurText
            text="Inspired journeys from travel experts around the world."
            delay={200}
            animateBy="words"
            direction="top"
            className="text-lg md:text-xl text-black/60 font-sans"
          />
        </div>
        
        {/* Grid: 1 column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {trips.map((trip, index) => {
            const cardRef = useRef<HTMLDivElement>(null);
            const [isVisible, setIsVisible] = useState(false);

            useEffect(() => {
              if (!cardRef.current) return;
              const observer = new IntersectionObserver(
                ([entry]) => {
                  if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(cardRef.current!);
                  }
                },
                { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
              );
              observer.observe(cardRef.current);
              return () => observer.disconnect();
            }, []);

            return (
              <motion.div
                key={trip.id}
                ref={cardRef}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="bg-white rounded-lg overflow-hidden border border-black/10 hover:border-black/20 transition-all duration-300"
              >
              {/* Text section at top */}
              <div className="p-6 md:p-8">
                <div className="text-sm text-black/60 mb-2 font-sans">By {trip.creator}</div>
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-3 font-sans tracking-tight">
                  {trip.title}
                </h3>
                <p className="text-black/70 leading-relaxed font-sans text-base">
                  {trip.description}
                </p>
              </div>
              {/* Full-width image at bottom with overlays */}
              <div className="w-full h-64 md:h-80 bg-gray-100 overflow-hidden relative">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover"
                />
                {/* Favorite icon at top right */}
                <button className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full p-2 hover:bg-black/80 transition-colors">
                  <Heart className="w-4 h-4 text-white" />
                </button>
                {/* Star rating overlay at bottom left */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                  {renderStars(trip.rating)}
                </div>
                {/* Next icon at bottom right */}
                <button className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-full p-2 hover:bg-black/80 transition-colors">
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopCreatorsTrips;

