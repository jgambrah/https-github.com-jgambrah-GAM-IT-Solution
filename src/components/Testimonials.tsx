import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Quote, Star, ShieldCheck } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTestimonials(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'testimonials');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  if (loading) return null;

  return (
    <section id="testimonials" className="py-24 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Trusted by <span className="text-indigo-400">Industry Leaders</span>
              </h2>
              <p className="text-lg text-gray-400">
                Hear from the professionals and institutions that have digitized their operations with GAM IT Solutions.
              </p>
            </motion.div>
          </div>
          <Link 
            to="/ceo-dashboard" 
            className="flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors group"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>CEO Portal</span>
          </Link>
        </div>
      </div>

      {testimonials.length > 0 ? (
        <div className="relative flex">
          <motion.div
            className="flex gap-8 whitespace-nowrap px-4"
            animate={{
              x: [0, -2000], // Adjust based on content
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className={`w-[400px] shrink-0 p-8 rounded-[2.5rem] relative group shadow-xl transition-all duration-500 ${testimonial.color || 'bg-indigo-600'} text-white`}
              >
                <div className="absolute top-6 right-8 text-white/20 group-hover:text-white/30 transition-colors">
                  <Quote className="w-16 h-16" />
                </div>
                
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-white text-white" />
                  ))}
                </div>

                <p className="text-lg mb-8 leading-relaxed italic relative z-10 whitespace-normal line-clamp-4">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-xl">{testimonial.name}</h4>
                    <p className="text-sm text-white/70">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 italic">No testimonials added yet. Visit the CEO Portal to add your first client story.</p>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
