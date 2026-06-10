import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// =================================================================
// TypeScript-এর জন্য Session এবং JWT ইন্টারফেস এক্সটেন্ড করা
// যাতে client-side-এ user.role এবং accessToken ইরর ছাড়া অ্যাক্সেস করা যায়
// =================================================================
declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role: string | undefined;      // 'customer' | 'vendor' | 'admin'
            accessToken: string | undefined;
        };
    }
    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        role: string | undefined;
        accessToken: string | undefined;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        role: string | undefined;
        accessToken: string | undefined;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        // ১. গুগল প্রোভাইডার
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        // ২. ক্রেডেনশিয়ালস প্রোভাইডার (ইমেইল ও পাসওয়ার্ড)
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    // আপনার জাভা ব্যাকএন্ড লগইন API কল করুন
                    const res = await fetch(`${process.env.NEXT_PUBLIC_JAVA_BACKEND_URL}/auth/login`, {
                        method: "POST",
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                        headers: { "Content-Type": "application/json" },
                    });

                    const user = await res.json();

                    // যদি জাভা ব্যাকএন্ড সাকসেসফুলি রেসপন্স দেয় এবং ইউজার অবজেক্ট পাঠায়
                    if (res.ok && user) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role, // জাভা ব্যাকএন্ড থেকে আসা রোল ('customer' / 'vendor' / 'admin')
                            accessToken: user.token, // যদি জাভা ব্যাকএন্ড থেকে কোনো JWT টোকেন জেনারেট হয়ে আসে
                        };
                    }

                    return null;
                } catch (error) {
                    console.error("Java Backend Authentication Error:", error);
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        // গুগল সাইন-ইন এর সময় অটো-রেজিস্ট্রেশন লজিক হ্যান্ডেল করার জন্য কলব্যাক
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    // গুগলের ডাটা আপনার জাভা ব্যাকএন্ডে পাঠান চেক করার জন্য
                    // ব্যাকএন্ডে ইউজার না থাকলে ডাটাবেজে সেভ (Register) করবে, আর থাকলে লগইন করাবে
                    const res = await fetch(`${process.env.NEXT_PUBLIC_JAVA_BACKEND_URL}/auth/google-login`, {
                        method: "POST",
                        body: JSON.stringify({
                            email: user.email,
                            name: user.name,
                            googleId: account.providerAccountId,
                        }),
                        headers: { "Content-Type": "application/json" },
                    });

                    if (res.ok) {
                        const backendUser = await res.json();
                        // ব্যাকএন্ড থেকে পাওয়া আইডি এবং রোল নেক্সট-অথ ইউজারে সেট করা হচ্ছে
                        user.id = backendUser.id;
                        user.role = backendUser.role || "customer"; // ডিফল্ট রোল কাস্টমার
                        user.accessToken = backendUser.token;
                        return true;
                    }
                    return false; // ব্যাকএন্ড রেসপন্স না দিলে লগইন রিজেক্ট হবে
                } catch (error) {
                    console.error("Google Sign-In Backend Sync Error:", error);
                    return false;
                }
            }
            return true; // Credentials লগইনের জন্য সরাসরি অ্যালাউ করবে
        },

        // টোকেন জেনারেট হওয়ার সময় রোল পুশ করা
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.accessToken = user.accessToken;
            }
            return token;
        },

        // ক্লায়েন্ট সাইডে সেশন কল করলে যেন রোল খুঁজে পাওয়া যায়
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.accessToken = token.accessToken;
            }
            return session;
        },
    },

    pages: {
        signIn: "/auth/login", // কাস্টম লগইন পেজের পাথ লিংক
    },

    session: {
        strategy: "jwt", // সেশন ম্যানেজমেন্টের জন্য JWT স্ট্র্যাটেজি
    },

    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };