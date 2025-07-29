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

export const metadata = {
  // Primary Meta Tags
  title: "Jindam Elevations | ACP Panel & Glass Glazing Experts in Nanded",
  description: "Jindam Elevations specializes in Aluminium Composite Paneling (ACP), Exterior Composite Paneling, and Glass Glazing in Nanded, Maharashtra. Over 10+ years of trusted service.",
  keywords: "Jindam Elevations, ACP Sheet Nanded, Glass Glazing Nanded, ACP Cladding, Exterior Panel Work, Elevation Design Nanded, Building Exterior, Shop Front Elevation, बाह्य सजावट सेवा, नांदेड मध्ये एसीपी पॅनेलिंग, काच काम",
  // You don't directly add <meta name="robots"> here, Next.js handles it or you can specify via separate 'robots' object if needed
  // For canonical URL, you'll typically manage this at the page level or use a library for dynamic URLs.
  // For a single-page site or main page, you can add a <link rel="canonical"> tag within the Head component of that specific page or within children if a separate component is used.
  // Given app/layout.js is global, canonical tags are often better managed dynamically per route.

  // Open Graph / Facebook
  openGraph: {
    title: "Jindam Elevations | ACP & Glazing Experts in Nanded",
    description: "Specialists in ACP Paneling, Glass Glazing & Elevation Solutions for buildings & commercial complexes in Nanded.",
    url: "https://jindam-elevations.vercel.app/", // Make sure this matches your actual deployed URL
    type: "website",
    images: [
      {
        url: "https://lh3.googleusercontent.com/p/AF1QipO9tk-_GLyLMk9DgpMFn_m2Yazf0HTlQqqtaYlh=s1360-w1360-h1020-rw", // Ensure this path is correct and image is in /public
        width: 1200,
        height: 630,
        alt: "Jindam Elevations exterior ACP work in Nanded, Maharashtra",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Jindam Elevations | Exterior Experts in Nanded",
    description: "ACP Sheet, Glazing, and Elevation work in Nanded, Maharashtra.",
    images: [
      {
        url: "https://jindam-elevations.vercel.app/banner-image.jpg", // Ensure this path is correct and image is in /public
        alt: "Jindam Elevations exterior ACP work in Nanded, Maharashtra",
      },
    ],
  },

  // Favicons and Branding (Add these in the public folder)
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png', // Assuming you have this
  },
  // You don't set theme-color directly here, but it can be added to web app manifest if needed
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* Schema.org Structured Data: You need to add this directly inside your HTML content,
            or within a script tag in a component that renders on the page.
            For app/layout.js, you might place it here if it applies globally to your business. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Jindam Elevations",
              "image": "https://jindam-elevations.vercel.app/banner-image.jpg",
              "url": "https://jindam-elevations.vercel.app/",
              "telephone": "+91-XXXXXXXXXX", // REPLACE WITH YOUR ACTUAL PHONE NUMBER
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Your Office Address Here", // REPLACE WITH YOUR ACTUAL STREET ADDRESS
                "addressLocality": "Nanded",
                "addressRegion": "Maharashtra",
                "postalCode": "431601", // REPLACE WITH YOUR ACTUAL POSTAL CODE IF DIFFERENT
                "addressCountry": "IN",
              },
              "areaServed": "Nanded, Maharashtra",
              "description": "ACP Cladding, Glass Glazing, Exterior Paneling in Nanded.",
            }),
          }}
        />
      </body>
    </html>
  );
}