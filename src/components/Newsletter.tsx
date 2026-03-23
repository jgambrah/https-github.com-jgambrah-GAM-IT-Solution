import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 md:p-16 rounded-[3rem] bg-white shadow-2xl shadow-indigo-100 border border-gray-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-6"
              >
                <Mail className="w-4 h-4" />
                Stay Updated
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
              >
                Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Digital Revolution</span> in Ghana
              </motion.h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Get the latest insights on institutional digital infrastructure, healthcare intelligence, 
                and national-scale technological advancements delivered to your inbox.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> No spam, ever
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Weekly insights
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Unsubscribe anytime
                </div>
              </div>
            </div>

            <div className="relative">
              {subscribed ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 p-12 rounded-[2rem] text-center border border-green-100"
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-green-200">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">You're on the list!</h3>
                  <p className="text-green-700">Thank you for joining the GAM IT Solutions community. We'll be in touch soon.</p>
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your professional email"
                      className="w-full px-8 py-6 rounded-[2rem] bg-gray-50 border border-gray-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none text-lg transition-all"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-2 bottom-2 px-8 bg-indigo-600 text-white rounded-[1.5rem] font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-200"
                    >
                      Subscribe <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-center text-sm text-gray-400">
                    By subscribing, you agree to our <a href="#" className="underline hover:text-indigo-600">Privacy Policy</a> and <a href="#" className="underline hover:text-indigo-600">Terms of Service</a>.
                  </p>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
