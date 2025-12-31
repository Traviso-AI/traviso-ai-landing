import Button from "./Button";
import LiquidEther from "./LiquidEther";
import BlurText from "./BlurText";
import { useEffect, useRef } from "react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPlayedOnceRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;


    const handleEnded = () => {
      // After first play, loop from 2 seconds onwards
      if (!hasPlayedOnceRef.current) {
        hasPlayedOnceRef.current = true;
      }
      // Set to 2 seconds and continue playing
      video.currentTime = 2;
      video.play().catch(() => {});
    };

    const handleTimeUpdate = () => {
      // If we've played once and video reaches end, jump back to 2 seconds
      if (hasPlayedOnceRef.current && video.currentTime >= video.duration - 0.1) {
        video.currentTime = 2;
      }
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);
  return (
    <section className="relative h-screen flex items-start justify-center overflow-hidden bg-[#F6F9FE]">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-15 z-0"
        style={{ transform: 'scale(1.25)' }}
        autoPlay
        muted
        loop
        playsInline
        src="/images/twoway_movingbg.mp4"
      />
      
      {/* LiquidEther background effect - Temporarily disabled */}
      {/* <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div> */}
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left side: Text and Button */}
          <div className="text-left space-y-4 md:mt-[200px] animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.05] tracking-tight">
              <BlurText
                text="The World's First"
                delay={150}
                animateBy="words"
                direction="top"
                as="span"
                className="block"
              />
              <BlurText
                text="Social AI Travel Concierge"
                delay={200}
                animateBy="words"
                direction="top"
                as="span"
                className="block"
                spanClassName="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent"
              />
            </h1>
            
            <BlurText
              text="Turn conversations into trips and earn from the ones you create"
              delay={100}
              animateBy="words"
              direction="top"
              className="text-lg sm:text-xl md:text-2xl text-foreground/60 leading-relaxed font-light"
            />
            
            <div className="pt-2">
              <a 
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('how-it-works');
                  if (element) {
                    const offset = 80; // Account for fixed nav height
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
              >
                <Button 
                  size="lg" 
                  className="rounded-full px-8 py-6"
                >
                  Start Exploring
                </Button>
              </a>
            </div>
          </div>
          
          {/* Right side: Video - No animation effects */}
          <div className="flex justify-center md:justify-end items-center pt-12 md:pt-16 md:mt-[-50px]">
            <video
              ref={videoRef}
              src="/images/nala_animation_with_phone_v3.mp4"
              autoPlay
              muted
              playsInline
              loop={false}
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground/40 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

