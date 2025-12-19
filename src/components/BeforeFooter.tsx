import BlurImage from "./BlurImage";

const BeforeFooter = () => {
  const images = [
    { id: 1, image: '/images/before_footer_1.png' },
    { id: 2, image: '/images/before_footer_2.png' },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Grid: 1 column on mobile, 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {images.map((item, index) => (
            <BlurImage
              key={item.id}
              src={item.image}
              alt={`Before Footer ${item.id}`}
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

export default BeforeFooter;

