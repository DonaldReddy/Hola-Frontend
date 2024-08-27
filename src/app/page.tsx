"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useScreenWidth from "@/customHooks/useScreenWidth";
import Image from "next/image";

export default function Home() {
	const screenWidth = useScreenWidth();

	return (
		<div className="h-full flex flex-col justify-between items-center text-slate-50">
			<span className="loader"></span>
			<Header />
			<div className="h-[95svh]  flex justify-center items-center bg-[url('/images/background.svg')] bg-no-repeat bg-center bg-cover w-full">
				<Image
					src="/images/logo.svg"
					className=" absolute"
					alt="logo"
					width={553}
					height={197}
				/>
			</div>
			{/* <Footer /> */}
		</div>
	);
}
