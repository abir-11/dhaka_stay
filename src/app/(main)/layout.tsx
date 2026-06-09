
import "./globals.css";
import Navbar from './../../components/Navbar/page';
import { ReactNode } from 'react';
import Footer from "@/components/Footer/page";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* নেভবার যুক্ত করা হলো */}
        <Navbar />

        {/* যেহেতু নেভবারটি fixed, তাই মেইন কন্টেন্টে একটু টপ প্যাডিং (pt-32) দিতে হবে */}
        <main className="">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}