import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiEyeLine, RiEyeOffLine, RiStickyNoteLine } from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import toast from 'react-hot-toast';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    setErrors(p => ({ ...p, [field]: '' }));
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
            <RiStickyNoteLine className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary">Welcome back</h1>
          <p className="text-light-textSecondary dark:text-dark-textSecondary mt-1">Sign in to your NoteFlow account</p>
        </div>

        {/* Card */}
        <div className="card p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="you@example.com"
              error={errors.email}
              autoComplete="email"
            />

            <div>
              <label className="block text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={set('password')}
                  placeholder="••••••••"
                  className={`input-field pr-10 ${errors.password ? 'border-danger focus:ring-danger' : ''}`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-textPrimary dark:hover:text-dark-textPrimary"
                >
                  {showPw ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-danger">{errors.password}</p>}
            </div>

            <Button type="submit" variant="primary" loading={loading} className="w-full mt-2">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-light-textSecondary dark:text-dark-textSecondary mt-5">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary dark:text-primary-dark font-medium hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
