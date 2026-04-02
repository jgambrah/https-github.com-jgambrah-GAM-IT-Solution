import React, { useEffect, useState } from 'react';
import { 
  Bird, 
  Egg, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { collection, onSnapshot, query, orderBy, limit, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Flock, EggProduction, Transaction, InventoryItem } from '../types';
import { format, subDays, isSameDay, startOfDay } from 'date-fns';
import { motion } from 'motion/react';

const Dashboard: React.FC = () => {
  const [flocks, setFlocks] = useState<Flock[]>([]);
  const [productions, setProductions] = useState<EggProduction[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubFlocks = onSnapshot(collection(db, 'flocks'), (snap) => {
      setFlocks(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Flock)));
    });

    const unsubProd = onSnapshot(query(collection(db, 'eggProduction'), orderBy('date', 'desc'), limit(30)), (snap) => {
      setProductions(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as EggProduction)));
    });

    const unsubTrans = onSnapshot(query(collection(db, 'transactions'), orderBy('date', 'desc'), limit(50)), (snap) => {
      setTransactions(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction)));
    });

    const unsubInv = onSnapshot(collection(db, 'inventory'), (snap) => {
      setInventory(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as InventoryItem)));
      setLoading(false);
    });

    return () => {
      unsubFlocks();
      unsubProd();
      unsubTrans();
      unsubInv();
    };
  }, []);

  // Calculations
  const totalBirds = flocks.reduce((acc, f) => acc + (f.status === 'active' ? f.currentCount : 0), 0);
  const totalEggsToday = productions
    .filter(p => isSameDay(new Date(p.date), new Date()))
    .reduce((acc, p) => acc + p.totalEggs, 0);
  
  const balance = transactions.reduce((acc, t) => acc + (t.type === 'Income' ? t.amount : -t.amount), 0);

  // Chart Data: Last 7 days production
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayProd = productions.filter(p => p.date === dateStr).reduce((acc, p) => acc + p.totalEggs, 0);
    return {
      name: format(date, 'EEE'),
      eggs: dayProd,
      date: dateStr
    };
  }).reverse();

  // Alerts
  const lowStock = inventory.filter(item => item.quantity <= item.lowStockThreshold);
  const mortalityAlerts = flocks.filter(f => f.status === 'active' && (f.initialCount - f.currentCount) / f.initialCount > 0.05);

  const stats = [
    { label: 'Total Birds', value: totalBirds.toLocaleString(), icon: Bird, color: 'bg-emerald-500', trend: '+2.5%', isUp: true },
    { label: 'Daily Eggs', value: totalEggsToday.toLocaleString(), icon: Egg, color: 'bg-amber-500', trend: '+1.2%', isUp: true },
    { label: 'Farm Balance', value: `$${balance.toLocaleString()}`, icon: DollarSign, color: 'bg-blue-500', trend: '-0.4%', isUp: false },
    { label: 'Active Flocks', value: flocks.filter(f => f.status === 'active').length, icon: Activity, color: 'bg-purple-500', trend: 'Stable', isUp: true },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">Egg Production Trends</h3>
              <p className="text-slate-500 text-sm">Daily yield performance over the last 7 days</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-slate-600 text-sm font-medium border border-slate-100">
              <Calendar size={16} />
              Last 7 Days
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={last7Days}>
                <defs>
                  <linearGradient id="colorEggs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="eggs" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorEggs)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Alerts & Notifications */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Farm Alerts</h3>
            <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center text-red-500">
              <AlertTriangle size={18} />
            </div>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto pr-2 scrollbar-hide">
            {lowStock.length === 0 && mortalityAlerts.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-4">
                  <TrendingUp size={32} />
                </div>
                <p className="text-slate-800 font-semibold mb-1">All Systems Normal</p>
                <p className="text-slate-500 text-sm">No critical alerts at this time.</p>
              </div>
            )}

            {lowStock.map(item => (
              <div key={item.id} className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4 group hover:bg-amber-100 transition-colors duration-200">
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-amber-200">
                  <Package size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-amber-900 font-bold text-sm mb-0.5">Low Stock Alert</p>
                  <p className="text-amber-700 text-xs truncate">{item.name} is below threshold ({item.quantity} {item.unit} left)</p>
                </div>
                <ChevronRight size={16} className="text-amber-400 mt-1" />
              </div>
            ))}

            {mortalityAlerts.map(flock => (
              <div key={flock.id} className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4 group hover:bg-red-100 transition-colors duration-200">
                <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-red-200">
                  <Bird size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-red-900 font-bold text-sm mb-0.5">High Mortality Rate</p>
                  <p className="text-red-700 text-xs truncate">Flock {flock.name} exceeds 5% threshold</p>
                </div>
                <ChevronRight size={16} className="text-red-400 mt-1" />
              </div>
            ))}
          </div>

          <button className="mt-8 w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-semibold rounded-2xl transition-colors text-sm">
            View All Notifications
          </button>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">Recent Transactions</h3>
          <button className="text-emerald-600 font-semibold text-sm hover:underline">View Ledger</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-slate-50">
                <th className="pb-4 font-bold">Date</th>
                <th className="pb-4 font-bold">Category</th>
                <th className="pb-4 font-bold">Description</th>
                <th className="pb-4 font-bold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.slice(0, 5).map((t) => (
                <tr key={t.id} className="group hover:bg-slate-50 transition-colors duration-150">
                  <td className="py-4 text-sm text-slate-600 font-medium">{format(t.date.toDate(), 'MMM dd, yyyy')}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      t.type === 'Income' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {t.category}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-slate-800 font-semibold">{t.description}</td>
                  <td className={`py-4 text-sm font-bold text-right ${
                    t.type === 'Income' ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {t.type === 'Income' ? '+' : '-'}${t.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
