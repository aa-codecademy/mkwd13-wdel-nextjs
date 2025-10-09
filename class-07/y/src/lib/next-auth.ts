import { getUserByUsername } from "@/services/users.service";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { username: {}, password: {} },
      // This function runs when a user tries to log in.
      async authorize(credentials) {
        console.log("credentials: ", credentials);

        if (!credentials) return null; // If no credentials, fail auth

        const { username, password } = credentials; // Extract username and password

        const user = await getUserByUsername(username);
        console.log("user: ", user);

        if (!user) return null;

        if (bcrypt.compareSync(password, user.password)) {
          // If password matches, return user info for the session.
          return {
            id: user.id,
            name: user.name,
            username: user.username,
          };
        }

        // If password does not match, fail auth
        return null;
      },
    }),
  ],
  // Callback to customize the session object returned to the client.
  callbacks: {
    async session({ session, user, token }) {
      console.log("token:", token); // Log token for debugging.
      console.log("user:", user); // Log user for debugging.
      console.log("session:", session); // Log session for debugging.
      // Add user ID and username to the session object.
      return {
        ...session,
        user: {
          name: session.user?.name,
          username: session.user?.email, // Username stored in email field.
          id: token.sub, // User ID from token.
        },
      };
    },
  },
  // Custom login page route.
  pages: {
    signIn: "/login",
  },
  secret: "this_is_a_long_unpredictable_secret_string",
};

// Helper function to get the current server session
export const getNextServerSession = () => getServerSession(options);
