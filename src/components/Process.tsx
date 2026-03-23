import React from 'react';
import { motion } from 'motion/react';
import { Search, PenTool, Code2, Rocket, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "Discovery",
    description: "We dive deep into your institutional needs and national-scale requirements to define the perfect digital strategy.",
    color: "bg-blue-500",
    shadow: "shadow-blue-200"
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: "Design",
    description: "Our architects craft high-fidelity digital ecosystems with a focus on elite user experience and robust scalability.",
    color: "bg-purple-500",
    shadow: "shadow-purple-200"
  },
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Development",
    description: "We engineer your solution using the most advanced technological stack, ensuring security and performance.",
    color: "bg-indigo-500",
    shadow: "shadow-indigo-200"
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Deployment",
    description: "Seamless integration and 24/7 support as we launch your digital infrastructure into the future.",
    color: "bg-emerald-500",
    shadow: "shadow-emerald-200"
  }
];

const Process = () => {
  return (
    <section id="process" className="py-24 bg-indigo-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            Our Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Transformation Journey</span>
          </motion.h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A proven, four-step engineering process that turns complex institutional challenges into elite digital solutions.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-20 h-20 ${step.color} rounded-3xl flex items-center justify-center text-white mb-8 shadow-2xl ${step.shadow} transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {step.icon}
                  </div>
                  <div className="absolute top-0 right-0 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 -translate-y-4 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm text-xs font-bold text-gray-400">
                    STEP 0{index + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-10 -right-6 items-center justify-center text-gray-200">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-[2rem] bg-gradient-to-br from-indigo-600 to-purple-700 text-white text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-3xl" />
             <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-3xl" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">Ready to start your journey?</h3>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto relative z-10">
            Join the elite institutions and organizations that have already transformed their operations with GAM IT Solutions.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all relative z-10">
            Get a Custom Quote <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
