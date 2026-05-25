import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { BackgroundMesh } from "@/components/ui/DesignSystem";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProjectNest AI | Turn Ideas into Software in Seconds",
  description: "AI-powered system that generates comprehensive architecture, clean code, and cloud-ready deployment plans instantly with ProjectNest AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-background text-foreground antialiased selection:bg-primary/30 selection:text-white`}>
        <CursorGlow />
        <BackgroundMesh />
        {children}
        <Toaster position="top-right" toastOptions={{ style: { background: '#111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
      </body>
    </html>
  );
}
