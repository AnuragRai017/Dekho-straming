import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SearchBar from "@/components/SearchBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEKHO - Stream Movies & TV Shows",
  description: "Stream your favorite movies and TV shows",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="bg-gray-900 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-2xl font-bold text-white flex items-center space-x-2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">DEKHO</span>
                <span className="text-gray-400 text-sm">streaming</span>
              </Link>
              <div className="flex items-center space-x-4">
                <SearchBar />
              </div>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
