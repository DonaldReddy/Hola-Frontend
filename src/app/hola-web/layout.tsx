import { Metadata } from "next";
import { ReactNode } from "react";

export function generateMetadata(): Metadata {
	return {
		title: {
			default: "Hola Web",
			template: "Hola Web | %s",
		},
	};
}

export default function layout({ children }: { children: ReactNode }) {
	return <div>{children}</div>;
}
