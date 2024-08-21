import Link from "next/link";

export default function Home() {
	return (
		<div className="min-h-svh flex flex-col justify-center items-center">
			home
			<Link href="/1">product1</Link>
			<Link href="/2" replace>
				product2
			</Link>
		</div>
	);
}
