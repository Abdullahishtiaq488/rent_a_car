import { Hero } from '../components/Hero';
import { FeaturedCars } from '../components/FeaturedCars';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Hero />
        <FeaturedCars />
        <WhyChooseUs />
      </div>
      <Footer />
    </main>
  );
}
