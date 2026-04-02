import React from 'react';
import { motion } from 'motion/react';
import { Laptop, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Solutions",
      links: [
        { name: "GAM Edu", href: "/apps/gam-edu" },
        { name: "GAM Med", href: "/apps/gam-med" },
        { name: "GAM Shop", href: "/apps/gam-shop" },
        { name: "GAM Poul", href: "/apps/gam-poul" },
        { name: "GAM Hub", href: "/#apps" },
        { name: "Custom Software", href: "/#custom-solutions" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/#about" },
        { name: "Our Team", href: "/#team" },
        { name: "Features", href: "/#features" },
        { name: "Our Process", href: "/#process" },
        { name: "Support", href: "/#support" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "SLA", href: "#" },
        { name: "CEO Portal", href: "/ceo-dashboard" },
      ]
    }
  ];

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: "#", color: "hover:bg-sky-500" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", color: "hover:bg-blue-600" },
    { icon: <Github className="w-5 h-5" />, href: "#", color: "hover:bg-gray-700" },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
                <Laptop className="w-7 h-7" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">GAM IT Solutions</span>
            </Link>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-md font-medium">
              Engineering the future of digital infrastructure in Ghana. We provide elite software solutions for education, healthcare, and commercial sectors.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className={`w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center text-gray-400 ${social.color} hover:text-white transition-all duration-300 shadow-sm`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((group, i) => (
            <div key={i}>
              <h4 className="text-lg font-black mb-8 text-white uppercase tracking-widest text-xs">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-indigo-400 font-bold transition-colors flex items-center gap-1 group"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-800/50 border border-gray-700/50">
              <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-indigo-400 shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Email Us</div>
                <div className="text-white font-bold">jamesgambrah@gmail.com</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-800/50 border border-gray-700/50">
              <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-emerald-400 shadow-sm">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Call Us</div>
                <div className="text-white font-bold">0244750903</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-800/50 border border-gray-700/50">
              <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-purple-400 shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">Visit Us</div>
                <div className="text-white font-bold">College of Science, KNUST</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm font-medium">
            © {currentYear} GAM IT Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
            Designed & Engineered by <span className="text-indigo-400 font-black">GAM IT Solutions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
