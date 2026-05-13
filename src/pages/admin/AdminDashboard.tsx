import React from 'react';
import { 
  Users, 
  DollarSign, 
  Smartphone, 
  Activity, 
  Plus, 
  Search, 
  MoreVertical, 
  Download,
  ShieldCheck,
  TrendingUp,
  Mail,
  UserPlus
} from 'lucide-react';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 85000 },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F172A] text-white selection:bg-primary-500 overflow-x-hidden">
      {/* Admin Navbar */}
      <nav className="h-14 border-b border-slate-800 bg-[#0B0F19]/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
                <div className="bg-primary-600 p-1.5 rounded-lg">
                    <ShieldCheck className="text-white w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-white tracking-tight uppercase">Admin Panel</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-6">
                {['Overview', 'Users', 'Plans', 'Transactions', 'Logs'].map(nav => (
                    <button key={nav} className="text-[11px] font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">{nav}</button>
                ))}
            </div>
        </div>

        <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
                <p className="text-[11px] font-bold text-white">{user?.name}</p>
                <div className="flex items-center justify-end gap-1">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                    <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Online</span>
                </div>
            </div>
            <button 
                onClick={() => { logout(); navigate('/'); }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-rose-600/20 hover:text-rose-400 border border-slate-700/50 rounded-lg text-[11px] font-bold transition-all"
            >
                Exit
            </button>
        </div>
      </nav>

      {/* Admin Content */}
      <main className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-white mb-0.5 tracking-tight">System Analytics</h1>
                <p className="text-slate-400 text-xs tracking-tight">Global performance and revenue tracking.</p>
            </div>
            <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-700 hover:text-white transition-all">
                    <Download size={14} /> Export
                </button>
                <button className="flex items-center gap-1.5 px-3.5 py-2 bg-primary-600 text-white rounded-lg text-xs font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/10">
                    <UserPlus size={14} /> Create User
                </button>
            </div>
        </div>

        {/* Global Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AdminStatCard title="Total Users" value="8,420" sub="+120 this week" icon={<Users className="text-primary-400" />} color="border-primary-500/10" />
            <AdminStatCard title="Revenue (ARR)" value="$1.2M" sub="+24% YoY" icon={<DollarSign className="text-emerald-400" />} color="border-emerald-500/10" />
            <AdminStatCard title="Active Sessions" value="12,504" sub="98.2% healthy" icon={<Smartphone className="text-purple-400" />} color="border-purple-500/10" />
            <AdminStatCard title="System Load" value="4.2%" sub="Operational" icon={<Activity className="text-orange-400" />} color="border-orange-500/10" />
        </div>

        {/* Admin Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
            <div className="high-density-card p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-sm font-bold text-white tracking-tight uppercase">Platform Revenue</h3>
                        <p className="text-[10px] text-slate-500 mt-0.5 tracking-wider font-bold">JANUARY - JUNE 2026</p>
                    </div>
                    <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                        <TrendingUp className="text-emerald-500 w-4 h-4" />
                    </div>
                </div>
                <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" opacity={0.3} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 10, fontWeight: 700}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 10, fontWeight: 700}} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0B0F19', border: '1px solid #1f2937', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff', fontSize: '12px' }}
                            />
                            <Bar dataKey="revenue" fill="#25D366" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="high-density-card p-6">
                <h3 className="text-sm font-bold text-white tracking-tight mb-6 uppercase">System Alerts</h3>
                <div className="space-y-3">
                    <AdminAlert title="Critical Failure" desc="Node-04 WhatsApp instance disconnected." time="10m ago" type="error" />
                    <AdminAlert title="Enterprise Upgrade" desc="Acme Corp just upgraded to Platinum." time="1h ago" type="success" />
                    <AdminAlert title="API Quota Warning" desc="User #9920 has exceeded 90% limit." time="3h ago" type="warning" />
                    <AdminAlert title="Maintenance" desc="System maintenance scheduled 03:00 UTC." time="5h ago" type="info" />
                    <AdminAlert title="Review Pending" desc="12 users pending document review." time="8h ago" type="info" />
                </div>
            </div>
        </div>

        {/* User Management Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
                <h3 className="text-sm font-bold text-white tracking-tight uppercase">Enterprise Accounts</h3>
                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5" />
                    <input type="text" placeholder="Filter entities..." className="bg-slate-900 border border-slate-700/50 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white placeholder:text-slate-600 outline-none w-48 focus:ring-1 focus:ring-primary-500" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-800 bg-slate-900 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                            <th className="px-6 py-3">Entity</th>
                            <th className="px-6 py-3">Service Tier</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Revenue (MTD)</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {['Alpha Group', 'Betatech INC', 'Global Systems', 'Cyberdyne', 'Umbrella Corp'].map((user) => (
                            <tr key={user} className="group hover:bg-slate-800/20 transition-colors">
                                <td className="px-6 py-3.5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-slate-800 rounded-lg border border-slate-700" />
                                        <div>
                                            <p className="text-xs font-bold text-white tracking-tight">{user}</p>
                                            <p className="text-[10px] text-slate-500">contact@{user.toLowerCase().replace(' ', '')}.com</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-3.5">
                                    <span className="text-[10px] font-bold text-primary-400 bg-primary-500/5 border border-primary-500/10 px-2 py-0.5 rounded uppercase tracking-wider">Enterprise</span>
                                </td>
                                <td className="px-6 py-3.5">
                                    <div className="flex items-center gap-1.5 text-emerald-400">
                                        <div className="w-1 h-1 rounded-full bg-emerald-400" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Active</span>
                                    </div>
                                </td>
                                <td className="px-6 py-3.5 text-xs font-mono font-bold text-white">$2,450.00</td>
                                <td className="px-6 py-3.5 text-right">
                                    <button className="p-1.5 text-slate-600 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"><MoreVertical size={14} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </main>
    </div>
  );
}

function AdminStatCard({ title, value, sub, icon, color }: { title: string, value: string, sub: string, icon: React.ReactNode, color: string }) {
  return (
    <div className={cn("high-density-card p-5 border-l-2", color)}>
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                {icon ? React.cloneElement(icon as React.ReactElement, { size: 16 }) : null}
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{title}</span>
        </div>
        <p className="text-2xl font-bold text-white tracking-tight mb-0.5">{value}</p>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{sub}</p>
    </div>
  );
}

function AdminAlert({ title, desc, time, type }: { title: string, desc: string, time: string, type: 'error' | 'success' | 'warning' | 'info' }) {
    return (
        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-800">
            <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bubble animate-pulse", 
                type === 'error' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' : 
                type === 'success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 
                type === 'warning' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 
                'bg-primary-500 shadow-[0_0_8px_rgba(37,211,102,0.5)]'
            )} />
            <div className="flex-1">
                <div className="flex justify-between items-center mb-0.5">
                    <h5 className={cn("text-[10px] font-bold uppercase tracking-widest", 
                        type === 'error' ? 'text-rose-400' : 'text-slate-200'
                    )}>{title}</h5>
                    <span className="text-[9px] text-slate-600 font-bold">{time}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
