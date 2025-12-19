import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Features from "../components/Features";
import TopCreatorsTrips from "../components/TopCreatorsTrips";
import BeforeFooter from "../components/BeforeFooter";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <TopCreatorsTrips />
      <BeforeFooter />
      <Footer />
    </div>
  );
};

export default Index;

