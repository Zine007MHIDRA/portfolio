import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { portfolioConfig } from "@/data/portfolio-config";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || undefined;

export const metadata: Metadata = {
  title: `${portfolioConfig.displayName} / Developer Portfolio`,
  description: portfolioConfig.tagline,
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  openGraph: {
    title: `${portfolioConfig.displayName} / Developer Portfolio`,
    description: portfolioConfig.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${plusJakartaSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
