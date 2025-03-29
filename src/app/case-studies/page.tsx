'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ContactForm from '@/app/components/sections/ContactForm';

// Case study type definition
interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  service: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
  logo: string;
  featured: boolean;
  tags: string[];
}

export default function CaseStudiesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredCaseStudies, setFilteredCaseStudies] = useState<CaseStudy[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Case studies data
  const caseStudies: CaseStudy[] = [
    {
      id: 'standard-bank-digital-transformation',
      title: 'Digital Banking Platform Transformation',
      client: 'Standard Bank',
      industry: 'Financial Services',
      service: 'Digital Transformation',
      challenge: 'Legacy systems were limiting customer experience and operational efficiency.',
      solution: 'Implemented a comprehensive digital transformation strategy with cloud migration and user-centric design.',
      result: '40% increase in digital customer engagement and 25% reduction in operational costs.',
      image: '/images/case-studies/standard-bank.jpg',
      logo: '/images/clients/standard-bank-logo.png',
      featured: true,
      tags: ['Digital Transformation', 'Financial Services', 'User Experience']
    },
    {
      id: 'discovery-health-cybersecurity',
      title: 'Enterprise-Wide Security Enhancement',
      client: 'Discovery Health',
      industry: 'Healthcare',
      service: 'Cybersecurity',
      challenge: 'Meeting stringent regulatory requirements while protecting sensitive patient data.',
      solution: 'Implemented advanced security measures and established comprehensive compliance protocols.',
      result: 'Enhanced security posture with full POPIA compliance and zero data breaches for 24+ months.',
      image: '/images/case-studies/discovery-health.jpg',
      logo: '/images/clients/discovery-logo.png',
      featured: true,
      tags: ['Cybersecurity', 'Healthcare', 'Compliance']
    },
    {
      id: 'woolworths-learning-management',
      title: 'Retail Staff Training Platform',
      client: 'Woolworths',
      industry: 'Retail',
      service: 'EdTech Solutions',
      challenge: 'Inefficient training processes resulting in high costs and inconsistent customer service.',
      solution: 'Deployed a custom LMS with mobile learning capabilities and performance analytics.',
      result: '25% reduction in training time and 18% improvement in customer satisfaction scores.',
      image: '/images/case-studies/woolworths.jpg',
      logo: '/images/clients/woolworths-logo.png',
      featured: true,
      tags: ['EdTech Solutions', 'Retail', 'Training']
    },
    {
      id: 'mtn-ai-chatbot-implementation',
      title: 'AI-Powered Customer Support Solution',
      client: 'MTN Group',
      industry: 'Telecommunications',
      service: 'AI Services & Automation',
      challenge: 'High volume of repetitive customer inquiries overwhelming support staff.',
      solution: 'Developed an AI chatbot with natural language processing and integration with core systems.',
      result: '70% of routine inquiries now handled by the chatbot, 30% reduction in support costs.',
      image: '/images/case-studies/mtn.jpg',
      logo: '/images/clients/mtn-logo.png',
      featured: false,
      tags: ['AI Services', 'Telecommunications', 'Customer Support']
    },
    {
      id: 'sasol-data-analytics-platform',
      title: 'Operational Intelligence Dashboard',
      client: 'Sasol',
      industry: 'Energy',
      service: 'Data Analytics',
      challenge: 'Difficulty extracting actionable insights from vast amounts of operational data.',
      solution: 'Built a comprehensive data analytics platform with real-time visualization and predictive capabilities.',
      result: '15% efficiency improvement in production processes and early issue detection.',
      image: '/images/case-studies/sasol.jpg',
      logo: '/images/clients/sasol-logo.png',
      featured: false,
      tags: ['Data Analytics', 'Energy', 'Operational Efficiency']
    },
    {
      id: 'multichoice-project-management',
      title: 'Streaming Platform Launch',
      client: 'MultiChoice',
      industry: 'Media & Entertainment',
      service: 'Project Management',
      challenge: 'Complex, multi-stakeholder project with tight deadlines and technical integration requirements.',
      solution: 'Applied agile project management methodologies with clear milestones and communication channels.',
      result: 'Successful platform launch ahead of schedule with 1.2 million subscriber sign-ups in first quarter.',
      image: '/images/case-studies/multichoice.jpg',
      logo: '/images/clients/multichoice-logo.png',
      featured: false,
      tags: ['Project Management', 'Media', 'Technology Integration']
    }
  ];

  // Filter categories derived from case studies
  const filterCategories = [
    'all',
    ...Array.from(new Set(caseStudies.flatMap(study => study.tags)))
  ];

  // Initialize filtered case studies on mount
  useEffect(() => {
    setFilteredCaseStudies(caseStudies);
  }, [caseStudies]);

  // Handle visibility for animations
  useEffect(() => {
    setIsVisible(true);
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
  
    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
  
    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    
    if (filter === 'all') {
      setFilteredCaseStudies(caseStudies);
    } else {
      const filtered = caseStudies.filter(study => study.tags.includes(filter));
      setFilteredCaseStudies(filtered);
    }
  };

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
              Case Studies
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Explore our success stories and learn how we&apos;ve helped leading organizations across 
              various industries overcome challenges and achieve their goals.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#featured-case-studies" 
                className="bg-white hover:bg-gray-100 text-green-800 font-medium py-3 px-6 rounded-md transition-colors group flex items-center"
              >
                View Success Stories
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
                Discuss Your Project
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

      {/* Featured Case Studies */}
      <section id="featured-case-studies" className="py-16 md:py-24" ref={sectionRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Featured Case Studies
            </h2>
            <p className="text-lg text-gray-600">
              Discover how we&aposve driven transformative results for these leading organizations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-12 mb-16">
            {caseStudies.filter(study => study.featured).map((study, index) => (
              <div 
                key={study.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 relative">
                    <div className="relative h-64 lg:h-full w-full">
                      <Image 
                        src={study.image} 
                        alt={study.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="absolute top-4 left-4 bg-white rounded-md p-2 shadow-md">
                      <div className="relative h-8 w-24">
                        <Image 
                          src={study.logo} 
                          alt={study.client}
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded">
                          {study.industry}
                        </span>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded">
                          {study.service}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">{study.title}</h3>
                      <p className="text-gray-600 mb-6">{study.challenge}</p>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="text-md font-semibold text-gray-800">Our Solution:</h4>
                          <p className="text-gray-600">{study.solution}</p>
                        </div>
                        <div>
                          <h4 className="text-md font-semibold text-gray-800">Results:</h4>
                          <p className="text-green-600 font-medium">{study.result}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/case-studies/${study.id}`}
                      className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors self-start group"
                    >
                      Read Full Case Study
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Case Study Filters */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in animate-delay-3">
              {filterCategories.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => handleFilterChange(filter)}
                  className={`px-4 py-2 rounded-md font-medium transition-all text-sm md:text-base ${
                    activeFilter === filter
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-200'
                  }`}
                >
                  {filter === 'all' ? 'All Case Studies' : filter}
                </button>
              ))}
            </div>
          </div>
          
          {/* All Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((study, index) => (
              <div 
                key={study.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={study.image} 
                    alt={study.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white rounded-md p-1 shadow-md">
                    <div className="relative h-6 w-16">
                      <Image 
                        src={study.logo} 
                        alt={study.client}
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">{study.industry}</span>
                    <h3 className="text-lg font-bold text-white mt-2">{study.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800">Challenge:</h4>
                    <p className="text-gray-600 text-sm line-clamp-2">{study.challenge}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800">Result:</h4>
                    <p className="text-green-600 font-medium text-sm">{study.result}</p>
                  </div>
                  <Link 
                    href={`/case-studies/${study.id}`}
                    className="inline-flex items-center text-green-600 hover:text-green-800 font-medium transition-colors text-sm group"
                  >
                    Read Full Case Study
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCaseStudies.length === 0 && (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Case Studies Found</h3>
              <p className="text-gray-500 mb-4">There are no case studies that match your selected filter.</p>
              <button
                onClick={() => handleFilterChange('all')}
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                View All Case Studies
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-green-600 to-green-800 rounded-xl shadow-xl overflow-hidden animate-fade-in">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 text-white">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
                <p className="text-green-100 mb-6">
                  Let&apos;s discuss how Bulemo Consulting can help your organization overcome challenges, 
                  optimize operations, and achieve sustainable growth through innovative technology solutions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/contact" 
                    className="bg-white hover:bg-gray-100 text-green-800 font-medium py-3 px-6 rounded-md transition-colors group flex items-center"
                  >
                    Start a Conversation
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link 
                    href="/services" 
                    className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-medium py-3 px-6 rounded-md transition-colors"
                  >
                    Explore Our Services
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 relative hidden md:block">
                <div className="absolute inset-0 bg-black/20"></div>
                <Image 
                  src="/images/cta-background.jpg" 
                  alt="Bulemo Consulting Team Meeting"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
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