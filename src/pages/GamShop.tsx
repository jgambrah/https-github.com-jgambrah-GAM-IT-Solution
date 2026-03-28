import React from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  Store, 
  Package, 
  BarChart3, 
  Users, 
  Shield, 
  Server,
  Lock,
  Cpu,
  Database,
  Layout,
  Smartphone,
  Globe,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Zap,
  Smartphone as MobileIcon,
  CreditCard,
  Search,
  FileText,
  Cloud
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const GamShop = () => {
  const features = [
    {
      title: "Multi-Branch & Warehouse",
      icon: <Store className="w-6 h-6" />,
      items: [
        "Centralized Control for multiple outlets",
        "Stock Transfers with In-Transit tracking",
        "Location-Specific Pricing & tax rules",
        "Real-time inventory sync across branches"
      ]
    },
    {
      title: "Advanced Inventory Catalog",
      icon: <Package className="w-6 h-6" />,
      items: [
        "Master Product Templates for global deployment",
        "Product Bundling (e.g., Gift Hampers)",
        "Integrated Barcode Ecosystem & Generator",
        "Cloud-based Visual Product Catalog"
      ]
    },
    {
      title: "Dynamic Point of Sale (POS)",
      icon: <ShoppingBag className="w-6 h-6" />,
      items: [
        "Mobile-First Responsive Interface",
        "Multi-Payment Support (Cash, Card, Momo)",
        "Smart Search by name, SKU, or barcode",
        "Digital PDF Receipts & Invoices"
      ]
    },
    {
      title: "Financial Intelligence",
      icon: <BarChart3 className="w-6 h-6" />,
      items: [
        "Real-Time Analytics & Sales Trends",
        "Automated VAT Tracking & Compliance",
        "One-click CSV Data Exports",
        "Secure Shift & Cash-up Management"
      ]
    }
  ];

  const techSpecs = [
    {
      title: "React 18 & TypeScript",
      icon: <Layout className="w-6 h-6" />,
      content: "Built with a strictly typed architecture for maximum reliability and maintainability, ensuring a robust retail experience."
    },
    {
      title: "Firebase Real-time Infrastructure",
      icon: <Database className="w-6 h-6" />,
      content: "Powered by Firestore for instant data sync across all devices, with secure Google-powered Auth and scalable Storage."
    },
    {
      title: "Google Gemini AI Integration",
      icon: <Cpu className="w-6 h-6" />,
      content: "Integrated AI engine that analyzes sales data to provide actionable business insights and growth recommendations."
    },
    {
      title: "Financial Reporting Engine",
      icon: <FileText className="w-6 h-6" />,
      content: "Robust client-side libraries (jsPDF, PapaParse) for generating professional documents and handling complex data exports."
    },
    {
      title: "Role-Based Access Control",
      icon: <Lock className="w-6 h-6" />,
      content: "Granular permissions for Managers, Clerks, Accountants, and Supervisors to ensure total operational security."
    },
    {
      title: "Offline Awareness & Sync",
      icon: <Cloud className="w-6 h-6" />,
      content: "Built-in indicators to alert users of connectivity status and secure cloud sync to Google Cloud infrastructure."
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      <SEO 
        title="GAM Shop | SmartPOS Enterprise-Grade Retail Management"
        description="GAM Shop is a powerful, multi-branch Point of Sale and Inventory solution built for scale, precision, and real-time business intelligence."
        keywords="POS system Ghana, retail management software, inventory management, GAM Shop, SmartPOS, multi-branch retail"
      />
      
      {/* Hero Section */}
      <section className="bg-orange-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-orange-100 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                GAM Shop: <span className="text-orange-200">Enterprise-Grade</span> Retail Management
              </h1>
              <p className="text-xl text-orange-50 mb-8 leading-relaxed">
                A powerful, multi-branch Point of Sale and Inventory solution built for scale, precision, and real-time business intelligence.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://https-github-com-jgambrah-gam-shop.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl hover:bg-orange-50 transition-all flex items-center gap-2 shadow-xl shadow-orange-900/20"
                >
                  Access App <Globe className="w-5 h-5" />
                </a>
                <a 
                  href="#demo"
                  className="px-8 py-4 bg-orange-700 text-white font-bold rounded-2xl hover:bg-orange-800 transition-all"
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
                  src="https://picsum.photos/seed/shop/800/600" 
                  alt="GAM Shop Dashboard" 
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose GAM Shop?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Transition from "running a shop" to "managing an enterprise" with AI-driven insights and multi-branch scalability.</p>
            <div className="w-20 h-1.5 bg-orange-600 mx-auto rounded-full mt-6" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Multi-Branch", desc: "Manage all outlets from a single dashboard.", icon: <Store /> },
              { title: "AI Insights", desc: "Growth recommendations powered by Gemini.", icon: <Bot /> },
              { title: "Real-time Sync", desc: "Instant data updates across all devices.", icon: <Zap /> },
              { title: "Credit Control", desc: "Manage customer ledgers and limits.", icon: <CreditCard /> }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-gray-50 border border-gray-100 text-center"
              >
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center">
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
                <button className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 transition-colors group">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Technical Stack</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Built with cutting-edge technologies to ensure maximum reliability, maintainability, and lightning-fast performance.
            </p>
            <div className="w-20 h-1.5 bg-orange-600 mx-auto rounded-full mt-6" />
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
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
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
      <section id="demo" className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to scale your business?</h2>
              <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
                Join modern retailers using GAM Shop to manage their enterprise with precision and intelligence.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="https://https-github-com-jgambrah-gam-shop.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl hover:bg-orange-50 transition-all text-lg"
                >
                  Access GAM Shop
                </a>
                <Link 
                  to="/#contact"
                  className="px-10 py-5 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-400 transition-all text-lg"
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

// Mock Bot icon since it wasn't in the imports but used in Why Choose
const Bot = ({ className }: { className?: string }) => (
  <Cpu className={className} />
);

export default GamShop;
