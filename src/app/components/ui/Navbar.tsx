'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

interface NavbarProps {
  logo?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  items: NavItem[];
  ctaButton?: {
    label: string;
    href: string;
  };
  sticky?: boolean;
  transparent?: boolean;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  logo = {
    src: '/images/logo.svg',
    alt: 'Bulemo Consulting',
    width: 160,
    height: 48
  },
  items = [],
  ctaButton,
  sticky = true,
  transparent = false,
  className = '',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  
  // Handle scroll for sticky navbar
  useEffect(() => {
    if (!sticky) return;
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sticky]);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
    setOpenDropdown(null);
  };
  
  // Toggle dropdown menu
  const toggleDropdown = (index: number) => {
    setOpenDropdown(prev => prev === index ? null : index);
  };
  
  // Base navbar classes
  const baseClasses = "w-full z-50 transition-all duration-300";
  
  // Sticky classes
  const stickyClasses = sticky ? "fixed top-0 left-0" : "relative";
  
  // Transparency and scroll classes
  const bgClasses = transparent 
    ? isScrolled 
      ? "bg-white shadow-md py-2" 
      : "bg-transparent py-4"
    : "bg-white shadow-md py-2";
  
  // Combine all classes
  const navbarClasses = `${baseClasses} ${stickyClasses} ${bgClasses} ${className}`;
  
  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center py-2">
            <div className="relative" style={{ width: logo.width || 160, height: logo.height || 48 }}>
              <Image 
                src={logo.src} 
                alt={logo.alt}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {items.map((item, index) => (
              <div key={index} className="relative group">
                {item.children ? (
                  <>
                    <button 
                      onClick={() => toggleDropdown(index)}
                      className={`text-gray-800 hover:text-green-600 font-medium transition-colors flex items-center ${
                        openDropdown === index ? 'text-green-600' : ''
                      }`}
                    >
                      {item.label}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 ml-1 transition-transform ${
                          openDropdown === index ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {openDropdown === index && (
                      <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2 z-50">
                        {item.children.map((child, childIndex) => (
                          <Link 
                            key={childIndex}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link 
                    href={item.href} 
                    className="text-gray-800 hover:text-green-600 font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            
            {/* CTA Button */}
            {ctaButton && (
              <Link 
                href={ctaButton.href} 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                {ctaButton.label}
              </Link>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white mt-4 py-4 px-4 rounded-md shadow-lg">
            <div className="flex flex-col space-y-4">
              {items.map((item, index) => (
                <div key={index} className="py-1">
                  {item.children ? (
                    <div>
                      <button 
                        onClick={() => toggleDropdown(index)}
                        className="text-gray-800 hover:text-green-600 font-medium py-2 flex items-center justify-between w-full"
                      >
                        {item.label}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-4 w-4 transition-transform ${
                            openDropdown === index ? 'rotate-180' : ''
                          }`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {openDropdown === index && (
                        <div className="pl-4 border-l-2 border-gray-200 mt-2 space-y-2">
                          {item.children.map((child, childIndex) => (
                            <Link 
                              key={childIndex}
                              href={child.href}
                              className="block py-2 text-sm text-gray-700 hover:text-green-600"
                              onClick={() => {
                                setOpenDropdown(null);
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link 
                      href={item.href} 
                      className="text-gray-800 hover:text-green-600 font-medium py-2 block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* CTA Button for Mobile */}
              {ctaButton && (
                <Link 
                  href={ctaButton.href} 
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors text-center mt-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {ctaButton.label}
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;