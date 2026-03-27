import React from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ImageMarquee from './components/ImageMarquee';
import About from './components/About';
import Features from './components/Features';
import AppsGrid from './components/AppsGrid';
import ContactForms from './components/ContactForms';
import Support from './components/Support';
import CustomSoftware from './components/CustomSoftware';
import Stats from './components/Stats';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import News from './components/News';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import ChatBot from './components/ChatBot';
import GamEdu from './pages/GamEdu';
import GamMed from './pages/GamMed';
import SEO from './components/SEO';
import { Laptop, Mail, Phone, MapPin, Twitter, Linkedin, Github, Users } from 'lucide-react';

const HomePage = () => (
  <>
    <SEO 
      title="GAM IT Solutions | Leading Digital Transformation in Ghana"
      description="Empowering Ghana through institutional digital infrastructure, healthcare intelligence, and national-scale technological advancements. Explore our solutions like GAM Hub, GAM Edu, and GAM Med."
      keywords="IT solutions Ghana, digital infrastructure, healthcare software, educational software, GAM Hub, GAM Edu, GAM Med, software development Ghana"
    />
    <Hero />
    <ImageMarquee />
    <About />
    <Features />
    <Process />
    <Stats />
    <AppsGrid />
    <CustomSoftware />
    <News />
    <Team />
    <Testimonials />
    <Support />
    <FAQ />
    <Newsletter />
    <ContactForms />
    <Footer />
  </>
);

export default function App() {
  const location = useLocation();

  // Scroll to top or hash on route change
  React.useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apps/gam-edu" element={<GamEdu />} />
          <Route path="/apps/gam-med" element={<GamMed />} />
          <Route path="/ceo-dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>

      <ChatBot />
    </div>
  );
}
