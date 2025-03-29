"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = ({
  title = "Transform Your Business with Technology Solutions",
  subtitle = "Bulemo Consulting helps organizations leverage technology to optimize operations, drive growth, and stay ahead of the competition.",
  buttonText = "Explore Our Services",
  buttonLink = "/services",
  secondaryButtonText = "Contact Us",
  secondaryButtonLink = "/contact",
  backgroundImage = "/images/hero-background.jpg",
  showStats = true
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Stats data
  const stats = [
    { value: "12+", label: "Years Experience" },
    { value: "200+", label: "Clients Served" },
    { value: "97%", label: "Client Satisfaction" },
    { value: "50+", label: "Consultants" }
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Bulemo Consulting"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-blue-900/80"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {title}
          </h1>
          
          <p 
            className={`text-xl md:text-2xl text-gray-100 mb-8 transition-all duration-700 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {subtitle}
          </p>
          
          <div 
            className={`flex flex-wrap gap-4 mb-12 transition-all duration-700 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Link 
              href={buttonLink}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-md transition-colors text-lg"
            >
              {buttonText}
            </Link>
            
            <Link 
              href={secondaryButtonLink}
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-medium py-3 px-8 rounded-md transition-colors text-lg"
            >
              {secondaryButtonText}
            </Link>
          </div>
        </div>
        
        {/* Stats */}
        {showStats && (
          <div 
            className={`mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 transition-all duration-700 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-colors"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-200">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* South African-inspired decorative element */}
        <div className="absolute bottom-10 right-10 h-24 w-24 hidden md:block">
          <div className="relative h-full w-full">
            <div className="absolute inset-0 border-4 border-green-500 rounded-full"></div>
            <div className="absolute inset-2 border-4 border-yellow-500 rounded-full"></div>
            <div className="absolute inset-4 border-4 border-blue-500 rounded-full"></div>
            <div className="absolute inset-6 border-4 border-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;