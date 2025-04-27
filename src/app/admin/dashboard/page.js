// src/app/admin/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    contacts: 0,
    blogs: 0,
    draftBlogs: 0,
    publishedBlogs: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fetch dashboard stats
  useEffect(() => {
    async function fetchStats() {
      try {
        setIsLoading(true);
        
        // Fetch contacts stats
        const contactsRes = await fetch('/api/contact');
        const contactsData = await contactsRes.json();
        
        // Fetch blogs stats
        const blogsRes = await fetch('/api/blogs');
        const blogsData = await blogsRes.json();
        
        // Count draft and published blogs
        const draftBlogsCount = blogsData.data.filter(blog => blog.status === 'draft').length;
        const publishedBlogsCount = blogsData.data.filter(blog => blog.status === 'published').length;
        
        setStats({
          contacts: contactsData.pagination.total || 0,
          blogs: blogsData.pagination.total || 0,
          draftBlogs: draftBlogsCount,
          publishedBlogs: publishedBlogsCount
        });
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard stats');
        setIsLoading(false);
      }
    }
    
    fetchStats();
  }, []);
  
  const StatCard = ({ title, value, icon, linkText, linkHref, bgColor }) => (
    <div className={`${bgColor} rounded-lg shadow-md p-6 text-white`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="text-white opacity-80">{icon}</div>
      </div>
      {linkText && linkHref && (
        <Link 
          href={linkHref}
          className="inline-block mt-4 text-sm font-medium text-white hover:underline"
        >
          {linkText} &rarr;
        </Link>
      )}
    </div>
  );
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 mb-6">
        <p>{error}</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Contact Submissions" 
          value={stats.contacts}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
          linkText="View All Contacts"
          linkHref="/admin/contacts"
          bgColor="bg-blue-600"
        />
        
        <StatCard 
          title="Total Blog Posts" 
          value={stats.blogs}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          }
          linkText="Manage Blog Posts"
          linkHref="/admin/blogs"
          bgColor="bg-green-600"
        />
        
        <StatCard 
          title="Published Blogs" 
          value={stats.publishedBlogs}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          linkHref="/admin/blogs"
          bgColor="bg-purple-600"
        />
        
        <StatCard 
          title="Draft Blogs" 
          value={stats.draftBlogs}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          }
          linkHref="/admin/blogs"
          bgColor="bg-yellow-600"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Quick Actions</h2>
          </div>
          
          <div className="space-y-4">
            <Link
              href="/admin/blogs/create"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Create New Blog Post</h3>
                <p className="text-sm text-gray-500">Add a new article to your blog</p>
              </div>
            </Link>
            
            <Link
              href="/admin/contacts"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">View Contact Submissions</h3>
                <p className="text-sm text-gray-500">Check recent inquiries from the contact form</p>
              </div>
            </Link>
            
            <Link
              href="/admin/contacts/download"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Download Contact Data</h3>
                <p className="text-sm text-gray-500">Export contact form submissions as CSV</p>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Website Overview</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Quick Tips</h3>
                <ul className="text-sm text-gray-500 mt-2 list-disc list-inside space-y-1">
                  <li>Create blog posts regularly to improve SEO</li>
                  <li>Respond to contact form submissions promptly</li>
                  <li>Use the dashboard to monitor website activity</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Website Documentation</h3>
                  <p className="text-sm text-gray-500">Access guides and documentation</p>
                </div>
              </div>
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-800"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Documentation will be available soon!");
                }}
              >
                View &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}