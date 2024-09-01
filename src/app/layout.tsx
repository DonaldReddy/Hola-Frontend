import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Hola Messenger",
	icons: { icon: "/images/logo.svg" },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={
					inter.className + " h-svh bg-black text-slate-50 overflow-hidden"
				}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
