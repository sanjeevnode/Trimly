import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Trimly",
  description: "A simple URL shortener",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${raleway.variable}`}>
        <AuthContext>
          <ToasterContext />
          <Navbar />
          <div className="flex flex-col items-center min-h-screen pt-16 px-4">
            <main className="w-full max-w-7xl flex-grow">{children}</main>
            <Footer />
          </div>
        </AuthContext>
      </body>
    </html>
  );
}
