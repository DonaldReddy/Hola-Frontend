import React, { ReactNode } from "react";
import SearchBar from "@/components/SearchBar";
import ChatCard from "./ChatCard";
function RecentChats() {
	const arr = [
		1, 2, 3, 12, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
		2,
	];
	return (
		<div className="w-[30%] min-h-svh px-2">
			<h1 className="text-xl">Chats</h1>
			<SearchBar />
			<div className="max-h-svh overflow-scroll chat-card py-3">
				{arr.map(
					(val: number): ReactNode => (
						<ChatCard key={val} />
					),
				)}
			</div>
		</div>
	);
}

export default RecentChats;
