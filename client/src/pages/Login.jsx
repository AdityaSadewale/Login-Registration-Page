import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6 bg-grid relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] animate-pulse"></div>
      <div className="absolute bottom-0 -right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] animate-pulse delay-700"></div>

      <div className="w-full max-w-[440px] glass-card p-10 md:p-12 relative z-10 animate-in fade-in zoom-in duration-1000">
        <div className="flex flex-col items-center mb-10">
          <div className="p-5 bg-purple-600/10 border border-purple-500/20 rounded-3xl mb-6 shadow-2xl">
            <LogIn className="w-12 h-12 text-purple-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter text-center">Security Portal</h1>
          <p className="text-slate-500 mt-4 text-center text-base md:text-lg font-semibold tracking-tight">
            Encrypted Authorization Access
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                required
                className="input-field pl-10"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                required
                className="input-field pl-10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg text-center animate-shake">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-500 hover:text-purple-400 font-semibold transition-colors">
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
