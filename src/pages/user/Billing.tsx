import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  CreditCard, 
  CheckCircle2, 
  ArrowUpRight, 
  Clock, 
  Download, 
  Zap,
  ShieldCheck,
  Star
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export default function Billing() {
  const currentPlan = "Business";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-0.5 tracking-tight">Subscription & Billing</h1>
          <p className="text-slate-400 text-sm">Manage your plan, invoices, and payment methods.</p>
        </div>

        {/* Current Plan Overview */}
        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 high-density-card p-8 bg-gradient-to-br from-primary-600 to-primary-700 text-white relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Star className="text-amber-400 fill-amber-400" size={16} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-100">PRO MEMBERSHIP</span>
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight mb-1">{currentPlan} Tier</h2>
                        <p className="text-primary-100/70 text-xs font-medium">Next payment June 12, 2026 • $59.00</p>
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        <button className="px-6 py-2.5 bg-white text-primary-700 rounded-lg text-xs font-bold hover:bg-primary-50 transition-all flex items-center justify-center gap-1.5 shadow-xl shadow-primary-900/20">
                            Upgrade Plan <Zap size={14} />
                        </button>
                        <button className="px-6 py-2.5 bg-primary-800/40 text-white border border-white/10 rounded-lg text-xs font-bold hover:bg-primary-800/60 transition-all">
                            Cancel
                        </button>
                    </div>
                </div>
                
                <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
                    <PlanStat label="Throughput" value="Unlimited" />
                    <PlanStat label="Phone Nodes" value="12 / 20" />
                    <PlanStat label="Runtime" value="99.9%" />
                    <PlanStat label="Support" value="Priority" />
                </div>

                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            </div>

            <div className="high-density-card p-8 flex flex-col justify-between">
                <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight mb-5">Primary Payment</h3>
                    <div className="p-4 bg-slate-900 border border-slate-700/50 rounded-xl flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center text-primary-400">
                            <CreditCard size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white tracking-tight">Visa •••• 4242</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Expires 12/28</p>
                        </div>
                    </div>
                </div>
                <button className="w-full py-3 text-primary-400 hover:text-primary-300 text-xs font-bold flex items-center justify-center gap-2 border-t border-slate-800/50 mt-6">
                    Manage with Razorpay <ArrowUpRight size={14} />
                </button>
            </div>
        </div>

        {/* Invoices */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
                <h3 className="text-sm font-bold text-white tracking-tight uppercase">History</h3>
                <button className="p-1.5 text-slate-500 hover:text-white border border-slate-700/50 rounded-lg"><Clock size={16} /></button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-800 bg-slate-900/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/30">
                        {['#INV-9902', '#INV-9854', '#INV-9721'].map((inv, idx) => (
                            <tr key={inv} className="hover:bg-slate-800/20 transition-colors">
                                <td className="px-6 py-3.5 font-bold font-mono text-[11px] text-white tracking-tight">{inv}</td>
                                <td className="px-6 py-3.5 text-xs text-slate-400">May {12 - idx}, 2026</td>
                                <td className="px-6 py-3.5 font-bold text-sm text-white">$59.00</td>
                                <td className="px-6 py-3.5">
                                    <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-md w-fit">
                                        <CheckCircle2 size={12} />
                                        <span className="text-[9px] font-bold uppercase tracking-wider">Paid</span>
                                    </div>
                                </td>
                                <td className="px-6 py-3.5 text-right">
                                    <button className="p-1.5 text-slate-500 hover:text-white transition-colors"><Download size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function PlanStat({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <p className="text-[10px] font-bold text-primary-100 uppercase tracking-widest mb-0.5">{label}</p>
            <p className="text-xl font-bold text-white tracking-tight">{value}</p>
        </div>
    );
}
