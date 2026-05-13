import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Mail, Lock, Loader2, ArrowRight, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock register flow
      await login(email, password);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0F172A]">
      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#0F172A] overflow-y-auto">
        <div className="w-full max-w-sm py-8">
          <div className="mb-8 lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">WhatsAPI</span>
          </div>
          
          <h2 className="text-2xl font-bold mb-1 text-white tracking-tight">Create your account</h2>
          <p className="text-slate-400 text-xs mb-8">Start your 14-day free trial. No credit card required.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-slate-500" /> Full Name
              </label>
              <input 
                type="text" 
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white text-sm placeholder:text-slate-600 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" /> Email Address
              </label>
              <input 
                type="email" 
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white text-sm placeholder:text-slate-600 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-500" /> Password
              </label>
              <input 
                type="password" 
                required
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white text-sm placeholder:text-slate-600 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
              />
            </div>

            <div className="flex items-start gap-3 mt-2">
              <input type="checkbox" required className="mt-0.5 w-3.5 h-3.5 rounded bg-slate-800 border-slate-700 text-primary-600 focus:ring-primary-500" />
              <label className="text-xs text-slate-400">I agree to the <Link to="#" className="text-primary-400 hover:text-primary-300 font-bold">Terms</Link> and <Link to="#" className="text-primary-400 hover:text-primary-300 font-bold">Privacy Policy</Link>.</label>
            </div>

            <button 
              disabled={loading}
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-bold text-sm shadow-lg shadow-primary-500/10 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-xs">
            Already have an account? <Link to="/login" className="text-primary-400 font-bold hover:text-primary-300">Login</Link>
          </p>
        </div>
      </div>

      {/* Info Side */}
      <div className="hidden md:flex md:w-5/12 bg-[#0B0F19] p-10 flex-col justify-center items-center text-center border-l border-slate-800">
        <div className="max-w-xs space-y-6">
            <div className="w-12 h-12 bg-primary-500/10 border border-primary-500/20 rounded-xl flex items-center justify-center mx-auto shadow-sm">
                <MessageSquare className="text-primary-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight leading-snug">Join 10,000+ businesses growing with WhatsAPI</h3>
            <div className="space-y-3 pt-6">
                {[
                    "Unlimited WhatsApp Messages",
                    "Real-time Delivery Reports",
                    "Advanced API Integration",
                    "Multi-device Support"
                ].map(item => (
                    <div key={item} className="flex items-center gap-3 text-left">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                            <ArrowRight className="w-2.5 h-2.5" />
                        </div>
                        <span className="text-slate-400 text-sm font-medium">{item}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
