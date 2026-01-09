import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import InteractiveDemo from "../components/InteractiveDemo";
import Features from "../components/Features";
import TopCreatorsTrips from "../components/TopCreatorsTrips";
import BeforeFooter from "../components/BeforeFooter";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <section id="how-it-works">
        <InteractiveDemo />
      </section>
      <section id="features">
      <Features />
      </section>
      <section id="top-trips">
      <TopCreatorsTrips />
      </section>
      <BeforeFooter />
      <Footer />
    </div>
  );
};

export default Index;

