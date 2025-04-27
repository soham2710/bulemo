// /app/components/layout/HeaderLayout.jsx
'use client';

import { usePathname } from 'next/navigation';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/ui/Footer';

export default function HeaderLayout({ children, footerColumns, socialLinks, contactInfo }) {
  const pathname = usePathname();
  
  // Check if the current path is in the admin section
  const isAdminPage = pathname.startsWith('/admin');
  
  return (
    <>
      {!isAdminPage && <Header />}
      <div className="flex-grow">
        {children}
      </div>
      {!isAdminPage && (
        <Footer 
          columns={footerColumns}
          socialLinks={socialLinks}
          contactInfo={contactInfo}
          newsletter={true}
        />
      )}
    </>
  );
}