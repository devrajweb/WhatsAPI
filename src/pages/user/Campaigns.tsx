import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  Plus, 
  Send, 
  History, 
  Calendar, 
  MoreVertical, 
  Filter, 
  Search,
  MessageSquare,
  FileText,
  Clock,
  Play,
  Pause,
  ArrowRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';
import { toast } from 'react-hot-toast';

interface Campaign {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'paused' | 'scheduled';
  recipients: number;
  sent: number;
  type: string;
  createdAt: string;
}

const mockCampaigns: Campaign[] = [
  { id: '1', name: 'Black Friday VIP', status: 'completed', recipients: 12500, sent: 12500, type: 'Marketing', createdAt: '2026-05-10' },
  { id: '2', name: 'Product Update Announce', status: 'running', recipients: 5000, sent: 420, type: 'Transact', createdAt: '2026-05-13' },
  { id: '3', name: 'Weekly Newsletter', status: 'paused', recipients: 8200, sent: 3000, type: 'Newsletter', createdAt: '2026-05-12' },
  { id: '4', name: 'Summer Retreat 2026', status: 'scheduled', recipients: 150, sent: 0, type: 'Event', createdAt: '2026-05-14' },
];

export default function Campaigns() {
  const [activeTab, setActiveTab] = useState<'all' | 'running' | 'scheduled'>('all');
  const [showCreate, setShowCreate] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-0.5 tracking-tight">Campaigns</h1>
            <p className="text-slate-400 text-sm">Create and monitor your messaging outreach.</p>
          </div>
          <button 
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg font-bold text-sm flex items-center gap-1.5 shadow-lg shadow-primary-500/10 hover:bg-primary-700 transition-all"
          >
            <Plus size={18} /> Create Campaign
          </button>
        </div>

        {/* Tabs & Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 py-1">
            <div className="flex gap-1.5 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50 w-fit">
                {['all', 'running', 'scheduled'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all",
                            activeTab === tab ? "bg-primary-600 text-white shadow-lg" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                    <input 
                        type="text" 
                        placeholder="Search campaigns..." 
                        className="pl-9 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-xs text-white placeholder:text-slate-500 focus:ring-1 focus:ring-primary-500 outline-none w-48"
                    />
                </div>
                <button className="p-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
                    <Filter size={16} />
                </button>
            </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid lg:grid-cols-2 gap-4">
            {mockCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
        </div>

        {/* Create Campaign Drawer Simulation */}
        {showCreate && (
            <div className="fixed inset-0 z-50 flex justify-end">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={() => setShowCreate(false)}
                />
                <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    className="relative w-full max-w-md bg-slate-900 h-full shadow-2xl p-8 border-l border-slate-800 overflow-y-auto"
                >
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight">New Campaign</h2>
                            <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-0.5">Setup outreach session</p>
                        </div>
                        <button onClick={() => setShowCreate(false)} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors">
                            <Plus size={20} className="rotate-45" />
                        </button>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); toast.success('Campaign setup complete!'); setShowCreate(false); }}>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">Campaign Name</label>
                            <input type="text" placeholder="e.g. Summer Sale Batch 1" className="w-full px-3.5 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-white placeholder:text-slate-600 focus:ring-1 focus:ring-primary-500 outline-none transition-all" required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">Device</label>
                                <select className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-white outline-none focus:ring-1 focus:ring-primary-500">
                                    <option>Sales Main</option>
                                    <option>Support Bot</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">Contact Group</label>
                                <select className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-white outline-none focus:ring-1 focus:ring-primary-500">
                                    <option>B2B Leads (450)</option>
                                    <option>Premium Customers (1,200)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                             <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Message Template</label>
                                <p className="text-[10px] text-slate-600 font-bold">140/1000</p>
                             </div>
                             <textarea 
                                rows={5} 
                                placeholder="Write your message here... Use {{name}} for personalization." 
                                className="w-full px-3.5 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-white placeholder:text-slate-600 focus:ring-1 focus:ring-primary-500 outline-none resize-none transition-all leading-relaxed"
                                required
                             />
                        </div>

                        <div className="p-4 bg-primary-500/5 rounded-xl border border-primary-500/10 flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-primary-400 border border-slate-700 shadow-sm">
                                <Calendar size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-white text-xs">Schedule for later?</p>
                                <p className="text-[10px] text-slate-500">Set a specific time to reach your audience.</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-primary-600 focus:ring-primary-500" />
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button type="button" className="flex-1 py-2.5 text-slate-500 hover:text-white hover:bg-slate-800 text-xs font-bold rounded-lg transition-colors">Draft</button>
                            <button type="submit" className="flex-[2] py-2.5 bg-primary-600 text-white rounded-lg font-bold text-xs shadow-lg shadow-primary-500/10 hover:bg-primary-700 transition-all flex items-center justify-center gap-1.5">
                                Start Campaign <ArrowRight size={16} />
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function CampaignCard({ campaign }: { campaign: Campaign; key?: string }) {
  const isRunning = campaign.status === 'running';
  const progress = (campaign.sent / campaign.recipients) * 100;

  return (
    <div className="high-density-card p-5 relative group">
        <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
                <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center border",
                    campaign.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                    campaign.status === 'running' ? 'bg-primary-500/10 border-primary-500/20 text-primary-400' :
                    campaign.status === 'paused' ? 'bg-slate-800 border-slate-700 text-slate-500' : 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                )}>
                    {campaign.status === 'completed' ? <History size={20} /> : <Send size={20} />}
                </div>
                <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">{campaign.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{campaign.type}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                        <span className="text-[10px] text-slate-500">{campaign.createdAt}</span>
                    </div>
                </div>
            </div>
            <button className="p-1.5 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"><MoreVertical size={16} /></button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3 bg-slate-800/30 rounded-xl border border-slate-800/50">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Recipients</p>
                <p className="text-lg font-bold text-white tracking-tight">{campaign.recipients.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-slate-800/30 rounded-xl border border-slate-800/50">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Sent</p>
                <p className="text-lg font-bold text-white tracking-tight">{campaign.sent.toLocaleString()}</p>
            </div>
        </div>

        <div className="space-y-2.5">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <span className={cn(
                    isRunning ? "text-primary-400" : "text-slate-500"
                )}>{campaign.status}</span>
                <span className="text-slate-300">{progress.toFixed(1)}%</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className={cn(
                        "h-full rounded-full transition-all duration-500",
                        campaign.status === 'completed' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" :
                        campaign.status === 'running' ? "bg-primary-500 shadow-[0_0_8px_rgba(37,211,102,0.3)]" :
                        campaign.status === 'paused' ? "bg-slate-600" : "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.3)]"
                    )}
                />
            </div>
        </div>

        <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-800/50">
            <div className="flex -space-x-1.5">
                {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-lg border-2 border-slate-900 bg-slate-800 text-[10px] flex items-center justify-center font-bold text-slate-500">
                        {i}
                    </div>
                ))}
            </div>
            <div className="flex gap-1.5">
                {isRunning ? (
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] font-bold transition-colors">
                        <Pause size={12} /> Pause
                    </button>
                ) : campaign.status === 'paused' ? (
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-primary-500/10 hover:bg-primary-500/20 text-primary-400 rounded-lg text-[10px] font-bold transition-colors">
                        <Play size={12} /> Resume
                    </button>
                ) : null}
                <button className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[10px] font-bold transition-colors">
                    Details
                </button>
            </div>
        </div>
    </div>
  );
}
