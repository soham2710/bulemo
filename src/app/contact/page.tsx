'use client';
import { useEffect, useRef, useState } from 'react';
import ContactForm from '@/app/components/sections/ContactForm';
import Image from 'next/image';
import Link from 'next/link';

interface Office {
  city: string;
  address: string;
  phone: string;
  email: string;
  image: string;
  mapLink: string;
  isPrimary: boolean;
}

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

export default function ContactPage() {
  // Convert faqItems to have state with isOpen property
  const [faqs, setFaqs] = useState<FaqItem[]>([
    {
      question: "What industries do you work with?",
      answer: "We work with a wide range of industries, including finance, healthcare, retail, manufacturing, education, and government. Our solutions are tailored to meet the specific needs of each sector.",
      isOpen: false
    },
    {
      question: "How long does a typical consulting project take?",
      answer: "Project duration varies based on scope and complexity. A simple assessment might take 2-4 weeks, while a comprehensive digital transformation initiative could span several months. We'll provide a detailed timeline during our initial consultation.",
      isOpen: false
    },
    {
      question: "Do you offer ongoing support after project completion?",
      answer: "Yes, we offer various support and maintenance options to ensure your solutions continue to perform optimally. Our team can provide training, troubleshooting, and regular updates as needed.",
      isOpen: false
    },
    {
      question: "How do you charge for your services?",
      answer: "We offer flexible pricing models including project-based, retainer, and time-and-materials arrangements. During our initial consultation, we'll discuss which option best suits your needs and budget.",
      isOpen: false
    },
    {
      question: "Can you work with our existing IT team?",
      answer: "Absolutely. We regularly collaborate with in-house IT teams, providing specialized expertise and additional resources to help achieve your goals. We believe in knowledge transfer and empowering your internal team.",
      isOpen: false
    }
  ]);
  
  // Office locations
  const offices: Office[] = [
    {
      city: "Johannesburg",
      address: "100 West Street, Sandton, Johannesburg, South Africa",
      phone: "+27 (0) 11 456 7890",
      email: "jhb@bulemoconsulting.co.za",
      image: "/images/offices/johannesburg.jpg",
      mapLink: "https://maps.google.com/?q=Sandton,Johannesburg,South Africa",
      isPrimary: true
    },
    {
      city: "Cape Town",
      address: "42 Long Street, Cape Town, South Africa",
      phone: "+27 (0) 21 555 6789",
      email: "cpt@bulemoconsulting.co.za",
      image: "/images/offices/cape-town.jpg",
      mapLink: "https://maps.google.com/?q=Long+Street,Cape+Town,South+Africa",
      isPrimary: false
    },
    {
      city: "Durban",
      address: "28 Umhlanga Rocks Drive, Durban, South Africa",
      phone: "+27 (0) 31 333 4567",
      email: "dbn@bulemoconsulting.co.za",
      image: "/images/offices/durban.jpg",
      mapLink: "https://maps.google.com/?q=Umhlanga+Rocks+Drive,Durban,South+Africa",
      isPrimary: false
    }
  ];

  // Handle FAQ toggling with React state instead of DOM manipulation
  const toggleFaq = (index: number) => {
    setFaqs(prevFaqs => prevFaqs.map((faq, i) => ({
      ...faq,
      isOpen: i === index ? !faq.isOpen : false
    })));
  };

  return (
    <main className="overflow-hidden">
      {/* Hero Section with animation */}
      <section className="relative py-20 md:py-28 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="absolute inset-0 bg-opacity-70 bg-pattern"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Bulemo Consulting
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Reach out to us for a consultation, and let's discuss how we can help transform your business 
              through innovative technology solutions and expert guidance.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact-form" 
                className="group bg-white hover:bg-gray-100 text-green-800 font-medium py-3 px-6 rounded-md transition-colors flex items-center animate-fade-in-up animate-delay-200"
              >
                Get in Touch
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
                href="/services" 
                className="group bg-transparent hover:bg-white/10 text-white border-2 border-white font-medium py-3 px-6 rounded-md transition-colors flex items-center animate-fade-in-up animate-delay-300"
              >
                Explore Our Services
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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

      {/* Contact Form Section */}
      <div id="contact-form" className="animate-fade-in">
        <ContactForm showMap={true} />
      </div>

      {/* Office Locations */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Offices
            </h2>
            <p className="text-lg text-gray-600">
              Visit us at one of our offices across South Africa. We'd love to meet you in person.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-fade-in animate-delay-${index + 1} ${
                  office.isPrimary ? 'border-2 border-green-500' : ''
                }`}
              >
                <div className="relative h-48 overflow-hidden group">
                  <Image 
                    src={office.image} 
                    alt={`${office.city} Office`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-110 transition-transform duration-500"
                  />
                  {office.isPrimary && (
                    <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Headquarters
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{office.city}</h3>
                  <p className="text-gray-600 mb-4">{office.address}</p>
                  
                  <div className="space-y-2 mb-6">
                    <p className="flex items-center text-gray-600 group">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="hover:text-green-600 transition-colors">
                        {office.phone}
                      </a>
                    </p>
                    <p className="flex items-center text-gray-600 group">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${office.email}`} className="hover:text-green-600 transition-colors">
                        {office.email}
                      </a>
                    </p>
                  </div>
                  
                  <a 
                    href={office.mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-green-600 hover:text-green-800 font-medium transition-colors group"
                  >
                    View on Map
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with accordion using React state */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about working with Bulemo Consulting.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden animate-fade-in animate-delay-2">
            <dl className="divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="faq-item overflow-hidden transition-all duration-300 animate-fade-in animate-delay-3"
                >
                  <dt 
                    className="text-lg font-semibold text-gray-800 p-6 cursor-pointer hover:bg-gray-50 transition-colors flex justify-between items-center"
                    onClick={() => toggleFaq(index)}
                  >
                    {faq.question}
                    <svg 
                      className={`h-6 w-6 text-green-600 transform transition-transform ${faq.isOpen ? 'rotate-180' : ''}`} 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </dt>
                  <dd className={`text-gray-600 px-6 pb-6 pt-0 transition-all duration-300 ${faq.isOpen ? 'block' : 'hidden'}`}>
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="max-w-3xl mx-auto text-center mt-12 animate-fade-in animate-delay-4">
            <p className="text-gray-600 mb-6">
              Don't see your question here? Reach out to us directly and we'll be happy to help.
            </p>
            <a 
              href="#contact-form" 
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 hover:pl-4 hover:pr-8 group"
            >
              Contact Us
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Career Opportunities CTA */}
      <section className="py-16 md:py-20 bg-gray-800 text-white relative overflow-hidden animate-fade-in">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute h-40 w-40 rounded-full bg-green-500 top-0 left-[20%] animate-float"></div>
          <div className="absolute h-24 w-24 rounded-full bg-yellow-500 bottom-10 right-[10%] animate-float-delay"></div>
          <div className="absolute h-32 w-32 rounded-full bg-blue-500 top-20 right-[30%] animate-float-slow"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Join Our Growing Team
              </h2>
              <p className="text-gray-300">
                Interested in working with us? We're always looking for talented individuals to join our team.
              </p>
            </div>
            <Link 
              href="/careers" 
              className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center group whitespace-nowrap"
            >
              View Careers
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

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
        
        .animate-delay-200 {
          animation-delay: 200ms;
        }
        
        .animate-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </main>
  );
}