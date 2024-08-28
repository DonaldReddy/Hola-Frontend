import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import Restrict from "@/components/Restrict";

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
				<Restrict>
					<ReduxProvider>{children}</ReduxProvider>
				</Restrict>
			</body>
		</html>
	);
}
