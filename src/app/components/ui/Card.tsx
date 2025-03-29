import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CardProps {
  title?: string;
  subtitle?: string;
  content?: string;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  footer?: React.ReactNode;
  href?: string;
  className?: string;
  hoverEffect?: boolean;
  accentColor?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  content,
  image,
  footer,
  href,
  className = '',
  hoverEffect = true,
  accentColor = 'green',
  children,
  onClick,
}) => {
  // Base classes
  const baseClasses = "bg-white rounded-xl shadow-md overflow-hidden";
  
  // Hover effect classes
  const hoverClasses = hoverEffect 
    ? "transition-all duration-300 hover:shadow-lg hover:-translate-y-1" 
    : "";
  
  // Accent color classes for the top border
  const accentClasses = {
    green: "border-t-4 border-green-600",
    blue: "border-t-4 border-blue-600",
    yellow: "border-t-4 border-yellow-500",
    red: "border-t-4 border-red-600",
    none: ""
  };
  
  // Get the correct accent class
  const accentClass = accentColor === 'none' 
    ? accentClasses.none 
    : accentClasses[accentColor as keyof typeof accentClasses] || accentClasses.green;
  
  // Combine all classes
  const cardClasses = `${baseClasses} ${hoverClasses} ${accentClass} ${className}`;
  
  // Card content
  const cardContent = (
    <>
      {/* Card Image */}
      {image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width || 800}
            height={image.height || 600}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      
      {/* Card Body */}
      <div className="p-6">
        {/* Title */}
        {title && (
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        )}
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-gray-600 font-medium mb-3">{subtitle}</p>
        )}
        
        {/* Content */}
        {content && (
          <p className="text-gray-700 mb-4">{content}</p>
        )}
        
        {/* Children (for custom content) */}
        {children}
      </div>
      
      {/* Footer */}
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          {footer}
        </div>
      )}
    </>
  );
  
  // If href is provided, wrap in a Link
  if (href) {
    return (
      <Link href={href} className={`${cardClasses} group cursor-pointer`}>
        {cardContent}
      </Link>
    );
  }
  
  // If onClick is provided, make it clickable
  if (onClick) {
    return (
      <div className={`${cardClasses} group cursor-pointer`} onClick={onClick}>
        {cardContent}
      </div>
    );
  }
  
  // Default non-clickable card
  return (
    <div className={`${cardClasses} group`}>
      {cardContent}
    </div>
  );
};

export default Card;