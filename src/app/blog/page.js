// src/app/blog/page.js
import { getCollection } from '@/lib/mongodb';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate, truncate } from '@/lib/utils';

// Set revalidation time to 60 seconds
export const revalidate = 60;

// Generate metadata for SEO
export const metadata = {
  title: 'Blog | Bulemo Consulting',
  description: 'Read our latest insights, tips, and industry news about business consulting, technology, and digital transformation.',
};

async function getBlogPosts() {
  try {
    // Get the blogs collection
    const blogsCollection = await getCollection('blogs');
    
    // Get published blog posts, sorted by creation date (newest first)
    const blogs = await blogsCollection
      .find({ status: 'published' })
      .sort({ createdAt: -1 })
      .toArray();
    
    return blogs;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogListPage() {
  const blogs = await getBlogPosts();
  
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-green-600 to-green-800 text-white relative">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Blog
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Insights, tips, and industry news about business consulting, technology, and digital transformation.
            </p>
          </div>
        </div>
      </section>
      
      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No Blog Posts Found</h2>
              <p className="text-gray-600">
                Check back soon for our latest insights and updates.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* Featured Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={blog.featuredImage || "/api/placeholder/600/400"}
                      alt={blog.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Blog
                      </span>
                      <span className="text-sm text-gray-500 ml-2">{formatDate(blog.createdAt)}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-800 mb-3">
                      <Link href={`/blog/${blog.slug}`} className="hover:text-green-600 transition-colors">
                        {blog.title}
                      </Link>
                    </h2>
                    
                    <p className="text-gray-600 mb-4 flex-1">
                      {blog.excerpt ? truncate(blog.excerpt, 150) : truncate(blog.content, 150)}
                    </p>
                    
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center text-green-600 hover:text-green-800"
                    >
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Subscribe Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 mb-8">
              Stay updated with our latest insights and industry news. We promise not to spam your inbox!
            </p>
            
            <form className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}