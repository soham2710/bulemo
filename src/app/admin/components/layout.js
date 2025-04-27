// src/app/admin/layout.js
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import AdminHeader from './components/AdminHeader';
import Sidebar from './components/Sidebar';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin Dashboard | Bulemo Consulting',
  description: 'Bulemo Consulting Admin Dashboard',
};

export default async function AdminLayout({ children }) {
  // For protected pages, check session on the server
  // Login page will be handled separately
  if (!(children.props.childProp.segment === 'login')) {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      redirect('/admin/login');
    }
    
    if (session.user.role !== 'admin') {
      redirect('/admin/login?error=Unauthorized');
    }
    
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="flex flex-col min-h-screen">
            <AdminHeader username={session.user.username} />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 bg-gray-100 p-6">{children}</main>
            </div>
          </div>
        </body>
      </html>
    );
  }
  
  // For login page, don't show header and sidebar
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}