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
    default: "The Yorùbá Way | Authentic Yoruba Cosmology & Philosophy",
    template: "%s | The Yorùbá Way"
  },
  description: "Explore the depth of Yorùbá cosmology, philosophy, and spirituality. Reclaiming ancient wisdom and decolonizing the Òrìṣà tradition for the modern seeker.",
  keywords: ["Yoruba Way", "Yoruba Cosmology", "Orisha", "Ifa", "African Spirituality", "Decolonization", "Yoruba Philosophy", "Joan Ayebola"],
  authors: [{ name: "Joan Ayebola" }],
  creator: "Joan Ayebola",
  publisher: "The Yorùbá Way",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theyorubaway.com",
    siteName: "The Yorùbá Way",
    title: "The Yorùbá Way | Authentic Yoruba Cosmology & Philosophy",
    description: "Reclaiming Yorùbá Philosophy. Stripping away the colonial lens to meet the Òrìṣà as they truly are.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Yorùbá Way - Reclaiming the Lineage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Yorùbá Way | Yoruba Cosmology",
    description: "Reclaiming Yorùbá Philosophy. Stripping away the colonial lens to meet the Òrìṣà as they truly are.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  alternates: {
    canonical: "https://theyorubaway.com",
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Yorùbá Way",
    "url": "https://theyorubaway.com",
    "logo": "https://theyorubaway.com/icon.png",
    "description": "Authentic Yoruba Cosmology & Philosophy",
    "founder": {
      "@type": "Person",
      "name": "Joan Ayebola"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased flex flex-col min-h-screen`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
