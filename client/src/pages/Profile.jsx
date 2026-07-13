import { useState } from 'react';
import { RiUserLine, RiEditLine, RiSaveLine, RiLockLine } from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [pwForm, setPwForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const handleProfileSave = async () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email';
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    try {
      const payload = { name: form.name, email: form.email };
      if (pwForm.password) {
        if (pwForm.password.length < 6) { toast.error('Password must be at least 6 characters'); setLoading(false); return; }
        if (pwForm.password !== pwForm.confirmPassword) { toast.error('Passwords do not match'); setLoading(false); return; }
        payload.password = pwForm.password;
      }
      const { data } = await authAPI.updateProfile(payload);
      updateUser({ _id: data._id, name: data.name, email: data.email });
      if (data.token) localStorage.setItem('token', data.token);
      toast.success('Profile updated!');
      setEditing(false);
      setPwForm({ password: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    setErrors(p => ({ ...p, [field]: '' }));
  };

  return (
    <div className="p-4 lg:p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-6">Profile</h1>

      <div className="card p-6 space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-2xl font-bold">{initials}</span>
          </div>
          <div>
            <p className="font-semibold text-light-textPrimary dark:text-dark-textPrimary text-lg">{user?.name}</p>
            <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm">{user?.email}</p>
          </div>
          <div className="ml-auto">
            {!editing && (
              <Button variant="secondary" onClick={() => setEditing(true)}>
                <RiEditLine /> Edit
              </Button>
            )}
          </div>
        </div>

        {editing ? (
          <div className="space-y-4 pt-4 border-t border-light-border dark:border-dark-border">
            <h3 className="font-medium text-light-textPrimary dark:text-dark-textPrimary flex items-center gap-2">
              <RiUserLine /> Account Info
            </h3>
            <Input label="Full Name" value={form.name} onChange={set('name')} error={errors.name} />
            <Input label="Email" type="email" value={form.email} onChange={set('email')} error={errors.email} />

            <h3 className="font-medium text-light-textPrimary dark:text-dark-textPrimary flex items-center gap-2 pt-2">
              <RiLockLine /> Change Password <span className="text-xs font-normal text-light-textSecondary dark:text-dark-textSecondary">(optional)</span>
            </h3>
            <Input
              label="New Password"
              type="password"
              value={pwForm.password}
              onChange={(e) => setPwForm(p => ({ ...p, password: e.target.value }))}
              placeholder="Leave blank to keep current"
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={pwForm.confirmPassword}
              onChange={(e) => setPwForm(p => ({ ...p, confirmPassword: e.target.value }))}
              placeholder="Repeat new password"
            />

            <div className="flex items-center gap-3 pt-2">
              <Button variant="secondary" onClick={() => { setEditing(false); setErrors({}); }}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleProfileSave} loading={loading}>
                <RiSaveLine /> Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div className="pt-4 border-t border-light-border dark:border-dark-border space-y-3">
            <div>
              <label className="text-xs text-light-textSecondary dark:text-dark-textSecondary uppercase tracking-wider">Full Name</label>
              <p className="text-light-textPrimary dark:text-dark-textPrimary mt-0.5">{user?.name}</p>
            </div>
            <div>
              <label className="text-xs text-light-textSecondary dark:text-dark-textSecondary uppercase tracking-wider">Email Address</label>
              <p className="text-light-textPrimary dark:text-dark-textPrimary mt-0.5">{user?.email}</p>
            </div>
            <div>
              <label className="text-xs text-light-textSecondary dark:text-dark-textSecondary uppercase tracking-wider">Password</label>
              <p className="text-light-textPrimary dark:text-dark-textPrimary mt-0.5">••••••••</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
