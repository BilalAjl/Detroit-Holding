import "./globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: {
    default: "Detroit Holding",
    template: "%s | Detroit Holding",
  },
  description: "Detroit Holding",
  icons: {
    icon: "/images/logos/D_of_Detroit.png",
    apple: "/images/logos/D_of_Detroit.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* CSS Webflow */}
        <link rel="stylesheet" href="/css/normalize.css" />
        <link rel="stylesheet" href="/css/webflow.css" />
        <link
          rel="stylesheet"
          href="/css/detroit-holding-website-d68318.webflow.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
