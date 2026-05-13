import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  Code2, 
  Copy, 
  Terminal, 
  ChevronRight, 
  Zap,
  Globe,
  Lock,
  ArrowRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ApiDocs() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-12">
        <div>
          <h1 className="text-2xl font-bold text-white mb-0.5 tracking-tight">API Documentation</h1>
          <p className="text-slate-400 text-sm">Everything you need to automate your WhatsApp messaging.</p>
        </div>

        {/* API Key Section */}
        <section className="high-density-card p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-primary-500/10 text-primary-400 rounded-lg flex items-center justify-center border border-primary-500/20">
                    <Lock size={16} />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-tight">Your API Credentials</h3>
            </div>
            <div className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Secret API Key</label>
                    <div className="flex gap-2">
                        <input 
                            type="password" 
                            readOnly 
                            value="wa_live_772j_99182hksh812_sk1" 
                            className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-700/50 rounded-lg text-xs font-mono text-white outline-none focus:ring-1 focus:ring-primary-500"
                        />
                        <button 
                            onClick={() => copyToClipboard('wa_live_772j_99182hksh812_sk1')}
                            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors text-primary-400"
                        >
                            <Copy size={16} />
                        </button>
                    </div>
                </div>
                <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg flex gap-3 italic">
                    <Zap size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-amber-500/80 leading-relaxed uppercase tracking-tight">Never share your API key. It grants full access to your WhatsApp sessions. Use Webhooks for event listeners.</p>
                </div>
            </div>
        </section>

        {/* Example Endpoint */}
        <section className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-800 text-slate-400 border border-slate-700 rounded-lg flex items-center justify-center">
                    <Globe size={16} />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-tight">Endpoints</h3>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded">POST</span>
                    <span className="text-slate-400 font-mono">/api/v1/messages/send</span>
                </div>
                
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-xs font-mono overflow-x-auto text-primary-300 shadow-xl">
                    <div className="flex justify-between items-center mb-6 text-slate-600 uppercase text-[9px] tracking-widest border-b border-slate-800 pb-4">
                        <span>Node.js / Axios Example</span>
                        <button onClick={() => copyToClipboard('axios.post(...)')} className="hover:text-white transition-colors flex items-center gap-1 font-bold">
                            <Copy size={12} /> COPY CODE
                        </button>
                    </div>
                    <pre>{`const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://api.whatsapi.com/v1/messages/send',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': 'YOUR_API_KEY'
  },
  data: {
    deviceId: '99201',
    to: '15551234567',
    message: 'Hello from WhatsAPI SDK! 👋',
    mediaUrl: 'https://example.com/promo.jpg'
  }
};

axios.request(options).then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.error(error);
});`}</pre>
                </div>
            </div>
        </section>

        {/* Webhooks Info */}
        <section className="high-density-card p-8 bg-gradient-to-br from-slate-900 to-primary-500/5 relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-lg font-bold text-white italic mb-2 tracking-tight">Real-time Webhooks</h3>
                <p className="text-slate-400 text-xs mb-6 max-w-md">Get instant notifications when a message is delivered, read, or when a session disconnects.</p>
                <div className="space-y-1.5 mb-6">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Your Webhook URL</label>
                    <input 
                        type="text" 
                        placeholder="https://your-crm.com/api/webhooks/whatsapp" 
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/50 rounded-lg text-sm text-white outline-none focus:ring-1 focus:ring-primary-500"
                    />
                </div>
                <button className="px-6 py-2 bg-primary-600 text-white rounded-lg text-xs font-bold shadow-lg shadow-primary-500/10 hover:bg-primary-700 transition-all flex items-center gap-2">
                    Update Webhook <ArrowRight size={16} />
                </button>
            </div>
            <Terminal className="absolute -bottom-6 -right-6 w-32 h-32 text-primary-500/5" />
        </section>
      </div>
    </DashboardLayout>
  );
}
