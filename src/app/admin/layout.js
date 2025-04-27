'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import AdminHeader from './components/AdminHeader';
import Sidebar from './components/Sidebar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  
  // Check if current page is login page
  const isLoginPage = pathname === '/admin/login';
  
  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle authentication
  useEffect(() => {
    // Skip authentication check for login page
    if (isLoginPage) return;
    
    if (status === 'unauthenticated') {
      // Redirect to login if not authenticated
      router.push('/admin/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      // Redirect if authenticated but not admin
      router.push('/admin/login?error=Unauthorized');
    }
  }, [status, session, router, isLoginPage]);
  
  // Show loading state while checking authentication
  if (!isClient || (!isLoginPage && status === 'loading')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }
  
  // For login page, don't show admin layout
  if (isLoginPage) {
    return (
      <div className={inter.className}>
        {children}
      </div>
    );
  }
  
  // If not authenticated or not admin, and not login page, show loading
  if ((status !== 'authenticated' || session?.user?.role !== 'admin') && !isLoginPage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }
  
  // For authenticated admin pages, show the admin layout
  return (
    <div className={`${inter.className} flex flex-col min-h-screen`}>
      <AdminHeader username={session?.user?.username || 'Admin'} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-100 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}