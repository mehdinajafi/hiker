"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { LazyMotion, domAnimation } from "framer-motion";
import "@/public/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LazyMotion features={domAnimation}>
          <Navigation />
          {children}
          <Footer />
        </LazyMotion>
      </body>
    </html>
  );
}
