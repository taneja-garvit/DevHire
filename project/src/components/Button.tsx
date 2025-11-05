interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  disabled?: boolean;
}

function Button({
  children,
  onClick,
  type = 'button',
  loading = false,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    'px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses =
    variant === 'primary'
      ? 'bg-yellow-400 text-black hover:bg-yellow-500 focus:ring-yellow-400 hover:shadow-lg'
      : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400';

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`${baseClasses} ${variantClasses} ${widthClass} ${
        loading || disabled ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
