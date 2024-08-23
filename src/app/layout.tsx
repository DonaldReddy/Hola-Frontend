import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Hola Messenger",
	icons: "/images/logo.svg",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={inter.className + " overflow-hidden bg-black text-slate-50"}
			>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	);
}
