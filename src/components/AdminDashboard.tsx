import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { LogIn, Plus, Trash2, ShieldCheck, User, Users, LogOut, Newspaper, MessageSquare, Video, Image as ImageIcon, Youtube, Instagram, Music } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';

const AdminDashboard = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'testimonials' | 'news' | 'team'>('testimonials');

  useEffect(() => {
    console.log("Current Active Tab:", activeTab);
  }, [activeTab]);

  // Testimonials state
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [content, setContent] = useState('');
  const [avatar, setAvatar] = useState('https://picsum.photos/seed/user/100/100');
  const [color, setColor] = useState('bg-indigo-600');

  // News state
  const [news, setNews] = useState<any[]>([]);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsType, setNewsType] = useState('text');
  const [newsMediaUrl, setNewsMediaUrl] = useState('');
  const [newsAuthor, setNewsAuthor] = useState('James Gambrah');

  // Team state
  const [team, setTeam] = useState<any[]>([]);
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('');
  const [memberBio, setMemberBio] = useState('');
  const [memberAvatar, setMemberAvatar] = useState('https://picsum.photos/seed/ceo/200/200');
  const [memberLinkedin, setMemberLinkedin] = useState('');
  const [memberGithub, setMemberGithub] = useState('');
  const [memberKaggle, setMemberKaggle] = useState('');
  const [memberSkills, setMemberSkills] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u && u.email === 'jamesgambrah@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      // Testimonials listener
      const qT = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
      const unsubscribeT = onSnapshot(qT, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTestimonials(data);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'testimonials');
      });

      // News listener
      const qN = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
      const unsubscribeN = onSnapshot(qN, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNews(data);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'news');
      });

      // Team listener
      const qTeam = query(collection(db, 'team'), orderBy('order', 'asc'));
      const unsubscribeTeam = onSnapshot(qTeam, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTeam(data);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'team');
      });

      return () => {
        unsubscribeT();
        unsubscribeN();
        unsubscribeTeam();
      };
    }
  }, [isAdmin]);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    try {
      await addDoc(collection(db, 'testimonials'), {
        name,
        role,
        content,
        avatar,
        color,
        createdAt: serverTimestamp()
      });
      setName('');
      setRole('');
      setContent('');
      setAvatar(`https://picsum.photos/seed/${Math.random()}/100/100`);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'testimonials');
    }
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    try {
      await addDoc(collection(db, 'news'), {
        title: newsTitle,
        content: newsContent,
        type: newsType,
        mediaUrl: newsMediaUrl,
        author: newsAuthor,
        createdAt: serverTimestamp()
      });
      setNewsTitle('');
      setNewsContent('');
      setNewsMediaUrl('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'news');
    }
  };

  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    try {
      await addDoc(collection(db, 'team'), {
        name: memberName,
        role: memberRole,
        bio: memberBio,
        avatar: memberAvatar,
        linkedin: memberLinkedin,
        github: memberGithub,
        kaggle: memberKaggle,
        skills: memberSkills.split(',').map(s => s.trim()).filter(s => s !== ''),
        order: team.length,
        createdAt: serverTimestamp()
      });
      setMemberName('');
      setMemberRole('');
      setMemberBio('');
      setMemberLinkedin('');
      setMemberGithub('');
      setMemberKaggle('');
      setMemberSkills('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'team');
    }
  };

  const seedTestimonials = async () => {
    if (!isAdmin) return;
    const initialTestimonials = [
      {
        name: "Dr. Emmanuel Mensah",
        role: "Medical Director, Regional Hospital",
        content: "GAM Med has completely transformed our patient management. The efficiency gains have been remarkable, allowing our staff to focus more on patient care than paperwork.",
        avatar: "https://picsum.photos/seed/doc1/100/100",
        color: "bg-indigo-600"
      },
      {
        name: "Prof. Sarah Appiah",
        role: "Dean of Students, Tech University",
        content: "The custom portal built by GAM IT Solutions has streamlined our student registration process. Their technical support is truly 24/7 and always responsive.",
        avatar: "https://picsum.photos/seed/prof1/100/100",
        color: "bg-emerald-600"
      },
      {
        name: "Mr. Kofi Boateng",
        role: "CEO, Logistics Hub",
        content: "GAM Hub provided the exact scalability we needed. Their on-demand development team understood our complex requirements and delivered a world-class solution.",
        avatar: "https://picsum.photos/seed/ceo1/100/100",
        color: "bg-rose-600"
      }
    ];

    try {
      for (const t of initialTestimonials) {
        await addDoc(collection(db, 'testimonials'), {
          ...t,
          createdAt: serverTimestamp()
        });
      }
      alert('Successfully seeded testimonials!');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'testimonials');
    }
  };

  const seedNews = async () => {
    if (!isAdmin) return;
    const initialNews = [
      {
        title: "GAM IT Solutions Expands to KNUST College of Science",
        content: "We are proud to announce our new headquarters at the College of Science, KNUST. This move strengthens our ties with academic excellence and innovation.",
        type: "image",
        mediaUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
        author: "James Gambrah",
        createdAt: serverTimestamp()
      },
      {
        title: "The Future of Healthcare: GAM Med 2.0 Launch",
        content: "Watch how our latest update to GAM Med is revolutionizing patient records management in regional hospitals across Ghana.",
        type: "youtube",
        mediaUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        author: "Tech Team",
        createdAt: serverTimestamp()
      },
      {
        title: "Digitizing Education in Rural Districts",
        content: "Our mission to bring GAM Edu to every corner of Ghana continues. See the impact we're making in the northern regions.",
        type: "tiktok",
        mediaUrl: "https://www.tiktok.com/@gam_it_solutions/video/1234567890",
        author: "Field Operations",
        createdAt: serverTimestamp()
      }
    ];

    try {
      for (const n of initialNews) {
        await addDoc(collection(db, 'news'), n);
      }
      alert('Successfully seeded news updates!');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'news');
    }
  };

  const seedTeam = async () => {
    if (!isAdmin) return;
    const initialTeam = [
      {
        name: "Dr. James Gambrah",
        role: "CEO & Founder",
        bio: "With over 15 years of experience as a Chartered Accountant, I have seamlessly integrated data science and advanced AI into my finance expertise. I am an expert in building AI Agents and RAG architectures, with deep proficiency in the Google Cloud Ecosystem, Google AI Studio, and Vertex AI. My technical stack includes Python, JavaScript, and SQL, combined with a 'Vibe Coding' approach to rapid innovation. I leverage CLI commands and modern IDEs like VS Code to deliver insightful, data-backed recommendations that drive strategic decisions and business growth.",
        avatar: "https://picsum.photos/seed/ceo/200/200",
        linkedin: "linkedin.com/in/james-jamesgambrah-4a2a45160",
        github: "jgambrah",
        kaggle: "jamesgambrah",
        skills: [
          "Python", "JavaScript", "Vibe Coding", "Building AI Agents", 
          "Building RAG Architect", "Google Cloud Ecosystem", 
          "Google AI Studio", "Vertex AI Platform", "VS Code", 
          "CLI Commands", "SQL", "Finance", "Accounting"
        ],
        order: 0,
        createdAt: serverTimestamp()
      }
    ];

    try {
      for (const member of initialTeam) {
        await addDoc(collection(db, 'team'), member);
      }
      alert('Successfully seeded team members!');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'team');
    }
  };

  const handleDelete = async (collectionName: string, id: string) => {
    if (!isAdmin) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${id}`);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">CEO Dashboard</h1>
          <p className="text-gray-600 mb-8">Please sign in with your authorized account to manage the platform.</p>
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
          >
            <LogIn className="w-5 h-5" />
            Sign In with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter">CEO Dashboard</h1>
            <p className="text-gray-600 font-medium">Manage your digital empire and keep your visitors informed.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
              <User className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-bold text-gray-700">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
              activeTab === 'testimonials' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
              : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Testimony
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
              activeTab === 'news' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
              : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Newspaper className="w-5 h-5" />
            News and Update
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
              activeTab === 'team' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
              : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            Team
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 sticky top-8">
              {activeTab === 'testimonials' && (
                <>
                  <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-gray-900">
                    <Plus className="w-6 h-6 text-indigo-600" />
                    Add Testimonial
                  </h2>
                  <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Client Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                        placeholder="e.g. Dr. Emmanuel Mensah"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Role / Title</label>
                      <input
                        type="text"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                        placeholder="e.g. Medical Director"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Content</label>
                      <textarea
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none font-medium resize-none"
                        placeholder="What did they say?"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Card Color</label>
                      <select
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                      >
                        <option value="bg-indigo-600">Indigo</option>
                        <option value="bg-emerald-600">Emerald</option>
                        <option value="bg-rose-600">Rose</option>
                        <option value="bg-amber-600">Amber</option>
                        <option value="bg-violet-600">Violet</option>
                        <option value="bg-sky-600">Sky</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 mt-4"
                    >
                      Publish Story
                    </button>
                  </form>
                  <button
                    onClick={seedTestimonials}
                    className="w-full mt-4 py-3 border-2 border-dashed border-indigo-100 text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all text-sm"
                  >
                    Seed Initial Testimonials
                  </button>
                </>
              )}

              {activeTab === 'news' && (
                <>
                  <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-gray-900">
                    <Plus className="w-6 h-6 text-indigo-600" />
                    Post Update
                  </h2>
                  <form onSubmit={handleNewsSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Post Title</label>
                      <input
                        type="text"
                        required
                        value={newsTitle}
                        onChange={(e) => setNewsTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                        placeholder="e.g. New Tech Launch"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Content</label>
                      <textarea
                        required
                        value={newsContent}
                        onChange={(e) => setNewsContent(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none font-medium resize-none"
                        placeholder="Share the details..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Media Type</label>
                      <select
                        value={newsType}
                        onChange={(e) => setNewsType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                      >
                        <option value="text">Text Only</option>
                        <option value="image">Image URL</option>
                        <option value="video">Personal Video URL</option>
                        <option value="youtube">YouTube URL</option>
                        <option value="instagram">Instagram URL</option>
                        <option value="tiktok">TikTok URL</option>
                      </select>
                    </div>
                    {newsType !== 'text' && (
                      <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Media URL</label>
                        <input
                          type="url"
                          required
                          value={newsMediaUrl}
                          onChange={(e) => setNewsMediaUrl(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                          placeholder="Paste URL here..."
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Author</label>
                      <input
                        type="text"
                        required
                        value={newsAuthor}
                        onChange={(e) => setNewsAuthor(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 mt-4"
                    >
                      Post Update
                    </button>
                  </form>
                  <button
                    onClick={seedNews}
                    className="w-full mt-4 py-3 border-2 border-dashed border-indigo-100 text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all text-sm"
                  >
                    Seed Initial News
                  </button>
                </>
              )}

              {activeTab === 'team' && (
                <>
                  <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-gray-900">
                    <Plus className="w-6 h-6 text-indigo-600" />
                    Add Member
                  </h2>
                  <form onSubmit={handleTeamSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                        placeholder="e.g. Dr. James Gambrah"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Role</label>
                      <input
                        type="text"
                        required
                        value={memberRole}
                        onChange={(e) => setMemberRole(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                        placeholder="e.g. CEO & Founder"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Bio / Statement</label>
                      <textarea
                        required
                        value={memberBio}
                        onChange={(e) => setMemberBio(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none font-medium resize-none"
                        placeholder="Brief bio..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Skills (comma separated)</label>
                      <input
                        type="text"
                        value={memberSkills}
                        onChange={(e) => setMemberSkills(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                        placeholder="AI, Finance, ML..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">LinkedIn URL</label>
                      <input
                        type="text"
                        value={memberLinkedin}
                        onChange={(e) => setMemberLinkedin(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 mt-4"
                    >
                      Add Member
                    </button>
                  </form>
                  <button
                    onClick={seedTeam}
                    className="w-full mt-4 py-3 border-2 border-dashed border-indigo-100 text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all text-sm"
                  >
                    Seed CEO Profile
                  </button>
                </>
              )}
            </div>
          </div>

          {/* List Column */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {activeTab === 'testimonials' && (
                testimonials.length === 0 ? (
                  <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-200">
                    <MessageSquare className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-bold italic">No testimonials yet.</p>
                  </div>
                ) : (
                  testimonials.map((t) => (
                    <div key={t.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start justify-between gap-4 group hover:shadow-md transition-all">
                      <div className="flex gap-4">
                        <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                        <div>
                          <h3 className="font-black text-gray-900 text-lg">{t.name}</h3>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t.role}</p>
                          <p className="text-gray-600 font-medium italic">"{t.content}"</p>
                          <div className={`inline-block mt-3 px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-tighter ${t.color}`}>
                            {t.color.replace('bg-', '')}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete('testimonials', t.id)}
                        className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  ))
                )
              )}

              {activeTab === 'news' && (
                news.length === 0 ? (
                  <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-200">
                    <Newspaper className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-bold italic">No news updates yet.</p>
                  </div>
                ) : (
                  news.map((n) => (
                    <div key={n.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start justify-between gap-4 group hover:shadow-md transition-all">
                      <div className="flex gap-6 w-full">
                        {n.type === 'image' && (
                          <img src={n.mediaUrl} alt={n.title} className="w-24 h-24 rounded-2xl object-cover shadow-sm" />
                        )}
                        {(n.type === 'youtube' || n.type === 'video') && (
                          <div className="w-24 h-24 rounded-2xl bg-gray-900 flex items-center justify-center text-white shadow-sm">
                            <Video className="w-8 h-8" />
                          </div>
                        )}
                        {n.type === 'instagram' && (
                          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
                            <Instagram className="w-8 h-8" />
                          </div>
                        )}
                        {n.type === 'tiktok' && (
                          <div className="w-24 h-24 rounded-2xl bg-black flex items-center justify-center text-white shadow-sm">
                            <Music className="w-8 h-8" />
                          </div>
                        )}
                        {n.type === 'text' && (
                          <div className="w-24 h-24 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 shadow-sm">
                            <Newspaper className="w-8 h-8" />
                          </div>
                        )}
                        <div className="flex-grow">
                          <h3 className="font-black text-gray-900 text-xl mb-1">{n.title}</h3>
                          <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                            <span>{n.author}</span>
                            <span>•</span>
                            <span>{n.createdAt?.toDate ? n.createdAt.toDate().toLocaleDateString() : 'Recent'}</span>
                          </div>
                          <p className="text-gray-600 font-medium line-clamp-2">{n.content}</p>
                          <div className={`inline-block mt-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                            n.type === 'text' ? 'bg-gray-100 text-gray-500' :
                            n.type === 'youtube' ? 'bg-red-50 text-red-600' :
                            n.type === 'instagram' ? 'bg-purple-50 text-purple-600' :
                            n.type === 'tiktok' ? 'bg-black text-white' :
                            'bg-indigo-50 text-indigo-600'
                          }`}>
                            {n.type}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete('news', n.id)}
                        className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  ))
                )
              )}

              {activeTab === 'team' && (
                team.length === 0 ? (
                  <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-200">
                    <Users className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-bold italic">No team members yet.</p>
                  </div>
                ) : (
                  team.map((member) => (
                    <div key={member.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start justify-between gap-4 group hover:shadow-md transition-all">
                      <div className="flex gap-4">
                        <img src={member.avatar} alt={member.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                        <div>
                          <h3 className="font-black text-gray-900 text-lg">{member.name}</h3>
                          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">{member.role}</p>
                          <p className="text-gray-600 font-medium line-clamp-2">{member.bio}</p>
                          <div className="flex flex-wrap gap-1 mt-3">
                            {member.skills?.map((skill: string, i: number) => (
                              <span key={i} className="px-2 py-0.5 bg-gray-50 text-gray-400 rounded-md text-[10px] font-black uppercase">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete('team', member.id)}
                        className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  ))
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
