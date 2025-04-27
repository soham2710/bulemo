// src/app/api/blogs/[id]/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { slugify } from '@/lib/utils';

// GET /api/blogs/[id] - Get a single blog post
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Get the blogs collection
    const blogsCollection = await getCollection('blogs');
    
    let blog;
    
    // Check if ID is valid ObjectId
    if (ObjectId.isValid(id)) {
      blog = await blogsCollection.findOne({ 
        _id: new ObjectId(id) 
      });
    } else {
      // If not valid ObjectId, try to find by slug
      blog = await blogsCollection.findOne({ 
        slug: id 
      });
    }
    
    if (!blog) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Blog post not found' 
        },
        { status: 404 }
      );
    }
    
    // Check if the post is a draft and the user is not admin
    const session = await getServerSession(authOptions);
    const isAdmin = session && session.user.role === 'admin';
    
    if (blog.status !== 'published' && !isAdmin) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Blog post not found' 
        },
        { status: 404 }
      );
    }
    
    // Return the blog post
    return NextResponse.json(
      { 
        success: true, 
        data: blog 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching blog post' 
      },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[id] - Update a blog post (admin only)
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    
    // Check if ID is valid ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid blog ID' 
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
    
    const body = await request.json();

    // Create a slug from the title if title is being updated
    let updateData = { ...body };
    
    if (body.title) {
      updateData.slug = slugify(body.title);
      
      // Get the blogs collection
      const blogsCollection = await getCollection('blogs');
      
      // Check if slug already exists and it's not the same blog
      const existingBlog = await blogsCollection.findOne({ 
        slug: updateData.slug,
        _id: { $ne: new ObjectId(id) }
      });
      
      if (existingBlog) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'A blog with this title already exists' 
          },
          { status: 400 }
        );
      }
    }
    
    // Add updated timestamp
    updateData.updatedAt = new Date();
    
    // Get the blogs collection
    const blogsCollection = await getCollection('blogs');
    
    // Update the blog post
    const result = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Blog post not found' 
        },
        { status: 404 }
      );
    }
    
    // Return success message
    return NextResponse.json(
      { 
        success: true, 
        message: 'Blog post updated successfully',
        data: {
          slug: updateData.slug
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error updating blog post' 
      },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id] - Delete a blog post (admin only)
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Check if ID is valid ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid blog ID' 
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
    
    // Get the blogs collection
    const blogsCollection = await getCollection('blogs');
    
    // Delete the blog post
    const result = await blogsCollection.deleteOne({
      _id: new ObjectId(id)
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Blog post not found' 
        },
        { status: 404 }
      );
    }
    
    // Return success message
    return NextResponse.json(
      { 
        success: true, 
        message: 'Blog post deleted successfully' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error deleting blog post' 
      },
      { status: 500 }
    );
  }
}