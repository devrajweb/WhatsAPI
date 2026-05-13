import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Plus, 
  RotateCcw, 
  Settings, 
  Power, 
  CheckCircle2, 
  AlertCircle,
  QrCode,
  Loader2,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { toast } from 'react-hot-toast';

interface Device {
  id: string;
  name: string;
  number: string;
  status: 'online' | 'offline' | 'linking';
  lastSeen: string;
}

const initialDevices: Device[] = [
  { id: '1', name: 'Sales Main', number: '+1 (555) 000-1234', status: 'online', lastSeen: 'Just now' },
  { id: '2', name: 'Support Bot', number: '+1 (555) 000-5678', status: 'offline', lastSeen: '2h ago' },
];

export default function WhatsAppManagement() {
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [showQR, setShowQR] = useState(false);
  const [linkingStep, setLinkingStep] = useState(0);

  const startLinking = () => {
    setShowQR(true);
    setLinkingStep(1); // Show QR
    setTimeout(() => setLinkingStep(2), 3000); // Simulate scan
    setTimeout(() => {
        const newDevice: Device = {
            id: Date.now().toString(),
            name: 'New Business Phone',
            number: '+44 7700 900000',
            status: 'online',
            lastSeen: 'Just now'
        };
        setDevices([...devices, newDevice]);
        setShowQR(false);
        setLinkingStep(0);
        toast.success('Device linked successfully!');
    }, 6000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white mb-0.5 tracking-tight">WhatsApp Sessions</h1>
            <p className="text-slate-400 text-sm">Manage your connected devices and API sessions.</p>
          </div>
          <button 
            onClick={startLinking}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-bold flex items-center gap-1.5 shadow-lg shadow-primary-500/10 hover:bg-primary-700 transition-all"
          >
            <Plus size={18} /> Add New Device
          </button>
        </div>

        {/* QR Linking Modal */}
        <AnimatePresence>
          {showQR && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setShowQR(false)}
              />
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-slate-900 w-full max-w-md rounded-2xl p-8 border border-slate-800 shadow-2xl"
              >
                <div className="text-center">
                  <h2 className="text-xl font-bold text-white mb-1.5 tracking-tight">Link your WhatsApp</h2>
                  <p className="text-slate-400 text-xs mb-8">Scan the QR code below using your phone's WhatsApp</p>
                  
                  <div className="relative mx-auto w-48 h-48 bg-white p-3 rounded-xl shadow-lg border border-slate-700">
                    {linkingStep === 1 ? (
                      <QrCode size={168} className="text-slate-900" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full gap-3 text-primary-500">
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <p className="font-bold text-xs uppercase tracking-wider">Pairing device...</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 space-y-3.5 text-left bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-[10px] font-bold">1</div>
                      <p className="text-xs text-slate-300">Open WhatsApp on your phone</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-[10px] font-bold">2</div>
                      <p className="text-xs text-slate-300">Select <span className="font-bold text-white">Linked Devices</span> from menu</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-[10px] font-bold">3</div>
                      <p className="text-xs text-slate-300">Point your phone to this screen</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowQR(false)}
                    className="mt-6 w-full py-2.5 text-xs font-bold text-slate-500 hover:text-white transition-colors border-t border-slate-800"
                  >
                    Cancel Connection
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Devices List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}

          {/* Empty Placeholder */}
          <button 
            onClick={startLinking}
            className="flex flex-col items-center justify-center gap-3 p-6 border border-dashed border-slate-700 rounded-xl hover:bg-slate-800/20 hover:border-primary-500/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-primary-600/10 transition-colors">
              <Plus className="text-slate-500 group-hover:text-primary-500" size={20} />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-white tracking-tight">Add Device</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Connect another number</p>
            </div>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

function DeviceCard({ device }: { device: Device; key?: string }) {
  const isOnline = device.status === 'online';

  return (
    <div className="high-density-card p-5 relative group overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center border",
          isOnline ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-slate-800 border-slate-700 text-slate-500"
        )}>
          <Smartphone size={18} />
        </div>
        <div className="flex gap-1">
            <button className="p-1.5 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"><RotateCcw size={14} /></button>
            <button className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"><Trash2 size={14} /></button>
        </div>
      </div>

      <h3 className="text-base font-bold text-white tracking-tight mb-0.5">{device.name}</h3>
      <p className="text-slate-400 text-xs mb-5 font-mono">{device.number}</p>

      <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className={cn("w-1.5 h-1.5 rounded-full", isOnline ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-600")} />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">{device.status}</span>
        </div>
        <span className="text-[10px] text-slate-500">Last: {device.lastSeen}</span>
      </div>

      <Link 
        to={`/whatsapp/${device.id}`} 
        className="absolute bottom-3 right-3 p-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg shadow-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all"
      >
        <Settings size={16} />
      </Link>
    </div>
  );
}
