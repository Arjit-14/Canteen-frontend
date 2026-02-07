const Card = ({ children, className = '', hover = false, onClick }) => {
    return (
        <div
            className={`
        bg-dark-800/80 backdrop-blur-sm rounded-2xl border border-dark-700 
        ${hover ? 'hover:border-primary-500/50 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10 cursor-pointer' : ''}
        transition-all duration-300 ${className}
      `}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '' }) => (
    <div className={`p-6 border-b border-dark-700 ${className}`}>
        {children}
    </div>
);

export const CardBody = ({ children, className = '' }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);

export const CardFooter = ({ children, className = '' }) => (
    <div className={`p-6 border-t border-dark-700 ${className}`}>
        {children}
    </div>
);

export default Card;
