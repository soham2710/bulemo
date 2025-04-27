'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube';
  href: string;
  ariaLabel?: string;
}

interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
}

interface FooterProps {
  logo?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  contactInfo?: ContactInfo;
  copyright?: string;
  newsletter?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
}

const Footer: React.FC<FooterProps> = ({
  logo = {
    src: '/logo.png',
    alt: 'Bulemo Consulting',
    width: 160,
    height: 48
  },
  columns = [],
  socialLinks = [],
  contactInfo,
  copyright = `© ${new Date().getFullYear()} Bulemo Consulting. All rights reserved.`,
  newsletter = false,
  className = '',
  variant = 'dark',
}) => {
  // Base classes
  const baseClasses = "py-12 md:py-16";
  
  // Variant classes
  const variantClasses = {
    light: "bg-gray-100 text-gray-800",
    dark: "bg-gray-900 text-white",
  };
  
  // Link color classes
  const linkColorClasses = {
    light: "text-gray-600 hover:text-green-600",
    dark: "text-gray-400 hover:text-green-400",
  };
  
  // Heading color classes
  const headingColorClasses = {
    light: "text-gray-800",
    dark: "text-white",
  };
  
  // Border color classes
  const borderColorClasses = {
    light: "border-gray-200",
    dark: "border-gray-700",
  };
  
  // Combine all classes
  const footerClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  // Newsletter form handler
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle newsletter subscription (can be implemented later)
    alert("Newsletter subscription feature will be implemented soon!");
  };
  
  // Render social media icons
  const renderSocialIcon = (platform: SocialLink['platform']) => {
    switch (platform) {
      case 'facebook':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        );
      case 'twitter':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case 'instagram':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case 'youtube':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <footer className={footerClasses}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
          {/* Company Info Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                BULEMO<span className="text-green-400">.</span>
              </h1>
            </Link>
            
            {contactInfo && (
              <div className="space-y-3 mb-6">
                {contactInfo.address && (
                  <p className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className={variant === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                      {contactInfo.address}
                    </span>
                  </p>
                )}
                
                {contactInfo.phone && (
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a 
                      href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} 
                      className={linkColorClasses[variant]}
                    >
                      {contactInfo.phone}
                    </a>
                  </p>
                )}
                
                {contactInfo.email && (
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a 
                      href={`mailto:${contactInfo.email}`} 
                      className={linkColorClasses[variant]}
                    >
                      {contactInfo.email}
                    </a>
                  </p>
                )}
              </div>
            )}
            
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    aria-label={social.ariaLabel || `${social.platform} profile`}
                    className={`h-10 w-10 flex items-center justify-center rounded-full border border-gray-700 hover:bg-green-600 hover:border-green-600 transition-colors ${
                      variant === 'light' ? 'text-gray-600 hover:text-white' : 'text-gray-400 hover:text-white'
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {renderSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>
          
          {/* Nav Columns */}
          {columns.map((column, index) => (
            <div key={index}>
              <h3 className={`text-lg font-semibold mb-4 ${headingColorClasses[variant]}`}>
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className={linkColorClasses[variant]}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter Signup */}
          {newsletter && (
            <div className="lg:col-span-1">
              <h3 className={`text-lg font-semibold mb-4 ${headingColorClasses[variant]}`}>
                Stay Updated
              </h3>
              <p className={variant === 'light' ? 'text-gray-600 mb-4' : 'text-gray-400 mb-4'}>
                Subscribe to our newsletter for the latest updates and insights.
              </p>
              <form onSubmit={handleNewsletterSubmit}>
                <div className="flex flex-col sm:flex-row">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-2 sm:mb-0 sm:mr-2 w-full"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        
        {/* Bottom Bar */}
        <div className={`pt-8 border-t ${borderColorClasses[variant]}`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={variant === 'light' ? 'text-gray-600 mb-4 md:mb-0' : 'text-gray-400 mb-4 md:mb-0'}>
              {copyright}
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className={linkColorClasses[variant]}>
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className={linkColorClasses[variant]}>
                Terms of Service
              </Link>
              <Link href="/sitemap" className={linkColorClasses[variant]}>
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* South Africa Inspired Design Element */}
      <div className="mt-8 flex justify-center">
        <div className="flex space-x-1">
          <div className="h-1 w-16 bg-green-600"></div>
          <div className="h-1 w-16 bg-yellow-500"></div>
          <div className="h-1 w-16 bg-blue-600"></div>
          <div className="h-1 w-16 bg-red-600"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;