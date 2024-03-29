import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Inria_Serif } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const inria = Inria_Serif({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-inria",
});

export const metadata: Metadata = {
  title: "Medium",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>{children}</body>
      </ClerkProvider>
    </html>
  );
}