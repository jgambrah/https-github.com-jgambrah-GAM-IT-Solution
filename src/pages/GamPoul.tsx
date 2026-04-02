import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Bird, 
  Egg, 
  Package, 
  Wallet, 
  Zap, 
  Smartphone, 
  Database, 
  Lock, 
  Server, 
  Cpu, 
  History,
  ArrowLeft,
  ArrowRight,
  Globe,
  CheckCircle2,
  ShieldCheck,
  Activity,
  TrendingUp,
  Bell,
  Scale,
  Stethoscope,
  FileText,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const GamPoul = () => {
  const featureCategories = [
    {
      title: "360° Farm Command Center",
      icon: <LayoutDashboard className="w-6 h-6" />,
      items: [
        "Real-Time Analytics: Instant visibility into bird population and egg production",
        "Performance Trends: Interactive charts for efficiency and mortality rates",
        "Alert System: Automated notifications for low feed and vaccinations",
        "Financial Balance: Real-time tracking of farm liquidity",
        "Seasonal Pattern Identification via historical data",
        "Critical Spike Notifications for immediate intervention"
      ]
    },
    {
      title: "Precision Flock Management",
      icon: <Bird className="w-6 h-6" />,
      items: [
        "Lifecycle Tracking: Monitor from day-old chicks to culling",
        "Growth Monitoring: Graph average weight against industry standards",
        "Digital Health Cards: Document every vaccination and vet visit",
        "Breed & Source Tracking for genetic performance analysis",
        "Age-based automated task scheduling",
        "Optimal Growth ensures maximum profitability"
      ]
    },
    {
      title: "Advanced Egg Production & Grading",
      icon: <Egg className="w-6 h-6" />,
      items: [
        "Daily Yield Tracking with automated 'Production %' calculation",
        "Quality Control: Track grading (Large, Medium, Small, Cracked)",
        "Efficiency Metrics: Identify top-performing breeds or housing",
        "Market Pricing Optimization based on grade distribution",
        "Flock-to-Flock performance comparison",
        "Automated production reports for stakeholders"
      ]
    },
    {
      title: "Integrated Inventory & Feed Optimization",
      icon: <Package className="w-6 h-6" />,
      items: [
        "Feed Conversion Ratio (FCR): The critical metric for profitability",
        "Smart Stock Management: Real-time tracking of Feed and Drugs",
        "Audit Trails: Track every bag from purchase to consumption",
        "Low Stock Visual Indicators for proactive reordering",
        "Shrinkage & Theft Elimination via granular tracking",
        "Consumables management for total operational control"
      ]
    },
    {
      title: "Financial Intelligence Suite",
      icon: <Wallet className="w-6 h-6" />,
      items: [
        "Automated P&L: Real-time Profit and Loss statements",
        "Category Breakdown: Visualize spending (Feed vs. Labor vs. Meds)",
        "Searchable Transaction History: Filterable ledger of all income",
        "Cost-Saving Opportunity Identification via data visualization",
        "Daily expense logging for accurate financial health",
        "Investor-ready financial reporting exports"
      ]
    },
    {
      title: "Security & Data Integrity",
      icon: <ShieldCheck className="w-6 h-6" />,
      items: [
        "Enterprise-Grade Authentication via Firebase",
        "Robust Role-Based Access Control (RBAC)",
        "Strict Schema Enforcement: Prevents data entry errors",
        "Immutable Audit Logs for all critical transactions",
        "Encrypted Storage: Data encrypted at rest and in transit",
        "Automated Backups on Google Cloud Infrastructure"
      ]
    }
  ];

  const techSpecs = [
    {
      title: "Real-Time Cloud Sync",
      icon: <Zap className="w-6 h-6" />,
      content: "Built on a reactive architecture for instant updates across devices. Features offline resilience to handle intermittent connectivity gracefully."
    },
    {
      title: "High-Performance Data Viz",
      icon: <BarChart3 className="w-6 h-6" />,
      content: "Utilizes Recharts for smooth, interactive data exploration. Responsive UI crafted with Tailwind CSS for a mobile-first experience."
    },
    {
      title: "Automated Business Logic",
      icon: <Cpu className="w-6 h-6" />,
      content: "Complex metrics (FCR, Hen-Day Production, Mortality %) calculated server-side for mathematical accuracy across all reports."
    },
    {
      title: "Workflow Automation",
      icon: <Activity className="w-6 h-6" />,
      content: "Atomic operations ensure data integrity, such as drug request approval automatically updating inventory and medical records."
    },
    {
      title: "Enterprise Security",
      icon: <Lock className="w-6 h-6" />,
      content: "Granular permissions for CEOs, Managers, and Staff. Data isolation ensures users only see relevant information."
    },
    {
      title: "Robust Infrastructure",
      icon: <Server className="w-6 h-6" />,
      content: "Hosted on Google Cloud with redundant backups. Industry-standard encryption protocols protect all farm records."
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      <SEO 
        title="GAM Poul | Intelligent Poultry Management System"
        description="GAM Poul is a 360° Farm Command Center for poultry operations. Features include precision flock management, egg grading, feed optimization, and financial intelligence."
        keywords="poultry management software, farm management Ghana, egg production tracking, GAM Poul, agricultural technology"
      />
      
      {/* Hero Section */}
      <section className="bg-amber-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-amber-200 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-800/50 border border-amber-700 text-amber-200 text-sm font-medium mb-6">
                <Zap className="w-4 h-4 text-yellow-400" /> New App Launch: GAM Poul v1.0 "The Farm Intelligence Update"
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                GAM Poul: The <span className="text-amber-400">360° Farm Command</span> Center
              </h1>
              <p className="text-xl text-amber-100 mb-8 leading-relaxed">
                A Decision Support System that turns raw farm data into actionable insights, reducing waste and scaling operations.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://gam-poul-359057282274.us-west1.run.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-amber-900 font-bold rounded-2xl hover:bg-amber-50 transition-all flex items-center gap-2"
                >
                  Launch App <Globe className="w-5 h-5" />
                </a>
                <a 
                  href="https://gam-poul-359057282274.us-west1.run.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-amber-700 text-white font-bold rounded-2xl hover:bg-amber-600 transition-all"
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
                  src="https://picsum.photos/seed/poultry/800/600" 
                  alt="GAM Poul Dashboard" 
                  className="rounded-2xl shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 rounded-[3rem] p-12 border border-amber-100 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-6">The Value Proposition</h2>
            <p className="text-xl text-amber-800 leading-relaxed max-w-4xl mx-auto italic">
              "This is not just a record-keeping tool; it's a Decision Support System. By turning raw farm data into actionable insights, it reduces feed waste by up to 15%, identifies health issues 48 hours faster, and provides a clear path to scaling poultry operations through data-driven financial management."
            </p>
          </div>
        </div>
      </section>

      {/* Feature Categories Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Business Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              GAM Poul unifies biological, operational, and financial workflows into a single, authoritative source of truth for your farm.
            </p>
            <div className="w-20 h-1.5 bg-amber-600 mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCategories.map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-amber-600 text-white rounded-2xl flex items-center justify-center">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                <ul className="space-y-3 flex-grow mb-6">
                  {category.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="https://gam-poul-359057282274.us-west1.run.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-amber-600 font-bold hover:text-amber-700 transition-colors group"
                >
                  Explore {category.title} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Engineering Excellence</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              GAM Poul is built with high-performance technologies to ensure accuracy, speed, and reliability in demanding farm environments.
            </p>
            <div className="w-20 h-1.5 bg-amber-600 mx-auto rounded-full mt-6" />
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
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
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
          <div className="bg-amber-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to scale your farm?</h2>
              <p className="text-xl text-amber-100 mb-10 max-w-2xl mx-auto">
                Join the agricultural revolution in Ghana. Turn your poultry data into profit with GAM Poul.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="https://gam-poul-359057282274.us-west1.run.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-white text-amber-900 font-bold rounded-2xl hover:bg-amber-50 transition-all text-lg"
                >
                  Request a Demo
                </a>
                <a 
                  href="https://gam-poul-359057282274.us-west1.run.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-amber-700 text-white font-bold rounded-2xl hover:bg-amber-600 transition-all text-lg"
                >
                  Contact Sales
                </a>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GamPoul;
