"use client";

import React from "react";
import localFont from "next/font/local";
import "./globals.css";
import useQuiz from "./store";
import { Github, Linkedin } from "lucide-react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Add Caveat font import
import { Caveat } from "next/font/google";
import Image from "next/image";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const GlassPanel = ({ children }: { children: React.ReactNode }) => (
  <div className="backdrop-blur-md bg-white bg-opacity-20 rounded-xl shadow-lg p-6 border border-white border-opacity-20">
    {children}
  </div>
);
export default function RootLayout({
  children,
  quiz,
}: {
  children: React.ReactNode;
  quiz: React.ReactNode;
}) {
  const config = useQuiz((state) => state.config);
  const render = config.status ? quiz : children;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} antialiased flex flex-col min-h-screen bg-gradient-to-br from-blue-400 to-purple-500`}
      >
        <header className="w-full py-6 px-4">
          <GlassPanel>
            <div className="flex justify-between items-center">
              <div
                onClick={() => window.location.reload()}
                className="flex items-center space-x-4 cursor-pointer"
              >
                <Image
                  src="https://img.freepik.com/free-psd/3d-render-neon-letter-icon_23-2151653660.jpg?ga=GA1.1.1031119422.1713528645&semt=ais_hybrid"
                  alt="Quiz Master Logo"
                  className="w-16 h-16 rounded-full"
                  width={64} // Set appropriate width
                  height={64} // Set appropriate height
                />

                <h1
                  className={`text-4xl font-bold text-white ${caveat.className}`}
                >
                  Quiz Master
                </h1>
              </div>
              <div className="flex space-x-4">
<a
  href="https://github.com/richmondazadze"
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center space-x-2"
  aria-label="GitHub"
>
  <Github size={24} />
  <span className="sr-only">GitHub</span>
</a>
<a
  href="https://www.linkedin.com/in/richmond-azadze/"
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center space-x-2"
  aria-label="LinkedIn"
>
  <Linkedin size={24} />
  <span className="sr-only">LinkedIn</span>
</a>
</div>
            </div>
          </GlassPanel>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          <GlassPanel>{render}</GlassPanel>
        </main>

        <footer className="w-full py-6 px-4 mt-auto">
          <GlassPanel>
            <div className="text-center text-white text-sm">
              <p>
                &copy; {new Date().getFullYear()} Quiz Master. All rights
                reserved.
              </p>
              <p className="mt-2">
                Crafted with passion <br></br>{" "}
                <span
                  className={`text-2xl font-extrabold text-blue-600 ${caveat.className}`}
                >
                  <a href="https://www.linkedin.com/in/richmond-azadze/">
                    Richmond Azadze
                  </a>
                </span>
              </p>
            </div>
          </GlassPanel>
        </footer>
      </body>
    </html>
  );
}
