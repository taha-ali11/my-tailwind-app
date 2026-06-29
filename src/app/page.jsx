import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import TrustedPartners from "./sections/TrustedPartners";
import ServicesGrid from "./sections/ServicesGrid";
import Testimonials from "./sections/Testimonials";
import ContactForm from "./sections/ContactForm";
import Footer from "./sections/Footer";




export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustedPartners />
      <ServicesGrid />
      <Testimonials />
      <ContactForm />
      <Footer />
    </main>
  );
}