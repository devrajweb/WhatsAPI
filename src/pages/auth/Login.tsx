import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      if (email.includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0F172A]">
      {/* Left Side - Image/Branding */}
      <div className="hidden md:flex md:w-1/2 bg-[#0B0F19] p-10 flex-col justify-between items-start text-white relative overflow-hidden border-r border-slate-800">
        <div className="z-10 flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <MessageSquare className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">WhatsAPI</span>
        </div>
        <div className="z-10 max-w-md">
          <h1 className="text-4xl font-bold mb-5 tracking-tight">Scale your business messaging.</h1>
          <p className="text-slate-400 text-base leading-relaxed italic">“WhatsAPI has transformed how we engage with our customers. The automation is flawless.”</p>
          <div className="mt-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 rounded-lg border border-slate-700" />
            <div>
              <p className="font-bold text-sm">Sarah Chen</p>
              <p className="text-slate-500 text-xs text-uppercase tracking-wider">Product Manager at TechFlow</p>
            </div>
          </div>
        </div>
        {/* Background shapes */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#0F172A]">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">WhatsAPI</span>
          </div>
          
          <h2 className="text-2xl font-bold mb-1 text-white tracking-tight">Welcome back</h2>
          <p className="text-slate-400 text-xs mb-8">Enter your credentials to access your dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-slate-500" /> Password
                </label>
                <Link to="#" className="text-[10px] font-bold text-primary-400 hover:text-primary-300">Forgot Password?</Link>
              </div>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white text-sm placeholder:text-slate-600 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
              />
            </div>

            <button 
              disabled={loading}
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-bold text-sm shadow-lg shadow-primary-500/10 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <>Login to Dashboard <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-xs">
              Don't have an account? <Link to="/register" className="text-primary-400 font-bold hover:text-primary-300">Sign up for free</Link>
            </p>
          </div>
          
          <div className="mt-10 p-3 bg-primary-500/5 rounded-lg border border-primary-500/10">
            <p className="text-[10px] text-primary-400 text-center font-bold uppercase tracking-wider mb-1">Demo Access</p>
            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              Use <span className="text-slate-200">admin@whatsapi.com</span> for Admin and <span className="text-slate-200">user@whatsapi.com</span> for User.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
