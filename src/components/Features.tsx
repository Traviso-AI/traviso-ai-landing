import BlurText from "./BlurText";
import { motion } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

const Features = () => {
  const features = [
    {
      id: 1,
      title: "AI-Powered Planning",
      description: "Turn your travel conversations into complete itineraries with our intelligent AI assistant.",
      image: "/images/feature_card_1.png"
    },
    {
      id: 2,
      title: "Social Sharing",
      description: "Share your travel plans and discoveries with a community of like-minded explorers.",
      image: "/images/feature_card_2.png"
    },
    {
      id: 3,
      title: "Earn from Your Trips",
      description: "Monetize your travel expertise by creating and sharing trip recommendations.",
      image: "/images/feature_card_3.png"
    },
    {
      id: 4,
      title: "Real-Time Assistance",
      description: "Get instant help and recommendations wherever your journey takes you.",
      image: "/images/feature_card_4.png"
    },
    {
      id: 5,
      title: "Personalized Experiences",
      description: "Discover destinations and activities tailored to your unique travel style.",
      image: "/images/feature_card_5.png"
    },
    {
      id: 6,
      title: "Community Driven",
      description: "Connect with creators and travelers to build the ultimate travel network.",
      image: "/images/feature_card_6.png"
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <BlurText
            text="Everything you need."
            delay={150}
            animateBy="words"
            direction="top"
            as="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-4 font-sans"
          />
          <BlurText
            text="All in one place."
            delay={200}
            animateBy="words"
            direction="top"
            className="text-lg md:text-xl text-black/60 font-sans"
          />
        </div>
        
        {/* Grid: 1 column on mobile, 2 columns on tablet, 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
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
                key={feature.id}
                ref={cardRef}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="bg-white rounded-lg overflow-hidden border border-black/10 hover:border-black/20 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl cursor-pointer group"
              >
              {/* Text section at top */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-3 font-sans tracking-tight group-hover:text-black/80 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-black/70 leading-relaxed font-sans text-base group-hover:text-black/60 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
              {/* Full-width image at bottom */}
              <div className="w-full h-64 md:h-80 bg-gray-100 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

