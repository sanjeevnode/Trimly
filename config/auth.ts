import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserService } from "@/service/userService";
import { UserAuthType } from "@/types/user";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await UserService.authenticateUser(
            credentials.email,
            credentials.password
          );

          if (user) {
            return {
              id: user.email,
              email: user.email,
              name: user.name,
            };
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Check if user already exists
          const existingUser = await UserService.findUserByEmail(user.email!);

          if (!existingUser) {
            // Create new user in database with Google auth type
            await UserService.createUser({
              name: user.name || "",
              email: user.email!,
              authType: UserAuthType.GOOGLE,
            });
          }

          return true;
        } catch (error) {
          console.error("Error creating Google user:", error);
          return false;
        }
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
