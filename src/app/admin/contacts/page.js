// src/app/admin/contacts/page.js
'use client';

import { useState, useEffect } from 'react';
import { formatDateTime } from '@/lib/utils';

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [downloadingCSV, setDownloadingCSV] = useState(false);
  
  // Fetch contacts
  useEffect(() => {
    async function fetchContacts() {
      try {
        setIsLoading(true);
        setError('');
        
        const res = await fetch(`/api/contact?page=${currentPage}&limit=10`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch contacts');
        }
        
        const data = await res.json();
        
        setContacts(data.data || []);
        setTotalPages(data.pagination.totalPages || 1);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching contacts:', err);
        setError('Failed to load contacts. Please try again.');
        setIsLoading(false);
      }
    }
    
    fetchContacts();
  }, [currentPage]);
  
  // Handle page navigation
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // Handle viewing contact details
  const handleViewContact = (contact) => {
    setSelectedContact(contact);
  };
  
  // Handle closing contact details modal
  const handleCloseModal = () => {
    setSelectedContact(null);
  };
  
  // Handle deleting a contact
  const handleDeleteContact = async (id) => {
    if (!confirm('Are you sure you want to delete this contact?')) {
      return;
    }
    
    try {
      setIsDeleting(true);
      setDeleteError('');
      
      const res = await fetch(`/api/contact/${id}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete contact');
      }
      
      // Remove the deleted contact from the list
      setContacts(contacts.filter(contact => contact._id !== id));
      
      // Close the modal if the deleted contact was selected
      if (selectedContact && selectedContact._id === id) {
        setSelectedContact(null);
      }
      
      setIsDeleting(false);
    } catch (err) {
      console.error('Error deleting contact:', err);
      setDeleteError('Failed to delete contact. Please try again.');
      setIsDeleting(false);
    }
  };
  
  // Handle downloading contacts as CSV
  const handleDownloadCSV = async () => {
    try {
      setDownloadingCSV(true);
      
      // Create a link to download the CSV
      const link = document.createElement('a');
      link.href = '/api/contact/download';
      link.setAttribute('download', 'contacts.csv');
      document.body.appendChild(link);
      
      // Trigger the download
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      setDownloadingCSV(false);
    } catch (err) {
      console.error('Error downloading CSV:', err);
      alert('Failed to download CSV. Please try again.');
      setDownloadingCSV(false);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Contact Submissions</h1>
        
        <button
          onClick={handleDownloadCSV}
          disabled={downloadingCSV || isLoading}
          className={`flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors ${
            (downloadingCSV || isLoading) ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {downloadingCSV ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Downloading...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CSV
            </>
          )}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600">No contact submissions found.</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{contact.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{contact.service || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDateTime(contact.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleViewContact(contact)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact._id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={isDeleting}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-l-md bg-white text-sm font-medium ${
                    currentPage === 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-2 bg-white text-sm font-medium ${
                      currentPage === i + 1
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-r-md bg-white text-sm font-medium ${
                    currentPage === totalPages
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
      
      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">Contact Details</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {deleteError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 mb-4">
                <p>{deleteError}</p>
              </div>
            )}
            
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-gray-900">{selectedContact.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-gray-900">
                  <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:text-blue-800">
                    {selectedContact.email}
                  </a>
                </dd>
              </div>
              {selectedContact.phone && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-gray-900">
                    <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:text-blue-800">
                      {selectedContact.phone}
                    </a>
                  </dd>
                </div>
              )}
              {selectedContact.company && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Company</dt>
                  <dd className="mt-1 text-gray-900">{selectedContact.company}</dd>
                </div>
              )}
              {selectedContact.service && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Service of Interest</dt>
                  <dd className="mt-1 text-gray-900">{selectedContact.service}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">Message</dt>
                <dd className="mt-1 text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
                  {selectedContact.message}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Submission Date</dt>
                <dd className="mt-1 text-gray-900">{formatDateTime(selectedContact.createdAt)}</dd>
              </div>
            </dl>
            
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleDeleteContact(selectedContact._id)}
                disabled={isDeleting}
                className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors ${
                  isDeleting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}