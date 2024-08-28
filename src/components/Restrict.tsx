"use client";
import { memo } from "react";
import useScreenWidth from "@/customHooks/useScreenWidth";
import Image from "next/image";

const CachedImage = memo(
	({
		src,
		width,
		height,
		alt,
	}: {
		src: string;
		width: number;
		height: number;
		alt: string;
	}) => <Image src={src} width={width} height={height} alt={alt} />,
);

function Restrict({ children }: { children: React.ReactNode }) {
	const screenWidth = useScreenWidth();
	if (screenWidth === 0) return <></>;
	if (screenWidth < 768)
		return (
			<div className="h-svh w-svw flex flex-col justify-center items-center text-secondary">
				<CachedImage
					src="/images/computer.svg"
					width={100}
					height={100}
					alt="computer"
				/>
				Open in Desktop
			</div>
		);
	return <>{children}</>;
}

export default Restrict;
