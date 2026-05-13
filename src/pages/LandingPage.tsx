import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Smartphone, 
  Zap, 
  Shield, 
  Users, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Menu, 
  X,
  PlayCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 high-density-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/20">
                <MessageSquare className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                WhatsAPI
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <NavLinks />
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-primary-500/10"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>

            <button className="md:hidden p-2 text-slate-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-[#0F172A] pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <NavLinks mobile onClick={() => setIsMenuOpen(false)} />
              <div className="flex flex-col gap-3 pt-6 border-t border-slate-800">
                <Link to="/login" className="w-full py-3 text-center border border-slate-800 rounded-lg font-bold text-white text-sm">Login</Link>
                <Link to="/register" className="w-full py-3 text-center bg-primary-600 text-white rounded-lg font-bold text-sm">Start Free Trial</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-primary-500/20">
              Trusted by 10,000+ Businesses
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl mx-auto text-white tracking-tight">
              Send Unlimited WhatsApp Messages with <span className="text-primary-500">API Automation</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
              Connect via official and reliable API. Automate notifications, marketing campaigns, and customer support with ease.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/register" className="w-full sm:w-auto px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-base font-bold transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2">
                Get Started Free <ArrowRight size={18} />
              </Link>
              <button className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg text-base font-bold transition-all flex items-center justify-center gap-2">
                <PlayCircle size={18} /> View Demo
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16 relative px-4"
          >
            <div className="relative max-w-4xl mx-auto high-density-card p-1.5 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                alt="Dashboard Mockup" 
                className="w-full rounded-lg shadow-inner opacity-90"
              />
              <div className="hidden lg:block absolute -left-8 -bottom-8 w-44 p-3 high-density-card border-slate-700 shadow-xl animate-bounce">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span className="text-[9px] font-bold text-slate-500 uppercase">REALTIME SYNC</span>
                </div>
                <div className="text-[11px] font-bold text-white">1,240 Messages Sent</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3 text-white tracking-tight">Powerful Features for Growth</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">Scale your communications with tools designed for high-performance marketing and automation.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Zap size={20} />} 
              title="Unlimited Messaging" 
              desc="No caps on how many messages you can send to your customers globally."
            />
            <FeatureCard 
              icon={<Shield size={20} />} 
              title="Official API" 
              desc="Secure and reliable integration that respects privacy and terms of service."
            />
            <FeatureCard 
              icon={<BarChart3 size={20} />} 
              title="Real-time Analytics" 
              desc="Track delivery status, read rates, and engagement in detailed dashboards."
            />
            <FeatureCard 
              icon={<Smartphone size={20} />} 
              title="Multi-Device" 
              desc="Connect multiple WhatsApp numbers and manage them from one panel."
            />
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-10 text-white tracking-tight underline decoration-primary-500/50 decoration-4 underline-offset-8">How it works in 4 easy steps</h2>
              <div className="space-y-6">
                <Step num="01" title="Register Account" desc="Create your account and choose a trial or subscription plan." />
                <Step num="02" title="Connect WhatsApp" desc="Scan the QR code to link your device or use API key for official access." />
                <Step num="03" title="Upload Contacts" desc="Import your leads via CSV or integrate with your existing CRM." />
                <Step num="04" title="Start Campaign" desc="Create personalized messages and hit send to reach thousands instantly." />
              </div>
            </div>
            <div className="relative">
              <div className="high-density-card p-1.5">
                <img 
                  src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop" 
                  alt="Mobile App" 
                  className="rounded-lg shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3 text-white tracking-tight">Simple, Transparent Pricing</h2>
            <p className="text-slate-400 text-sm">Choose the plan that fits your business scale.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <PricingCard 
              title="Starter" 
              price="$29" 
              features={["5,000 Messages/mo", "2 Device Slots", "Basic Analytics", "Email Support"]}
            />
            <PricingCard 
              title="Business" 
              price="$59" 
              featured
              features={["Unlimited Messages", "10 Device Slots", "Advanced Analytics", "Webhook Access", "Priority Support"]}
            />
            <PricingCard 
              title="Enterprise" 
              price="Custom" 
              features={["Unlimited Everything", "White-label API", "Dedicated Manager", "SLA Guarantee", "Custom Integration"]}
            />
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto rounded-2xl bg-primary-600 p-10 text-center text-white relative overflow-hidden shadow-2xl shadow-primary-500/20">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Ready to automate your growth?</h2>
            <p className="text-base text-primary-100 mb-8 max-w-xl mx-auto">Join thousands of companies who upgraded their messaging game with WhatsAPI.</p>
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-700 rounded-lg font-bold text-base hover:scale-105 transition-transform shadow-lg">
              Get Started for Free <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B0F19] border-t border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">WhatsAPI</span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm leading-relaxed">The world's most powerful WhatsApp messaging platform for marketing, automation, and customer relationship management.</p>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-6 uppercase tracking-wider">Product</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><Link to="#features" className="hover:text-primary-400 transition-colors">Features</Link></li>
                <li><Link to="#pricing" className="hover:text-primary-400 transition-colors">Pricing</Link></li>
                <li><Link to="/api-docs" className="hover:text-primary-400 transition-colors">API Docs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-6 uppercase tracking-wider">Company</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><Link to="#" className="hover:text-primary-400 transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800/50 text-center text-slate-500 text-xs">
            © 2026 WhatsAPI Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLinks({ mobile, onClick }: { mobile?: boolean; onClick?: () => void }) {
  const links = [
    { name: 'Features', href: '#features' },
    { name: 'Solution', href: '#' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Resources', href: '#' },
  ];

  return (
    <ul className={cn("flex gap-8", mobile && "flex-col gap-4")}>
      {links.map(link => (
        <li key={link.name}>
          <a 
            href={link.href} 
            onClick={onClick}
            className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="p-6 rounded-xl border border-slate-800 bg-slate-800/30 hover:bg-slate-800/50 hover:border-slate-700 transition-all group"
    >
      <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mb-5 text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2 text-white leading-tight">{title}</h3>
      <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">{desc}</p>
    </motion.div>
  );
}

function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex gap-5 group">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-600/10 text-primary-400 flex items-center justify-center font-bold text-base group-hover:bg-primary-600 group-hover:text-white transition-all">
        {num}
      </div>
      <div>
        <h4 className="text-lg font-bold mb-1 text-white leading-tight">{title}</h4>
        <p className="text-slate-400 text-sm">{desc}</p>
      </div>
    </div>
  );
}

function PricingCard({ title, price, features, featured }: { title: string; price: string; features: string[]; featured?: boolean }) {
  return (
    <div className={cn(
      "p-8 rounded-2xl border transition-all duration-300",
      featured ? "bg-slate-800 border-primary-500 shadow-2xl scale-[1.02]" : "bg-slate-900 border-slate-800 hover:border-slate-700"
    )}>
      <h3 className="text-lg font-bold mb-1.5 text-white">{title}</h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-3xl font-bold text-white tracking-tight">{price}</span>
        {price !== "Custom" && <span className="text-slate-500 text-sm">/mo</span>}
      </div>
      <ul className="space-y-3 mb-8">
        {features.map(f => (
          <li key={f} className="flex items-center gap-2.5">
            <CheckCircle2 className={cn("w-4 h-4", featured ? "text-primary-400" : "text-primary-500")} />
            <span className={cn("text-xs", featured ? "text-slate-200" : "text-slate-400")}>{f}</span>
          </li>
        ))}
      </ul>
      <Link 
        to="/register" 
        className={cn(
          "w-full block py-2.5 text-center rounded-lg text-sm font-bold transition-all",
          featured ? "bg-primary-600 hover:bg-primary-700 text-white" : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
        )}
      >
        Choose {title}
      </Link>
    </div>
  );
}
