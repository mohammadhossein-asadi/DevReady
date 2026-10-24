import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "DevReady — Web Development Interview Prep",
  description:
    "A modern, bilingual (English / فارسی) platform for preparing for Web Development interviews — Frontend, Backend, Full-Stack, System Design, Algorithms, Security, and Behavioral rounds.",
  manifest: "/manifest.json",
  keywords: [
    "web development",
    "interview prep",
    "frontend",
    "backend",
    "full-stack",
    "system design",
    "DevReady",
  ],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
<body className="min-h-screen bg-background font-sans text-foreground antialiased">
  <Providers>{children}</Providers>
  <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(()=>{});}` }} />
</body>
    </html>
  );
}
