import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Smartphone, 
  Send, 
  BarChart2, 
  Code2, 
  CreditCard, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  Search,
  MessageSquare,
  Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href, active }) => (
  <Link 
    to={href}
    className={cn(
      "flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all group text-sm",
      active 
        ? "bg-primary-600 text-white" 
        : "text-slate-400 hover:text-white hover:bg-slate-800"
    )}
  >
    <span className={cn("transition-transform group-hover:scale-110", active ? "text-white" : "text-slate-500 group-hover:text-white")}>
      {icon}
    </span>
    <span className="font-medium">{label}</span>
  </Link>
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/dashboard' },
    { icon: <Smartphone size={20} />, label: 'WhatsApp', href: '/whatsapp' },
    { icon: <Users size={20} />, label: 'Contacts', href: '/contacts' },
    { icon: <Send size={20} />, label: 'Campaigns', href: '/campaigns' },
    { icon: <BarChart2 size={20} />, label: 'Reports', href: '/reports' },
    { icon: <Code2 size={20} />, label: 'API Docs', href: '/api-docs' },
    { icon: <CreditCard size={20} />, label: 'Billing', href: '/billing' },
    { icon: <Settings size={20} />, label: 'Settings', href: '/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-64 flex-col high-density-sidebar fixed inset-y-0 p-4">
        <div className="flex items-center gap-2.5 mb-8 px-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/20">
            <MessageSquare className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            WhatsAPI
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.href} 
              {...item} 
              active={location.pathname === item.href} 
            />
          ))}
        </nav>

        <div className="mt-auto space-y-3 pt-4 border-t border-slate-800">
          <div className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Current Plan</p>
            <p className="text-sm font-bold text-white">{user?.plan}</p>
            <Link to="/billing" className="text-[11px] text-primary-400 font-medium hover:text-primary-300 mt-1 inline-block">Upgrade Plan</Link>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-14 high-density-header px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="lg:hidden p-2 text-slate-400 hover:text-white" 
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="relative max-w-sm w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5" />
              <input 
                type="text" 
                placeholder="Search campaigns, reports..." 
                className="w-full pl-9 pr-4 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-xs text-white placeholder:text-slate-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg relative transition-colors">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-[#0F172A]" />
            </button>
            <div className="h-6 w-px bg-slate-800 mx-1" />
            <div className="flex items-center gap-2.5">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white leading-none">{user?.name}</p>
                <p className="text-[10px] text-slate-500 capitalize mt-1 leading-none">{user?.role}</p>
              </div>
              <div className="w-8 h-8 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-primary-400 font-bold text-xs">
                {user?.name?.[0].toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside 
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              className="fixed inset-y-0 left-0 w-64 bg-[#0F172A] z-50 p-4 flex flex-col lg:hidden border-r border-slate-800"
            >
              <div className="flex justify-between items-center mb-8 px-2">
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="text-primary-500 w-5 h-5" />
                  <span className="text-lg font-bold text-white tracking-tight">WhatsAPI</span>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 space-y-1">
                {menuItems.map((item) => (
                  <SidebarItem 
                    key={item.href} 
                    {...item} 
                    active={location.pathname === item.href} 
                  />
                ))}
              </nav>
              <div className="mt-auto pt-4 border-t border-slate-800">
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
