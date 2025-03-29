import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/ui/Footer';

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
  const socialLinks: { platform: "linkedin" | "twitter" | "facebook" | "instagram" | "youtube"; href: string; ariaLabel: string; }[] = [
    { platform: "linkedin", href: "https://www.linkedin.com/company/bulemo-consulting", ariaLabel: "LinkedIn" },
    { platform: "twitter", href: "https://twitter.com/bulemoconsulting", ariaLabel: "Twitter" },
    { platform: "facebook", href: "https://www.facebook.com/bulemoconsulting", ariaLabel: "Facebook" }
  ];

  // Footer contact info
  const contactInfo = {
    address: "100 West Street, Sandton, Johannesburg, South Africa",
    phone: "+27 (0) 11 456 7890",
    email: "info@bulemoconsulting.co.za"
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        <Footer 
          columns={footerColumns}
          socialLinks={socialLinks}
          contactInfo={contactInfo}
          newsletter={true}
        />
      </body>
    </html>
  );
}