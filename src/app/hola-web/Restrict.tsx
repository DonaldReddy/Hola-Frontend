"use client";
import { memo } from "react";
import Image from "next/image";
import { useAppSelector } from "@/redux/store";

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

CachedImage.displayName = "CachedImage";

function Restrict({ children }: { children: React.ReactNode }) {
	const screenWidth = useAppSelector((state) => state.generalSlice.screenWidth);
	const isClient = useAppSelector((s) => s.generalSlice.isClient);

	if (isClient && screenWidth < 768)
		return (
			<div className="h-svh w-svw flex flex-col justify-center items-center text-secondary">
				<CachedImage
					src="/images/computer.svg"
					width={100}
					height={100}
					alt="computer"
				/>
				Open in Desktop view
			</div>
		);
	return <>{children}</>;
}

export default Restrict;
