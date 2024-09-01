import ReduxProvider from "@/redux/ReduxProvider";
import { Metadata } from "next";
import { ReactNode } from "react";
import Init from "./init";
import Restrict from "./Restrict";

export function generateMetadata(): Metadata {
	return {
		title: {
			default: "Hola Web",
			template: "Hola Web | %s",
		},
	};
}

export default function layout({ children }: { children: ReactNode }) {
	return (
		<ReduxProvider>
			<Init />
			<Restrict>{children}</Restrict>
		</ReduxProvider>
	);
}
