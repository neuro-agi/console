import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "../db";
import type { NextAuthConfig } from "next-auth";
import { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "../data/users-queries";

declare module "next-auth" {
  interface Session extends User {
    user: {
      id: string;
    } & Session;
  }
}

export const config = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("Attempting to authorize with credentials:", credentials);
        if (!credentials.email || !credentials.password) {
          console.log("Missing email or password");
          return null;
        }
        const user = await getUserByEmail(credentials.email as string);
        console.log("User found in database:", user);

        if (!user || !(user as any).password) {
          console.log("User not found or user has no password");
          return null;
        }

        const passwordMatch = (user as any).password === credentials.password;
        console.log("Password match:", passwordMatch);

        if (!passwordMatch) {
          console.log("Password does not match");
          return null;
        }

        return { id: user.id, email: user.email };
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth(config);
