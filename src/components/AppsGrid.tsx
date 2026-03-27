import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const AppsGrid = () => {
  const apps = [
    {
      id: "gam-hub",
      name: "GAM Hub",
      tagline: "The National Infrastructure of Ghana.",
      description: "A definitive national hub featuring The Market (Escrow Commerce), The Arena (AI-Refereed Combat), and Ghana Pulse (Social Media).",
      color: "bg-indigo-600",
      link: "https://gam-hub.vercel.app/",
      demoLink: "https://gam-hub.vercel.app/",
      external: true,
    },
    {
      id: "gam-edu",
      name: "GAM Edu",
      tagline: "Intelligent OS for Future-Ready Schools.",
      description: "AI-powered school management system with automated billing, academic tracking, and parent engagement.",
      color: "bg-emerald-600",
      link: "/apps/gam-edu",
      demoLink: "https://gam-it-service.app/",
      external: false,
    },
    {
      id: "gam-med",
      name: "GAM Med",
      tagline: "Total Hospital Operating System.",
      description: "v2.0 Interoperability Update: National HIE & Ghana Card Integration. Comprehensive EHR & ERP ecosystem for modern healthcare facilities.",
      color: "bg-cyan-600",
      link: "/apps/gam-med",
      demoLink: "https://gam-med.vercel.app/",
      external: false,
    },
  ];

  return (
    <section id="apps" className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Our Specialized Ecosystems
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              Navigate through our suite of elite digital products. We are actively developing new ecosystems for Retail, Hospitality, and more.
            </motion.p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 md:mt-0 flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
          >
            Explore the Ecosystem <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {apps.map((app, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-500/30 flex flex-col"
            >
              <div className={`h-2 ${app.color}`} />
              <div className="p-8 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{app.name}</h3>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-4 uppercase tracking-wider">{app.tagline}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {app.description}
                </p>
              </div>
              <div className="p-8 pt-0 flex flex-col gap-3">
                {app.external ? (
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={app.link}
                    className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg shadow-gray-900/10 dark:shadow-none"
                  >
                    Access App
                  </motion.a>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      to={app.link}
                      className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                    >
                      View Details
                    </Link>
                  </motion.div>
                )}
                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={app.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all"
                >
                  Request Demo
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future Horizons */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Future Horizons</h3>
            <p className="text-gray-600 dark:text-gray-400">Engineering the next generation of sector-specific intelligence.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Retail OS", icon: "🛍️" },
              { name: "Hotel Intelligence", icon: "🏨" },
              { name: "Logistics Pro", icon: "🚚" },
              { name: "FinTech Vault", icon: "💰" },
            ].map((future, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center group hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors"
              >
                <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{future.icon}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{future.name}</span>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 font-medium uppercase tracking-tighter">In Development</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppsGrid;
