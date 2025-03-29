'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ServicesList from '@/app/components/layout/ServicesList';
import ContactForm from '@/app/components/sections/ContactForm';

export default function ServicesPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Process categories
  const processCategories = [
    {
      title: "Assess",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: "We evaluate your current systems, processes, and challenges to understand your specific needs.",
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Plan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      description: "We develop a customized strategy and implementation roadmap to address your unique requirements.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Implement",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      description: "Our team of experts executes the plan, ensuring seamless integration with your existing systems.",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Optimize",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      description: "We continuously monitor, refine, and optimize solutions to ensure long-term success and ROI.",
      color: "bg-red-100 text-red-600"
    }
  ];

  // Client success cases
  const clientSuccessCases = [
    {
      client: "Standard Bank",
      industry: "Financial Services",
      service: "Digital Transformation",
      result: "40% increase in digital customer engagement",
      image: "/images/clients/standard-bank.jpg"
    },
    {
      client: "Discovery Health",
      industry: "Healthcare",
      service: "Cybersecurity",
      result: "Enhanced security posture and POPIA compliance",
      image: "/images/clients/discovery.jpg"
    },
    {
      client: "Woolworths",
      industry: "Retail",
      service: "EdTech Solutions",
      result: "25% reduction in staff training time",
      image: "/images/clients/woolworths.jpg"
    }
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="absolute inset-0 bg-opacity-70 bg-pattern"></div>
        <div className="container mx-auto px-4 relative">
          <div className={`max-w-3xl transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Comprehensive technology and business consulting solutions tailored to your organization&apos;s unique needs. 
              We help you navigate complex challenges and drive sustainable growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#services-list" 
                className="bg-white hover:bg-gray-100 text-green-800 font-medium py-3 px-6 rounded-md transition-colors group flex items-center"
              >
                Explore Our Services
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
              <Link 
                href="/contact" 
                className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-medium py-3 px-6 rounded-md transition-colors flex items-center"
              >
                Get in Touch
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Animated shapes */}
          <div className="hidden lg:block">
            <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-500 rounded-full opacity-20 animate-float"></div>
            <div className="absolute bottom-10 right-20 w-32 h-32 bg-blue-500 rounded-full opacity-20 animate-float-delay"></div>
            <div className="absolute bottom-20 left-[10%] w-16 h-16 bg-green-300 rounded-full opacity-20 animate-float-slow"></div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Approach
            </h2>
            <p className="text-lg text-gray-600">
              We follow a structured methodology to ensure successful outcomes for all our consulting engagements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processCategories.map((category, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center h-16 w-16 rounded-full ${category.color} mb-6`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section id="services-list" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <ServicesList showTitle={true} />
        </div>
      </section>

      {/* Client Success Stories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Client Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              See how our services have helped leading organizations achieve remarkable results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clientSuccessCases.map((client, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={client.image} 
                    alt={client.client}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">{client.industry}</span>
                    <h3 className="text-xl font-bold text-white mt-2">{client.client}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Service:</span> {client.service}</p>
                  <p className="text-gray-800 font-medium"><span className="text-green-600">Result:</span> {client.result}</p>
                  <Link 
                    href={`/case-studies/${client.client.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center text-green-600 hover:text-green-800 font-medium mt-4 transition-colors group"
                  >
                    Read Case Study
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 animate-fade-in animate-delay-4">
            <Link 
              href="/case-studies" 
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors group"
            >
              View All Case Studies
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <div className="animate-fade-in">
        <ContactForm showMap={false} />
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes floatDelay {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes floatSlow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: floatDelay 8s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-float-slow {
          animation: floatSlow 10s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-delay-1 {
          animation-delay: 100ms;
        }
        
        .animate-delay-2 {
          animation-delay: 200ms;
        }
        
        .animate-delay-3 {
          animation-delay: 300ms;
        }
        
        .animate-delay-4 {
          animation-delay: 400ms;
        }
      `}</style>
    </main>
  );
}