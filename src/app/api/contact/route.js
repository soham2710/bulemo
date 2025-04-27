// src/app/api/contact/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { getCollection } from '@/lib/mongodb';

// POST /api/contact - Create a new contact form submission
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate contact form data
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Name, email, and message are required' 
        },
        { status: 400 }
      );
    }
    
    // Add timestamp to the contact form data
    const contactData = {
      ...body,
      createdAt: new Date()
    };
    
    // Get the contacts collection
    const contactsCollection = await getCollection('contacts');
    
    // Insert the contact form data into the database
    const result = await contactsCollection.insertOne(contactData);
    
    // Return the result
    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        data: {
          id: result.insertedId
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error submitting contact form' 
      },
      { status: 500 }
    );
  }
}

// GET /api/contact - Get all contact form submissions (admin only)
export async function GET(request) {
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
    
    // Get pagination parameters from the request URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;
    
    // Get the contacts collection
    const contactsCollection = await getCollection('contacts');
    
    // Get all contact form submissions with pagination
    const contacts = await contactsCollection
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    // Get total count for pagination
    const total = await contactsCollection.countDocuments({});
    
    // Return the result
    return NextResponse.json(
      {
        success: true,
        data: contacts,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching contact submissions' 
      },
      { status: 500 }
    );
  }
}