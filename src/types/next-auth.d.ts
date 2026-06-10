import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: "customer" | "vendor" | "admin";
    accessToken: string;
  }

  interface Session {
    user: {
      role: "customer" | "vendor" | "admin";
      accessToken: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "customer" | "vendor" | "admin";
    accessToken: string;
  }
}