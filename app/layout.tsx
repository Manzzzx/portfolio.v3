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
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manzz Portfolio",
  description: "Personal portfolio website showcasing my projects and skills",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#101c2c",
};

const Logo = () => (
  <div className="fixed top-4 left-4 sm:top-6 sm:left-6 z-30 flex items-center space-x-2 sm:space-x-3 pointer-events-auto select-none bg-[#101c2c]/80 border border-[#8DD8FF] rounded-xl px-2 py-1 sm:px-3 sm:py-1 shadow-lg backdrop-blur-md">
    <Image 
      src="/images/logo.jpg" 
      alt="Logo" 
      width={20} 
      height={20} 
      className="rounded-xl sm:w-6 sm:h-6" 
      priority
    />
    <span className="text-sm sm:text-lg font-extrabold text-blue-100 tracking-widest select-none">
      マンヅ
    </span>
  </div>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen w-full overflow-x-hidden no-scrollbar`}
      >
        {/* Background Effects */}
        <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
          <BackgroundBeamsWithCollision />
        </div>
        <div className="fixed inset-0 pointer-events-none z-0">
          <SnowParticles />
        </div>
        
        {/* Logo */}
        <Logo />
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
