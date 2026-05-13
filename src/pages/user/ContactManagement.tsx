import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  Users, 
  Plus, 
  Upload, 
  Search, 
  MoreVertical, 
  Filter, 
  Download,
  CheckCircle2,
  Phone,
  Tag,
  Mail,
  UserPlus,
  FileSpreadsheet
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { toast } from 'react-hot-toast';

interface Contact {
  id: string;
  name: string;
  phone: string;
  group: string;
  status: 'active' | 'unsubscribed';
}

const initialContacts: Contact[] = [
  { id: '1', name: 'John Miller', phone: '+1 555 123 4567', group: 'Premium', status: 'active' },
  { id: '2', name: 'Sarah Wilson', phone: '+1 555 987 6543', group: 'Leads', status: 'active' },
  { id: '3', name: 'Alex Brown', phone: '+44 7700 900123', group: 'Newsletter', status: 'unsubscribed' },
];

export default function ContactManagement() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-0.5 tracking-tight">Contact Manager</h1>
            <p className="text-slate-400 text-sm tracking-tight">Manage your audience segments and leads.</p>
          </div>
          <div className="flex gap-2">
             <button className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-slate-700 hover:text-white transition-all">
                <FileSpreadsheet size={16} /> Import CSV
             </button>
             <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-xs font-bold shadow-lg shadow-primary-500/10 flex items-center gap-1.5 hover:bg-primary-700 transition-all">
                <UserPlus size={16} /> Add Contact
             </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SummaryCard label="Total Contacts" value="12,450" />
            <SummaryCard label="New Today" value="+42" />
            <SummaryCard label="Segments" value="8" />
            <SummaryCard label="Opt-outs" value="1.2%" />
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between gap-3 bg-slate-800/20 p-4 rounded-xl border border-slate-800/50">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5" />
                <input type="text" placeholder="Search by name, phone, or group..." className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder:text-slate-600 focus:ring-1 focus:ring-primary-500 outline-none" />
            </div>
            <div className="flex gap-2">
                <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 hover:text-white"><Filter size={14} /> Filters</button>
                <button className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white"><Download size={14} /></button>
            </div>
        </div>

        {/* Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-800/50 border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Phone Number</th>
                            <th className="px-6 py-4">Group</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {contacts.map((contact) => (
                            <tr key={contact.id} className="hover:bg-slate-800/30 transition-colors group">
                                <td className="px-6 py-3.5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400">{contact.name[0]}</div>
                                        <span className="font-bold text-sm text-white tracking-tight">{contact.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-3.5 text-xs font-mono text-slate-400">{contact.phone}</td>
                                <td className="px-6 py-3.5">
                                    <span className="px-2 py-0.5 bg-primary-500/10 border border-primary-500/20 text-primary-400 rounded-md text-[9px] font-bold uppercase tracking-wider">{contact.group}</span>
                                </td>
                                <td className="px-6 py-3.5">
                                    <div className={cn("inline-flex items-center gap-1.5", contact.status === 'active' ? "text-emerald-400" : "text-rose-400")}>
                                        <div className={cn("w-1 h-1 rounded-full", contact.status === 'active' ? "bg-emerald-400" : "bg-rose-400")} />
                                        <span className="text-[9px] font-bold uppercase tracking-widest">{contact.status}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-3.5 text-right">
                                    <button className="p-1.5 text-slate-600 hover:text-white hover:bg-slate-800 rounded-lg opacity-0 group-hover:opacity-100 transition-all"><MoreVertical size={14} /></button>
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

function SummaryCard({ label, value }: { label: string, value: string }) {
    return (
        <div className="high-density-card p-4 text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">{label}</p>
            <p className="text-xl font-bold text-white tracking-tight">{value}</p>
        </div>
    );
}
