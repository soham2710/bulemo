// src/app/api/blogs/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { getCollection } from '@/lib/mongodb';
import { slugify } from '@/lib/utils';

// GET /api/blogs - Get all blog posts (public ones for users, all for admin)
export async function GET(request) {
  try {
    // Get pagination parameters from the request URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;
    
    // Check if it's an admin request (includes drafts)
    const session = await getServerSession(authOptions);
    const isAdmin = session && session.user.role === 'admin';
    
    // Filter for published posts (unless admin)
    const filter = isAdmin ? {} : { status: 'published' };
    
    // Get the blogs collection
    const blogsCollection = await getCollection('blogs');
    
    // Get blog posts with pagination
    const blogs = await blogsCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    // Get total count for pagination
    const total = await blogsCollection.countDocuments(filter);
    
    // Return the result
    return NextResponse.json(
      {
        success: true,
        data: blogs,
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
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching blogs' 
      },
      { status: 500 }
    );
  }
}

// POST /api/blogs - Create a new blog post (admin only)
export async function POST(request) {
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
    
    const body = await request.json();
    
    // Validate blog post data
    if (!body.title || !body.content) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Title and content are required' 
        },
        { status: 400 }
      );
    }
    
    // Create a slug from the title
    const slug = slugify(body.title);
    
    // Get the blogs collection
    const blogsCollection = await getCollection('blogs');
    
    // Check if slug already exists
    const existingBlog = await blogsCollection.findOne({ slug });
    
    if (existingBlog) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'A blog with this title already exists' 
        },
        { status: 400 }
      );
    }
    
    // Set default status to draft if not provided
    if (!body.status) {
      body.status = 'draft';
    }
    
    // Add metadata to the blog post
    const blogData = {
      ...body,
      slug,
      author: session.user.username,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Insert the blog post into the database
    const result = await blogsCollection.insertOne(blogData);
    
    // Return the result
    return NextResponse.json(
      { 
        success: true, 
        message: 'Blog post created successfully',
        data: {
          id: result.insertedId,
          slug
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error creating blog post' 
      },
      { status: 500 }
    );
  }
}