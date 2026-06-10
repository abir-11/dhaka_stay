import "./globals.css";
import Navbar from './../../components/Navbar/page';
import { ReactNode } from 'react';
import Footer from "@/components/Footer/page";
import Providers from "@/components/Providers"; // Providers ইম্পোর্ট করা হলো

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Providers দিয়ে Navbar এবং বাকি সব কন্টেন্টকে র‍্যাপ করা হলো */}
        <Providers>
          {/* নেভবার যুক্ত করা হলো */}
          <Navbar />

          {/* নেভবারটি fixed থাকায় কন্টেন্ট যেন নিচে না ঢাকা পড়ে তাই pt-28 বা pt-32 দেওয়া ভালো */}
          <main className="pt-28">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}