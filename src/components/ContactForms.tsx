import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { Send, CheckCircle, AlertCircle, Phone, Sparkles } from 'lucide-react';
import { db, collection, addDoc, serverTimestamp, handleFirestoreError, OperationType } from '../firebase';
import { isValidEmail } from '../lib/utils';

const ContactForms = () => {
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
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
    const email = formData.get('email') as string;

    if (!isValidEmail(email)) {
      setError('Please check your email address and enter a valid one.');
      setIsEmailInvalid(true);
      setLoading(false);
      return;
    }

    setIsEmailInvalid(false);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: email,
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

  const handleCallbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      preferredTime: formData.get('preferredTime') as string,
      message: formData.get('message') as string,
      status: 'pending',
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, 'callbacks'), data);
      
      // Send email notification via backend
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'callback', data })
      });

      setCallbackSubmitted(true);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'callbacks');
      setError('Failed to submit callback request. Please try again.');
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Demo Request Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-indigo-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden"
          >
            <h2 className="text-2xl font-bold mb-4">Request a Demo</h2>
            <p className="text-indigo-100 mb-6 text-sm">
              See our tools in action. Schedule a personalized walkthrough with one of our experts.
            </p>

            {demoSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 relative z-10"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-indigo-600 mx-auto mb-6 shadow-xl"
                >
                  <CheckCircle className="w-10 h-10" />
                </motion.div>
                <h3 className="text-2xl font-black mb-2">Success!</h3>
                <p className="text-indigo-100 font-medium text-sm">
                  Your demo request has been sent. Our team will contact you within 24 hours to schedule your walkthrough.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDemoSubmitted(false)}
                  aria-label="Send another demo request"
                  className="mt-8 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold transition-all"
                >
                  Send another request
                </motion.button>
                <div className="absolute top-4 right-4 animate-pulse">
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                    aria-label="First Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
                  />
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    required
                    aria-label="Last Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
                  />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="Work Email"
                  required
                  aria-label="Work Email"
                  onChange={() => {
                    if (isEmailInvalid) setIsEmailInvalid(false);
                    if (error) setError(null);
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl bg-white/10 border ${isEmailInvalid ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/20'} text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm`}
                />
                <select
                  name="product"
                  required
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  aria-label="Select Product"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all appearance-none text-sm"
                >
                  <option value="" disabled className="text-gray-900">Select Product</option>
                  <option value="gam-hub" className="text-gray-900">GAM Hub</option>
                  <option value="gam-edu" className="text-gray-900">GAM Edu</option>
                  <option value="gam-med" className="text-gray-900">GAM Med</option>
                  <option value="retail-os" className="text-gray-900">Retail OS</option>
                  <option value="hotel-intel" className="text-gray-900">Hotel Intel</option>
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  aria-label={loading ? 'Submitting demo request' : 'Schedule Demo'}
                  className="w-full py-3 px-6 rounded-xl bg-white text-indigo-600 font-bold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? 'Submitting...' : 'Schedule Demo'} <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Request a Callback Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden"
          >
            <h2 className="text-2xl font-bold mb-4">Request a Callback</h2>
            <p className="text-slate-300 mb-6 text-sm">
              Prefer a phone call? Let us know when you're available and we'll reach out to you.
            </p>

            {callbackSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 relative z-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl"
                >
                  <Phone className="w-10 h-10" />
                </motion.div>
                <h3 className="text-2xl font-black mb-2">Confirmed!</h3>
                <p className="text-slate-300 font-medium text-sm">
                  We've received your callback request. One of our specialists will call you at your preferred time.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCallbackSubmitted(false)}
                  aria-label="Request another callback"
                  className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all"
                >
                  Request another call
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-3">
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  required
                  aria-label="Full Name"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  required
                  aria-label="Phone Number"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
                />
                <input
                  name="preferredTime"
                  type="text"
                  placeholder="Preferred Time (e.g. Tomorrow 2pm)"
                  required
                  aria-label="Preferred Time"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
                />
                <textarea
                  name="message"
                  placeholder="Topic of discussion (Optional)"
                  rows={2}
                  aria-label="Topic of discussion"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all resize-none text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label={loading ? 'Submitting callback request' : 'Request Callback'}
                  className="w-full py-3 px-6 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? 'Submitting...' : 'Request Callback'} <Phone className="w-4 h-4" />
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Share Feedback</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Your input helps us build better tools. We'd love to hear from you.
            </p>

            {feedbackSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-100 rounded-[2rem] p-10 text-center shadow-inner"
              >
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-green-100"
                >
                  <CheckCircle className="w-8 h-8" />
                </motion.div>
                <h3 className="text-2xl font-black text-green-900 mb-2">Thank You!</h3>
                <p className="text-green-700 font-medium text-sm mb-6">Your feedback has been recorded and will be reviewed by our product team.</p>
                <button
                  onClick={() => setFeedbackSubmitted(false)}
                  aria-label="Submit more feedback"
                  className="text-green-600 font-bold text-sm hover:underline"
                >
                  Submit more feedback
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  aria-label="Your Name"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={3}
                  aria-label="Your Message"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label={loading ? 'Submitting feedback' : 'Submit Feedback'}
                  className="w-full py-3 px-6 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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
