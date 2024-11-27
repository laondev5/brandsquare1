/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialsProvider from "next-auth/providers/credentials";
import { axiosInstance } from "./axios";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  role: any;

}

interface AuthResponse {
    data: {
        user: User;
    }
  token: string; // or any other properties returned by the API
  status: string;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const res = await axiosInstance.post<AuthResponse>("https://brandsquare-backend.onrender.com/api/v1/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });

          console.log(res);
          const user = res?.data.data.user;
          const token = res?.data.token;
 
           if (user) {
            console.log(user, 'iddddd');
 
             return {
                name:user.name,
               email: user.email,
              phone: user.phone,
               role: user.role,
               isVerified: user.isVerified,
               _id: user._id,
              accessToken: token,
            };
          }
          return null;
        } catch (error) {
          console.error("Authorization error:", error);

          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 2 hours
  },

  callbacks: {
    async jwt({ token, user }: any) {
      // If a user object is present (on sign in), update the token with user data
      if (user) {
        token.id = user._id;
        token.name = user.name;
        token.email = user.email;
         token.phone = user.phone;  
        token.role = user.role;
        token.isVerified = user.isVerified;
        token.accessToken = user.accessToken;

        const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
        token.exp = expirationTime;
      }
      return token;
    },

    async session({ session, token }: any) {
      // If a token is available, transfer the token data to the session object
      session.user.id = token.userId;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.phone = token.phone;
      session.user.role = token.role;
      session.accessToken = token.accessToken;
      session.user.isVerified = token.isVerified;


      return session;
    },
  },
};