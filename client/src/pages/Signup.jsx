import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User as UserIcon, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import Footer from '../components/Footer';
import authBg from '../assets/auth_background_login_1776527501042.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

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
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-slate-950 relative">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <img src={authBg} alt="Background" className="w-full h-full object-cover" />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 glass-card z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Branding Side (Visible on large screens) */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-r border-white/5">
          <div>
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-8 border border-white/20">
              <UserPlus className="text-purple-400 w-6 h-6" />
            </div>
            <h1 className="text-5xl font-extrabold text-white leading-tight">
              Join the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Future</span> of Auth.
            </h1>
            <p className="mt-6 text-slate-400 text-lg max-w-md">
              Experience the highest security standards with our state-of-the-art authentication system.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Full-Stack MERN Reliability</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>HttpOnly Cookie Security</span>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-slate-500">Enter your details to register</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2">Username</label>
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-purple-500 transition-colors" />
                <input
                  name="username"
                  type="text"
                  required
                  placeholder="aditya_sadewale"
                  className={`input-field pl-12 ${errors.username ? 'border-red-500/50' : ''}`}
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              {errors.username && <p className="mt-1.5 text-xs text-red-500 font-medium px-2">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-purple-500 transition-colors" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="contact@aditya.me"
                  className={`input-field pl-12 ${errors.email ? 'border-red-500/50' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-red-500 font-medium px-2">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-purple-500 transition-colors" />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className={`input-field pl-12 ${errors.password ? 'border-red-500/50' : ''}`}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-500 font-medium px-2">{errors.password}</p>}
            </div>

            {apiError && (
              <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl">
                <XCircle className="w-5 h-5 shrink-0" />
                <span className="text-sm font-medium">{apiError}</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading || Object.keys(errors).length > 0} 
              className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:text-purple-400 font-bold transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
