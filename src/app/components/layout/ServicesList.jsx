"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ServicesList = ({ showTitle = true, limit = 0, containerStyles = "" }) => {
  // Service categories with South African themed colors
  const serviceCategories = [
    {
      id: "user-adoption",
      title: "User Adoption & Change Management",
      description: "Facilitate successful technology adoption with comprehensive change management strategies.",
      icon: "/user-adoption.jpg",
      color: "#4CAF50", // Primary green
      services: [
        "Change Readiness Assessments",
        "Stakeholder Engagement Plans",
        "Training and Support Programs",
        "Digital Adoption Platforms"
      ]
    },
    {
      id: "edtech-solutions",
      title: "EdTech Solutions & LMS",
      description: "Streamline corporate training and educational initiatives with custom learning solutions.",
      icon: "/edtech.jpg",
      color: "#1E5631", // Dark green
      services: [
        "Custom LMS Development",
        "E-Learning Content Creation",
        "AI-Powered Learning Analytics",
        "Training Platform Implementation"
      ]
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity & Data Security",
      description: "Protect your business against threats and ensure compliance with regulations.",
      icon: "/cybersecurity.jpg",
      color: "#1E88E5", // South African blue
      services: [
        "Risk Assessments & Security Audits",
        "Compliance Consultation",
        "Security Awareness Training",
        "Incident Response Planning"
      ]
    },
    {
      id: "training",
      title: "Training & Implementation",
      description: "Streamline application deployment with comprehensive training solutions.",
      icon: "/training.jpg",
      color: "#FBC02D", // South African yellow
      services: [
        "Corporate Training Programs",
        "Custom Training Materials",
        "Application Implementation",
        "User Support Services"
      ]
    },
    {
      id: "project-management",
      title: "Project Management",
      description: "Ensure successful execution of business initiatives with expert project management.",
      icon: "/images/service-icons/project-management.svg",
      color: "#4CAF50", // Primary green
      services: [
        "End-to-End Project Management",
        "Agile & Waterfall Methodologies",
        "Project Resourcing",
        "Staff Augmentation"
      ]
    },
    {
      id: "it-procurement",
      title: "IT Procurement & Advisory",
      description: "Select the right technology solutions that align with your business needs and goals.",
      icon: "/images/service-icons/it-procurement.svg",
      color: "#1E5631", // Dark green
      services: [
        "Hardware & Software Procurement",
        "Vendor Selection",
        "Contract Negotiation",
        "Cloud Services Advisory"
      ]
    },
    {
      id: "ai-services",
      title: "AI Services & Automation",
      description: "Streamline business processes and drive efficiency with intelligent AI solutions.",
      icon: "/images/service-icons/ai-services.svg",
      color: "#1E88E5", // South African blue
      services: [
        "Process Workflow Automation",
        "AI-Powered Chatbots",
        "Social Media Automation",
        "Predictive Analytics"
      ]
    },
    {
      id: "process-optimization",
      title: "Business Process Optimization",
      description: "Enhance efficiency and reduce costs by analyzing and redesigning business processes.",
      icon: "/images/service-icons/process-optimization.svg",
      color: "#E53935", // South African red
      services: [
        "Business Process Mapping",
        "Process Redesign",
        "Performance Metrics & KPIs",
        "Operational Efficiency Analysis"
      ]
    },
    {
      id: "data-analytics",
      title: "Data Analytics & Business Intelligence",
      description: "Make informed decisions based on actionable insights from your business data.",
      icon: "/images/service-icons/data-analytics.svg",
      color: "#4CAF50", // Primary green
      services: [
        "Data Visualization",
        "Big Data Solutions",
        "Advanced Reporting",
        "Performance Dashboards"
      ]
    },
    {
      id: "digital-transformation",
      title: "Digital Transformation",
      description: "Embrace new technologies and strategies to stay competitive in the digital age.",
      icon: "/images/service-icons/digital-transformation.svg",
      color: "#1E5631", // Dark green
      services: [
        "Digital Strategy Development",
        "Change Management Support",
        "Innovation Workshops",
        "Technology Roadmapping"
      ]
    },
    {
      id: "compliance",
      title: "Compliance & Risk Management",
      description: "Protect your business from potential threats and ensure regulatory compliance.",
      icon: "/images/service-icons/compliance.svg",
      color: "#FBC02D", // South African yellow
      services: [
        "Regulatory Compliance Audits",
        "Risk Assessments",
        "Disaster Recovery Planning",
        "POPIA & GDPR Compliance"
      ]
    },
    {
      id: "marketing",
      title: "Marketing & Branding",
      description: "Enhance your online presence and connect with your target audience effectively.",
      icon: "/images/service-icons/marketing.svg",
      color: "#E53935", // South African red
      services: [
        "Brand Strategy & Development",
        "Digital Marketing Services",
        "Social Media Management",
        "Content Marketing"
      ]
    }
  ];

  // Filter services if limit is provided
  const displayedServices = limit > 0 
    ? serviceCategories.slice(0, limit) 
    : serviceCategories;
  
  const [activeService, setActiveService] = useState(null);

  return (
    <div className={`w-full ${containerStyles}`}>
      {showTitle && (
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive solutions to address the unique needs of organizations in various sectors.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedServices.map((service) => (
          <div 
            key={service.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            onMouseEnter={() => setActiveService(service.id)}
            onMouseLeave={() => setActiveService(null)}
          >
            <div 
              className={`h-2 w-full`}
              style={{ backgroundColor: service.color }}
            ></div>
            <div className="p-6">
              <div className="flex items-start mb-4">
                <div className="relative h-12 w-12 mr-4 flex-shrink-0">
                  <Image 
                    src={service.icon} 
                    alt={service.title}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {service.title}
                </h3>
              </div>
              
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              
              <ul className="mb-6 space-y-2">
                {service.services.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href={`/services/${service.id}`}
                className={`inline-block py-2 px-4 rounded transition-colors
                  ${activeService === service.id 
                    ? 'bg-green-600 text-white' 
                    : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {limit > 0 && (
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
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
      )}
    </div>
  );
};

export default ServicesList;