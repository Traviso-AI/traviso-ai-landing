import BlurText from "./BlurText";
import { ChevronRight, ChevronLeft, Heart } from "lucide-react";
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
    {
      id: 4,
      title: "Tropical Paradise",
      creator: "Emma Wilson",
      description: "Discover the pristine beaches and vibrant culture of the Maldives.",
      image: "/images/hotel_card_1.png",
      rating: 4.9
    },
    {
      id: 5,
      title: "European Grand Tour",
      creator: "James Martinez",
      description: "A comprehensive journey through Paris, Rome, and Barcelona.",
      image: "/images/hotel_card_2.png",
      rating: 4.8
    },
    {
      id: 6,
      title: "Safari Adventure",
      creator: "Zara Ahmed",
      description: "Experience the wild beauty of Kenya's national parks and wildlife.",
      image: "/images/hotel_card_3.png",
      rating: 4.9
    },
  ];

  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const autoScrollIntervalRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const checkScrollButtons = () => {
    // Always show buttons for infinite scrolling
    setCanScrollLeft(true);
    setCanScrollRight(true);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    checkScrollButtons();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        window.removeEventListener('resize', checkMobile);
        carousel.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (isHovered) return; // Pause auto-scroll on hover

    const autoScroll = () => {
      if (!carouselRef.current) return;

      const carousel = carouselRef.current;
      const isMobile = window.innerWidth < 768;
      const cardsPerView = isMobile ? 1 : 3;
      const gap = isMobile ? 24 : 32; // gap-6 = 24px, gap-8 = 32px
      
      // Calculate card width including gap
      const containerWidth = carousel.clientWidth;
      const cardWidth = containerWidth / cardsPerView;
      const scrollAmount = cardWidth + gap;

      const currentScroll = carousel.scrollLeft;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      const nextScroll = currentScroll + scrollAmount;

      const realContentWidth = trips.length * (cardWidth + gap) - gap;
      
      // If we've reached or passed the end, scroll into duplicated cards (onScroll will loop it)
      if (nextScroll >= realContentWidth - 10) {
        // Continue scrolling into duplicated cards - onScroll handler will seamlessly loop
        carousel.scrollTo({
          left: nextScroll,
          behavior: 'smooth'
        });
      } else {
        carousel.scrollTo({
          left: nextScroll,
          behavior: 'smooth'
        });
      }
    };

    // Start auto-scroll interval (2.5 seconds)
    autoScrollIntervalRef.current = setInterval(autoScroll, 2500);

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isHovered]);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const carousel = carouselRef.current;
    const cardsPerView = isMobile ? 1 : 3;
    const gap = isMobile ? 24 : 32;
    const containerWidth = carousel.clientWidth;
    const cardWidth = containerWidth / cardsPerView;
    const scrollAmount = cardWidth + gap;
    
    const currentScroll = carousel.scrollLeft;
    const realContentWidth = trips.length * (cardWidth + gap) - gap;
    const duplicatedCardsWidth = cardsPerView * (cardWidth + gap);
    
    if (direction === 'right') {
      const nextScroll = currentScroll + scrollAmount;
      
      // If we've scrolled past the real content, loop to the start
      if (nextScroll >= realContentWidth) {
        // Calculate how far past we went
        const overflow = nextScroll - realContentWidth;
        // Jump to the start position plus the overflow
        carousel.scrollTo({
          left: overflow,
          behavior: 'smooth'
        });
      } else {
        carousel.scrollTo({
          left: nextScroll,
          behavior: 'smooth'
        });
      }
    } else {
      // Scrolling left
      const nextScroll = currentScroll - scrollAmount;
      
      // If we'd go negative, loop to the end
      if (nextScroll < 0) {
        // Calculate position from the end
        const positionFromEnd = Math.abs(nextScroll);
        // Jump to the end minus the position
        carousel.scrollTo({
          left: realContentWidth - positionFromEnd,
          behavior: 'smooth'
        });
      } else {
        carousel.scrollTo({
          left: nextScroll,
          behavior: 'smooth'
        });
      }
    }
  };

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
        <div className="text-center mb-12 md:mb-16 w-full">
          <div className="flex justify-center">
        <BlurText
              text="Top creators' trips."
          delay={150}
          animateBy="words"
          direction="top"
          as="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-4 font-sans justify-center"
            />
          </div>
          <div className="flex justify-center">
            <BlurText
              text="Inspired journeys from travel experts around the world."
              delay={200}
              animateBy="words"
              direction="top"
              className="text-lg md:text-xl text-black/60 font-sans justify-center"
            />
          </div>
        </div>
        
        {/* Carousel container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left arrow button - always visible for infinite scroll */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg border border-black/10 hover:border-black/20 transition-all duration-300 hover:shadow-xl"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          
          {/* Right arrow button - always visible for infinite scroll */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg border border-black/10 hover:border-black/20 transition-all duration-300 hover:shadow-xl"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>

          {/* Scrollable carousel */}
          <div
            ref={carouselRef}
            className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onScroll={() => {
              if (!carouselRef.current) return;
              
              const carousel = carouselRef.current;
              const cardsPerView = isMobile ? 1 : 3;
              const gap = isMobile ? 24 : 32;
              const containerWidth = carousel.clientWidth;
              const cardWidth = containerWidth / cardsPerView;
              
              // Calculate where the real content ends (before duplicated cards)
              const realContentWidth = trips.length * (cardWidth + gap) - gap;
              
              // If scrolled into the duplicated cards at the end, instantly jump to corresponding position at start
              if (carousel.scrollLeft >= realContentWidth) {
                const offset = carousel.scrollLeft - realContentWidth;
                // Use requestAnimationFrame to ensure smooth transition
                requestAnimationFrame(() => {
                  if (carouselRef.current) {
                    carouselRef.current.scrollLeft = offset;
                  }
                });
              }
              
              // If scrolled before start (shouldn't happen with new scroll logic, but just in case)
              if (carousel.scrollLeft < 0) {
                requestAnimationFrame(() => {
                  if (carouselRef.current) {
                    carouselRef.current.scrollLeft = realContentWidth + carousel.scrollLeft;
                  }
                });
              }
              
              checkScrollButtons();
            }}
          >
            {/* Duplicate first few cards at the end for seamless loop */}
            {trips.slice(0, isMobile ? 1 : 3).map((trip, index) => {
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
                  key={`duplicate-${trip.id}`}
                  ref={cardRef}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="bg-white rounded-lg overflow-hidden border border-black/10 hover:border-black/20 transition-all duration-300 flex-shrink-0 w-[85vw] md:w-[calc(33.333%-16px)]"
                >
                  <div className="p-6 md:p-8">
                    <div className="text-sm text-black/60 mb-2 font-sans">By {trip.creator}</div>
                    <h3 className="text-xl md:text-2xl font-semibold text-black mb-3 font-sans tracking-tight">
                      {trip.title}
                    </h3>
                    <p className="text-black/70 leading-relaxed font-sans text-base">
                      {trip.description}
                    </p>
                  </div>
                  <div className="w-full h-64 md:h-80 bg-gray-100 overflow-hidden relative">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full p-2 hover:bg-black/80 transition-colors">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                      {renderStars(trip.rating)}
                    </div>
                    <button className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-full p-2 hover:bg-black/80 transition-colors">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
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
                className="bg-white rounded-lg overflow-hidden border border-black/10 hover:border-black/20 transition-all duration-300 flex-shrink-0 w-[85vw] md:w-[calc(33.333%-16px)]"
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
      </div>
    </section>
  );
};

export default TopCreatorsTrips;

