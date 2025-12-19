import BlurText from "./BlurText";
import BlurImage from "./BlurImage";

const TopCreatorsTrips = () => {
  const hotelCards = [
    { id: 1, image: '/images/hotel_card_1.png' },
    { id: 2, image: '/images/hotel_card_2.png' },
    { id: 3, image: '/images/hotel_card_3.png' },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <BlurText
          text="Top Creators' Trips"
          delay={150}
          animateBy="words"
          direction="top"
          as="h2"
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground text-center mb-12 md:mb-16"
        />
        
        {/* Grid: 1 column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {hotelCards.map((card, index) => (
            <BlurImage
              key={card.id}
              src={card.image}
              alt={`Creator Trip ${card.id}`}
              delay={100 + (index * 50)}
              direction="top"
              className="flex justify-center"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCreatorsTrips;

