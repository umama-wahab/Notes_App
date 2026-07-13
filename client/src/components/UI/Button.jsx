import Loader from './Loader';

const Button = ({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    ghost: 'text-light-textSecondary hover:text-light-textPrimary hover:bg-light-bg dark:text-dark-textSecondary dark:hover:text-dark-textPrimary dark:hover:bg-dark-bg p-2 rounded-lg transition-all duration-200 flex items-center gap-2'
  };

  return (
    <button
      className={`${variants[variant]} ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? <Loader size="sm" /> : children}
    </button>
  );
};

export default Button;
