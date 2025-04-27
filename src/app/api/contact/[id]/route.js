// src/app/api/contact/[id]/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET /api/contact/[id] - Get a single contact form submission (admin only)
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Check if ID is valid ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid contact ID' 
        },
        { status: 400 }
      );
    }
    
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
    
    // Find the contact by ID
    const contact = await contactsCollection.findOne({
      _id: new ObjectId(id)
    });
    
    if (!contact) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Contact not found' 
        },
        { status: 404 }
      );
    }
    
    // Return the contact
    return NextResponse.json(
      { 
        success: true, 
        data: contact 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching contact' 
      },
      { status: 500 }
    );
  }
}

// DELETE /api/contact/[id] - Delete a contact form submission (admin only)
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Check if ID is valid ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid contact ID' 
        },
        { status: 400 }
      );
    }
    
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
    
    // Delete the contact
    const result = await contactsCollection.deleteOne({
      _id: new ObjectId(id)
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Contact not found' 
        },
        { status: 404 }
      );
    }
    
    // Return success message
    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact deleted successfully' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error deleting contact' 
      },
      { status: 500 }
    );
  }
}