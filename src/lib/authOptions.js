// src/lib/authOptions.js
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
          
          // Check for fixed admin credentials first
          if (credentials.username === 'admin' && credentials.password === 'Admin@2025#') {
            return {
              id: 'admin-fixed-id',
              username: 'admin',
              role: 'admin'
            };
          }

          // Skip DB operations if we're in a build context or MongoDB URI is not available
          if (!process.env.MONGODB_URI) {
            console.warn("MongoDB URI not available or in build context, skipping authentication");
            return null;
          }
          
          const usersCollection = await getCollection('users');
          const user = await usersCollection.findOne({ username: credentials.username });
          
          if (!user) return null;
          
          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          
          if (!passwordMatch) return null;
          
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
      if (user) {
        token.username = user.username;
        token.role = user.role;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
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
  secret: process.env.NEXTAUTH_SECRET || "a-default-secret-for-development-only",
};