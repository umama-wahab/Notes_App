const Loader = ({ fullScreen = false, size = 'md' }) => {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };

  const spinner = (
    <div className={`${sizes[size]} animate-spin rounded-full border-2 border-light-border border-t-primary dark:border-dark-border dark:border-t-primary-dark`} />
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-light-border border-t-primary dark:border-dark-border dark:border-t-primary-dark" />
          <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">Loading...</p>
        </div>
      </div>
    );
  }

  return spinner;
};

export default Loader;
