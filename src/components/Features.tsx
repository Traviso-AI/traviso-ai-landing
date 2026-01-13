import BlurText from "./BlurText";
import { motion } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pathPoints, setPathPoints] = useState<Array<{ x: number; y: number }>>([]);
  const [pathLength, setPathLength] = useState(0);
  const svgPathRef = useRef<SVGPathElement>(null);

  // Track scroll and update jet position - pure scroll-based only
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Calculate scroll progress within the section (0 to 1)
      // Start when section enters viewport, end when it exits
      const start = sectionTop - windowHeight;
      const end = sectionTop + sectionHeight;
      const progress = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate path points based on text section positions
  useEffect(() => {
    const updatePathPoints = () => {
      // Only calculate on desktop (md breakpoint and above)
      if (window.innerWidth < 768 || textRefs.current.length === 0) {
        setPathPoints([]);
        return;
      }

      const points: Array<{ x: number; y: number }> = [];
      
      textRefs.current.forEach((ref, index) => {
        if (ref && sectionRef.current) {
          const rect = ref.getBoundingClientRect();
          const sectionRect = sectionRef.current.getBoundingClientRect();
          const isEven = index % 2 === 0;
          
          // Calculate position relative to section
          // For left text (even), use right edge; for right text (odd), use left edge
          const x = isEven 
            ? rect.right - sectionRect.left - 30 // Right edge of text container (left side)
            : rect.left - sectionRect.left + 30; // Left edge of text container (right side)
          const y = rect.top - sectionRect.top + rect.height / 2;
          
          points.push({ x, y });
        }
      });

      setPathPoints(points);
    };

    // Update on mount and resize
    updatePathPoints();
    window.addEventListener('resize', updatePathPoints);
    
    // Also update after delays to ensure layout is complete
    const timeout1 = setTimeout(updatePathPoints, 100);
    const timeout2 = setTimeout(updatePathPoints, 500);

    return () => {
      window.removeEventListener('resize', updatePathPoints);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  // Generate smooth wavy SVG path using cubic bezier curves with smooth vertex connections
  const generatePath = (): string => {
    if (pathPoints.length < 2) return '';

    let path = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
    
    // Store previous control point for smooth continuity
    let prevCp2x = pathPoints[0].x;
    let prevCp2y = pathPoints[0].y;
    
    for (let i = 1; i < pathPoints.length; i++) {
      const prev = pathPoints[i - 1];
      const curr = pathPoints[i];
      const next = i < pathPoints.length - 1 ? pathPoints[i + 1] : null;
      
      // Calculate direction vectors
      const dx = curr.x - prev.x;
      const dy = curr.y - prev.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Wave amplitude based on distance (proportional)
      const waveAmplitude = Math.min(80, distance * 0.3);
      
      // Calculate control points for smooth S-curve
      let cp1x, cp1y, cp2x, cp2y;
      
      if (next) {
        // For intermediate points, calculate smooth transition
        const nextDx = next.x - curr.x;
        const nextDy = next.y - curr.y;
        const nextDistance = Math.sqrt(nextDx * nextDx + nextDy * nextDy);
        
        // Normalize direction vectors
        const dirX = dx / distance;
        const dirY = dy / distance;
        const nextDirX = nextDx / nextDistance;
        const nextDirY = nextDy / nextDistance;
        
        // Average direction for smooth transition at vertex
        const avgDirX = (dirX + nextDirX) * 0.5;
        const avgDirY = (dirY + nextDirY) * 0.5;
        const avgDirLength = Math.sqrt(avgDirX * avgDirX + avgDirY * avgDirY);
        const normalizedAvgDirX = avgDirX / avgDirLength;
        const normalizedAvgDirY = avgDirY / avgDirLength;
        
        // Control point 1: from previous point
        const t1 = 0.4;
        cp1x = prev.x + dx * t1;
        cp1y = prev.y + dy * t1 + (i % 2 === 0 ? waveAmplitude : -waveAmplitude);
        
        // Control point 2: approaching current point, aligned for smooth connection
        // Use a smoothness factor to ensure curves connect nicely
        const smoothness = 0.3;
        cp2x = curr.x - normalizedAvgDirX * distance * smoothness;
        cp2y = curr.y - normalizedAvgDirY * distance * smoothness + (i % 2 === 0 ? -waveAmplitude * 0.5 : waveAmplitude * 0.5);
      } else {
        // Last point - no next point to consider
        cp1x = prev.x + dx * 0.4;
        cp1y = prev.y + dy * 0.4 + (i % 2 === 0 ? waveAmplitude : -waveAmplitude);
        
        cp2x = prev.x + dx * 0.6;
        cp2y = prev.y + dy * 0.6 + (i % 2 === 0 ? -waveAmplitude * 0.5 : waveAmplitude * 0.5);
      }
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      
      // Store for next iteration (for potential future use)
      prevCp2x = cp2x;
      prevCp2y = cp2y;
    }
    
    return path;
  };

  // Generate path up to a specific length (for trail effect)
  const generatePathToLength = (targetLength: number): string => {
    if (pathPoints.length < 2 || !svgPathRef.current) return '';
    
    const fullPath = svgPathRef.current;
    const totalLength = fullPath.getTotalLength();
    
    if (targetLength >= totalLength) {
      return generatePath();
    }
    
    // Get point at target length
    const endPoint = fullPath.getPointAtLength(targetLength);
    
    // For simplicity, we'll use the full path but clip it using stroke-dasharray
    // This is handled by the stroke-dashoffset technique
    return generatePath();
  };

  const [jetPosition, setJetPosition] = useState<{ x: number; y: number; angle: number }>({ x: 0, y: 0, angle: 0 });

  // Update path length when path changes
  useEffect(() => {
    if (svgPathRef.current) {
      setPathLength(svgPathRef.current.getTotalLength());
    }
  }, [pathPoints]);

  // Calculate jet position along path
  useEffect(() => {
    if (!svgPathRef.current || pathPoints.length === 0 || pathLength === 0) return;

    const path = svgPathRef.current;
    const currentLength = pathLength * scrollProgress;
    
    if (currentLength >= 0 && currentLength <= pathLength) {
      const point = path.getPointAtLength(currentLength);
      const nextLength = Math.min(currentLength + 10, pathLength);
      const nextPoint = path.getPointAtLength(nextLength);
      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
      
      setJetPosition({ x: point.x, y: point.y, angle });
    }
  }, [scrollProgress, pathPoints, pathLength]);
  const features = [
    {
      id: 1,
      title: "AI-Powered Planning That Understands You",
      description: "Transform your travel conversations into complete itineraries with our intelligent AI assistant that learns your preferences.",
      image: "/images/feature_card_1.png"
    },
    {
      id: 2,
      title: "Social Sharing and Discovery Platform",
      description: "Share your travel plans with a vibrant community of explorers and discover hidden gems from fellow travelers worldwide.",
      image: "/images/feature_card_2.png"
    },
    {
      id: 3,
      title: "Earn from Your Travel Expertise",
      description: "Monetize your passion by creating curated itineraries and earning revenue when others book your recommended trips.",
      image: "/images/feature_card_3.png"
    },
    {
      id: 4,
      title: "Real-Time Assistance When You Need It",
      description: "Get instant help and recommendations wherever your journey takes you with our 24/7 AI-powered support system.",
      image: "/images/feature_card_4.png"
    },
    {
      id: 5,
      title: "Personalized Experiences Tailored to You",
      description: "Discover destinations and activities perfectly matched to your unique travel style, interests, and personal preferences.",
      image: "/images/feature_card_5.png"
    },
    {
      id: 6,
      title: "Community-Driven Travel Network",
      description: "Connect with creators and travelers to build meaningful connections and access authentic recommendations from trusted experts.",
      image: "/images/feature_card_6.png"
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white relative">
      {/* SVG Path and Jet Animation - Background layer (desktop only) */}
      {pathPoints.length >= 2 && (
        <svg
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Mask to reveal only the traveled portion */}
            <mask id="trailMask">
              <rect x="0" y="0" width="100%" height="100%" fill="black" />
              <path
                ref={svgPathRef}
                d={generatePath()}
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeDasharray={pathLength > 0 ? `${pathLength} ${pathLength}` : '0'}
                strokeDashoffset={pathLength > 0 ? pathLength * (1 - scrollProgress) : 0}
                style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
              />
            </mask>
          </defs>
          {/* Animated dotted trail that follows the jet - only visible where jet has traveled */}
          <path
            d={generatePath()}
            fill="none"
            stroke="rgba(0, 0, 0, 0.15)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="8 6"
            mask="url(#trailMask)"
          />
          {/* Trailhead icon */}
          {scrollProgress > 0 && (
            <g
              transform={`translate(${jetPosition.x}, ${jetPosition.y}) rotate(${jetPosition.angle})`}
            >
              <image
                href="/images/trailhead.png"
                x="-20"
                y="-20"
                width="40"
                height="40"
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
          )}
        </svg>
      )}
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16 w-full">
          <div className="flex justify-center">
            <BlurText
              text="Everything you need."
              delay={150}
              animateBy="words"
              direction="top"
              as="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-4 font-sans justify-center"
            />
          </div>
          <div className="flex justify-center">
            <BlurText
              text="All in one place."
              delay={200}
              animateBy="words"
              direction="top"
              className="text-lg md:text-xl text-black/60 font-sans justify-center"
            />
          </div>
        </div>
        
        {/* OLD VERSION - Grid layout with cards (commented for potential revert) */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-3 font-sans tracking-tight group-hover:text-black/80 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-black/70 leading-relaxed font-sans text-base group-hover:text-black/60 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
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
        </div> */}

        {/* NEW VERSION - Alternating left text/right image layout */}
        <div className="space-y-16 md:space-y-24">
          {features.map((feature, index) => {
            const cardRef = useRef<HTMLDivElement>(null);
            const [isVisible, setIsVisible] = useState(false);
            const isEven = index % 2 === 0; // Even index = left text, right image

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
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 ${isEven ? 'md:gap-6' : 'md:gap-12'}`}
              >
                {/* Text Section */}
                <div 
                  ref={(el) => { textRefs.current[index] = el; }}
                  className="w-full md:w-1/2 relative z-10"
                >
                  <div className={`w-full md:w-4/5 ${isEven ? 'md:ml-auto' : ''}`}>
                    <div className={`w-full ${isEven ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black mb-4 font-sans tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="text-lg md:text-xl text-black/70 leading-relaxed font-sans">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Image Section */}
                <div className="w-full md:w-1/2 relative z-20">
                  <div className="w-full h-64 md:h-80 lg:h-96 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
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

