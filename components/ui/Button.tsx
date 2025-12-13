import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'text';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  // iOS Button Base: No shadow, rounded corners, active opacity change
  const baseStyles = "w-full py-3.5 px-5 rounded-xl font-semibold text-[17px] transition-opacity duration-200 flex items-center justify-center space-x-2 active:opacity-60 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#007AFF] text-white border-none", // iOS Blue
    secondary: "bg-[#E5E5EA] dark:bg-[#2C2C2E] text-black dark:text-white", // iOS Gray 5
    outline: "bg-transparent border border-[#007AFF] text-[#007AFF]",
    danger: "bg-[#FF3B30] text-white", // iOS Red
    ghost: "bg-transparent text-[#007AFF]",
    text: "bg-transparent text-[#007AFF] w-auto px-2 py-1 h-auto"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Processing</span>
        </>
      ) : children}
    </button>
  );
};

export default Button;