"use client";
import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import ChatCard from "./ChatCard";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchRecentChats } from "@/redux/slices/chatSlice";
import useKeyboardScrollNavigation from "@/hooks/useKeyboardScrollNavigation";

function RecentChats() {
	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();
	const user = useAppSelector((s) => s.userReducer.user);
	const recentChats = useAppSelector((s) => s.chatReducer.recentChats);
	const [curSearch, setCurSearch] = useState(searchParams.get("search") || "");
	const { containerRef, cardRefs, selectedIndex } =
		useKeyboardScrollNavigation(recentChats);

	useEffect(() => {
		setCurSearch(searchParams.get("search") || "");
	}, [searchParams]);

	useEffect(() => {
		if (user) {
			dispatch(fetchRecentChats(user));
		}
	}, [dispatch, user]);

	const filteredChats = useMemo(() => {
		if (!curSearch) return recentChats;
		return recentChats.filter((chat) =>
			chat.participants.some((p) =>
				p.toLowerCase().includes(curSearch.toLowerCase()),
			),
		);
	}, [curSearch, recentChats]);

	return (
		<div className="w-full h-full md:w-[40svw] lg:w-[30svw]">
			<div className="px-2">
				<h1 className="text-xl h-[5%]">Chats</h1>
				<SearchBar />
			</div>

			<div
				className="h-[90%] w-full py-2 overflow-y-scroll scroll-area flex flex-col items-center"
				ref={containerRef}
			>
				{filteredChats.map((chat, index) => (
					<div
						ref={(el) => {
							cardRefs.current[index] = el;
						}}
						key={chat.chatId}
						className=" w-full "
					>
						<ChatCard chat={chat} isSelected={index == selectedIndex} />
					</div>
				))}
				{filteredChats.length === 0 && <p>No chats yet</p>}
			</div>
		</div>
	);
}

export default RecentChats;
