import React from 'react';
import { motion } from 'motion/react';
import { Code2, Lightbulb, Rocket, Settings2, CheckCircle2 } from 'lucide-react';

const CustomSoftware = () => {
  const processSteps = [
    {
      title: "Requirement Analysis",
      description: "We dive deep into your institutional or business workflows to understand your unique challenges.",
      icon: <Lightbulb className="w-6 h-6" />,
    },
    {
      title: "Agile Development",
      description: "Rapid, iterative building with continuous feedback loops to ensure the final product hits the mark.",
      icon: <Code2 className="w-6 h-6" />,
    },
    {
      title: "Precision Testing",
      description: "Rigorous quality assurance to ensure security, scalability, and high performance.",
      icon: <Settings2 className="w-6 h-6" />,
    },
    {
      title: "Deployment & Support",
      description: "Seamless integration into your existing systems with full onboarding and technical support.",
      icon: <Rocket className="w-6 h-6" />,
    },
  ];

  return (
    <section id="custom-solutions" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-8 bg-gray-50 rounded-3xl border border-gray-100 group hover:bg-indigo-600 transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 mb-6 shadow-sm group-hover:text-indigo-600 group-hover:scale-110 transition-all">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors">{step.title}</h3>
                  <p className="text-gray-600 group-hover:text-indigo-100 transition-colors leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6">
                <Code2 className="w-4 h-4" />
                <span>On-Demand Engineering</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                Software Built Specifically For <br />
                <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Your Unique Needs</span>
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Beyond our flagship products, GAM IT Solutions specializes in crafting bespoke software architectures. Whether you need a specialized institutional portal, a custom data analytics engine, or a unique commercial platform, we build it to your exact specifications.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Custom Institutional Portals",
                  "Bespoke Enterprise Resource Planning (ERP)",
                  "Specialized Data Management Systems",
                  "Scalable Cloud-Native Architectures"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>

              <a 
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all hover:translate-y-[-2px] shadow-lg shadow-gray-200"
              >
                Discuss Your Requirements
                <Rocket className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomSoftware;
