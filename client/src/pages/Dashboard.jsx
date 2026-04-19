import React, { useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, ShieldCheck, Database, LayoutDashboard, Globe, Lock, Cpu, Activity, Zap, Server } from 'lucide-react';
import Footer from '../components/Footer';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const cardRef = useRef(null);

  // Premium Mouse Tracking Effect (for the main stats area)
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };
  
  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col relative overflow-hidden selection:bg-blue-500/30">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-grid opacity-[0.03]"></div>
      </div>

      {/* Navbar / Header */}
      <nav className="w-full border-b border-white/5 bg-slate-950/40 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
              <ShieldCheck className="text-white w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-tighter leading-none">IDENTITY HUB</span>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">Enterprise Core v3.0</span>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="hidden lg:flex items-center space-x-6">
               <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Network Speed</span>
                  <span className="text-sm font-mono text-emerald-400">1.2 Gbps</span>
               </div>
               <div className="w-[1px] h-8 bg-white/5"></div>
               <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Server Load</span>
                  <span className="text-sm font-mono text-amber-400">14%</span>
               </div>
            </div>

            <button 
              onClick={logout}
              className="px-5 py-2.5 bg-white/5 hover:bg-rose-500/10 text-slate-300 hover:text-rose-500 border border-white/10 hover:border-rose-500/30 rounded-2xl transition-all duration-500 flex items-center space-x-2 text-sm font-bold backdrop-blur-md group"
            >
              <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12 relative z-10 flex flex-col gap-10">
        
        {/* Welcome Banner */}
        <div className="w-full p-10 rounded-[2.5rem] bg-gradient-to-r from-blue-600/10 via-indigo-600/5 to-transparent border border-white/5 relative overflow-hidden group animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-grid opacity-[0.05] pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-3 text-blue-400 mb-4 px-1">
              <Zap className="w-4 h-4 fill-blue-400" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">Deployment Active</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
              Operational <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Center.</span>
            </h1>
            <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
              Welcome back, <span className="text-white font-black underline underline-offset-8 decoration-blue-500/30">{user?.username || 'Field Agent'}</span>. Your environment is secured using quantum-safe cryptographic protocols.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Real-time Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/40 backdrop-blur-md p-7 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all duration-500 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-blue-500/10 rounded-2xl">
                    <User className="text-blue-500 w-6 h-6" />
                  </div>
                  <div className="text-[10px] font-black text-slate-600 tracking-widest uppercase">Identity</div>
                </div>
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">User Identifier</h3>
                <p className="text-2xl font-black text-white truncate group-hover:text-blue-400 transition-colors">{user?.username}</p>
                <p className="text-slate-500 text-sm mt-1">{user?.email}</p>
              </div>

              <div className="bg-slate-900/40 backdrop-blur-md p-7 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all duration-500 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-indigo-500/10 rounded-2xl">
                    <Database className="text-indigo-500 w-6 h-6" />
                  </div>
                  <div className="text-[10px] font-black text-slate-600 tracking-widest uppercase">Storage</div>
                </div>
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Database Sync</h3>
                <p className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">CONNECTED</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Real-time sync active</span>
                </div>
              </div>

              <div className="bg-slate-900/40 backdrop-blur-md p-7 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all duration-500 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-purple-500/10 rounded-2xl">
                    <Lock className="text-purple-500 w-6 h-6" />
                  </div>
                  <div className="text-[10px] font-black text-slate-600 tracking-widest uppercase">Security</div>
                </div>
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Protocol Status</h3>
                <p className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors">ENCRYPTED</p>
                <p className="text-slate-500 text-xs mt-2 font-mono">HttpOnly v3.4 Enabled</p>
              </div>
            </div>

            {/* Large Activity Section */}
            <div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              className="glass-card-premium p-10 relative group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex items-center space-x-5">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                    <Activity className="text-blue-500 w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Security Analytics</h2>
                    <p className="text-slate-500 text-sm font-medium">Session monitoring and encryption audit</p>
                  </div>
                </div>
                <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-2xl border border-white/5 transition-all">
                  View Full Audit
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                   <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Encryption Strength</span>
                        <span className="text-xs font-mono text-blue-400">AES-256 (ULTRA)</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 w-[94%] shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">API Reliability</span>
                        <span className="text-xs font-mono text-emerald-400">99.98% SUCCESS</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 w-[99.9%] shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
                      </div>
                   </div>
                   
                   <div className="pt-6 grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="text-[10px] font-black text-slate-600 uppercase mb-2">Login Origin</div>
                        <div className="text-white font-bold text-sm">Western Europe</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="text-[10px] font-black text-slate-600 uppercase mb-2">Access Portal</div>
                        <div className="text-white font-bold text-sm">Desktop Chrome</div>
                      </div>
                   </div>
                </div>

                <div className="p-8 bg-slate-900/50 rounded-[2rem] border border-white/5 relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute top-0 right-0 p-4">
                    <Cpu className="text-slate-800 w-24 h-24" />
                  </div>
                  <h4 className="text-white font-black text-lg mb-2 relative z-10">System Integrity</h4>
                  <p className="text-slate-400 text-sm leading-relaxed relative z-10 mb-6">
                    MERN-stack hardened core using HttpOnly persistent sessions. No client-side storage of sensitive tokens.
                  </p>
                  <div className="flex items-center space-x-3 text-emerald-400 relative z-10">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest">Verified by Core-Auth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Secondary Info */}
          <div className="space-y-8 lg:col-span-1">
            
            <div className="bg-slate-900/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/5">
              <h3 className="text-white font-black mb-6 flex items-center gap-3">
                <Server className="w-5 h-5 text-indigo-500" />
                Live Feed
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Login Event', status: 'SUCCESS' },
                  { label: 'XSRF Check', status: 'PASSED' },
                  { label: 'Socket.IO', status: 'IDLE' },
                  { label: 'Asset Load', status: '0.4s' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.05] transition-colors">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">{item.label}</span>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-[2.5rem] text-center shadow-2xl shadow-indigo-600/20 group hover:scale-[1.02] transition-transform duration-500">
              <ShieldCheck className="w-16 h-16 text-white mx-auto mb-6 group-hover:rotate-12 transition-transform" />
              <h4 className="text-white font-black text-xl mb-3">Enterprise Ready</h4>
              <p className="text-white/70 text-xs leading-relaxed font-medium">
                This environment is currently being monitored for unauthorized access attempts.
              </p>
            </div>
          </div>

        </div>
      </main>

      <div className="mt-8 pb-10 opacity-40 hover:opacity-100 transition-opacity">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
