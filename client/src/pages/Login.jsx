import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, Loader2, XCircle, Info } from 'lucide-react';
import Footer from '../components/Footer';
import authBg from '../assets/auth_background_login_1776527501042.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location]);

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
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-slate-950 relative">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <img src={authBg} alt="Background" className="w-full h-full object-cover" />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 glass-card z-10 animate-in fade-in slide-in-from-top-8 duration-1000">
        {/* Branding Side */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-r border-white/5">
          <div>
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-8 border border-white/20">
              <LogIn className="text-blue-400 w-6 h-6" />
            </div>
            <h1 className="text-5xl font-extrabold text-white leading-tight">
              Welcome <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Back</span>.
            </h1>
            <p className="mt-6 text-slate-400 text-lg max-w-md">
              Securely access your dashboard and manage your digital identity with confidence.
            </p>
          </div>
          
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <p className="text-sm text-slate-300 italic">
              "Security is not a product, but a process. We ensure your data remains yours."
            </p>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
            <p className="text-slate-500">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {successMessage && (
              <div className="flex items-center space-x-2 p-4 bg-green-500/10 border border-green-500/20 text-green-500 rounded-2xl animate-in zoom-in duration-300">
                <Info className="w-5 h-5 shrink-0" />
                <span className="text-sm font-medium">{successMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
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
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-slate-400">Password</label>
                <Link to="#" className="text-xs text-blue-400 hover:text-blue-300 font-medium">Forgot password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="input-field pl-12"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
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
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-white hover:text-blue-400 font-bold transition-colors">
              Create Account
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
