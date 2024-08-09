import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "@/core/client/db";
import createUser from "@/core/server/users/createUserifnot";
import { $Enums } from "@prisma/client";
import getUserInfo from "@/core/server/users/getUserInfo";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      name: string;
      email: string;
      image: string;
      role: $Enums.Role;
    };
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    role?: $Enums.Role;
    companyId?: string;
  }
}

// export type AuthSession = {
//   session: {
//     user: {
//       id: string;
//       name: string;
//       email: string;
//       image: string;
//     };
//   } | null;
// };

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      // Since the strategy is JWT so the user will always be undefined.
      // the token will have sub for id and picture for image by default.
      session.user.id = token.sub as string;
      session.user.image = token.picture as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      // @ts-expect-error
      session.user.role = token.role as string;
      // session.user.companyId = token.companyId as string;
      return session;
    },
    async jwt({ token, trigger, session }) {
      if (trigger === "signIn") {
        //   add the user to database and do email send etc...
        const info = await getUserInfo({ email: token.email! });
        if (info) token.sub = info.id;
        if (info && info.role) token.role = info.role;
      } else if (trigger === "update") {
        const info = await getUserInfo({ email: token.email! });
        if (info) token.sub = info.id;
        if (info && info.role) token.role = info.role;
      }
      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (!user.name || !user.email) return false;
        // check if user already exists in db
        const dbuser = await createUser({
          email: user.email,
          username: user.name,
          image: user.image,
        });
        // can do email sending etc... before sending true
        if (dbuser) return true;
        return false;
      } else return false;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/auth",
    error: "/auth",
    newUser: "/",
  },
};
