'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This is a simple redirect page
export default function AdminPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to dashboard
    router.push('/admin/dashboard');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
    </div>
  );
}