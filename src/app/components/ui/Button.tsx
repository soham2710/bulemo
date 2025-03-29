import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  fullWidth = false,
  icon,
  iconPosition = 'right',
  disabled = false,
  className = '',
  onClick,
  type = 'button',
}) => {
  // Base classes
  const baseClasses = "font-medium rounded-md transition-all duration-300 inline-flex items-center justify-center";
  
  // Size classes
  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };
  
  // Variant classes
  const variantClasses = {
    primary: "bg-green-600 hover:bg-green-700 text-white",
    secondary: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-50",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-800",
  };
  
  // Width classes
  const widthClasses = fullWidth ? "w-full" : "";
  
  // Disabled classes
  const disabledClasses = disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer";
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${disabledClasses} ${className}`;
  
  // Icon rendering
  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <span className={`${iconPosition === 'left' ? 'mr-2' : 'ml-2'} ${iconPosition === 'right' ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'} transition-transform`}>
        {icon}
      </span>
    );
  };
  
  // Render as link if href is provided
  if (href) {
    return (
      <Link 
        href={href}
        className={`${buttonClasses} ${disabled ? 'pointer-events-none' : ''} group`}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        aria-disabled={disabled}
      >
        {iconPosition === 'left' && renderIcon()}
        {children}
        {iconPosition === 'right' && renderIcon()}
      </Link>
    );
  }
  
  // Otherwise render as button
  return (
    <button
      type={type}
      className={`${buttonClasses} group`}
      onClick={onClick}
      disabled={disabled}
    >
      {iconPosition === 'left' && renderIcon()}
      {children}
      {iconPosition === 'right' && renderIcon()}
    </button>
  );
};

export default Button;