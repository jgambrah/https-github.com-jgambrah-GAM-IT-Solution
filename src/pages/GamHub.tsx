import React from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  ShoppingBag, 
  Trophy, 
  MessageSquare, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2,
  Server,
  Lock,
  Cpu,
  Database,
  Layout,
  Smartphone,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const GamHub = () => {
  const features = [
    {
      title: "The Market (Escrow Commerce)",
      icon: <ShoppingBag className="w-6 h-6" />,
      items: [
        "Secure National Escrow System",
        "Verified Merchant Ecosystem",
        "Real-time Logistics Integration",
        "Dispute Resolution Framework"
      ]
    },
    {
      title: "The Arena (AI-Refereed Combat)",
      icon: <Trophy className="w-6 h-6" />,
      items: [
        "Competitive Gaming & Combat Platform",
        "AI-Driven Matchmaking & Refereeing",
        "National Leaderboards & Rankings",
        "Tournament Management System"
      ]
    },
    {
      title: "Ghana Pulse (Social Media)",
      icon: <MessageSquare className="w-6 h-6" />,
      items: [
        "National Engagement Platform",
        "Verified Citizen Profiles",
        "Community Forums & Discussions",
        "Real-time News & Updates"
      ]
    },
    {
      title: "National Infrastructure",
      icon: <Globe className="w-6 h-6" />,
      items: [
        "Centralized Identity Management",
        "Unified Service Access",
        "National Data Interoperability",
        "Public Service Integration"
      ]
    }
  ];

  const techSpecs = [
    {
      title: "National Scale Architecture",
      icon: <Server className="w-6 h-6" />,
      content: "Distributed cloud infrastructure designed to handle millions of concurrent users with high availability and fault tolerance."
    },
    {
      title: "Identity & Security",
      icon: <Lock className="w-6 h-6" />,
      content: "Integration with national identity systems (Ghana Card) and bank-grade encryption for all financial transactions."
    },
    {
      title: "AI Refereeing Engine",
      icon: <Cpu className="w-6 h-6" />,
      content: "Custom-trained AI models for fair play detection and automated refereeing in competitive environments."
    },
    {
      title: "Real-time Data Fabric",
      icon: <Database className="w-6 h-6" />,
      content: "High-performance data layer supporting real-time social interactions and marketplace updates."
    },
    {
      title: "Unified UI/UX Framework",
      icon: <Layout className="w-6 h-6" />,
      content: "Consistent design language across all hub services for a seamless citizen experience."
    },
    {
      title: "Mobile-First Access",
      icon: <Smartphone className="w-6 h-6" />,
      content: "Optimized for mobile devices to ensure accessibility for all citizens across the country."
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      <SEO 
        title="GAM Hub | The National Infrastructure of Ghana"
        description="GAM Hub is the definitive national hub featuring The Market, The Arena, and Ghana Pulse. Explore the digital infrastructure empowering Ghana."
        keywords="GAM Hub, Ghana digital infrastructure, national hub, escrow commerce, AI refereed combat, Ghana Pulse, social media Ghana"
      />
      
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                GAM Hub: The <span className="text-indigo-200">National Infrastructure</span> of Ghana
              </h1>
              <p className="text-xl text-indigo-50 mb-8 leading-relaxed">
                A definitive national hub featuring The Market (Escrow Commerce), The Arena (AI-Refereed Combat), and Ghana Pulse (Social Media).
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://gam-hub.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-xl shadow-indigo-900/20"
                >
                  Launch App <Globe className="w-5 h-5" />
                </a>
                <a 
                  href="https://gam-hub.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-indigo-700 text-white font-bold rounded-2xl hover:bg-indigo-800 transition-all"
                >
                  Request a Demo
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 border border-white/20 shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/hub/800/600" 
                  alt="GAM Hub Dashboard" 
                  className="rounded-2xl shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Value Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose GAM Hub?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The central nervous system of Ghana's digital economy, providing trust, competition, and community.</p>
            <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full mt-6" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Escrow Protection", desc: "Secure transactions for every citizen.", icon: <Shield /> },
              { title: "AI Refereeing", desc: "Fair and automated competition management.", icon: <Zap /> },
              { title: "National Scale", desc: "Built for the entire population of Ghana.", icon: <Users /> },
              { title: "Unified Access", desc: "One identity for all national services.", icon: <Globe /> }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-gray-50 border border-gray-100 text-center"
              >
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                </div>
                <ul className="space-y-4 mb-8">
                  {feature.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors group">
                  Learn more about {feature.title} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Infrastructure</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Engineered for national scale, GAM Hub utilizes state-of-the-art cloud technologies and AI to provide a secure and responsive platform for all Ghanaians.
            </p>
            <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techSpecs.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  {spec.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{spec.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {spec.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Experience the Future of Ghana</h2>
              <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                Join the national digital ecosystem and access secure commerce, competitive gaming, and community engagement.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="https://gam-hub.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-all text-lg"
                >
                  Access GAM Hub
                </a>
                <Link 
                  to="/#contact"
                  className="px-10 py-5 bg-indigo-500 text-white font-bold rounded-2xl hover:bg-indigo-400 transition-all text-lg"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GamHub;
