import { useAuth } from '../context/AuthContext';
import { LogOut, User, ShieldCheck, ShieldAlert, Key, Clock, Database } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  
  return (
    <div className="min-h-screen w-full bg-slate-950 bg-grid relative overflow-hidden p-6 md:p-12">
      {/* Background Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px]"></div>
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]"></div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-card p-6 md:p-8">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-purple-600/10 border border-purple-500/20 rounded-2xl shadow-inner">
              <ShieldCheck className="w-10 h-10 text-purple-500" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Security Command</h1>
              <p className="text-slate-400 text-sm md:text-base flex items-center gap-2 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                Encrypted Session Active
              </p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl transition-all">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="glass-card p-8 md:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
              <User className="w-6 h-6 text-purple-500" />
              User Profile
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-950/40 rounded-2xl border border-white/5 space-y-2">
                <p className="text-xs text-slate-500 uppercase tracking-[0.2em] font-black">Username</p>
                <p className="text-xl text-white font-semibold">{user?.username}</p>
              </div>
              <div className="p-5 bg-slate-950/40 rounded-2xl border border-white/5 space-y-2">
                <p className="text-xs text-slate-500 uppercase tracking-[0.2em] font-black">Email</p>
                <p className="text-xl text-white font-semibold">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Security Stats */}
          <div className="glass-card p-8 space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
              <Database className="w-6 h-6 text-purple-500" />
              Status
            </h2>
            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 bg-green-500/5 border border-green-500/10 rounded-2xl">
                <div className="flex items-center gap-4">
                  <Key className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-500 font-bold tracking-wide">Access Token</span>
                </div>
                <span className="text-[10px] font-black font-mono text-green-400 bg-green-500/20 px-2.5 py-1 rounded-full">SECURE</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-blue-500 font-bold tracking-wide">Silent Refresh</span>
                </div>
                <span className="text-[10px] font-black font-mono text-blue-400 bg-blue-500/20 px-2.5 py-1 rounded-full">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical flow explanation */}
        <div className="glass-card p-8 md:p-10 space-y-8 border-l-4 border-purple-500">
          <h2 className="text-3xl font-extrabold text-white flex items-center gap-4">
            <ShieldAlert className="w-8 h-8 text-purple-500" />
            Silent Refresh Protocol
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-slate-400 text-sm md:text-base leading-relaxed">
            <div className="space-y-6">
              <p>
                <strong className="text-white block mb-2 font-bold text-lg">Cross-Site Scripting (XSS) Mitigation</strong>
                The <span className="text-purple-400 font-mono font-bold">Refresh Token</span> is stored in an <span className="text-white font-semibold underline decoration-purple-500/50 underline-offset-4">HTTP-Only secure cookie</span>. 
                This architectural choice ensures the token is inaccessible to client-side JavaScript, effectively neutralizing malicious script injections.
              </p>
              <p>
                <strong className="text-white block mb-2 font-bold text-lg">Cryptographic Token Rotation</strong>
                Upon every <span className="text-purple-400 font-mono">Access Token</span> expiration, the system initiates a background synchronization. 
                The server validates the cookie, rotates the keys, and issues a <span className="text-white font-extrabold uppercase tracking-tight">fresh bundle</span> of tokens, maintaining a narrow window of vulnerability.
              </p>
            </div>
            <div className="p-6 bg-slate-950/80 rounded-3xl border border-white/5 font-mono text-xs md:text-sm overflow-x-auto whitespace-pre shadow-2xl">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              {`// Silent Refresh Logic
api.interceptors.response.use(
  res => res,
  async error => {
    if (error.response.status === 401) {
      const { accessToken } = await refresh();
      setAccessToken(accessToken);
      return api(originalRequest);
    }
  }
)`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
