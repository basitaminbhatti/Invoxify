import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Invoxify - Free Invoice Management Solution | Simplify Invoicing",
  description:
    "Invoxify is a free invoice management tool that lets you create, send, and track invoices effortlessly. Email PDFs, set payment reminders, analyze revenue, and more!",
  keywords:
    "free invoice management, invoicing software, invoice tracker, create invoices online, send PDF invoices, payment reminders, revenue analytics, invoicing tool, invoicing app, billing solution",
  openGraph: {
    title: "Invoxify - Free Invoice Management Solution | Simplify Invoicing",
    description:
      "Invoxify is a free invoice management tool that lets you create, send, and track invoices effortlessly. Email PDFs, set payment reminders, analyze revenue, and more!",
    url: "https://invoxify.com",
    siteName: "Invoxify",
    locale: "en_US",
    type: "website",
    images: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
