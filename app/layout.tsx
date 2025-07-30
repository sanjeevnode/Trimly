import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";
import { StoreContext } from "./context/StoreContext";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Trimly - shorten your links",
  description: "A platform to shorten and manage URLs efficiently. Create, track, and share your links with ease.",
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
          <StoreContext>
            <ToasterContext />
            <Navbar />
            <div className="flex flex-col items-center min-h-screen pt-16 px-4">
              <main className="w-full max-w-7xl flex-grow">{children}</main>
              <Footer />
            </div>
          </StoreContext>
        </AuthContext>
      </body>
    </html>
  );
}
