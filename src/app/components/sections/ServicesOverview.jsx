import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Briefcase, 
  BookOpen, 
  ShieldCheck, 
  GraduationCap, 
  ClipboardList, 
  Server, 
  Cpu, 
  BarChart2, 
  Database, 
  Workflow, 
  AlertCircle, 
  Megaphone 
} from 'lucide-react';

const ServicesOverview = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation effect when changing tabs
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Services data with Lucide icons
  const services = [
    {
      title: "User Adoption & Change Management",
      icon: <Briefcase className="h-6 w-6 text-green-600" />,
      description: "Facilitate successful technology adoption with comprehensive change management strategies that ensure smooth transitions across your organization.",
      features: [
        "Change Readiness Assessments",
        "Stakeholder Engagement Plans",
        "Training and Support Programs",
        "Digital Adoption Platforms"
      ],
      color: "#4CAF50", // Primary green
      image: "/api/placeholder/800/600"
    },
    {
      title: "EdTech Solutions & LMS",
      icon: <BookOpen className="h-6 w-6 text-green-800" />,
      description: "Streamline corporate training and educational initiatives with custom learning solutions designed to meet your specific needs.",
      features: [
        "Custom LMS Development",
        "E-Learning Content Creation",
        "AI-Powered Learning Analytics",
        "Training Platform Implementation"
      ],
      color: "#1E5631", // Dark green
      image: "/api/placeholder/800/600"
    },
    {
      title: "Cybersecurity & Data Security",
      icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
      description: "Protect your business against threats and ensure compliance with regulations with our comprehensive security services.",
      features: [
        "Risk Assessments & Security Audits",
        "Compliance Consultation",
        "Security Awareness Training",
        "Incident Response Planning"
      ],
      color: "#1E88E5", // South African blue
      image: "/api/placeholder/800/600"
    },
    {
      title: "Training & Implementation",
      icon: <GraduationCap className="h-6 w-6 text-yellow-500" />,
      description: "Streamline application deployment with comprehensive training solutions that empower your team to excel.",
      features: [
        "Corporate Training Programs",
        "Custom Training Materials",
        "Application Implementation",
        "User Support Services"
      ],
      color: "#FBC02D", // South African yellow
      image: "/api/placeholder/800/600"
    },
    {
      title: "Project Management",
      icon: <ClipboardList className="h-6 w-6 text-green-600" />,
      description: "Ensure successful execution of business initiatives with expert project management services tailored to your organization.",
      features: [
        "End-to-End Project Management",
        "Agile & Waterfall Methodologies",
        "Project Resourcing",
        "Staff Augmentation"
      ],
      color: "#4CAF50", // Primary green
      image: "/api/placeholder/800/600"
    },
    {
      title: "IT Procurement & Advisory",
      icon: <Server className="h-6 w-6 text-green-800" />,
      description: "Select the right technology solutions that align with your business needs and goals with our expert guidance.",
      features: [
        "Hardware & Software Procurement",
        "Vendor Selection",
        "Contract Negotiation",
        "Cloud Services Advisory"
      ],
      color: "#1E5631", // Dark green
      image: "/api/placeholder/800/600"
    },
    {
      title: "AI Services & Automation",
      icon: <Cpu className="h-6 w-6 text-blue-600" />,
      description: "Streamline business processes and drive efficiency with intelligent AI solutions that transform your operations.",
      features: [
        "Process Workflow Automation",
        "AI-Powered Chatbots",
        "Social Media Automation",
        "Predictive Analytics"
      ],
      color: "#1E88E5", // South African blue
      image: "/api/placeholder/800/600"
    },
    {
      title: "Business Process Optimization",
      icon: <Workflow className="h-6 w-6 text-red-600" />,
      description: "Enhance efficiency and reduce costs by analyzing and redesigning business processes with our proven methodologies.",
      features: [
        "Business Process Mapping",
        "Process Redesign",
        "Performance Metrics & KPIs",
        "Operational Efficiency Analysis"
      ],
      color: "#E53935", // South African red
      image: "/api/placeholder/800/600"
    },
    {
      title: "Data Analytics & Business Intelligence",
      icon: <BarChart2 className="h-6 w-6 text-green-600" />,
      description: "Make informed decisions based on actionable insights from your business data with our analytics expertise.",
      features: [
        "Data Visualization",
        "Big Data Solutions",
        "Advanced Reporting",
        "Performance Dashboards"
      ],
      color: "#4CAF50", // Primary green
      image: "/api/placeholder/800/600"
    },
    {
      title: "Digital Transformation",
      icon: <Database className="h-6 w-6 text-green-800" />,
      description: "Embrace new technologies and strategies to stay competitive in the digital age with our comprehensive transformation approach.",
      features: [
        "Digital Strategy Development",
        "Change Management Support",
        "Innovation Workshops",
        "Technology Roadmapping"
      ],
      color: "#1E5631", // Dark green
      image: "/api/placeholder/800/600"
    },
    {
      title: "Compliance & Risk Management",
      icon: <AlertCircle className="h-6 w-6 text-yellow-500" />,
      description: "Protect your business from potential threats and ensure regulatory compliance with our specialized expertise.",
      features: [
        "Regulatory Compliance Audits",
        "Risk Assessments",
        "Disaster Recovery Planning",
        "POPIA & GDPR Compliance"
      ],
      color: "#FBC02D", // South African yellow
      image: "/api/placeholder/800/600"
    },
    {
      title: "Marketing & Branding",
      icon: <Megaphone className="h-6 w-6 text-red-600" />,
      description: "Enhance your online presence and connect with your target audience effectively through strategic marketing solutions.",
      features: [
        "Brand Strategy & Development",
        "Digital Marketing Services",
        "Social Media Management",
        "Content Marketing"
      ],
      color: "#E53935", // South African red
      image: "/api/placeholder/800/600"
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive solutions to address the unique needs of organizations in various sectors.
          </p>
        </div>

        {/* Tabs - Carousel style for mobile */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 overflow-x-auto pb-4">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-3 rounded-md font-medium transition-all duration-300 transform whitespace-nowrap
                ${activeTab === index
                  ? 'bg-green-600 text-white shadow-md scale-105'
                  : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-200'
                }`}
            >
              <div className="flex items-center space-x-2">
                <span className={`transition-all duration-300 ${activeTab === index ? 'opacity-100' : 'opacity-70'}`}>
                  {React.cloneElement(service.icon, { className: `h-5 w-5 ${activeTab === index ? 'text-white' : ''}` })}
                </span>
                <span>{service.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Service Content with Animation */}
        <div 
          className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 transform ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <div className="flex flex-col md:flex-row">
            {/* Service Image - Left side, now larger */}
            <div className="md:w-3/5 relative h-80 md:h-auto">
              <Image
                src={services[activeTab].image}
                alt={services[activeTab].title}
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm text-white mb-4">
                  {React.cloneElement(services[activeTab].icon, { className: "h-8 w-8" })}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white drop-shadow-md">{services[activeTab].title}</h3>
              </div>
            </div>
            
            {/* Service Details - Right side */}
            <div className="md:w-2/5 p-6 md:p-8">
              <div className="flex items-center mb-4">
                <div className="mr-3 hidden md:block">
                  {React.cloneElement(services[activeTab].icon, { className: "h-6 w-6 text-green-600" })}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 hidden md:block">{services[activeTab].title}</h3>
              </div>
              
              <p className="text-gray-600 mb-6">{services[activeTab].description}</p>

              <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Features:</h4>

              <ul className="mb-8 space-y-3">
                {services[activeTab].features.map((feature, index) => (
                  <li key={index} className="flex items-start transform transition-all duration-300 hover:translate-x-2">
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

              <button
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-all duration-300 transform hover:translate-x-1 hover:shadow-md"
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these styles to your global CSS file or component
const GlobalStyles = () => (
  <style jsx global>{`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.5s ease-in-out;
    }
  `}</style>
);

export default function ServicesWithStyles() {
  return (
    <>
      <GlobalStyles />
      <ServicesOverview />
    </>
  );
}