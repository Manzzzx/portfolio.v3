import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BackgroundBeamsWithCollision } from "./components/ui/background-beams-with-collision";
import SnowParticles from "./components/SnowParticles";
import Image from "next/image";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manzz Portfolio",
  description: "Personal portfolio website showcasing my projects and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen w-full overflow-y-auto overflow-x-hidden no-scrollbar`}
      >
        {/* Background Beams absolute layer */}
        <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
          <BackgroundBeamsWithCollision />
        </div>
        <div className="absolute inset-0 pointer-events-none z-0">
          <SnowParticles />
        </div>
        {/* Top-left logo and text */}
        <div className="fixed top-6 left-6 z-30 flex items-center space-x-3 pointer-events-auto select-none bg-[#101c2c]/80 border border-[#8DD8FF] rounded-xl px-3 py-1 shadow-lg backdrop-blur-md">
          <Image src="/images/logo.jpg" alt="Logo" width={24} height={24} className="rounded-xl" />
          <span className="text-lg font-extrabold text-blue-100 tracking-widest select-none">マンヅ</span>
        </div>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
