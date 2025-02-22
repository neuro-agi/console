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
	description: "Neuro Agi is the world's simplest lead router. Built for developers, by developers.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${font.className} flex flex-col-reverse`}>
				<div style={{ backgroundColor: "#c32148", color: "white", textAlign: "center", padding: "10px", position: "fixed", marginBottom: "10px", top: 0, left: 0, width: "100%", zIndex: 9999 }}>
					We are shutting down Neuro AGI. Check out the repo{" "}
					<a href="https://github.com/neuro-agi" style={{ color: "lightblue", textDecoration: "underline" }} target="_blank" rel="noopener noreferrer">
						here
					</a>
					.
				</div>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<LayoutWrapper navComponent={<Nav />}>{children}</LayoutWrapper>
				</ThemeProvider>
			</body>
		</html>
	);
}
