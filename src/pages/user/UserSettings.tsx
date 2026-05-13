import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  User, 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  Smartphone,
  CheckCircle2,
  Lock,
  Mail,
  Globe,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';
import { toast } from 'react-hot-toast';

export default function UserSettings() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-0.5 tracking-tight uppercase">Account Settings</h1>
          <p className="text-slate-400 text-sm">Configure your personal preferences and security.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            {/* Sidebar Settings Nav */}
            <div className="space-y-1">
                <SettingsNav active icon={<User size={16} />} label="Profile Info" />
                <SettingsNav icon={<Shield size={16} />} label="Security" />
                <SettingsNav icon={<Bell size={16} />} label="Notifications" />
                <SettingsNav icon={<Globe size={16} />} label="Webhooks" />
                <SettingsNav icon={<Smartphone size={16} />} label="Devices" />
            </div>

            {/* Profile Form */}
            <div className="md:col-span-2 space-y-6">
                <section className="high-density-card p-8">
                    <div className="flex items-center gap-5 mb-8">
                        <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-primary-900/20">
                            {user?.name?.[0].toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white tracking-tight">{user?.name}</h3>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Active since May 2026</p>
                        </div>
                    </div>

                    <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); toast.success('Profile updated!'); }}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input label="Full Name" value={user?.name || ''} icon={<User size={14} />} />
                            <Input label="Email Address" value={user?.email || ''} icon={<Mail size={14} />} />
                        </div>
                        <Input label="Organization" value="TechFlow Inc." icon={<Globe size={14} />} />
                        
                        <div className="pt-6 border-t border-slate-800 flex justify-end">
                            <button className="px-6 py-2.5 bg-primary-600 text-white rounded-lg text-xs font-bold shadow-lg shadow-primary-500/10 hover:bg-primary-700 transition-all flex items-center gap-2">
                                Save Changes <CheckCircle2 size={16} />
                            </button>
                        </div>
                    </form>
                </section>

                <section className="high-density-card p-8 border-rose-500/10">
                    <h3 className="text-sm font-bold text-rose-500 uppercase tracking-tight mb-2">Danger Zone</h3>
                    <p className="text-slate-400 text-[11px] mb-6">Once you delete your account, there is no going back. Please be certain.</p>
                    <button className="flex items-center gap-2 text-rose-500 font-bold hover:bg-rose-500/5 px-4 py-2 rounded-lg transition-colors text-xs border border-rose-500/20">
                        <Trash2 size={16} /> Delete My Account
                    </button>
                </section>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SettingsNav({ active, icon, label }: { active?: boolean, icon: React.ReactNode, label: string }) {
    return (
        <button className={cn(
            "w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-tight transition-all",
            active ? "bg-primary-600 text-white shadow-lg shadow-primary-900/20" : "text-slate-500 hover:text-white hover:bg-slate-800"
        )}>
            {icon}
            {label}
            {active && <ArrowRight className="ml-auto" size={12} />}
        </button>
    );
}

function Input({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 px-1">
                {icon} {label}
            </label>
            <input 
                type="text" 
                defaultValue={value}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700/50 rounded-lg text-xs text-white outline-none focus:ring-1 focus:ring-primary-500 transition-all"
            />
        </div>
    );
}
