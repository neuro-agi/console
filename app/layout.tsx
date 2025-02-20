import "./globals.css";

import type { Metadata } from "next";

import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import LayoutWrapper from "@/components/layout-wrapper";
import Nav from "@/components/parts/nav"; // Import Nav

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neuro Agi | The world's simplest lead router",
  description:
    "Neuro Agi is the world's simplest lead router. Built for developers, by developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} flex flex-col-reverse`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutWrapper navComponent={<Nav />}>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
