import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`input-field ${error ? 'border-danger focus:ring-danger' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
