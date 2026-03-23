import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-400 opacity-20 blur-[100px]"></div>
      </div>

      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/60 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-100/60 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-emerald-100/40 rounded-full blur-[100px] animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-sm font-bold mb-8 border border-indigo-100 shadow-sm"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-600"></span>
            </span>
            Engineering Ghana's Digital Future
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter mb-8 leading-[0.9]"
          >
            GAM IT Solutions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 animate-gradient-x">
              Intelligent Infrastructure
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed font-medium"
          >
            We engineer high-fidelity digital ecosystems for institutions and nations. 
            From healthcare intelligence to national-scale infrastructure, we build the elite technological stack for Ghana.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a href="#apps" className="w-full sm:w-auto px-10 py-5 rounded-[2rem] bg-indigo-600 text-white font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 flex items-center justify-center gap-3 group transform hover:-translate-y-1">
              Explore Our Apps <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </a>
            <a href="#contact" className="w-full sm:w-auto px-10 py-5 rounded-[2rem] bg-white text-gray-900 font-black text-xl border-2 border-gray-100 hover:border-indigo-100 hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-sm transform hover:-translate-y-1">
              <Play className="w-6 h-6 fill-current text-indigo-600" /> Contact Sales
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-gray-400 font-medium"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" /> No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" /> 14-day free trial
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" /> Cancel anytime
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
