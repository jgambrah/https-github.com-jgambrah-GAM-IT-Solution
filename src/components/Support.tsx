import React from 'react';
import { motion } from 'motion/react';
import { Headphones, RefreshCw, GraduationCap, ShieldCheck, Clock, Users } from 'lucide-react';

const Support = () => {
  const supportFeatures = [
    {
      title: "24/7 Technical Support",
      description: "Our dedicated engineering team is available around the clock to resolve any technical challenges and ensure zero downtime.",
      icon: <Headphones className="w-6 h-6" />,
    },
    {
      title: "Continuous Updates",
      description: "We provide regular system patches, feature enhancements, and security updates to keep your infrastructure at the cutting edge.",
      icon: <RefreshCw className="w-6 h-6" />,
    },
    {
      title: "Training & Onboarding",
      description: "Comprehensive training sessions for your staff to ensure they are fully proficient in using our digital ecosystems.",
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      title: "SLA-Backed Reliability",
      description: "Guaranteed response times and system availability backed by robust Service Level Agreements (SLAs).",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      title: "Rapid Deployment",
      description: "Efficient implementation strategies that minimize disruption to your existing institutional or commercial workflows.",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: "Dedicated Account Management",
      description: "A single point of contact for your institution to handle all inquiries, feedback, and strategic planning.",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  return (
    <section id="support" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Elite After-Sales & <br />
                <span className="text-indigo-600">Technical Support Systems</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                At GAM IT Solutions, our commitment to your success doesn't end at deployment. We engineer robust support frameworks that ensure your digital infrastructure remains resilient, secure, and high-performing.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Institutional Resilience</h4>
                    <p className="text-sm text-gray-500">We build for longevity, providing the support needed to scale your operations nationally.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Adaptive Maintenance</h4>
                    <p className="text-sm text-gray-500">Our systems evolve with your needs through continuous feedback loops and updates.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
