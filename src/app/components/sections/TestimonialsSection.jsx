"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      quote: "Bulemo Consulting transformed our digital strategy and helped us implement new technologies that have significantly improved our operational efficiency. Their team's expertise in change management made the transition seamless for our employees.",
      author: "Thabo Mbeki",
      position: "CIO, Standard Bank South Africa",
      company: "Standard Bank South Africa",
      image: "/testimonial-1.jpg",
      rating: 5
    },
    {
      id: 2,
      quote: "The cybersecurity audit conducted by Bulemo Consulting was comprehensive and identified vulnerabilities we weren't aware of. Their team provided practical solutions that were easy to implement, and we now have a much more robust security posture.",
      author: "Noluthando Nkosi",
      position: "Head of IT Security",
      company: "Discovery Health",
      image: "/testimonial-2.jpg",
      rating: 5
    },
    {
      id: 3,
      quote: "Implementing our new Learning Management System with Bulemo Consulting was a game-changer. Their custom solution perfectly addressed our training needs, and the analytics provided valuable insights into employee performance and engagement.",
      author: "Jonathan van der Merwe",
      position: "HR Director",
      company: "Woolworths Holdings",
      image: "/testimonial-3.jpg",
      rating: 4
    },
    {
      id: 4,
      quote: "Bulemo's AI and automation services helped us streamline our customer support processes. The chatbot they developed handles over 70% of routine inquiries, allowing our team to focus on more complex customer needs. The ROI has been remarkable.",
      author: "Priya Naicker",
      position: "Customer Experience Manager",
      company: "MTN Group",
      image: "/testimonial-4.jpg",
      rating: 5
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`h-5 w-5 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section 
      className="py-16 md:py-24 bg-gradient-to-br from-green-900 to-blue-900 text-white relative overflow-hidden"
      ref={sectionRef}
    >
      {/* South African-inspired pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-repeat" 
             style={{ 
               backgroundImage: "url('/images/patterns/pattern.svg')", 
               backgroundSize: "50px" 
             }}>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            What Our Clients Say
          </h2>
          <p className={`text-lg text-green-100 max-w-3xl mx-auto transition-opacity duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Our success is measured by the success of our clients. Here's what some of them have to say about working with Bulemo Consulting.
          </p>
        </div>
        
        {/* Testimonial display */}
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`transition-all duration-700 transform ${
                activeIndex === index 
                  ? 'opacity-100 translate-x-0 relative z-10' 
                  : 'opacity-0 absolute top-0 left-0 right-0 translate-x-10'
              }`}
            >
              {activeIndex === index && (
                <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 text-gray-800">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                    
                    {/* Author image - mobile: top, desktop: left */}
                    <div className="mx-auto md:mx-0">
                      <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-green-100">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      {/* Rating */}
                      <div className="flex space-x-1 mb-4 justify-center md:justify-start">
                        {renderStars(testimonial.rating)}
                      </div>
                      
                      {/* Quote */}
                      <blockquote className="text-gray-700 text-lg mb-6 italic relative">
                        <span className="absolute -top-4 -left-2 text-green-500 text-5xl opacity-20">"</span>
                        {testimonial.quote}
                        <span className="absolute -bottom-4 -right-2 text-green-500 text-5xl opacity-20">"</span>
                      </blockquote>
                      
                      {/* Author info */}
                      <div className="text-center md:text-left">
                        <div className="font-bold text-gray-900 text-lg">
                          {testimonial.author}
                        </div>
                        <div className="text-green-700">
                          {testimonial.position}
                        </div>
                        <div className="text-sm text-gray-500">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Dots navigation */}
        <div className={`flex justify-center mt-8 space-x-2 transition-opacity duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;