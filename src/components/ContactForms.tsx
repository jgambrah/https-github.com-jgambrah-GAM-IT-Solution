import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { db, collection, addDoc, serverTimestamp, handleFirestoreError, OperationType } from '../firebase';

const ContactForms = () => {
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const product = params.get('product');
    if (product) {
      setSelectedProduct(product);
    }
  }, [location.search]);

  const handleDemoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      product: formData.get('product') as string,
      createdAt: serverTimestamp(),
      status: 'pending'
    };

    try {
      await addDoc(collection(db, 'demoRequests'), data);
      
      // Send email notification via backend
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'demo', data })
      });

      setDemoSubmitted(true);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'demoRequests');
      setError('Failed to submit demo request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      message: formData.get('message') as string,
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, 'feedback'), data);
      
      // Send email notification via backend
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'feedback', data })
      });

      setFeedbackSubmitted(true);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'feedback');
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Demo Request Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
          >
            <h2 className="text-3xl font-bold mb-4">Request a Demo</h2>
            <p className="text-indigo-100 mb-8">
              See our tools in action. Schedule a personalized walkthrough with one of our sales experts.
            </p>

            {demoSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <CheckCircle className="w-16 h-16 mb-4 text-indigo-200" />
                <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
                <p className="text-indigo-100">We'll be in touch within 24 hours to schedule your demo.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  />
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="Work Email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
                <select
                  name="product"
                  required
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all appearance-none"
                >
                  <option value="" disabled className="text-gray-900">Select Product</option>
                  <option value="gam-hub" className="text-gray-900">GAM Hub (National Infrastructure)</option>
                  <option value="gam-edu" className="text-gray-900">GAM Edu (Institutional OS)</option>
                  <option value="gam-med" className="text-gray-900">GAM Med (Hospital OS)</option>
                  <option value="retail-os" className="text-gray-900">Retail OS (Shop Management)</option>
                  <option value="hotel-intel" className="text-gray-900">Hotel Intelligence</option>
                  <option value="logistics-pro" className="text-gray-900">Logistics Pro</option>
                  <option value="fintech-vault" className="text-gray-900">FinTech Vault</option>
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl bg-white text-indigo-600 font-bold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Schedule Demo'} <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Share Your Feedback</h2>
            <p className="text-gray-600 mb-8">
              Your input helps us build better tools. Whether it's a feature request or a general comment, we'd love to hear from you.
            </p>

            {feedbackSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center"
              >
                <CheckCircle className="w-12 h-12 mb-4 text-green-500 mx-auto" />
                <h3 className="text-xl font-bold text-green-900 mb-2">Thank You!</h3>
                <p className="text-green-700">Your feedback has been recorded. We appreciate your time.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForms;
