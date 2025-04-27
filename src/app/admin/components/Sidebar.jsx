'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  Mail, 
  FileText, 
  LogOut, 
  Home 
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      name: 'Contact Entries',
      href: '/admin/contacts',
      icon: <Mail className="h-5 w-5" />
    },
    {
      name: 'Blog Posts',
      href: '/admin/blogs',
      icon: <FileText className="h-5 w-5" />
    }
  ];
  
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav>
          <ul className="space-y-3">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-green-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
            
            <li className="pt-4">
              <Link
                href="/"
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Home className="h-5 w-5" />
                <span>Visit Website</span>
              </Link>
            </li>
            
            <li className="pt-2">
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-red-700 hover:text-white transition-colors w-full"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}