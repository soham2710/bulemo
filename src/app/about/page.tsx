'use client';

import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/app/components/sections/ContactForm';

interface Stat {
  value: string;
  label: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface Value {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function AboutPage() {
  // Company statistics
  const stats: Stat[] = [
    { value: "12+", label: "Years of Experience" },
    { value: "200+", label: "Clients Served" },
    { value: "50+", label: "Expert Consultants" },
    { value: "12", label: "Industry Sectors" },
  ];

  // Team members data
  const teamMembers: TeamMember[] = [
    {
      name: "Thabo Nkosi",
      role: "Founder & CEO",
      image: "/images/team/founder.jpg",
      bio: "Thabo has over 20 years of experience in IT consulting and business transformation. Before founding Bulemo Consulting, he held leadership positions at top global consulting firms.",
    },
    {
      name: "Lerato Molefe",
      role: "Chief Operations Officer",
      image: "/images/team/coo.jpg",
      bio: "With extensive experience in operations management, Lerato ensures that our service delivery consistently exceeds client expectations.",
    },
    {
      name: "David van der Merwe",
      role: "Head of Technology",
      image: "/images/team/tech-lead.jpg",
      bio: "David brings 15+ years of experience in IT infrastructure, cloud solutions, and digital transformation to lead our technical initiatives.",
    },
    {
      name: "Priya Naidoo",
      role: "Learning Solutions Director",
      image: "/images/team/learning-director.jpg",
      bio: "Priya specializes in EdTech and learning management solutions, helping organizations build effective training programs.",
    },
  ];

  // Company values
  const values: Value[] = [
    {
      title: "Excellence",
      description: "We strive for excellence in everything we do, from service delivery to client interactions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Innovation",
      description: "We embrace new technologies and approaches to deliver cutting-edge solutions to our clients.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Integrity",
      description: "We conduct our business with honesty, transparency, and ethical practices at all times.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
        </svg>
      ),
    },
    {
      title: "Partnership",
      description: "We build lasting relationships with our clients based on trust, collaboration, and mutual success.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
        <div className="absolute top-0 right-0 h-full w-1/2 bg-green-600 clip-path-about hidden md:block"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0 animate-fade-in-right">
              <div className="max-w-lg">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  About Bulemo Consulting
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  We are a leading technology and business consulting firm dedicated to helping organizations 
                  harness the power of technology to optimize operations, drive growth, and stay ahead 
                  of the competition.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/services" 
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors group flex items-center"
                  >
                    Our Services
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
                  <Link 
                    href="/contact" 
                    className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-medium py-3 px-6 rounded-md transition-colors"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4 animate-fade-in-left">
              <div className="relative mx-auto max-w-md lg:mr-0">
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <Image 
                    src="/images/about/team-meeting.jpg" 
                    alt="Bulemo Consulting Team" 
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute bottom-0 left-0 transform translate-y-1/3 -translate-x-1/4 animate-float">
                  <div className="bg-yellow-500 rounded-lg shadow-lg p-6">
                    <p className="text-xl font-bold text-white">
                      Founded in 2011
                    </p>
                    <p className="text-white/80">
                      Based in Johannesburg, South Africa
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-600">
              Founded in 2011, Bulemo Consulting began with a vision to bridge the gap between 
              technology and business value for organizations in South Africa and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-right">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <Image 
                  src="/images/about/company-history.jpg" 
                  alt="Bulemo Consulting History" 
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="animate-fade-in-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                From Humble Beginnings to Industry Leader
              </h3>
              <p className="text-gray-600 mb-4">
                What started as a small team of passionate consultants has grown into a comprehensive 
                technology and business consulting firm with over 50 expert consultants serving 
                clients across various sectors.
              </p>
              <p className="text-gray-600 mb-6">
                Over the years, we have expanded our service offerings to address the evolving 
                needs of businesses in an increasingly digital world. From change management and 
                learning solutions to cybersecurity and AI services, we provide end-to-end 
                consulting services that help our clients navigate complex business challenges.
              </p>

              <div className="flex flex-wrap gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="flex flex-col animate-fade-in animate-delay-1">
                    <span className="text-3xl font-bold text-green-600">{stat.value}</span>
                    <span className="text-sm text-gray-500">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission and Vision */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-md p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in-up">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                To empower organizations through innovative technology solutions that drive growth, 
                efficiency, and competitive advantage. We are committed to delivering value at every 
                step of the digital transformation journey.
              </p>
              <p className="text-gray-600">
                We achieve this by combining industry expertise, technological knowledge, and a deep 
                understanding of business processes to create tailored solutions that address the 
                unique challenges and opportunities of each client.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in-up animate-delay-2">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600 mb-4">
                To be the most trusted technology and business consulting partner for organizations 
                seeking to thrive in the digital era. We envision a future where businesses leverage 
                technology not just as a tool, but as a strategic asset that drives innovation and creates 
                sustainable value.
              </p>
              <p className="text-gray-600">
                We aim to be at the forefront of technological advancement, constantly evolving our 
                capabilities to help our clients navigate the ever-changing digital landscape with 
                confidence and agility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600">
              These principles guide our actions and decisions as we work to deliver exceptional results for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in-up animation-delay-${index}`}
              >
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Leadership Team
            </h2>
            <p className="text-lg text-gray-600">
              Meet the experienced professionals who lead our organization and drive our mission forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in animate-delay-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors group"
            >
              Join Our Team
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
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0% { transform: translateY(0px) translateX(-25%); }
          50% { transform: translateY(-10px) translateX(-25%); }
          100% { transform: translateY(0px) translateX(-25%); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        
        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
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
        
        /* Add clip path for the diagonal section */
        .clip-path-about {
          clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
        }
      `}</style>
    </main>
  );
}