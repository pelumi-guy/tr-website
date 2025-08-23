import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/scss/main.scss";
import "../assets/scss/library/style.scss";
import "./globals.css";
import "react-image-gallery/styles/css/image-gallery.css";
import CookieConsentModal from "@/components/user/layout/CookieConsentModal";
import FloatingWhatsAppButton from "@/components/user/layout/FloatingWhatsAppButton";

import AOSAnimation from "@/utils/AosInit";
import Header from "@/components/user/layout/Header";
import Footer from "@/components/user/layout/Footer";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lagos Property Center",
  description: "Find your dream home in Lagos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${inter.className}`}>

        <Header />
        <AOSAnimation>
          {children}
          <CookieConsentModal />
          {whatsappNumber && <FloatingWhatsAppButton phoneNumber={whatsappNumber} />}
        </AOSAnimation>

        <Footer />

      </body>
    </html>
  );
}
