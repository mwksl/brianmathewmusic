import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { customFont } from './fonts';
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Brian Mathew Music",
  description: "Professional composer, producer, and mixing engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${customFont.variable}`}>
      <body className="min-h-screen font-mono antialiased">
        {children}
      </body>
    </html>
  );
}
