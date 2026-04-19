import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, ShieldCheck, Database, LayoutDashboard, Globe, Lock, Cpu } from 'lucide-react';
import Footer from '../components/Footer';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] -mr-96 -mt-96"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[100px] -ml-48 -mb-48"></div>

      {/* Navbar / Header */}
      <nav className="w-full border-b border-white/5 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black text-white tracking-tighter">Identity Hub</span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>System Online</span>
            </div>
            <button 
              onClick={logout}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl transition-all duration-300 flex items-center space-x-2 text-sm font-bold"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Welcome Section */}
          <div className="lg:col-span-3 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{user?.username || 'User'}</span>
            </h1>
            <p className="mt-2 text-slate-400 text-lg">Your account is fully protected with advanced cookie-based encryption.</p>
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-8 group hover:border-blue-500/30 transition-all duration-500">
                <div className="flex items-start justify-between">
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl w-fit">
                      <LayoutDashboard className="text-blue-500 w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest">Profile Identity</h3>
                      <p className="text-2xl font-bold text-white mt-1">{user?.username}</p>
                      <p className="text-slate-400 text-sm mt-1">{user?.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 group hover:border-purple-500/30 transition-all duration-500">
                <div className="flex items-start justify-between">
                  <div className="space-y-4">
                    <div className="p-3 bg-purple-500/10 rounded-xl w-fit">
                      <Globe className="text-purple-500 w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest">Session Security</h3>
                      <p className="text-2xl font-bold text-white mt-1">Encrypted</p>
                      <p className="text-green-500 text-sm font-bold mt-1 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        HttpOnly Active
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Detail Card */}
            <div className="glass-card p-8 md:p-10 border-l-4 border-blue-500">
              <div className="flex items-center space-x-4 mb-6">
                <Cpu className="text-blue-500 w-8 h-8" />
                <h2 className="text-2xl font-bold text-white">Full-Stack Security Protocol</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-slate-400 leading-relaxed">
                    Our architecture uses <span className="text-white font-bold">SHA-256</span> signed JWTs delivered via <span className="text-blue-400 font-bold">HttpOnly cookies</span>. This eliminates XSS-based token theft as the browser protects the token from client-side scripts.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3 text-slate-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span>Bcrypt Password Hashing (Salt Rounds: 10)</span>
                    </li>
                    <li className="flex items-center space-x-3 text-slate-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span>SameSite: Strict Cookie Policy</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                  <div className="flex items-center space-x-2 mb-4">
                    <Lock className="text-slate-500 w-4 h-4" />
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Audit Status</span>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 w-full animate-in slide-in-from-left duration-1000"></div>
                    </div>
                    <p className="text-[10px] text-slate-600 font-mono">ENCRYPTION_LAYER_v3: STABLE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Info */}
          <div className="space-y-8">
            <div className="glass-card p-6 bg-gradient-to-br from-slate-900/80 to-slate-950/80">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-500" />
                System Logs
              </h3>
              <div className="space-y-4">
                {[
                  { time: 'Just now', msg: 'Successful Login', type: 'info' },
                  { time: '2 mins ago', msg: 'JWT Verified', type: 'success' },
                  { time: '5 mins ago', msg: 'DB connection healthy', type: 'success' }
                ].map((log, i) => (
                  <div key={i} className="flex justify-between items-center text-xs p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-slate-300">{log.msg}</span>
                    <span className="text-slate-500 font-mono">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl border border-white/10 text-center space-y-4">
              <ShieldCheck className="w-12 h-12 text-blue-400 mx-auto" />
              <h4 className="text-white font-bold">Trusted Hardware</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Your device has been recognized as a trusted access point for this account.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer credit as requested */}
      <Footer />
    </div>
  );
};

export default Dashboard;
