import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import NextAuthProvider from './providers';
import HeaderLayout from '@/app/components/layout/HeaderLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bulemo Consulting | Technology & Business Solutions',
  description: 'Bulemo Consulting helps organizations leverage technology to optimize operations, drive growth, and stay ahead of the competition.',
  keywords: 'technology consulting, business consulting, IT services, digital transformation, South Africa',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // Footer navigation data
  const footerColumns = [
    {
      title: "Services",
      links: [
        { label: "Digital Transformation", href: "/services/digital-transformation" },
        { label: "Cybersecurity", href: "/services/cybersecurity" },
        { label: "AI Services", href: "/services/ai-services" },
        { label: "EdTech Solutions", href: "/services/edtech-solutions" },
        { label: "Project Management", href: "/services/project-management" },
        { label: "All Services", href: "/services" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/about#team" },
        { label: "Careers", href: "/careers" },
        { label: "Partners", href: "/partners" },
        { label: "Press & Media", href: "/media" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Case Studies", href: "/case-studies" },
        { label: "Blog", href: "/blog" },
        { label: "Knowledge Base", href: "/resources" },
        { label: "Events", href: "/events" },
        { label: "Newsletter", href: "/newsletter" }
      ]
    }
  ];

  // Footer social links
  const socialLinks = [
    { platform: "linkedin", href: "https://www.linkedin.com/company/bulemo-consulting", ariaLabel: "LinkedIn" },
    { platform: "twitter", href: "https://twitter.com/bulemoconsulting", ariaLabel: "Twitter" },
    { platform: "facebook", href: "https://www.facebook.com/bulemoconsulting", ariaLabel: "Facebook" }
  ];

  // Footer contact info
  const contactInfo = {
    address: "1254 hurdles Avenue Weltevredenpark, roodepoort, johannesburg, gauteng, South Africa, 1709",
    phone: "+27 (0) 71 601 5038",
    email: "consulting@bulemo.co.za"
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <NextAuthProvider>
          <HeaderLayout 
            footerColumns={footerColumns}
            socialLinks={socialLinks}
            contactInfo={contactInfo}
          >
            {children}
          </HeaderLayout>
        </NextAuthProvider>
      </body>
    </html>
  );
}