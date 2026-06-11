import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        // ১. ক্রেডেনশিয়াল প্রোভাইডার (Email/Password)
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // আমরা অলরেডি ফ্রন্টএন্ড সাইন-ইন পেজে জাভা ব্যাকএন্ড থেকে পাসওয়ার্ড চেক করে ফেলেছি।
                // তাই এখানে শুধু একটি ইউজার অবজেক্ট রিটার্ন করলেই সেশন চালু হয়ে যাবে।
                if (credentials?.email) {
                    return {
                        id: "credentials-user",
                        email: credentials.email,
                        name: "User",
                        // যোগ করা ফিল্ডস যাতে TypeScript এর User টাইপ মেট করে
                        role: "customer",
                        accessToken: "",
                    };
                }
                return null;
            },
        }),

        // ২. গুগল প্রোভাইডার
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],

    callbacks: {
        // গুগল দিয়ে লগইন করার সময় ব্যাকএন্ডের সাথে ডাটা সিঙ্ক করার লজিক
        async signIn({ user, account }) {
            if (account?.provider === "google" && user.email) {
                try {
                    // ধাপ ১: প্রথমে চেক করি এই গুগল ইউজারটি জাভা ডাটাবেজে অলরেডি আছে কিনা
                    const checkRes = await fetch(
                        `http://localhost:8080/user/email?email=${user.email}`
                    );

                    if (!checkRes.ok) {
                        // ধাপ ২: যদি ইউজার না থাকে (৪0৪ বা এরর আসে), তবে /user/save এ নতুন ইউজার হিসেবে সেভ করি
                        const nameParts = user.name?.split(" ") || ["Google", "User"];
                        const firstName = nameParts[0];
                        const lastName = nameParts.slice(1).join(" ") || "User";

                        const saveRes = await fetch("http://localhost:8080/user/save", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                firstName: firstName,
                                lastName: lastName,
                                email: user.email,
                                passwordHash: "GOOGLE_AUTH_ACCOUNT", // গুগলের জন্য ডামি পাসওয়ার্ড
                                phone: "N/A",
                                role: "USER", // ডিফল্ট রোল
                            }),
                        });

                        if (!saveRes.ok) {
                            console.error("Failed to save new Google user to Java backend");
                            return false; // ডাটাবেজে সেভ না হলে লগইন রিজেক্ট করবে
                        }
                    }
                    return true; // সাকসেসফুলি লগইন হবে
                } catch (error) {
                    console.error("Error connecting to Java backend during Google sign-in:", error);
                    return false;
                }
            }
            return true;
        },

        // টোকেন বা সেশনে রোল (Role) ডাটা যুক্ত করার লজিক
        async jwt({ token, user }) {
            // প্রথমবার লগইন করার সময় জাভা ব্যাকএন্ড থেকে ইউজারের অরিজিনাল রোল তুলে নিয়ে আসা
            if (user && user.email) {
                try {
                    const res = await fetch(
                        `http://localhost:8080/user/email?email=${user.email}`
                    );
                    if (res.ok) {
                        const dbUser = await res.json();
                        const dbRole = typeof dbUser.role === "string" ? dbUser.role.toLowerCase() : "";
                        if (dbRole === "admin" || dbRole === "vendor" || dbRole === "customer") {
                            token.role = dbRole;
                        } else {
                            token.role = "customer";
                        }
                        token.id = dbUser.id; // ডাটাবেজের রিয়েল আইডি
                    } else {
                        token.role = "customer";
                    }
                } catch (error) {
                    token.role = "customer";
                }
            }
            return token;
        },

        // ফ্রন্টএন্ডে `useSession()` বা `getServerSession()` এ রোল ব্যবহারের সুযোগ দেওয়া
        async session({ session, token }) {
            if (session.user) {
                // @ts-ignore
                session.user.role = token.role;
                // @ts-ignore
                session.user.id = token.id;
            }
            return session;
        },
    },

    pages: {
        signIn: "/auth/signin", // আপনার কাস্টম সাইন-ইন পেজের পাথ
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };