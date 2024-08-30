"use client";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import ChatCard from "./ChatCard";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchRecentChats } from "@/redux/slices/chatSlice";

function RecentChats() {
	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();
	const user = useAppSelector((s) => s.userReducer.user);
	const recentChats = useAppSelector((s) => s.chatReducer.recentChats);
	const [curSearch, setCurSearch] = useState(searchParams.get("search") || "");

	useEffect(() => {
		setCurSearch(searchParams.get("search") || "");
	}, [searchParams]);

	useEffect(() => {
		dispatch(fetchRecentChats(user));
	}, []);

	return (
		<div className="w-full h-full md:w-[40%] lg:w-[30%] px-2 ">
			<h1 className="text-xl h-[5%]">Chats</h1>
			<SearchBar />
			<div className="h-[90%] py-2 overflow-y-scroll chat-card">
				{recentChats.map(
					(chat)=> (
						<ChatCard
							key={chat.chatId}
							chat={chat}
						/>
					),
				)}
			</div>
		</div>
	);
}

export default RecentChats;
