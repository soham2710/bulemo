"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close dropdown when mobile menu is toggled
    if (!isMobileMenuOpen) {
      setIsServicesDropdownOpen(false);
    }
  };

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  const services = [
    { name: "User Adoption & Change Management", href: "/services/user-adoption" },
    { name: "EdTech Solutions & LMS", href: "/services/edtech-solutions" },
    { name: "Cybersecurity Consultation", href: "/services/cybersecurity" },
    { name: "Training & Implementation", href: "/services/training" },
    { name: "Project Management", href: "/services/project-management" },
    { name: "IT Procurement", href: "/services/it-procurement" },
    { name: "AI Services & Automation", href: "/services/ai-services" },
    { name: "Business Process Optimization", href: "/services/process-optimization" },
    { name: "Data Analytics", href: "/services/data-analytics" },
    { name: "Digital Transformation", href: "/services/digital-transformation" },
    { name: "Compliance & Risk Management", href: "/services/compliance" },
    { name: "Marketing & Branding", href: "/services/marketing" },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-800 shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Text Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              BULEMO
              <span className="text-green-400">.</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-white hover:text-green-400 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-white hover:text-green-400 font-medium transition-colors"
            >
              About
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button 
                onClick={toggleServicesDropdown}
                className="text-white hover:text-green-400 font-medium transition-colors flex items-center"
              >
                Services
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ml-1 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isServicesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-gray-800 shadow-lg rounded-md py-2 z-50">
                  {services.map((service, index) => (
                    <Link 
                      key={index}
                      href={service.href}
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-green-400"
                      onClick={() => setIsServicesDropdownOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                  <Link 
                    href="/services"
                    className="block px-4 py-2 text-sm font-semibold text-green-400 hover:bg-gray-700 border-t border-gray-700 mt-1"
                    onClick={() => setIsServicesDropdownOpen(false)}
                  >
                    View All Services
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              href="/case-studies" 
              className="text-white hover:text-green-400 font-medium transition-colors"
            >
              Case Studies
            </Link>
            <Link 
              href="/blog" 
              className="text-white hover:text-green-400 font-medium transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
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
          <div className="md:hidden bg-gray-800 mt-4 py-2 px-4 rounded-md shadow-lg">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-white hover:text-green-400 py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-white hover:text-green-400 py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              
              {/* Mobile Services Dropdown */}
              <div>
                <button 
                  onClick={toggleServicesDropdown}
                  className="text-white hover:text-green-400 py-2 transition-colors flex items-center w-full text-left"
                >
                  Services
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 ml-1 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isServicesDropdownOpen && (
                  <div className="pl-4 border-l-2 border-gray-600 mt-1 space-y-2">
                    {services.map((service, index) => (
                      <Link 
                        key={index}
                        href={service.href}
                        className="block py-2 text-sm text-white hover:text-green-400"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                    <Link 
                      href="/services"
                      className="block py-2 text-sm font-semibold text-green-400"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      View All Services
                    </Link>
                  </div>
                )}
              </div>
              
              <Link 
                href="/case-studies" 
                className="text-white hover:text-green-400 py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Case Studies
              </Link>
              <Link 
                href="/blog" 
                className="text-white hover:text-green-400 py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/contact" 
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors text-center mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;