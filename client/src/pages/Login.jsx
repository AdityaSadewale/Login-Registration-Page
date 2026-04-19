import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, Loader2, XCircle, Info, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const cardRef = useRef(null);

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location]);

  // Premium Mouse Tracking Effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  // Real-time validation
  useEffect(() => {
    const newErrors = {};
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    setErrors(newErrors);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setApiError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    setApiError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 relative selection:bg-blue-500/30">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-grid opacity-[0.03]"></div>
      </div>

      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 glass-card-premium z-10 animate-in fade-in slide-in-from-top-4 duration-1000"
      >
        {/* Left Side: Branding & Info */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-blue-600/10 to-transparent border-r border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-[0.05] pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-10 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
              <ShieldCheck className="text-blue-400 w-8 h-8" />
            </div>
            <h1 className="text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Precision <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Security.
              </span>
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed max-w-md">
              The gold standard in modern authentication. Secure, seamless, and stunningly fast.
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="p-8 bg-white/[0.03] rounded-3xl border border-white/5 backdrop-blur-md">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">System Status: Optimal</span>
              </div>
              <p className="text-slate-300 text-sm italic font-medium">
                "We've re-engineered the login experience to feel as premium as your data is valuable."
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Authentication Form */}
        <div className="p-10 md:p-16 flex flex-col justify-center relative">
          <div className="absolute top-10 right-10 lg:hidden">
             <ShieldCheck className="text-blue-500 w-10 h-10 opacity-50" />
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-white mb-3">Sign In</h2>
            <p className="text-slate-500 text-lg">Access your secure workspace environment</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {successMessage && (
              <div className="flex items-center space-x-3 p-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl animate-in zoom-in-95 duration-500">
                <Info className="w-5 h-5 shrink-0" />
                <span className="text-sm font-semibold">{successMessage}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-400 px-1 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors duration-300" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className={`input-field ${errors.email ? 'border-red-500/40' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500 font-bold px-2">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Password</label>
                <Link to="#" className="text-xs text-blue-400 hover:text-blue-300 font-bold transition-colors">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors duration-300" />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  className="input-field pr-12"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {apiError && (
              <div className="flex items-center space-x-3 p-5 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl">
                <XCircle className="w-5 h-5 shrink-0" />
                <span className="text-sm font-bold">{apiError}</span>
              </div>
            )}

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={loading || Object.keys(errors).length > 0} 
                className="btn-primary w-full flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <span className="text-lg">Sign In</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-12 text-center relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <span className="relative px-4 bg-slate-950/20 backdrop-blur-xl text-slate-600 text-xs font-bold uppercase tracking-[0.2em]">New here?</span>
          </div>

          <p className="mt-8 text-center text-slate-500 text-sm font-medium">
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-white hover:text-blue-400 font-black tracking-wide underline underline-offset-8 decoration-blue-500/30 hover:decoration-blue-500 transition-all">
              Create Account
            </Link>
          </p>
        </div>
      </div>
      
      <div className="mt-12 opacity-50 hover:opacity-100 transition-opacity">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
