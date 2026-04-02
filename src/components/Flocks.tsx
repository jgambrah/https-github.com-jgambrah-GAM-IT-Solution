import React, { useState, useEffect } from 'react';
import { 
  Bird, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  Activity, 
  Heart,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  X
} from 'lucide-react';
import { collection, onSnapshot, addDoc, serverTimestamp, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Flock, HealthRecord } from '../types';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';

const Flocks: React.FC = () => {
  const [flocks, setFlocks] = useState<Flock[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newFlock, setNewFlock] = useState({
    name: '',
    breed: '',
    source: '',
    initialCount: 0,
    ageWeeks: 0
  });

  useEffect(() => {
    const q = query(collection(db, 'flocks'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setFlocks(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Flock)));
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleAddFlock = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'flocks'), {
        ...newFlock,
        currentCount: newFlock.initialCount,
        status: 'active',
        createdAt: serverTimestamp()
      });
      setIsAddModalOpen(false);
      setNewFlock({ name: '', breed: '', source: '', initialCount: 0, ageWeeks: 0 });
    } catch (err) {
      console.error("Error adding flock:", err);
    }
  };

  const toggleStatus = async (flock: Flock) => {
    const newStatus = flock.status === 'active' ? 'culled' : 'active';
    await updateDoc(doc(db, 'flocks', flock.id), { status: newStatus });
  };

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search flocks by name or breed..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={20} />
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 hover:scale-105 active:scale-95"
          >
            <Plus size={20} />
            Add New Flock
          </button>
        </div>
      </div>

      {/* Flocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-3xl" />
          ))
        ) : flocks.map((flock, i) => (
          <motion.div 
            key={flock.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-opacity-20 group-hover:rotate-6 transition-transform duration-300 ${
                    flock.status === 'active' ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-slate-400 text-white shadow-slate-200'
                  }`}>
                    <Bird size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">{flock.name}</h3>
                    <p className="text-slate-500 text-sm font-medium">{flock.breed}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  flock.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  {flock.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Current Birds</p>
                  <p className="text-lg font-bold text-slate-800">{flock.currentCount.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Age (Weeks)</p>
                  <p className="text-lg font-bold text-slate-800">{flock.ageWeeks || 'N/A'}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <Activity size={16} className="text-emerald-500" />
                    Mortality Rate
                  </div>
                  <span className={`font-bold ${
                    (flock.initialCount - flock.currentCount) / flock.initialCount > 0.05 ? 'text-red-500' : 'text-emerald-600'
                  }`}>
                    {(((flock.initialCount - flock.currentCount) / flock.initialCount) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(flock.currentCount / flock.initialCount) * 100}%` }}
                    className={`h-full rounded-full ${
                      (flock.initialCount - flock.currentCount) / flock.initialCount > 0.05 ? 'bg-red-500' : 'bg-emerald-500'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button 
                onClick={() => toggleStatus(flock)}
                className="text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors uppercase tracking-wider"
              >
                Mark as {flock.status === 'active' ? 'Culled' : 'Active'}
              </button>
              <button className="flex items-center gap-1 text-emerald-600 font-bold text-sm hover:gap-2 transition-all">
                View Details
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Flock Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Add New Flock</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddFlock} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">Flock Name/ID</label>
                    <input 
                      required
                      type="text" 
                      value={newFlock.name}
                      onChange={e => setNewFlock({...newFlock, name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                      placeholder="e.g. Batch A-2024"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">Breed</label>
                    <input 
                      required
                      type="text" 
                      value={newFlock.breed}
                      onChange={e => setNewFlock({...newFlock, breed: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                      placeholder="e.g. Isa Brown"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">Initial Count</label>
                    <input 
                      required
                      type="number" 
                      value={newFlock.initialCount}
                      onChange={e => setNewFlock({...newFlock, initialCount: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">Age (Weeks)</label>
                    <input 
                      type="number" 
                      value={newFlock.ageWeeks}
                      onChange={e => setNewFlock({...newFlock, ageWeeks: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">Source/Supplier</label>
                  <input 
                    type="text" 
                    value={newFlock.source}
                    onChange={e => setNewFlock({...newFlock, source: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                    placeholder="e.g. Zartech Hatchery"
                  />
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                  >
                    Create Flock
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Flocks;
