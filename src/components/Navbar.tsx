import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Laptop } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: isHome ? '#about' : '/#about' },
    { name: 'Features', href: isHome ? '#features' : '/#features' },
    { name: 'Process', href: isHome ? '#process' : '/#process' },
    { name: 'Our Apps', href: isHome ? '#apps' : '/#apps' },
    { name: 'Custom Solutions', href: isHome ? '#custom-solutions' : '/#custom-solutions' },
    { name: 'News', href: isHome ? '#news' : '/#news' },
    { name: 'Team', href: isHome ? '#team' : '/#team' },
    { name: 'Support', href: isHome ? '#support' : '/#support' },
    { name: 'FAQ', href: isHome ? '#faq' : '/#faq' },
    { name: 'Request Demo', href: isHome ? '#contact' : '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled || !isHome 
        ? 'bg-indigo-600 shadow-2xl py-3 border-b border-indigo-500/30' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              scrolled || !isHome ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'
            }`}>
              <Laptop className="w-6 h-6" />
            </div>
            <span className={`text-xl font-black tracking-tighter transition-colors duration-300 ${
              scrolled || !isHome ? 'text-white' : 'text-gray-900'
            }`}>
              GAM IT <span className={scrolled || !isHome ? 'text-indigo-200' : 'text-indigo-600'}>Solutions</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 ${
                  scrolled || !isHome 
                    ? 'text-indigo-100 hover:text-white' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button className={`px-6 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg ${
              scrolled || !isHome
                ? 'bg-white text-indigo-600 hover:bg-indigo-50 shadow-indigo-900/20'
                : 'bg-gray-900 text-white hover:bg-gray-800 shadow-gray-200'
            }`}>
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors ${
                scrolled || !isHome ? 'text-white' : 'text-gray-600'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden overflow-hidden border-t ${
              scrolled || !isHome 
                ? 'bg-indigo-700 border-indigo-500/30' 
                : 'bg-white border-gray-100'
            }`}
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-4 text-sm font-black uppercase tracking-widest rounded-xl transition-all ${
                    scrolled || !isHome 
                      ? 'text-indigo-100 hover:text-white hover:bg-indigo-600' 
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <button className={`w-full px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${
                  scrolled || !isHome
                    ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}>
                  Login
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
