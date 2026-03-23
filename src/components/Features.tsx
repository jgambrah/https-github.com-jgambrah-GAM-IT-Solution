import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, HeartPulse, Globe, Cpu, ShoppingCart, Hotel, Building2, ShieldCheck, Store, BedDouble, Bot, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Institutional OS",
      description: "Intelligent operating systems for schools, universities, and hospitals, automating complex academic and clinical workflows.",
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      title: "Commercial Intelligence",
      description: "Advanced management systems for retail shops, hotels, and businesses, integrating CRM, ERP, and automated billing.",
      icon: <Store className="w-6 h-6" />,
    },
    {
      title: "National Infrastructure",
      description: "Developing large-scale digital hubs that integrate commerce, social interaction, and secure escrow systems.",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: "AI & Automation",
      description: "Integrating advanced AI and neural search engines to provide intelligent discovery and automated moderation.",
      icon: <Cpu className="w-6 h-6" />,
    },
    {
      title: "AI Powered Chatbot",
      description: "Real-time assistance using Gemini 3.1 Pro for complex reasoning and institutional guidance.",
      icon: <Bot className="w-6 h-6" />,
    },
    {
      title: "Fast AI Responses",
      description: "Low-latency interactions powered by Gemini 3.1 Flash Lite for instantaneous user support.",
      icon: <Zap className="w-6 h-6" />,
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Engineering Solutions for Every Sector
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            We specialize in engineering high-fidelity digital solutions that solve complex institutional, commercial, and national challenges.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
