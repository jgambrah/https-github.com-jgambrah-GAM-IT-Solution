import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Newspaper, Video, Image as ImageIcon, Youtube, Instagram, Music, Calendar, User, ExternalLink } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const News = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNews(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'news');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getYoutubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const renderMedia = (item: any) => {
    switch (item.type) {
      case 'image':
        return (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
            <img 
              src={item.mediaUrl} 
              alt={item.title} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'video':
        return (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-black">
            <video 
              src={item.mediaUrl} 
              controls 
              className="w-full h-full object-contain"
            />
          </div>
        );
      case 'youtube':
        const embedUrl = getYoutubeEmbedUrl(item.mediaUrl);
        return embedUrl ? (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 shadow-lg">
            <iframe
              src={embedUrl}
              title={item.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="p-4 bg-gray-100 rounded-xl mb-6 flex items-center gap-3 text-gray-500">
            <Youtube className="w-6 h-6 text-red-600" />
            <a href={item.mediaUrl} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">
              Watch on YouTube <ExternalLink className="w-4 h-4 inline" />
            </a>
          </div>
        );
      case 'instagram':
        return (
          <div className="p-4 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-2xl mb-6 flex items-center justify-between text-white shadow-lg">
            <div className="flex items-center gap-3">
              <Instagram className="w-8 h-8" />
              <span className="font-black text-lg">View on Instagram</span>
            </div>
            <a href={item.mediaUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/20 rounded-xl font-bold hover:bg-white/30 transition-all">
              Open Post
            </a>
          </div>
        );
      case 'tiktok':
        return (
          <div className="p-4 bg-black rounded-2xl mb-6 flex items-center justify-between text-white shadow-lg">
            <div className="flex items-center gap-3">
              <Music className="w-8 h-8 animate-pulse" />
              <span className="font-black text-lg">Watch on TikTok</span>
            </div>
            <a href={item.mediaUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/20 rounded-xl font-bold hover:bg-white/30 transition-all">
              Open Video
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) return (
    <div className="py-24 flex justify-center">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <section id="news" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-4 border border-indigo-100">
              <Newspaper className="w-4 h-4" />
              <span>Latest from GAM IT</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">
              News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Tech Updates</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Stay informed about our latest innovations, institutional partnerships, and the evolving digital landscape of Ghana.
            </p>
          </motion.div>
        </div>

        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 flex flex-col h-full"
              >
                {renderMedia(item)}
                
                <div className="flex items-center gap-4 mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : 'Recent'}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {item.author || 'GAM IT Team'}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow font-medium line-clamp-3">
                  {item.content}
                </p>

                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                    item.type === 'text' ? 'bg-gray-100 text-gray-500' :
                    item.type === 'youtube' ? 'bg-red-50 text-red-600' :
                    item.type === 'instagram' ? 'bg-purple-50 text-purple-600' :
                    item.type === 'tiktok' ? 'bg-black text-white' :
                    'bg-indigo-50 text-indigo-600'
                  }`}>
                    {item.type}
                  </span>
                  <button className="text-indigo-600 font-black text-sm flex items-center gap-2 group/btn">
                    Read More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 font-bold italic">No news updates yet. Stay tuned for the digital revolution.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

export default News;
