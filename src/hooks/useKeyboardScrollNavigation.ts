import React, { useEffect, useRef, useState } from "react";

function useKeyboardScrollNavigation(array: any[]) {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "ArrowDown") {
				setSelectedIndex((prevIndex) => {
					const nextIndex =
						prevIndex === null || prevIndex === array.length - 1
							? 0
							: prevIndex + 1;
					scrollIntoView(nextIndex);
					return nextIndex;
				});
			} else if (e.key === "ArrowUp") {
				setSelectedIndex((prevIndex) => {
					const nextIndex =
						prevIndex === null || prevIndex === 0
							? array.length - 1
							: prevIndex - 1;
					scrollIntoView(nextIndex);
					return nextIndex;
				});
			}
		}

		function scrollIntoView(index: number) {
			if (cardRefs.current[index] && containerRef.current) {
				const card = cardRefs.current[index];
				const container = containerRef.current;

				if (card && container) {
					const containerTop = container.scrollTop;
					const containerBottom = containerTop + container.offsetHeight;
					const cardTop = card.offsetTop - container.offsetTop;
					const cardBottom = cardTop + card.offsetHeight;

					if (cardBottom > containerBottom) {
						container.scrollTop = cardBottom - container.offsetHeight;
					} else if (cardTop < containerTop) {
						container.scrollTop = cardTop;
					}
				}
			}
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [array]);
	return { containerRef, cardRefs, selectedIndex };
}

export default useKeyboardScrollNavigation;
