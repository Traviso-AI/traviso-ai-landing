import BlurText from "./BlurText";
import { motion } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

const BeforeFooter = () => {
  const benefits = [
    {
      id: 1,
      title: "Start planning today.",
      description: "Join thousands of travelers who are already creating amazing trips with AI assistance.",
      image: "/images/before_footer_1.png"
    },
    {
      id: 2,
      title: "Become a creator.",
      description: "Share your travel expertise and earn rewards when others book your recommended trips.",
      image: "/images/before_footer_2.png"
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Grid: 1 column on mobile, 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {benefits.map((benefit, index) => {
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
                key={benefit.id}
                ref={cardRef}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="bg-white rounded-lg overflow-hidden border border-black/10 hover:border-black/20 transition-all duration-300"
              >
              {/* Text section at top */}
              <div className="p-6 md:p-8">
                <BlurText
                  text={benefit.title}
              delay={100 + (index * 50)}
                  animateBy="words"
              direction="top"
                  as="h3"
                  className="text-2xl md:text-3xl font-semibold text-black mb-3 font-sans tracking-tight"
                />
                <p className="text-black/70 leading-relaxed font-sans text-base">
                  {benefit.description}
                </p>
              </div>
              {/* Full-width image at bottom */}
              <div className="w-full h-64 md:h-80 bg-gray-100 overflow-hidden">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-cover"
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

export default BeforeFooter;

