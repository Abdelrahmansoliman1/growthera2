import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import BackToTop from "./components/BackToTop.jsx";

export default function App() {
  return (
    <div className="font-body text-neutral-900 bg-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
