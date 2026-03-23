import React from 'react';
import { motion } from 'motion/react';
import { Users, Building2, Globe2, ShieldCheck } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      label: "Institutions Digitized",
      value: "50+",
      icon: <Building2 className="w-8 h-8" />,
      description: "Schools and hospitals across Ghana.",
      color: "from-blue-500 to-indigo-600",
      shadow: "shadow-blue-200"
    },
    {
      label: "Active Users",
      value: "10k+",
      icon: <Users className="w-8 h-8" />,
      description: "Daily users across our platforms.",
      color: "from-purple-500 to-pink-600",
      shadow: "shadow-purple-200"
    },
    {
      label: "National Reach",
      value: "16",
      icon: <Globe2 className="w-8 h-8" />,
      description: "Regions served with our solutions.",
      color: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-200"
    },
    {
      label: "System Uptime",
      value: "99.9%",
      icon: <ShieldCheck className="w-8 h-8" />,
      description: "Reliable infrastructure you can trust.",
      color: "from-amber-500 to-orange-600",
      shadow: "shadow-amber-200"
    }
  ];

  return (
    <section className="py-24 bg-indigo-900 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-800/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-800/50 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`} />
              
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-8 shadow-xl ${stat.shadow} transform group-hover:rotate-6 transition-transform`}>
                {stat.icon}
              </div>
              
              <div className="relative z-10">
                <div className="text-5xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                <div className="text-xl font-bold text-indigo-100 mb-3">{stat.label}</div>
                <p className="text-indigo-200/60 leading-relaxed font-medium">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
