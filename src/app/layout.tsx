import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://theyorubaway.com'),
  title: {
    default: "The Yorùbá Way | Yoruba Cosmology Blog",
    template: "%s | The Yorùbá Way"
  },
  description: "Reclaiming Yorùbá Philosophy. Stripping away the colonial lens to meet the Òrìṣà as they truly are.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theyorubaway.com",
    siteName: "The Yorùbá Way",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
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
        className={`${inter.variable} ${playfair.variable} antialiased flex flex-col min-h-screen`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
