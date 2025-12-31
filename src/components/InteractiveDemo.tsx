import BlurText from "./BlurText";

const InteractiveDemo = () => {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      {/* Heading with max-width container */}
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12">
        <div className="text-center">
          <BlurText
            text="See how it works."
            delay={150}
            animateBy="words"
            direction="top"
            as="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-4 font-sans"
          />
          <BlurText
            text="Experience Traviso AI in action."
            delay={200}
            animateBy="words"
            direction="top"
            className="text-lg md:text-xl text-black/60 font-sans"
          />
        </div>
      </div>
      
      {/* 90% width iframe container - centered */}
      <div className="w-full flex justify-center">
        <div
          style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            borderRadius: 0,
            boxShadow: '0 15px 40px rgba(63,58,79,.3)',
            overflow: 'hidden',
            minWidth: '320px',
            width: '90%'
          }}
        >
          <iframe
            src="https://traviso.portal.trainn.co/share/p9A4jUt1P2jqIr326sonmQ/embed?autoplay=false"
            frameBorder="0"
            {...{ webkitallowfullscreen: true, mozallowfullscreen: true }}
            allowFullScreen
            allow="autoplay; fullscreen"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
            title="Traviso AI Interactive Demo"
          />
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
