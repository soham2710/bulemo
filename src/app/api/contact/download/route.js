// src/app/api/contact/download/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getCollection } from '@/lib/mongodb';
import { generateCSV } from '@/lib/utils';

// GET /api/contact/download - Download all contact form submissions as CSV (admin only)
export async function GET(_request) {
  try {
    // Check if user is authenticated and has admin role
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Unauthorized' 
        },
        { status: 401 }
      );
    }
    
    // Get the contacts collection
    const contactsCollection = await getCollection('contacts');
    
    // Get all contact form submissions
    const contacts = await contactsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    // Convert date objects to strings
    const contactsWithStringDates = contacts.map(contact => ({
      ...contact,
      _id: contact._id.toString(),
      createdAt: contact.createdAt.toISOString()
    }));
    
    // Generate CSV from contacts
    const csv = generateCSV(contactsWithStringDates);
    
    // Create response with CSV data
    const response = new NextResponse(csv);
    
    // Set headers for file download
    response.headers.set('Content-Type', 'text/csv');
    response.headers.set('Content-Disposition', 'attachment; filename="contacts.csv"');
    
    return response;
  } catch (error) {
    console.error('Error downloading contacts:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error downloading contacts' 
      },
      { status: 500 }
    );
  }
}