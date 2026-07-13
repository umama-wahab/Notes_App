import { NavLink, useNavigate } from 'react-router-dom';
import { RiDashboardLine, RiFileListLine, RiUserLine, RiLogoutBoxLine, RiStickyNoteLine } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/dashboard', icon: RiDashboardLine, label: 'Dashboard' },
  { to: '/notes', icon: RiFileListLine, label: 'All Notes' },
  { to: '/profile', icon: RiUserLine, label: 'Profile' }
];

const Sidebar = ({ isOpen, onClose }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose?.();
  };

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 z-30
        bg-light-surface dark:bg-dark-surface
        border-r border-light-border dark:border-dark-border
        flex flex-col
        transition-transform duration-300
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-light-border dark:border-dark-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <RiStickyNoteLine className="text-white text-lg" />
            </div>
            <span className="font-bold text-lg text-light-textPrimary dark:text-dark-textPrimary">NoteFlow</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary dark:text-primary-dark'
                    : 'text-light-textSecondary hover:bg-light-bg hover:text-light-textPrimary dark:text-dark-textSecondary dark:hover:bg-dark-bg dark:hover:text-dark-textPrimary'
                }`
              }
            >
              <Icon className="text-lg flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-3 py-4 border-t border-light-border dark:border-dark-border space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">{initials}</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary truncate">{user?.name}</p>
              <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-light-textSecondary hover:bg-red-50 hover:text-danger dark:text-dark-textSecondary dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-all duration-200"
          >
            <RiLogoutBoxLine className="text-lg flex-shrink-0" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
