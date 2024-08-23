import { useEffect, useState } from "react";

export default function useScreenWidth() {
	const [screenWidth, setScreenWidth] = useState<number>(1000);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const handleResize = () => {
				setScreenWidth(window.innerWidth);
			};

			handleResize();

			window.addEventListener("resize", handleResize);

			return () => window.removeEventListener("resize", handleResize);
		}
	}, []);

	return screenWidth;
}
