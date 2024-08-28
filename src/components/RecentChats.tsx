"use client";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import ChatCard from "./ChatCard";
import { useSearchParams } from "next/navigation";

function RecentChats() {
	const searchParams = useSearchParams();

	const recentChats = [
		{
			chatId: "1",
			userName: "Luffy",
			message: "Hello! Are you free today?",
			timestamp: "Yesterday",
		},
		{
			chatId: "2",
			userName: "Zoro",
			message: "I found a new training spot.",
			timestamp: "Today",
		},
		{
			chatId: "3",
			userName: "Nami",
			message: "Did you check the weather forecast?",
			timestamp: "2 hours ago",
		},
		{
			chatId: "4",
			userName: "Sanji",
			message: "Let's cook something special tonight!",
			timestamp: "10 minutes ago",
		},
		{
			chatId: "5",
			userName: "Robin",
			message: "I found some interesting books.",
			timestamp: "3 days ago",
		},
		{
			chatId: "6",
			userName: "Chopper",
			message: "How are you feeling today?",
			timestamp: "5 minutes ago",
		},
		{
			chatId: "7",
			userName: "Franky",
			message: "Super!",
			timestamp: "30 minutes ago",
		},
		{
			chatId: "8",
			userName: "Brook",
			message: "Yohohoho! I got a joke for you!",
			timestamp: "Yesterday",
		},
		{
			chatId: "9",
			userName: "Jinbe",
			message: "Let's discuss strategy.",
			timestamp: "4 days ago",
		},
		{
			chatId: "10",
			userName: "Ace",
			message: "I'll be back soon.",
			timestamp: "2 weeks ago",
		},
		{
			chatId: "11",
			userName: "Shanks",
			message: "Long time no see, Luffy.",
			timestamp: "1 week ago",
		},
		{
			chatId: "12",
			userName: "Boa Hancock",
			message: "Luffy, do you miss me?",
			timestamp: "3 hours ago",
		},
		{
			chatId: "13",
			userName: "Sabo",
			message: "Luffy, I have news for you.",
			timestamp: "Yesterday",
		},
		{
			chatId: "14",
			userName: "Law",
			message: "We've got a new plan.",
			timestamp: "5 hours ago",
		},
		{
			chatId: "15",
			userName: "Kid",
			message: "Don't get in my way!",
			timestamp: "3 days ago",
		},
		{
			chatId: "16",
			userName: "Kaido",
			message: "You can't defeat me.",
			timestamp: "1 month ago",
		},
		{
			chatId: "17",
			userName: "Big Mom",
			message: "I'm coming for the One Piece.",
			timestamp: "2 weeks ago",
		},
		{
			chatId: "18",
			userName: "Crocodile",
			message: "We need to talk.",
			timestamp: "Yesterday",
		},
		{
			chatId: "19",
			userName: "Doflamingo",
			message: "The world is mine.",
			timestamp: "5 days ago",
		},
		{
			chatId: "20",
			userName: "Blackbeard",
			message: "Zehahaha! Watch your back.",
			timestamp: "1 week ago",
		},
	];
	const [curSearch, setCurSearch] = useState(searchParams.get("search") || "");

	useEffect(() => {
		setCurSearch(searchParams.get("search") || "");
	}, [searchParams]);

	const filtered = useMemo(() => {
		return recentChats.filter((chat) =>
			chat.userName.toLowerCase().includes(curSearch),
		);
	}, [curSearch, recentChats]);

	return (
		<div className="w-full h-full md:w-[40%] lg:w-[30%] px-2 ">
			<h1 className="text-xl h-[5%]">Chats</h1>
			<SearchBar />
			<div className="h-[90%] py-2 overflow-y-scroll chat-card">
				{filtered.map(
					(val): ReactNode => (
						<ChatCard
							key={val.chatId}
							chatId={val.chatId + ""}
							userName={val.userName}
							recentMessage={val.message}
							timestamp={val.timestamp}
						/>
					),
				)}
			</div>
		</div>
	);
}

export default RecentChats;
