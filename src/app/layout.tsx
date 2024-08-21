import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/core/providers/NextauthProvider";
import { Toaster } from "sonner";
import Scroll from "@/components/reusable/scroll";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Travel Top 10 ",
  description: "Travel Top 10 Destinations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        {/* <Scroll /> */}
        <Toaster richColors />
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
