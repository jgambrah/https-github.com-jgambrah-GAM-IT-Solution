import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Award, Shield, Zap, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      title: "Innovation",
      description: "Pushing the boundaries of what's possible with cutting-edge AI and neural technologies.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Integrity",
      description: "Building high-trust systems with secure escrow and transparent protocols.",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: "Excellence",
      description: "Delivering high-fidelity software that meets elite global standards.",
      icon: <Award className="w-6 h-6" />,
    },
    {
      title: "Impact",
      description: "Engineering solutions that drive measurable progress for institutions and the nation.",
      icon: <Heart className="w-6 h-6" />,
    },
  ];

  return (
    <section id="about" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Identity & Purpose</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              GAM IT Solutions is more than a software house; we are architects of digital progress. 
              Based at the College of Science, KNUST, we bridge the gap between academic excellence 
              and industrial-scale technological impact.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                  <p className="text-gray-600">
                    To engineer high-fidelity digital ecosystems that empower institutions and nations 
                    through intelligent automation and elite technological infrastructure.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
                  <p className="text-gray-600">
                    To be the definitive technological backbone of Ghana, driving digital transformation 
                    across all sectors of the economy with unparalleled precision.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="Team working" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-indigo-600 rounded-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-purple-600 rounded-3xl -z-10" />
          </motion.div>
        </div>

        <div>
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide our engineering and define our commitment to excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
