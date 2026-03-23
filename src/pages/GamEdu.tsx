import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Calculator, 
  Bot, 
  MessageSquare, 
  Shield, 
  Server,
  Lock,
  Cpu,
  Database,
  Code2,
  FileText,
  Layout,
  Smartphone,
  Globe,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Zap,
  Smartphone as MobileIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const GamEdu = () => {
  const features = [
    {
      title: "Smart Financial Management",
      icon: <Calculator className="w-6 h-6" />,
      items: [
        "Automated Daily Billing for Canteen & Transport",
        "Dynamic Rate Structures (Class-based or Route-specific)",
        "Termly Bulk Invoicing & POS Integration",
        "Parent Ledger with PDF Receipt Downloads"
      ]
    },
    {
      title: "Academic Excellence",
      icon: <BookOpen className="w-6 h-6" />,
      items: [
        "Batch Grade Entry & Automated 50/50 Scaling",
        "Intelligent Class Ranking & Learning Analytics",
        "Digital A4-ready Terminal Reports (GES Grading)",
        "Learning Material & Resource Uploads"
      ]
    },
    {
      title: "AI-Powered Assistant",
      icon: <Bot className="w-6 h-6" />,
      items: [
        "Lesson Plan Generator (Powered by Gemini)",
        "Story Spark & Science Discovery Lab",
        "Phonics Forest & Voice Coach",
        "24/7 Personalized AI Tutor for Students"
      ]
    },
    {
      title: "Communication & Engagement",
      icon: <MessageSquare className="w-6 h-6" />,
      items: [
        "Native Push Notifications & Targeted Bulk SMS",
        "Live Academic Tracker for Parents",
        "Digital Noticeboard for Announcements",
        "Monitored Messaging & Forums"
      ]
    }
  ];

  const techSpecs = [
    {
      title: "Cloud & Multi-Tenant Architecture",
      icon: <Server className="w-6 h-6" />,
      content: "Highly scalable, single-database multi-tenant architecture with logical isolation via schoolId. Hosted on Vercel Edge with Firestore NoSQL real-time synchronization (<200ms latency)."
    },
    {
      title: "Security & RBAC Enforcement",
      icon: <Lock className="w-6 h-6" />,
      content: "Bank-grade security with rules evaluated at the database layer. 7 distinct permission tiers (CEO to Parent) with immutable audit trails for total transparency."
    },
    {
      title: "AI Integration (Genkit)",
      icon: <Cpu className="w-6 h-6" />,
      content: "Deeply integrated with Google Genkit and Gemini 1.5 Flash. AI outputs are strictly validated against Zod schemas for perfectly formatted JSON responses."
    },
    {
      title: "Financial & Accounting Engine",
      icon: <Database className="w-6 h-6" />,
      content: "Idempotent billing with deterministic IDs and ACID compliance via Firestore Atomic Batches. Dynamic rate lookups for route and class-specific pricing."
    },
    {
      title: "Modern Frontend Stack",
      icon: <Layout className="w-6 h-6" />,
      content: "Built with Next.js 15 and React 19. Utilizes App Router, RSC, and Server Actions to offload heavy processing and protect business logic."
    },
    {
      title: "PWA & Cross-Platform",
      icon: <MobileIcon className="w-6 h-6" />,
      content: "Fully configured PWA with Service Workers and FCM Push Notifications. Offline data caching via IndexedDB ensures reliability in rural areas."
    },
    {
      title: "Document Gen & Analytics",
      icon: <FileText className="w-6 h-6" />,
      content: "Client-side PDF rendering for A4 report cards using jsPDF and html2canvas. Dynamic SVG analytics dashboards powered by Recharts."
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-indigo-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-indigo-200 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                GAM Edu: The Intelligent OS for <span className="text-indigo-400">Future-Ready Schools</span>
              </h1>
              <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                A comprehensive, AI-powered School Management System built specifically for the West African education ecosystem.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://gam-it-service.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-indigo-900 font-bold rounded-2xl hover:bg-indigo-50 transition-all flex items-center gap-2"
                >
                  Launch App <Globe className="w-5 h-5" />
                </a>
                <a 
                  href="https://gam-it-service.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-indigo-700 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all"
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
                  src="https://picsum.photos/seed/school/800/600" 
                  alt="GAM Edu Dashboard" 
                  className="rounded-2xl shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose GAM Edu?</h2>
            <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Zero Data Entry", desc: "Automated billing based on attendance.", icon: <Zap /> },
              { title: "AI-Powered", desc: "Generate lesson plans and stories in seconds.", icon: <Bot /> },
              { title: "Native Mobile", desc: "PWA installs directly to home screens.", icon: <Smartphone /> },
              { title: "Data Isolation", desc: "Secure, multi-tenant encrypted architecture.", icon: <Shield /> }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-gray-50 border border-gray-100 text-center"
              >
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center">
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
                <a 
                  href="https://gam-it-service.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors group"
                >
                  Request Demo for {feature.title} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Specifications & Architecture</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              GAM Edu is engineered for high availability, zero-latency data synchronization, and bank-grade security. 
              Built on a modern serverless stack, the platform ensures that schools across West Africa can scale from 50 to 5,000 students without performance degradation.
            </p>
            <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full mt-6" />
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
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
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
          <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to modernize your school?</h2>
              <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                Join the growing number of schools using GAM Edu to increase revenue and reduce overhead.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="https://gam-it-service.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-all text-lg"
                >
                  Request a Demo
                </a>
                <a 
                  href="https://gam-it-service.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-indigo-500 text-white font-bold rounded-2xl hover:bg-indigo-400 transition-all text-lg"
                >
                  Contact Sales
                </a>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GamEdu;
