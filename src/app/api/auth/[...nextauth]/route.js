// src/app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getCollection } from '@/lib/mongodb';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            return null;
          }
          
          // Get users collection
          const usersCollection = await getCollection('users');
          
          // Find user by username
          const user = await usersCollection.findOne({ 
            username: credentials.username 
          });
          
          // If user doesn't exist, return null
          if (!user) {
            return null;
          }
          
          // Compare passwords
          const passwordMatch = await bcrypt.compare(
            credentials.password, 
            user.password
          );
          
          // If password doesn't match, return null
          if (!passwordMatch) {
            return null;
          }
          
          // Authentication successful, return user object
          return {
            id: user._id.toString(),
            username: user.username,
            role: user.role
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to the token
      if (user) {
        token.username = user.username;
        token.role = user.role;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user info to the session
      session.user = {
        id: token.userId || token.sub,
        username: token.username,
        role: token.role
      };
      return session;
    }
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };