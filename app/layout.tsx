import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Digital Supremacy | Creative Department",
  description: "Showcase of our premium reels and shortform content.",
  applicationName: "Digital Supremacy",
  openGraph: {
    title: "Digital Supremacy | Creative Department",
    description: "Showcase of our premium reels and shortform content.",
    siteName: "Digital Supremacy",
    locale: "en_US",
    type: "website",
  },
  appleWebApp: {
    title: "Digital Supremacy",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Digital Supremacy",
              url: "https://creatives.digitalsupremacy.in/",
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${unbounded.variable} font-sans antialiased bg-black text-white`}
      >
        <div className="noise-overlay"></div>
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
