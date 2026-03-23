import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Linkedin, 
  Github, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Trophy,
  ExternalLink,
  Code2,
  Database,
  BrainCircuit,
  Globe,
  Heart,
  BadgeCheck,
  Layout,
  BookOpen,
  Cpu,
  LineChart,
  Dumbbell,
  Palette,
  User
} from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin?: string;
  github?: string;
  kaggle?: string;
  skills?: string[];
  order: number;
}

const Team: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'team'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));
      setTeam(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching team:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If no team members in Firestore, show a placeholder or the default CEO profile
  if (team.length === 0) {
    return (
      <section id="team" className="py-24 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Our Team</h2>
          <p className="text-gray-600">Team profiles are being updated. Please check back soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-px w-12 bg-indigo-600" />
            <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-sm">Our Leadership</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-none"
          >
            MEET THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">VISIONARIES</span>
          </motion.h2>
        </div>

        <div className="space-y-32">
          {team.map((member) => (
            <div key={member.id} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5 sticky top-24"
              >
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
                  <div className="relative bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-2xl shadow-indigo-100/50">
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-8 left-8 right-8">
                        <h3 className="text-3xl font-black text-white tracking-tight mb-1">{member.name}</h3>
                        <p className="text-indigo-300 font-bold uppercase tracking-widest text-sm">{member.role}</p>
                      </div>
                    </div>
                    
                    <div className="p-8 bg-gray-50/50 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                          {member.linkedin && (
                            <a href={member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-2xl text-gray-400 hover:text-indigo-600 hover:shadow-lg transition-all">
                              <Linkedin className="w-5 h-5" />
                            </a>
                          )}
                          {member.github && (
                            <a href={`https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-2xl text-gray-400 hover:text-gray-900 hover:shadow-lg transition-all">
                              <Github className="w-5 h-5" />
                            </a>
                          )}
                          {member.kaggle && (
                            <a href={`https://www.kaggle.com/${member.kaggle}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-2xl text-gray-400 hover:text-sky-600 hover:shadow-lg transition-all">
                              <Globe className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                          <BadgeCheck className="w-4 h-4 text-emerald-500" />
                          Verified Profile
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content Column */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 space-y-12"
              >
                {/* Personal Statement */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">Personal Statement</h4>
                  </div>
                  <p className="text-2xl font-medium text-gray-600 leading-relaxed italic">
                    "{member.bio}"
                  </p>
                </div>

                {/* Skills Grid */}
                {member.skills && member.skills.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-2 bg-violet-50 rounded-xl text-violet-600">
                        <BrainCircuit className="w-5 h-5" />
                      </div>
                      <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">Core Expertise</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {member.skills.map((skill, i) => (
                        <div key={i} className="px-6 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-indigo-600 group-hover:scale-150 transition-transform" />
                          <span className="font-bold text-gray-700">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Special Section for CEO (James Gambrah) - Hardcoded for now as requested for detail */}
                {member.name.toLowerCase().includes("james gambrah") && (
                  <div className="space-y-12 pt-8 border-t border-gray-100">
                    {/* Credentials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <Award className="w-6 h-6 text-indigo-600" />
                          <h5 className="font-black text-gray-900 uppercase tracking-widest text-sm">Certifications</h5>
                        </div>
                        <ul className="space-y-4">
                          {[
                            "Chartered Accountant (ICAG)",
                            "Google AI Agents Certification",
                            "Gen AI Intensive Course (Google)",
                            "Vertex AI Platform Specialist",
                            "Google AI Studio Expert",
                            "Applied Data Science and Machine Learning (MIT)"
                          ].map((cert, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-600 font-medium">
                              <BadgeCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                              {cert}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <Trophy className="w-6 h-6 text-violet-600" />
                          <h5 className="font-black text-gray-900 uppercase tracking-widest text-sm">Achievements</h5>
                        </div>
                        <ul className="space-y-4">
                          {[
                            "Kaggle Community Badge Holder",
                            "15+ Years Finance Expertise",
                            "PhD Business Administration (Accounting)",
                            "RAG Architecture Specialist",
                            "AI Agent Integration Expert"
                          ].map((ach, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-600 font-medium">
                              <div className="w-5 h-5 bg-violet-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                <div className="w-2 h-2 bg-violet-600 rounded-full" />
                              </div>
                              {ach}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* AI Projects */}
                    <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-2xl">
                      <h4 className="text-2xl font-black mb-8 flex items-center gap-3">
                        <Cpu className="w-6 h-6 text-indigo-400" />
                        AI & Computer Vision Capstones
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="inline-block px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                            Project 1
                          </div>
                          <h5 className="text-xl font-black">Malaria Detection</h5>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            <span className="text-white font-bold">Objective:</span> Build an efficient computer vision model to detect malaria in red blood cells.
                          </p>
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <p className="text-xs text-indigo-300 font-bold mb-1 uppercase tracking-tighter">Results</p>
                            <p className="text-sm text-gray-300">Achieved 90% accuracy in classification using CNN.</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="inline-block px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                            Project 2
                          </div>
                          <h5 className="text-xl font-black">Self-Driving Car Detection</h5>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            <span className="text-white font-bold">Objective:</span> Real-time road object detection using YOLOv5 models.
                          </p>
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <p className="text-xs text-indigo-300 font-bold mb-1 uppercase tracking-tighter">Results</p>
                            <p className="text-sm text-gray-300">Successfully localized pedestrians, cars, and traffic signs.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
