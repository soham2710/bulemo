import NextAuth from 'next-auth';
import { authOptions } from '@/lib/authOptions';

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export handlers for GET and POST (required by Next.js App Router)
export { handler as GET, handler as POST };
