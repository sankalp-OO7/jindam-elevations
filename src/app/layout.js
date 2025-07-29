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
  title: "Jindam Elevations | ACP Panel & Glass Glazing Experts in Nanded", // THIS IS YOUR CORRECT TITLE
  description: "Jindam Elevations is a trusted name in exterior design solutions, specializing in Aluminium Composite Paneling (ACP), Exterior Composite Paneling, and Glass Glazing in Nanded, Maharashtra. With over a decade of hands-on experience, we help bring architectural visions to life by enhancing the exteriors of commercial and residential buildings with precision, durability, and style.",
  keywords: "Jindam Elevations, ACP Sheet Nanded, Glass Glazing Nanded, ACP Cladding, Exterior Panel Work, Elevation Design Nanded, Building Exterior, Shop Front Elevation, Aluminium Paneling India, Glass Work Contractors Nanded, बाह्य सजावट सेवा, नांदेड मध्ये एसीपी पॅनेलिंग, काच काम",

  // You can add robots directly if you need custom directives, otherwise Next.js defaults to index,follow
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'noimageindex': true, // Example: Prevent Google from indexing images directly
      'max-snippet': -1, // Example: Allow unlimited snippet length
    },
  },
  // Canonical URL - usually set per page for dynamic content, but if your site is mostly static on the root, you can add it in a <link> tag within `page.js` or a specific `Head` component.
  // For a global layout, the `metadata` API doesn't have a direct 'canonical' property. You'd typically use a <link rel="canonical"> in your individual page files (like app/page.js) if necessary.

  // Open Graph / Facebook
  openGraph: {
    title: "Jindam Elevations | ACP & Glass Glazing Experts in Nanded, Maharashtra",
    description: "Specialists in Aluminium Composite Paneling (ACP), Glass Glazing, and Exterior Elevation Design in Nanded, Maharashtra. Crafting impressions for commercial and residential buildings.",
    url: "https://jindam-elevations.vercel.app/", // Make sure this matches your actual deployed URL
    type: "website",
    images: [
      {
        url: "https://jindam-elevations.vercel.app/banner.png", // Ensure this path is correct and image is in /public
        width: 1200,
        height: 630,
        alt: "Jindam Elevations: Leading ACP Panel & Glass Glazing Services in Nanded, Maharashtra",
      },
    ],
    siteName: "Jindam Elevations", // Add your site name for Open Graph
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Jindam Elevations | Exterior ACP & Glass Design in Nanded",
    description: "Transforming commercial and residential exteriors with ACP paneling and glass facade work. Based in Nanded, Maharashtra.",
    images: [
      {
        url: "https://jindam-elevations.vercel.app/banner.png", // Ensure this path is correct and image is in /public
        alt: "Jindam Elevations: Professional ACP & Glazing Contractors in Nanded",
      },
    ],
    creator: "@JindamElevations", // If you have a Twitter handle
  },

  // Favicons and Branding (Make sure these files are in your /public folder)
  icons: {
    icon: '/favicon.ico', // Your favicon
    apple: '/banner.png', // If you're using banner.png as your Apple Touch Icon
  },
  // You can add theme-color here if you have one, e.g.:
  themeColor: "#1A1A3E", // A dark blue/purple from your loading gradient
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Merged body classes and added a default background color for the overall page */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        {/* Added the <main> tag from layout.jsx - good semantic practice */}
        <main>{children}</main>

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Jindam Elevations",
              "image": "https://jindam-elevations.vercel.app/banner.png",
              "url": "https://jindam-elevations.vercel.app/",
              "telephone": "+91-9637894561", // Your actual phone number
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Near Lokmanya Mangal Karyalay, Samrat Nagar, Annabhau Sathe Chowk",
                "addressLocality": "Nanded",
                "addressRegion": "Maharashtra",
                "postalCode": "431602",
                "addressCountry": "IN",
              },
              "areaServed": {
                "@type": "Place", // Specific type for geographic area
                "name": "Nanded, Maharashtra" // More precise naming
              },
              "description": "Jindam Elevations is a trusted name in exterior design solutions specializing in Aluminium Composite Paneling (ACP), Exterior Composite Paneling, and Glass Glazing in Nanded, Maharashtra. We enhance commercial and residential building exteriors with precision, durability, and style.",
              "hasMap": "https://maps.app.goo.gl/YOUR_Maps_LINK_HERE" // Add your Google Maps link here if available
            }),
          }}
        />
      </body>
    </html>
  );
}