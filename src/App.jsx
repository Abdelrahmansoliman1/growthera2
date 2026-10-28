import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Process from "./components/Process.jsx";
import Industries from "./components/Industries.jsx";
import WhyUs from "./components/WhyUs.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import BackToTop from "./components/BackToTop.jsx";

export default function App() {
  return (
    <div className="font-body text-neutral-900 bg-white">
      <ScrollProgress />
      <Header />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Process />
      <Industries />
      <WhyUs />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
