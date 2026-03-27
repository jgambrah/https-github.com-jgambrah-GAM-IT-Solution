import React from 'react';
import { motion } from 'motion/react';
import { 
  Stethoscope, 
  Activity, 
  HeartPulse, 
  ClipboardList, 
  Wallet, 
  Users, 
  Package, 
  Brain, 
  ShieldCheck, 
  ArrowLeft,
  ArrowRight,
  Globe,
  CheckCircle2,
  FileText,
  Zap,
  Smartphone,
  Database,
  Lock,
  Server,
  Cpu,
  Share2,
  History
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const GamMed = () => {
  const featureCategories = [
    {
      title: "National Health Information Exchange (HIE)",
      icon: <Share2 className="w-6 h-6" />,
      items: [
        "Longitudinal Clinical Continuity: Cross-network medical history",
        "Single 'Clinical Truth' across multiple facilities",
        "Ghana Card Global Identity: Universal anchor for patient records",
        "Seamless cross-facility interoperability",
        "Patient-Mediated Consent: Total Act 843 compliance",
        "Digital 'Unlock' mechanism via private patient portal"
      ]
    },
    {
      title: "Clinical Excellence & EHR",
      icon: <Stethoscope className="w-6 h-6" />,
      items: [
        "Longitudinal Patient Journey (OPD to Inpatient)",
        "Specialized Units: Maternity, Surgical, Renal, Physio",
        "Logical Clinical ID System (Institutional Standard)",
        "Integrated RIS/LIS Diagnostic Handshake",
        "Blood Bank Vault & Mortality Registry",
        "QR-Verified External Referral Engine"
      ]
    },
    {
      title: "Financial Governance & ERP",
      icon: <Wallet className="w-6 h-6" />,
      items: [
        "Sovereign Chart of Accounts",
        "Automated Real-time Billing Aggregator",
        "Ghana Statutory Tax Engine (VAT/WHT Compliant)",
        "Triple-Entry Payment Vouchers (PV)",
        "Trial Balance, P&L, and Cash Flow Reporting",
        "Daily Till Reconciliation & Revenue Assurance"
      ]
    },
    {
      title: "Human Capital & Payroll",
      icon: <Users className="w-6 h-6" />,
      items: [
        "Statutory Payroll (SSNIT, GRA PAYE, Pro-rata)",
        "Standardized Salary Grades & Remittance Hub",
        "HR Suite: Attendance, Leave, Disciplinary Register",
        "Compliance & CPD Tracker for Clinical Licenses",
        "Staff Self-Service Portal & Interactive Payslips",
        "Performance Appraisals & Personnel Accountability"
      ]
    },
    {
      title: "Supply Chain & Logistics",
      icon: <Package className="w-6 h-6" />,
      items: [
        "Master Product Catalog (MDM using SKUs)",
        "3-Way Match Procurement (PO to GRN)",
        "Partial Fulfillment Logic & Audit Trails",
        "Predictive Re-order Engine (Min-Level Alerts)",
        "Decommissioning & FDA-standard Wastage Archive",
        "Unified Pharmacy, Lab, and Stores Inventory"
      ]
    },
    {
      title: "Next-Gen Intelligence",
      icon: <Brain className="w-6 h-6" />,
      items: [
        "Gemini-Powered Clinical Assistant (AI Co-pilot)",
        "Context-aware Vitals Analysis & GHS Protocols",
        "MyGamMed Secure Patient Consumer Portal",
        "Automated SMS Communication Hub",
        "Real-time Lab Result & Appointment Alerts",
        "Smartphone Access to Medical History & Rx"
      ]
    }
  ];

  const techSpecs = [
    {
      title: "Core Infrastructure",
      icon: <Server className="w-6 h-6" />,
      content: "Built on Next.js 15 (App Router) with Turbopack. Hybrid architecture using Vercel Edge and GCP with Firebase Cloud Functions (Node.js 24)."
    },
    {
      title: "SaaS Multi-Tenancy",
      icon: <Lock className="w-6 h-6" />,
      content: "Logical Data Isolation via hospitalId. Firebase Auth with JWT Custom Claims and granular Firestore Security Rules for cross-tenant siloing."
    },
    {
      title: "Intelligence Layer",
      icon: <Cpu className="w-6 h-6" />,
      content: "Integrated with Gemini 1.5 Pro & Flash. Uses RAG (Retrieval-Augmented Generation) for evidence-based clinical support with PII masking."
    },
    {
      title: "Financial Engine",
      icon: <Database className="w-6 h-6" />,
      content: "Atomic Transactions via Firestore Write Batches. 0.01 GHS precision rounding and synchronized sequential counter logic for non-colliding IDs."
    },
    {
      title: "Clinical Modules",
      icon: <Activity className="w-6 h-6" />,
      content: "Longitudinal EHR persistence with Composite Indexing. RIS imaging on Firebase Storage with authenticated expiring tokens."
    },
    {
      title: "External Handshakes",
      icon: <Share2 className="w-6 h-6" />,
      content: "Full Paystack API integration, Arkesel/Hubtel SMS gateways, and high-error-correction QR code generation for document verification."
    },
    {
      title: "DevOps & Governance",
      icon: <History className="w-6 h-6" />,
      content: "Immutable Global Audit Log via Firestore Triggers. Scheduled CRON functions for revenue autopilot and MDM standardization."
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      <SEO 
        title="GamMed | Enterprise Hospital Operating System"
        description="GamMed is a total hospital operating system engineered for the Ghanaian healthcare landscape. Features include clinical excellence EHR, financial governance ERP, and AI-powered clinical assistants."
        keywords="hospital management system Ghana, EMR software, healthcare ERP, GamMed, digital health West Africa"
      />
      {/* Hero Section */}
      <section className="bg-cyan-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-cyan-200 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-800/50 border border-cyan-700 text-cyan-200 text-sm font-medium mb-6">
                <Zap className="w-4 h-4 text-yellow-400" /> New Feature Release: GamMed v2.0 "The Interoperability & Governance Update"
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                GamMed: The Complete <span className="text-cyan-400">Hospital Enterprise</span> Ecosystem
              </h1>
              <p className="text-xl text-cyan-100 mb-8 leading-relaxed">
                Not just an EMR, but a Total Hospital Operating System engineered for the Ghanaian healthcare landscape.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://gam-med.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-cyan-900 font-bold rounded-2xl hover:bg-cyan-50 transition-all flex items-center gap-2"
                >
                  Launch App <Globe className="w-5 h-5" />
                </a>
                <a 
                  href="https://gam-med.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-cyan-700 text-white font-bold rounded-2xl hover:bg-cyan-600 transition-all"
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
                  src="https://picsum.photos/seed/hospital/800/600" 
                  alt="GamMed Dashboard" 
                  className="rounded-2xl shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Clinical Excellence", desc: "Longitudinal patient folders from OPD to Specialist Wards.", icon: <Stethoscope /> },
              { title: "Financial Governance", desc: "Enterprise ERP with Ghana Statutory Tax compliance.", icon: <Wallet /> },
              { title: "Next-Gen AI", desc: "Gemini-powered clinical co-pilot for GHS-standard care.", icon: <Brain /> }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-gray-50 border border-gray-100"
              >
                <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Categories Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A Total Hospital Operating System</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              GamMed unifies clinical, financial, and administrative workflows into a single, authoritative source of truth.
            </p>
            <div className="w-20 h-1.5 bg-cyan-600 mx-auto rounded-full mt-4" />
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
                  <div className="w-12 h-12 bg-cyan-600 text-white rounded-2xl flex items-center justify-center">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                <ul className="space-y-3 flex-grow mb-6">
                  {category.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="https://gam-med.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-600 font-bold hover:text-cyan-700 transition-colors group"
                >
                  Request Demo for {category.title} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Architecture & System Specifications</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              GamMed represents a Serverless Enterprise Architecture. It eliminates the overhead of physical servers while providing 99.9% uptime, bank-grade financial security, and a scalable multi-tenant foundation.
            </p>
            <div className="w-20 h-1.5 bg-cyan-600 mx-auto rounded-full mt-6" />
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
                <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center mb-6">
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
          <div className="bg-cyan-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to digitize your facility?</h2>
              <p className="text-xl text-cyan-100 mb-10 max-w-2xl mx-auto">
                Join the healthcare revolution in Ghana. Onboard your hospital in seconds with pre-injected GHS catalogs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="https://gam-med.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-white text-cyan-900 font-bold rounded-2xl hover:bg-cyan-50 transition-all text-lg"
                >
                  Request a Demo
                </a>
                <a 
                  href="https://gam-med.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-cyan-700 text-white font-bold rounded-2xl hover:bg-cyan-600 transition-all text-lg"
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

export default GamMed;
