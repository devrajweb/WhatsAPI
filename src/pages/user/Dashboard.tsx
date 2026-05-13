import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Send, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  ArrowUpRight,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { formatNumber, cn } from '../../lib/utils';
import { motion } from 'motion/react';

const data = [
  { name: 'Mon', sent: 4000, delivered: 3800 },
  { name: 'Tue', sent: 3000, delivered: 2900 },
  { name: 'Wed', sent: 2000, delivered: 1950 },
  { name: 'Thu', sent: 2780, delivered: 2600 },
  { name: 'Fri', sent: 1890, delivered: 1800 },
  { name: 'Sat', sent: 2390, delivered: 2300 },
  { name: 'Sun', sent: 3490, delivered: 3300 },
];

export default function UserDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-0.5 tracking-tight">Dashboard Overview</h1>
            <p className="text-slate-400 text-sm">Track your messaging performance and active campaigns.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors">Export Report</button>
            <button className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-xs font-bold shadow-lg shadow-primary-500/10 hover:bg-primary-700 transition-all flex items-center gap-1.5">
              <Send size={14} /> New Campaign
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Sent" 
            value={formatNumber(124500)} 
            icon={<Send size={18} className="text-primary-400" />} 
            trend="+12% from last week" 
            color="bg-primary-500/10"
          />
          <StatCard 
            title="Delivered" 
            value={formatNumber(121000)} 
            icon={<CheckCircle size={18} className="text-emerald-400" />} 
            trend="97.2% success rate" 
            color="bg-emerald-500/10"
          />
          <StatCard 
            title="Active Sessions" 
            value="12" 
            icon={<MessageSquare size={18} className="text-purple-400" />} 
            trend="4 devices offline" 
            color="bg-purple-500/10"
          />
          <StatCard 
            title="Avg. Response" 
            value="2.4m" 
            icon={<Clock size={18} className="text-orange-400" />} 
            trend="-30s this month" 
            color="bg-orange-500/10"
          />
        </div>

        {/* Charts & Table Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2 high-density-card p-5">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Message Volume</h3>
                <p className="text-slate-500 text-xs mt-0.5">Last 7 days delivery overview</p>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full text-[10px] font-bold">
                <TrendingUp size={12} /> +8.4%
              </div>
            </div>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#25D366" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#25D366" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.3)' }}
                    itemStyle={{ color: '#f8fafc', fontSize: '11px' }}
                    labelStyle={{ color: '#94a3b8', fontSize: '11px', marginBottom: '4px' }}
                  />
                  <Area type="monotone" dataKey="sent" stroke="#25D366" strokeWidth={2} fillOpacity={1} fill="url(#colorSent)" />
                  <Area type="monotone" dataKey="delivered" stroke="#10b981" strokeWidth={2} fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Sidebar */}
          <div className="high-density-card p-5">
            <h3 className="text-lg font-bold text-white tracking-tight mb-5 italic">Recent Campaigns</h3>
            <div className="space-y-5">
              <ActivityItem 
                title="Spring Flash Sale" 
                status="Finished" 
                count="12,500" 
                time="2h ago" 
                type="success"
              />
              <ActivityItem 
                title="Customer Onboarding" 
                status="Running" 
                count="420" 
                time="Live" 
                type="running"
              />
              <ActivityItem 
                title="Security Alert Batch" 
                status="Scheduled" 
                count="5,000" 
                time="Tomorrow" 
                type="pending"
              />
              <ActivityItem 
                title="Old Leads Re-engagement" 
                status="Paused" 
                count="8,200" 
                time="1d ago" 
                type="paused"
              />
            </div>
            <button className="w-full mt-6 py-2.5 text-xs font-bold text-slate-500 hover:text-primary-400 flex items-center justify-center gap-1 transition-colors border-t border-slate-700/50">
              View all activities <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, icon, trend, color }: { title: string, value: string, icon: React.ReactNode, trend: string, color: string }) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="high-density-card p-4 relative overflow-hidden group"
    >
      <div className={cn("inline-flex p-2 rounded-lg mb-3 transition-colors", color)}>
        {icon}
      </div>
      <h4 className="text-slate-400 text-xs font-medium mb-0.5">{title}</h4>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold text-white tracking-tight">{value}</span>
      </div>
      <p className="text-[10px] text-slate-500 mt-2 font-medium">{trend}</p>
      <ArrowUpRight className="absolute top-4 right-4 text-slate-700 group-hover:text-primary-400 transition-colors" size={16} />
    </motion.div>
  );
}

function ActivityItem({ title, status, count, time, type }: { title: string, status: string, count: string, time: string, type: 'success' | 'running' | 'pending' | 'paused' }) {
  const statusColors = {
    success: 'bg-emerald-500/10 text-emerald-400',
    running: 'bg-primary-500/10 text-primary-400',
    pending: 'bg-orange-500/10 text-orange-400',
    paused: 'bg-slate-700 text-slate-300',
  };

  return (
    <div className="flex items-start gap-3">
      <div className={cn("w-1 h-8 rounded-full mt-1 shrink-0", 
        type === 'success' ? 'bg-emerald-500' : 
        type === 'running' ? 'bg-primary-500' : 
        type === 'pending' ? 'bg-orange-500' : 'bg-slate-600'
      )} />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-0.5">
          <h5 className="font-bold text-xs text-white truncate pr-2">{title}</h5>
          <span className="text-[9px] text-slate-500 font-bold shrink-0">{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider", statusColors[type])}>
            {status}
          </span>
          <span className="text-[9px] text-slate-500 font-bold truncate">{count} recipients</span>
        </div>
      </div>
    </div>
  );
}
