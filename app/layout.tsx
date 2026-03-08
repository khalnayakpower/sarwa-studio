import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import CustomCursor from "./components/custom-cursor";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sarwastudio.com'),
  title: {
    default: 'Sarwa Studio — Creative Digital Agency',
    template: '%s | Sarwa Studio',
  },
  description:
    'Sarwa Studio delivers world-class web development, 3D animation, video editing, software solutions, and graphic design.',
  keywords: [
    'Sarwa Studio',
    'creative agency',
    'web development',
    '3D animation',
    'video editing',
    'software solutions',
    'graphic design',
    'digital marketing',
    'UI UX design',
    'brand identity',
  ],
  authors: [{ name: 'Sarwa Studio', url: 'https://sarwastudio.com' }],
  creator: 'Sarwa Studio',
  publisher: 'Sarwa Studio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sarwastudio.com',
    siteName: 'Sarwa Studio',
    title: 'Sarwa Studio — Creative Digital Agency',
    description:
      'Sarwa Studio delivers world-class web development, 3D animation, video editing, software solutions, and graphic design.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarwa Studio — Creative Digital Agency',
    description:
      'World-class web development, 3D animation, video editing & graphic design.',
    creator: '@sarwastudio',
  },
  alternates: {
    canonical: 'https://sarwastudio.com',
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
        style={{ cursor: "none" }}
      >
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
