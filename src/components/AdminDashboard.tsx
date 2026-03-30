import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { LogIn, Plus, Trash2, ShieldCheck, User, Users, LogOut, Newspaper, MessageSquare, Video, Image as ImageIcon, Youtube, Instagram, Music, Mail, Phone, AlertTriangle, X, Search, Edit2, Upload } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import SEO from './SEO';

const AdminDashboard = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'testimonials' | 'news' | 'team' | 'contacts'>('testimonials');
  const [demoRequests, setDemoRequests] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [callbacks, setCallbacks] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [itemToDelete, setItemToDelete] = useState<{ collection: string, id: string, label: string } | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateUrl = (url: string) => {
    if (!url) return true; // Optional URLs are handled separately if required
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

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
  const [newsFilter, setNewsFilter] = useState<string>('all');
  const [newsSearch, setNewsSearch] = useState('');

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
  const [memberOrder, setMemberOrder] = useState('1');
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [teamImagePreview, setTeamImagePreview] = useState<string | null>(null);

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

      // Demo Requests listener
      const qDemo = query(collection(db, 'demoRequests'), orderBy('createdAt', 'desc'));
      const unsubscribeDemo = onSnapshot(qDemo, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDemoRequests(data);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'demoRequests');
      });

      // Feedback listener
      const qFeedback = query(collection(db, 'feedback'), orderBy('createdAt', 'desc'));
      const unsubscribeFeedback = onSnapshot(qFeedback, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeedback(data);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'feedback');
      });

      // Subscriptions listener
      const qSub = query(collection(db, 'newsletterSubscriptions'), orderBy('subscribedAt', 'desc'));
      const unsubscribeSub = onSnapshot(qSub, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubscriptions(data);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'newsletterSubscriptions');
      });

      // Callbacks listener
      const qCallback = query(collection(db, 'callbacks'), orderBy('createdAt', 'desc'));
      const unsubscribeCallback = onSnapshot(qCallback, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCallbacks(data);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'callbacks');
      });

      return () => {
        unsubscribeT();
        unsubscribeN();
        unsubscribeTeam();
        unsubscribeDemo();
        unsubscribeFeedback();
        unsubscribeSub();
        unsubscribeCallback();
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

    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!role.trim()) errors.role = 'Role is required';
    if (!content.trim()) errors.content = 'Content is required';
    if (!validateUrl(avatar)) errors.avatar = 'Invalid avatar URL format';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    try {
      await addDoc(collection(db, 'testimonials'), {
        name: name.trim(),
        role: role.trim(),
        content: content.trim(),
        avatar: avatar.trim(),
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

    const errors: Record<string, string> = {};
    if (!newsTitle.trim()) errors.newsTitle = 'Title is required';
    if (!newsContent.trim()) errors.newsContent = 'Content is required';
    if (!newsAuthor.trim()) errors.newsAuthor = 'Author is required';
    
    if (newsType !== 'text') {
      if (!newsMediaUrl.trim()) {
        errors.newsMediaUrl = 'Media URL is required for this type';
      } else if (!validateUrl(newsMediaUrl)) {
        errors.newsMediaUrl = 'Invalid media URL format';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    try {
      await addDoc(collection(db, 'news'), {
        title: newsTitle.trim(),
        content: newsContent.trim(),
        type: newsType,
        mediaUrl: newsType === 'text' ? '' : newsMediaUrl.trim(),
        author: newsAuthor.trim(),
        createdAt: serverTimestamp()
      });
      setNewsTitle('');
      setNewsContent('');
      setNewsMediaUrl('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'news');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 700000) { // ~700KB limit for base64 in Firestore (base64 adds ~33% overhead)
        setFormErrors(prev => ({ ...prev, teamImage: 'Image is too large. Please use a smaller image (< 700KB).' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamImagePreview(reader.result as string);
        setMemberAvatar(reader.result as string);
        setFormErrors(prev => ({ ...prev, teamImage: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const editTeamMember = (member: any) => {
    setEditingTeamId(member.id);
    setMemberName(member.name);
    setMemberRole(member.role);
    setMemberBio(member.bio);
    setMemberAvatar(member.avatar);
    setTeamImagePreview(member.avatar);
    setMemberLinkedin(member.linkedin);
    setMemberGithub(member.github);
    setMemberKaggle(member.kaggle);
    setMemberSkills(member.skills.join(', '));
    setMemberOrder(member.order.toString());
    setActiveTab('team');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    const errors: Record<string, string> = {};
    if (!memberName.trim()) errors.memberName = 'Name is required';
    if (!memberRole.trim()) errors.memberRole = 'Role is required';
    if (!memberBio.trim()) errors.memberBio = 'Bio is required';
    if (!memberAvatar.trim()) errors.memberAvatar = 'Avatar is required (upload or URL)';
    if (memberLinkedin && !validateUrl(memberLinkedin)) errors.memberLinkedin = 'Invalid LinkedIn URL format';
    if (!memberSkills.trim()) errors.memberSkills = 'Skills are required (comma separated)';
    
    const orderNum = parseInt(memberOrder);
    if (isNaN(orderNum) || orderNum <= 0) {
      errors.memberOrder = 'Order must be a positive integer';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    console.log('Submitting team member...', { editingTeamId, memberName });
    try {
      const skillsArray = Array.from(new Set(
        memberSkills
          .split(',')
          .map(s => s.trim())
          .filter(s => s !== '')
      ));

      const teamData = {
        name: memberName.trim(),
        role: memberRole.trim(),
        bio: memberBio.trim(),
        avatar: memberAvatar.trim(),
        linkedin: memberLinkedin.trim(),
        github: memberGithub.trim(),
        kaggle: memberKaggle.trim(),
        skills: skillsArray,
        order: parseInt(memberOrder),
        updatedAt: serverTimestamp()
      };

      if (editingTeamId) {
        await updateDoc(doc(db, 'team', editingTeamId), teamData);
        setEditingTeamId(null);
      } else {
        await addDoc(collection(db, 'team'), {
          ...teamData,
          createdAt: serverTimestamp()
        });
      }

      setMemberName('');
      setMemberRole('');
      setMemberBio('');
      setMemberAvatar('');
      setTeamImagePreview(null);
      setMemberLinkedin('');
      setMemberGithub('');
      setMemberKaggle('');
      setMemberSkills('');
      setMemberOrder((team.length + 2).toString());
    } catch (error) {
      handleFirestoreError(error, editingTeamId ? OperationType.UPDATE : OperationType.CREATE, 'team');
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
        order: 1,
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

  const handleDelete = async () => {
    if (!isAdmin || !itemToDelete) return;
    try {
      await deleteDoc(doc(db, itemToDelete.collection, itemToDelete.id));
      setItemToDelete(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${itemToDelete.collection}/${itemToDelete.id}`);
    }
  };

  const confirmDelete = (collectionName: string, id: string, label: string) => {
    setItemToDelete({ collection: collectionName, id, label });
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
      <SEO 
        title="CEO Dashboard | Admin"
        description="Administrative dashboard for GAM IT Solutions."
        keywords="admin, dashboard, GAM IT Solutions"
      />
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

        {/* Quick Stats / Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <Video className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Demos</span>
            </div>
            <p className="text-2xl font-black text-gray-900">{demoRequests.length}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Feedback</span>
            </div>
            <p className="text-2xl font-black text-gray-900">{feedback.length}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Callbacks</span>
            </div>
            <p className="text-2xl font-black text-gray-900">{callbacks.length}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Subscribers</span>
            </div>
            <p className="text-2xl font-black text-gray-900">{subscriptions.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => {
              setActiveTab('testimonials');
              setFormErrors({});
            }}
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
            onClick={() => {
              setActiveTab('news');
              setFormErrors({});
            }}
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
            onClick={() => {
              setActiveTab('team');
              setFormErrors({});
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
              activeTab === 'team' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
              : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            Team
          </button>
          <button
            onClick={() => {
              setActiveTab('contacts');
              setFormErrors({});
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
              activeTab === 'contacts' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
              : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Mail className="w-5 h-5" />
            Contacts
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        {itemToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setItemToDelete(null)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-2">Confirm Deletion</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Are you sure you want to delete <span className="font-bold text-gray-900">"{itemToDelete.label}"</span>? This action cannot be undone.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setItemToDelete(null)}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 transition-all shadow-xl shadow-red-100"
                >
                  Delete Now
                </button>
              </div>
            </motion.div>
          </div>
        )}

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
                        onChange={(e) => {
                          setName(e.target.value);
                          if (formErrors.name) setFormErrors(prev => ({ ...prev, name: '' }));
                        }}
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} focus:ring-2 focus:ring-indigo-500 outline-none font-medium`}
                        placeholder="e.g. Dr. Emmanuel Mensah"
                      />
                      {formErrors.name && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{formErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Role / Title</label>
                      <input
                        type="text"
                        required
                        value={role}
                        onChange={(e) => {
                          setRole(e.target.value);
                          if (formErrors.role) setFormErrors(prev => ({ ...prev, role: '' }));
                        }}
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.role ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} focus:ring-2 focus:ring-indigo-500 outline-none font-medium`}
                        placeholder="e.g. Medical Director"
                      />
                      {formErrors.role && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{formErrors.role}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Content</label>
                      <textarea
                        required
                        value={content}
                        onChange={(e) => {
                          setContent(e.target.value);
                          if (formErrors.content) setFormErrors(prev => ({ ...prev, content: '' }));
                        }}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.content ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} focus:ring-2 focus:ring-indigo-500 outline-none font-medium resize-none`}
                        placeholder="What did they say?"
                      />
                      {formErrors.content && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{formErrors.content}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Avatar URL</label>
                      <input
                        type="url"
                        value={avatar}
                        onChange={(e) => {
                          setAvatar(e.target.value);
                          if (formErrors.avatar) setFormErrors(prev => ({ ...prev, avatar: '' }));
                        }}
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.avatar ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} focus:ring-2 focus:ring-indigo-500 outline-none font-medium`}
                        placeholder="https://picsum.photos/seed/user/100/100"
                      />
                      {formErrors.avatar && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{formErrors.avatar}</p>}
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
                        onChange={(e) => {
                          setNewsTitle(e.target.value);
                          if (formErrors.newsTitle) setFormErrors(prev => ({ ...prev, newsTitle: '' }));
                        }}
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.newsTitle ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} focus:ring-2 focus:ring-indigo-500 outline-none font-medium`}
                        placeholder="e.g. New Tech Launch"
                      />
                      {formErrors.newsTitle && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{formErrors.newsTitle}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Content</label>
                      <textarea
                        required
                        value={newsContent}
                        onChange={(e) => {
                          setNewsContent(e.target.value);
                          if (formErrors.newsContent) setFormErrors(prev => ({ ...prev, newsContent: '' }));
                        }}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.newsContent ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} focus:ring-2 focus:ring-indigo-500 outline-none font-medium resize-none`}
                        placeholder="Share the details..."
                      />
                      {formErrors.newsContent && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{formErrors.newsContent}</p>}
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
                          onChange={(e) => {
                            setNewsMediaUrl(e.target.value);
                            if (formErrors.newsMediaUrl) setFormErrors(prev => ({ ...prev, newsMediaUrl: '' }));
                          }}
                          className={`w-full px-4 py-3 rounded-xl border ${formErrors.newsMediaUrl ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} focus:ring-2 focus:ring-indigo-500 outline-none font-medium`}
                          placeholder="Paste URL here..."
                        />
                        {formErrors.newsMediaUrl && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{formErrors.newsMediaUrl}</p>}
                        
                        {newsMediaUrl && !formErrors.newsMediaUrl && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Media Preview</p>
                            {newsType === 'image' && (
                              <img src={newsMediaUrl} alt="Preview" className="max-h-64 w-full object-contain rounded-xl shadow-sm" onError={(e) => (e.currentTarget.style.display = 'none')} />
                            )}
                            {newsType === 'video' && (
                              <video src={newsMediaUrl} controls className="max-h-64 w-full rounded-xl shadow-sm" />
                            )}
                            {newsType === 'youtube' && getYouTubeEmbedUrl(newsMediaUrl) && (
                              <iframe
                                src={getYouTubeEmbedUrl(newsMediaUrl)!}
                                className="w-full aspect-video rounded-xl shadow-sm"
                                allowFullScreen
                              />
                            )}
                            {(newsType === 'instagram' || newsType === 'tiktok') && (
                              <div className="p-8 text-center bg-white rounded-xl border border-dashed border-gray-200">
                                <p className="text-xs text-gray-400 font-bold italic">Live preview not available for {newsType}.</p>
                                <a href={newsMediaUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-indigo-600 font-black uppercase mt-2 inline-block">Verify Link</a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Author</label>
                      <input
                        type="text"
                        required
                        value={newsAuthor}
                        onChange={(e) => {
                          setNewsAuthor(e.target.value);
                          if (formErrors.newsAuthor) setFormErrors(prev => ({ ...prev, newsAuthor: '' }));
                        }}
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.newsAuthor ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} focus:ring-2 focus:ring-indigo-500 outline-none font-medium`}
                      />
                      {formErrors.newsAuthor && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{formErrors.newsAuthor}</p>}
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
                    {editingTeamId ? <Edit2 className="w-6 h-6 text-indigo-600" /> : <Plus className="w-6 h-6 text-indigo-600" />}
                    {editingTeamId ? 'Edit Member' : 'Add Member'}
                  </h2>
                  <form onSubmit={handleTeamSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={memberName}
                        onChange={(e) => {
                          setMemberName(e.target.value);
                          if (formErrors.memberName) setFormErrors(prev => ({ ...prev, memberName: '' }));
                        }}
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.memberName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} focus:ring-2 focus:ring-indigo-500 outline-none font-medium`}
                        placeholder="e.g. Dr. James Gambrah"
                      />
                      {formErrors.memberName && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{formErrors.memberName}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Role</label>
                      <input
                        type="text"
                        required
                        value={memberRole}
                        onChange={(e) => {
                          setMemberRole(e.target.value);
                          if (formErrors.memberRole) setFormErrors(prev => ({ ...prev, memberRole: '' }));
                        }}
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.memberRole ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} focus:ring-2 focus:ring-indigo-500 outline-none font-medium`}
                        placeholder="e.g. CEO & Founder"
                      />
                      {formErrors.memberRole && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{formErrors.memberRole}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Bio / Statement</label>
                      <textarea
                        required
                        value={memberBio}
                        onChange={(e) => {
                          setMemberBio(e.target.value);
                          if (formErrors.memberBio) setFormErrors(prev => ({ ...prev, memberBio: '' }));
                        }}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.memberBio ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} focus:ring-2 focus:ring-indigo-500 outline-none font-medium resize-none`}
                        placeholder="Brief bio..."
                      />
                      {formErrors.memberBio && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{formErrors.memberBio}</p>}
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Member Image</label>
                      
                      {teamImagePreview && (
                        <div className="mb-4 relative group">
                          <img src={teamImagePreview} alt="Preview" className="w-full h-48 object-cover rounded-xl shadow-sm" />
                          <button 
                            type="button"
                            onClick={() => {
                              setTeamImagePreview(null);
                              setMemberAvatar('');
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-600 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      <div className="flex flex-col gap-3">
                        <label className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all group">
                          <Upload className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
                          <span className="text-sm font-bold text-gray-500 group-hover:text-indigo-600">Upload Image</span>
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </label>
                        
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                          <div className="relative flex justify-center text-[10px] uppercase font-black text-gray-400"><span className="bg-gray-50 px-2 tracking-widest">OR URL</span></div>
                        </div>

                        <input
                          type="url"
                          value={memberAvatar}
                          onChange={(e) => {
                            setMemberAvatar(e.target.value);
                            setTeamImagePreview(e.target.value);
                            if (formErrors.memberAvatar) setFormErrors(prev => ({ ...prev, memberAvatar: '' }));
                          }}
                          className={`w-full px-4 py-3 rounded-xl border ${formErrors.memberAvatar ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-sm`}
                          placeholder="https://picsum.photos/seed/ceo/200/200"
                        />
                      </div>
                      {formErrors.memberAvatar && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{formErrors.memberAvatar}</p>}
                      {formErrors.teamImage && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{formErrors.teamImage}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Skills (comma separated)</label>
                      <input
                        type="text"
                        value={memberSkills}
                        onChange={(e) => {
                          setMemberSkills(e.target.value);
                          if (formErrors.memberSkills) setFormErrors(prev => ({ ...prev, memberSkills: '' }));
                        }}
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.memberSkills ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} focus:ring-2 focus:ring-indigo-500 outline-none font-medium`}
                        placeholder="AI, Finance, ML..."
                      />
                      {formErrors.memberSkills && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{formErrors.memberSkills}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">LinkedIn URL</label>
                      <input
                        type="text"
                        value={memberLinkedin}
                        onChange={(e) => {
                          setMemberLinkedin(e.target.value);
                          if (formErrors.memberLinkedin) setFormErrors(prev => ({ ...prev, memberLinkedin: '' }));
                        }}
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.memberLinkedin ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} focus:ring-2 focus:ring-indigo-500 outline-none font-medium`}
                        placeholder="linkedin.com/in/username"
                      />
                      {formErrors.memberLinkedin && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{formErrors.memberLinkedin}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">GitHub Username</label>
                      <input
                        type="text"
                        value={memberGithub}
                        onChange={(e) => setMemberGithub(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                        placeholder="github_username"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Kaggle Username</label>
                      <input
                        type="text"
                        value={memberKaggle}
                        onChange={(e) => setMemberKaggle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                        placeholder="kaggle_username"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Display Order (Positive Integer)</label>
                      <input
                        type="number"
                        min="1"
                        value={memberOrder}
                        onChange={(e) => {
                          setMemberOrder(e.target.value);
                          if (formErrors.memberOrder) setFormErrors(prev => ({ ...prev, memberOrder: '' }));
                        }}
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.memberOrder ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} focus:ring-2 focus:ring-indigo-500 outline-none font-medium`}
                        placeholder="1"
                      />
                      {formErrors.memberOrder && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{formErrors.memberOrder}</p>}
                    </div>
                    <div className="flex gap-3 mt-4">
                      {editingTeamId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTeamId(null);
                            setMemberName('');
                            setMemberRole('');
                            setMemberBio('');
                            setMemberAvatar('');
                            setTeamImagePreview(null);
                            setMemberLinkedin('');
                            setMemberGithub('');
                            setMemberKaggle('');
                            setMemberSkills('');
                            setMemberOrder((team.length + 1).toString());
                          }}
                          className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black text-lg hover:bg-gray-200 transition-all"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="submit"
                        className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
                      >
                        {editingTeamId ? 'Update Member' : 'Add Member'}
                      </button>
                    </div>
                  </form>
                  <button
                    onClick={seedTeam}
                    className="w-full mt-4 py-3 border-2 border-dashed border-indigo-100 text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all text-sm"
                  >
                    Seed CEO Profile
                  </button>
                </>
              )}

              {activeTab === 'contacts' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-gray-900">
                    <Mail className="w-6 h-6 text-indigo-600" />
                    Contact Summary
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-indigo-50 p-6 rounded-2xl">
                      <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-1">Demo Requests</p>
                      <p className="text-3xl font-black text-indigo-600">{demoRequests.length}</p>
                    </div>
                    <div className="bg-emerald-50 p-6 rounded-2xl">
                      <p className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-1">Feedback</p>
                      <p className="text-3xl font-black text-emerald-600">{feedback.length}</p>
                    </div>
                    <div className="bg-rose-50 p-6 rounded-2xl">
                      <p className="text-xs font-black text-rose-400 uppercase tracking-widest mb-1">Callbacks</p>
                      <p className="text-3xl font-black text-rose-600">{callbacks.length}</p>
                    </div>
                    <div className="bg-amber-50 p-6 rounded-2xl">
                      <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-1">Subscribers</p>
                      <p className="text-3xl font-black text-amber-600">{subscriptions.length}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* List Column */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {activeTab === 'contacts' && (
                <div className="space-y-8">
                  {/* Demo Requests Section */}
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                      <Video className="w-5 h-5 text-indigo-600" />
                      Demo Requests
                    </h3>
                    <div className="space-y-4">
                      {demoRequests.length === 0 ? (
                        <p className="text-gray-400 italic">No demo requests yet.</p>
                      ) : (
                        demoRequests.map((r) => (
                          <div key={r.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start justify-between gap-4">
                            <div>
                              <h4 className="font-black text-gray-900">{r.firstName} {r.lastName}</h4>
                              <p className="text-sm text-indigo-600 font-bold mb-2">{r.email}</p>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-md text-[10px] font-black uppercase tracking-tighter">
                                  {r.product}
                                </span>
                                <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter ${
                                  r.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                                }`}>
                                  {r.status}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => confirmDelete('demoRequests', r.id, `Demo request from ${r.firstName} ${r.lastName}`)}
                              className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Feedback Section */}
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-emerald-600" />
                      User Feedback
                    </h3>
                    <div className="space-y-4">
                      {feedback.length === 0 ? (
                        <p className="text-gray-400 italic">No feedback yet.</p>
                      ) : (
                        feedback.map((f) => (
                          <div key={f.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start justify-between gap-4">
                            <div>
                              <h4 className="font-black text-gray-900">{f.name}</h4>
                              <p className="text-gray-600 mt-1">{f.message}</p>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">
                                {f.createdAt?.toDate ? f.createdAt.toDate().toLocaleString() : 'Recent'}
                              </p>
                            </div>
                            <button
                              onClick={() => confirmDelete('feedback', f.id, `Feedback from ${f.name}`)}
                              className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Callbacks Section */}
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                      <Phone className="w-5 h-5 text-rose-600" />
                      Callback Requests
                    </h3>
                    <div className="space-y-4">
                      {callbacks.length === 0 ? (
                        <p className="text-gray-400 italic">No callback requests yet.</p>
                      ) : (
                        callbacks.map((c) => (
                          <div key={c.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start justify-between gap-4">
                            <div>
                              <h4 className="font-black text-gray-900">{c.name}</h4>
                              <p className="text-sm text-rose-600 font-bold">{c.phone}</p>
                              <p className="text-sm text-gray-600 mt-1"><strong>Time:</strong> {c.preferredTime}</p>
                              {c.message && <p className="text-sm text-gray-500 mt-1 italic">"{c.message}"</p>}
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">
                                {c.createdAt?.toDate ? c.createdAt.toDate().toLocaleString() : 'Recent'}
                              </p>
                            </div>
                            <button
                              onClick={() => confirmDelete('callbacks', c.id, `Callback request from ${c.name}`)}
                              className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Subscriptions Section */}
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-amber-600" />
                      Newsletter Subscriptions
                    </h3>
                    <div className="space-y-4">
                      {subscriptions.length === 0 ? (
                        <p className="text-gray-400 italic">No subscriptions yet.</p>
                      ) : (
                        subscriptions.map((s) => (
                          <div key={s.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start justify-between gap-4">
                            <div>
                              <p className="font-bold text-gray-900">{s.email}</p>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                                Subscribed: {s.subscribedAt?.toDate ? s.subscribedAt.toDate().toLocaleString() : 'Recent'}
                              </p>
                            </div>
                            <button
                              onClick={() => confirmDelete('newsletterSubscriptions', s.id, `Subscription for ${s.email}`)}
                              className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

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
                        onClick={() => confirmDelete('testimonials', t.id, `Testimonial from ${t.name}`)}
                        className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  ))
                )
              )}

              {activeTab === 'news' && (
                <div className="mb-8 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search news by title or content..."
                      value={newsSearch}
                      onChange={(e) => setNewsSearch(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none font-medium shadow-sm transition-all"
                    />
                    {newsSearch && (
                      <button 
                        onClick={() => setNewsSearch('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="w-3 h-3 text-gray-400" />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'text', 'image', 'video', 'youtube', 'instagram', 'tiktok'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setNewsFilter(type)}
                        className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                          newsFilter === type 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                            : 'bg-white text-gray-400 hover:bg-gray-50 border border-gray-100'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'news' && (
                (() => {
                  const filteredNews = news.filter(n => {
                    const matchesType = newsFilter === 'all' || n.type === newsFilter;
                    const matchesSearch = (n.title?.toLowerCase() || '').includes(newsSearch.toLowerCase()) || 
                                          (n.content?.toLowerCase() || '').includes(newsSearch.toLowerCase());
                    return matchesType && matchesSearch;
                  });
                  return filteredNews.length === 0 ? (
                    <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-200">
                      <Newspaper className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                      <p className="text-gray-400 font-bold italic">
                        {newsSearch 
                          ? `No results found for "${newsSearch}"`
                          : (newsFilter === 'all' ? 'No news updates yet.' : `No ${newsFilter} updates yet.`)}
                      </p>
                    </div>
                  ) : (
                    filteredNews.map((n) => (
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
                        onClick={() => confirmDelete('news', n.id, `News post: ${n.title}`)}
                        className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  ))
                );
              })()
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
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => editTeamMember(member)}
                          className="p-2 text-gray-300 hover:text-indigo-600 transition-colors"
                          title="Edit Member"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => confirmDelete('team', member.id, `Team member: ${member.name}`)}
                          className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                          title="Delete Member"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
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
