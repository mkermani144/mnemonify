import type { Metadata } from "next";
import { Sour_Gummy } from "next/font/google";
import "./globals.css";

const sourGummy = Sour_Gummy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sour-gummy",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mnemonify",
  description: "Your vocab learning enhancement app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourGummy.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
