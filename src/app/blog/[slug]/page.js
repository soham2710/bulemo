// src/app/blog/[slug]/page.js
import { getCollection } from '@/lib/mongodb';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

// Set revalidation time to 60 seconds
export const revalidate = 60;

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = params;
  const blog = await getBlogPost(slug);
  
  if (!blog) {
    return {
      title: 'Blog Post Not Found | Bulemo Consulting',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: `${blog.title} | Bulemo Consulting Blog`,
    description: blog.excerpt || blog.content.substring(0, 160),
  };
}

async function getBlogPost(slug) {
  try {
    // Get the blogs collection
    const blogsCollection = await getCollection('blogs');
    
    // Get the blog post by slug
    const blog = await blogsCollection.findOne({ 
      slug,
      status: 'published' 
    });
    
    return blog;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

async function getRelatedPosts(currentSlug) {
  try {
    // Get the blogs collection
    const blogsCollection = await getCollection('blogs');
    
    // Get published blog posts excluding the current one
    const blogs = await blogsCollection
      .find({ 
        status: 'published',
        slug: { $ne: currentSlug }
      })
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();
    
    return blogs;
  } catch (error) {
    console.error('Error fetching related blog posts:', error);
    return [];
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = params;
  const blog = await getBlogPost(slug);
  
  // If blog post not found, return 404
  if (!blog) {
    notFound();
  }
  
  // Get related blog posts
  const relatedPosts = await getRelatedPosts(slug);
  
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-green-600 to-green-800 text-white relative">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center">
              <Link href="/blog" className="text-white hover:text-green-200 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Blog
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {blog.title}
            </h1>
            
            <div className="flex items-center">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="text-green-200">{blog.author}</span>
              </div>
              <div className="mx-3 text-green-400">|</div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-green-200">{formatDate(blog.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Image (if available) */}
      {blog.featuredImage && (
        <div className="relative h-96 w-full -mt-12 z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Blog Content */}
      <section className={`py-16 md:py-24 ${blog.featuredImage ? 'pt-8' : 'pt-0'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Blog post content with Markdown support */}
            <article className="prose prose-lg max-w-none">
              <ReactMarkdown>
                {blog.content}
              </ReactMarkdown>
            </article>
            
            {/* Author and social share section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="bg-gray-200 h-12 w-12 rounded-full flex items-center justify-center text-gray-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{blog.author}</p>
                    <p className="text-sm text-gray-500">Author</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <p className="text-gray-600 mr-4">Share:</p>
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-500 hover:text-blue-600" title="Share on Facebook" aria-label="Share on Facebook">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-blue-400" title="Share on Twitter" aria-label="Share on Twitter">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-blue-500" title="Share on LinkedIn" aria-label="Share on LinkedIn">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Related Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((post) => (
                  <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Featured Image */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.featuredImage || "/api/placeholder/600/400"}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-3">
                        <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        <Link href={`/blog/${post.slug}`} className="hover:text-green-600 transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-green-600 hover:text-green-800 text-sm"
                      >
                        Read Article
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Ready to transform your business?
            </h2>
            <p className="text-green-100 text-lg mb-8">
              Contact us today to discuss how our consulting services can help your organization thrive.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-green-700 hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/services"
                className="bg-transparent hover:bg-green-800 text-white border-2 border-white font-medium py-3 px-8 rounded-md transition-colors"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}