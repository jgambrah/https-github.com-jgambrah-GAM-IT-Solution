import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How long does it take to implement GAM IT Solutions?",
      answer: "For our pre-developed products like GAM Edu, GAM Med, and GAM Hub, implementation is immediate. Custom on-demand solutions are scoped individually based on your unique requirements."
    },
    {
      question: "Is our data secure and private?",
      answer: "Absolutely. We employ enterprise-grade encryption, multi-factor authentication, and robust access controls. All data is stored in secure, cloud-native environments with regular backups and security audits."
    },
    {
      question: "Do you provide training for our staff?",
      answer: "Yes, comprehensive training and onboarding are core parts of our service. We ensure your staff is fully proficient in using our digital ecosystems before we go live, and we provide ongoing support thereafter."
    },
    {
      question: "Can you build software specifically for our unique needs?",
      answer: "Yes, we specialize in on-demand software development. Our engineering team can build bespoke ERPs, specialized portals, and unique data management systems tailored to your exact specifications."
    },
    {
      question: "What kind of technical support do you offer?",
      answer: "We offer 24/7 technical support backed by robust Service Level Agreements (SLAs). You'll have access to a dedicated account manager and our engineering team for any technical challenges."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6">
              <HelpCircle className="w-4 h-4" />
              <span>Common Questions</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to <span className="text-indigo-600">Know</span>
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to the most common questions about our digital solutions and services.
            </p>
          </motion.div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                activeIndex === index ? 'border-indigo-600 shadow-md' : 'border-gray-100 hover:border-indigo-200'
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`text-lg font-bold transition-colors ${
                  activeIndex === index ? 'text-indigo-600' : 'text-gray-900'
                }`}>
                  {faq.question}
                </span>
                <div className={`shrink-0 ml-4 transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-180 text-indigo-600' : 'text-gray-400'
                }`}>
                  {activeIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
