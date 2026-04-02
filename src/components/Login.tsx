import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Bird, LogIn, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || 'Failed to login with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl shadow-emerald-100 p-10 border border-slate-100"
      >
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-200">
            <Bird className="text-white w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight mb-2">GAM POUL</h1>
          <p className="text-slate-500 text-lg">360° Farm Command Center</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium"
          >
            <AlertCircle size={20} />
            {error}
          </motion.div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-white border-2 border-slate-200 rounded-2xl text-slate-700 font-semibold text-lg hover:bg-slate-50 hover:border-emerald-500 hover:text-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6 group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
              Sign in with Google
            </>
          )}
        </button>

        <div className="mt-10 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-sm">
            Secure Enterprise-Grade Authentication powered by Firebase
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
