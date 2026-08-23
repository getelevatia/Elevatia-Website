import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/layout/MainNav";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "Elevatia - Better Your Life",
    template: "%s | Elevatia"
  },
  description: "Elevatia reads your signals and hands you one right move each day. Structured paths, real accountability, and guidance that fits your life.",
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://getelevatia.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans`}>
        <MainNav />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
