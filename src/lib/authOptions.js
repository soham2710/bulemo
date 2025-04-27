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
          const usersCollection = await getCollection('users');
          const user = await usersCollection.findOne({ username: credentials.username });
          if (!user) return null;
          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          if (!passwordMatch) return null;
          return { id: user._id.toString(), username: user.username, role: user.role };
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
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
