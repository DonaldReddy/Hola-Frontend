"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
	const router = useRouter();
	const [key, setKey] = useState(0); // State to force re-render

	useEffect(() => {
		console.log("Component mounted");
	}, [key]);

	return (
		<div
			className="cursor-pointer"
			onClick={() => {
				setKey((prevKey) => prevKey + 1); // Change key to force re-render
				router.refresh(); // Refresh the page
			}}
		>
			Refresh
		</div>
	);
}

export default Page;
