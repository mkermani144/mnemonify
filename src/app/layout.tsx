import type { Metadata } from "next";
import { Sour_Gummy } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Toast } from "@/components/toast";
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${sourGummy.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <Toast />
        </ThemeProvider>
      </body>
    </html>
  );
}
