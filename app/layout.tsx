"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { LazyMotion, domAnimation } from "framer-motion";
import ToastContainer from "@/components/ui/ToastContainer";
import { SWRConfig } from "swr";
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
          <SWRConfig
            value={{
              fetcher: async (url) => {
                const res = await fetch(url);
                const data = await res.json();
                return data;
              },
            }}
          >
            <Navigation />
            {children}
            <Footer />
          </SWRConfig>
        </LazyMotion>

        <ToastContainer />
      </body>
    </html>
  );
}
