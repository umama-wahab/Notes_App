import { useState, useEffect, useRef } from 'react';
import { RiMenuLine, RiSearchLine, RiSunLine, RiMoonLine, RiCloseLine } from 'react-icons/ri';

const Header = ({ onMenuToggle, onSearch, searchQuery }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const debounceRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const handleSearch = (value) => {
    setLocalSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch?.(value);
    }, 300);
  };

  return (
    <header className="h-16 bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border flex items-center gap-4 px-4 lg:px-6 sticky top-0 z-10">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-lg text-light-textSecondary hover:bg-light-bg hover:text-light-textPrimary dark:text-dark-textSecondary dark:hover:bg-dark-bg dark:hover:text-dark-textPrimary transition-all duration-200"
      >
        <RiMenuLine className="text-xl" />
      </button>

      {/* Search bar */}
      <div className="flex-1 max-w-md relative">
        <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary text-lg" />
        <input
          type="text"
          placeholder="Search notes..."
          value={localSearch}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-8 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-light-textPrimary dark:text-dark-textPrimary placeholder-light-textSecondary dark:placeholder-dark-textSecondary text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent transition-all duration-200"
        />
        {localSearch && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-textPrimary dark:hover:text-dark-textPrimary"
          >
            <RiCloseLine />
          </button>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-light-textSecondary hover:bg-light-bg hover:text-light-textPrimary dark:text-dark-textSecondary dark:hover:bg-dark-bg dark:hover:text-dark-textPrimary transition-all duration-200"
          title="Toggle theme"
        >
          {theme === 'light' ? <RiMoonLine className="text-xl" /> : <RiSunLine className="text-xl" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
