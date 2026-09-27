import { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, CONTACT_INFO } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Joyeria Artesanal de Alta Gama`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: SITE_NAME,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT_INFO.address,
      addressCountry: "VE",
    },
    telephone: CONTACT_INFO.phone,
    url: SITE_URL,
    priceRange: "$$$$",
  };

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-surface text-primary antialiased flex flex-col min-h-screen">
        <JsonLd data={localBusinessSchema} />
        <Header />
        <main className="flex-grow pt-16 md:pt-20">{children}</main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}
