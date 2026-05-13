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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Send,
  Download,
  Filter,
  Calendar,
  Phone
} from 'lucide-react';
import { cn } from '../../lib/utils';

const deliveryData = [
  { name: 'Sent', value: 125000, color: '#25D366' },
  { name: 'Delivered', value: 121000, color: '#10b981' },
  { name: 'Read', value: 98000, color: '#6366f1' },
  { name: 'Failed', value: 4000, color: '#ef4444' },
];

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-0.5 tracking-tight">Messaging Reports</h1>
            <p className="text-slate-400 text-sm">In-depth analysis of your campaign performance.</p>
          </div>
          <div className="flex gap-2">
             <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 border border-slate-700/50 rounded-lg">
                <Calendar size={14} className="text-slate-500" />
                <span className="text-[11px] font-bold text-slate-300">May 1 - May 13, 2026</span>
             </div>
             <button className="px-4 py-1.5 bg-primary-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-primary-500/10">
                <Download size={16} /> Export
             </button>
          </div>
        </div>

        {/* Detailed Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <ReportStatCard label="Total Sent" value="125,000" color="primary" />
            <ReportStatCard label="Delivered" value="96.8%" color="green" />
            <ReportStatCard label="Read Rate" value="78.4%" color="indigo" />
            <ReportStatCard label="Failed" value="3.2%" color="red" />
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1 high-density-card p-6">
                <h3 className="text-sm font-bold text-white tracking-tight mb-6 uppercase">Delivery Breakdown</h3>
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={deliveryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={70}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {deliveryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0B0F19', border: '1px solid #1f2937', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff', fontSize: '10px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-6 space-y-2">
                    {deliveryData.map(item => (
                        <div key={item.name} className="flex justify-between items-center bg-slate-800/30 p-2 rounded-lg border border-slate-800/50">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{item.name}</span>
                            </div>
                            <span className="text-[10px] font-bold text-white">{item.value.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-2 high-density-card overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
                    <h3 className="text-xs font-bold text-white tracking-tight uppercase">Recent Session Logs</h3>
                    <div className="flex gap-2">
                        <button className="p-1.5 text-slate-500 hover:text-white border border-slate-700/50 rounded-lg"><Filter size={14} /></button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[9px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 bg-slate-900">
                                <th className="px-6 py-3">Recipient</th>
                                <th className="px-6 py-3">Campaign</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                                    <td className="px-6 py-2.5 font-bold text-xs text-white tracking-tight">
                                        <div className="flex items-center gap-2">
                                            <Phone size={12} className="text-slate-600" />
                                            <span>+1 555 000 12{i}1</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-tight">Flash Sale Promo</td>
                                    <td className="px-6 py-2.5">
                                        <div className={cn("inline-flex items-center gap-1.5", 
                                            i % 4 === 0 ? "text-rose-400" : "text-emerald-400"
                                        )}>
                                            <div className={cn("w-1 h-1 rounded-full", i % 4 === 0 ? "bg-rose-400" : "bg-emerald-400")} />
                                            <span className="text-[9px] font-bold uppercase tracking-widest">{i % 4 === 0 ? 'Failed' : 'Delivered'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-2.5 text-[10px] text-slate-500 text-right font-medium">2m ago</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ReportStatCard({ label, value, color }: { label: string, value: string, color: 'primary' | 'green' | 'indigo' | 'red' }) {
    const themes = {
        primary: 'text-primary-400 border-primary-500/10 bg-primary-500/5',
        green: 'text-emerald-400 border-emerald-500/10 bg-emerald-500/5',
        indigo: 'text-indigo-400 border-indigo-500/10 bg-indigo-500/5',
        red: 'text-rose-400 border-rose-500/10 bg-rose-500/5',
    };

    return (
        <div className={cn("p-6 rounded-xl border text-center relative overflow-hidden group transition-all hover:bg-opacity-80", themes[color])}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">{label}</p>
            <p className="text-2xl font-bold tracking-tight text-white">{value}</p>
            <div className="absolute -bottom-2 -right-2 opacity-5 scale-150 pointer-events-none">
                <Send size={40} />
            </div>
        </div>
    );
}
