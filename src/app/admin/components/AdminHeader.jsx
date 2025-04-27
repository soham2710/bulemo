'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { UserCircle, ChevronDown } from 'lucide-react';

export default function AdminHeader({ username }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/admin/dashboard" className="text-xl font-bold text-green-600">
            Bulemo Admin
          </Link>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <UserCircle className="h-6 w-6 text-gray-600" />
            <span className="text-gray-700">Welcome, {username}</span>
            <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <Link 
                href="/admin/dashboard" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="/" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Visit Website
              </Link>
              <button 
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}