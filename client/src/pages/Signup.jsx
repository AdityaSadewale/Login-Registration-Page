import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User as UserIcon, Loader2, CheckCircle2, XCircle, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const cardRef = useRef(null);

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
    if (formData.username && formData.username.length < 3) {
      newErrors.username = 'Minimum 3 characters required';
    }
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Must be at least 6 characters';
    }
    setErrors(newErrors);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) return;
    
    setLoading(true);
    setApiError('');

    try {
      await signup(formData.username, formData.email, formData.password);
      navigate('/login', { state: { message: 'Registration successful! Please login.' } });
    } catch (err) {
      setApiError(err.data?.message || err.data?.errors?.[0]?.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 relative selection:bg-purple-500/30">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-grid opacity-[0.03]"></div>
      </div>

      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 glass-card-premium z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000"
      >
        {/* Left Side: Branding & Features */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-purple-600/10 to-transparent border-r border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-[0.05] pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-10 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
              <Sparkles className="text-purple-400 w-8 h-8" />
            </div>
            <h1 className="text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Next-Gen <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400">
                Identity.
              </span>
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed max-w-md">
              Join thousands of users who trust our precision-engineered security infrastructure.
            </p>
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm group/item hover:bg-white/[0.04] transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Industrial Security</h4>
                <p className="text-slate-500 text-xs">AES-256 encrypted data protection</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm group/item hover:bg-white/[0.04] transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Global Availability</h4>
                <p className="text-slate-500 text-xs">99.9% uptime guaranteed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="p-10 md:p-16 flex flex-col justify-center relative">
          <div className="absolute top-10 right-10 lg:hidden">
             <Sparkles className="text-purple-500 w-10 h-10 opacity-50" />
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-white mb-3">Create Profile</h2>
            <p className="text-slate-500 text-lg">Start your professional journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-400 px-1 uppercase tracking-wider">Username</label>
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-purple-500 transition-colors duration-300" />
                <input
                  name="username"
                  type="text"
                  required
                  placeholder="johndoe_dev"
                  className={`input-field ${errors.username ? 'border-red-500/40' : ''}`}
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              {errors.username && <p className="mt-1 text-xs text-red-500 font-bold px-2">{errors.username}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-400 px-1 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-purple-500 transition-colors duration-300" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="contact@company.com"
                  className={`input-field ${errors.email ? 'border-red-500/40' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500 font-bold px-2">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-400 px-1 uppercase tracking-wider">Secure Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-purple-500 transition-colors duration-300" />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  className={`input-field pr-12 ${errors.password ? 'border-red-500/40' : ''}`}
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
              {errors.password && <p className="mt-1 text-xs text-red-500 font-bold px-2">{errors.password}</p>}
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
                className="btn-primary w-full flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed group !from-purple-600 !to-blue-600"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <span className="text-lg">Create Account</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-slate-500 text-sm font-medium">
            Already a member?{' '}
            <Link to="/login" className="text-white hover:text-purple-400 font-black tracking-wide underline underline-offset-8 decoration-purple-500/30 hover:decoration-purple-500 transition-all">
              Sign In
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

export default Signup;
