"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ServicesOverview = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Check if section is visible for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Services data
  const services = [
    {
      title: "Digital Transformation",
      icon: "/images/service-icons/digital-transformation.svg",
      description: "Embrace new technologies and strategies to stay competitive in the digital age. Our digital transformation services help organizations navigate change successfully.",
      features: [
        "Digital Strategy Development",
        "Technology Roadmapping",
        "Innovation Workshops",
        "Change Management Support"
      ],
      color: "#4CAF50", // Primary green
      image: "/user-adoption.jpg"
    },
    {
      title: "Cybersecurity",
      icon: "/images/service-icons/cybersecurity.svg",
      description: "Protect your business against cyber threats and ensure compliance with industry regulations. Our comprehensive cybersecurity services safeguard your valuable data.",
      features: [
        "Risk Assessments & Security Audits",
        "Compliance Consultation",
        "Security Awareness Training",
        "Incident Response Planning"
      ],
      color: "#1E88E5", // South African blue
      image: "/cybersecurity.jpg"
    },
    {
      title: "AI Services & Automation",
      icon: "/images/service-icons/ai-services.svg",
      description: "Leverage AI technology to streamline business processes and drive efficiency. Our AI solutions help you unlock the power of automation and predictive analytics.",
      features: [
        "Process Workflow Automation",
        "AI-Powered Chatbots",
        "Predictive Analytics",
        "Machine Learning Solutions"
      ],
      color: "#1E5631", // Dark green
      image: "/ai-automation.jpg"
    },
    {
      title: "Training & Implementation",
      icon: "/images/service-icons/training.svg",
      description: "Ensure successful technology adoption with comprehensive training and implementation services. We help your team embrace new systems and processes.",
      features: [
        "Corporate Training Programs",
        "Custom Training Materials",
        "Application Implementation",
        "User Support Services"
      ],
      color: "#FBC02D", // South African yellow
      image: "/training.jpg"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-800 mb-4 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Our Core Services
          </h2>
          <p className={`text-lg text-gray-600 max-w-3xl mx-auto transition-opacity duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            We provide tailored solutions to address the unique technological and operational needs of your organization.
          </p>
        </div>

        {/* Tabs */}
        <div className={`flex flex-wrap justify-center gap-2 md:gap-4 mb-12 transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-3 md:px-6 md:py-3 rounded-md font-medium transition-all
                ${activeTab === index
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-200'
                }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        {/* Service Content */}
        <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col md:flex-row">
            {/* Service Image - Hidden on mobile */}
            <div className="hidden md:block md:w-1/2 relative h-auto">
              <Image
                src={services[activeTab].image}
                alt={services[activeTab].title}
                width={600}
                height={450}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <div className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: services[activeTab].color }}>
                  Featured Service
                </div>
                <h3 className="text-3xl font-bold mb-2">{services[activeTab].title}</h3>
                <Link 
                  href={`/services/${services[activeTab].title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center text-white hover:text-green-300 font-medium"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Service Details */}
            <div className={`md:w-1/2 p-6 md:p-8 ${services[activeTab].color === "#4CAF50" ? 'bg-green-50' : ''}`}>
              {/* Mobile Image */}
              <div className="md:hidden w-full h-48 relative mb-6 rounded-lg overflow-hidden">
                <Image
                  src={services[activeTab].image}
                  alt={services[activeTab].title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-center mb-4">
                <div className="relative h-12 w-12 mr-4">
                  <Image
                    src={services[activeTab].icon}
                    alt={services[activeTab].title}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{services[activeTab].title}</h3>
              </div>

              <p className="text-gray-600 mb-6">{services[activeTab].description}</p>

              <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Features:</h4>

              <ul className="mb-8 space-y-3">
                {services[activeTab].features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="text-green-600 mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/services/${services[activeTab].title.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Explore {services[activeTab].title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* View all services button */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Link
            href="/services"
            className="inline-flex items-center bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-8 rounded-md transition-colors"
          >
            View All Services
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;