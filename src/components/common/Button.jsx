const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

    const variants = {
        primary: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 hover:scale-105 shadow-lg shadow-red-500/30 hover:shadow-red-500/50',
        secondary: 'bg-dark-700 text-white border border-red-900/30 hover:bg-dark-600 hover:border-red-700/50 hover:scale-105',
        success: 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-500 hover:to-green-600 hover:scale-105 shadow-lg shadow-green-500/30',
        danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-400 hover:to-red-500 hover:scale-105 shadow-lg shadow-red-500/30',
        ghost: 'bg-transparent text-gray-400 hover:text-red-400 hover:bg-red-500/10',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
