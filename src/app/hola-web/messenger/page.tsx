"use client";
import React from "react";
import RecentChats from "./RecentChats";
import OpenChat from "./OpenChat";
import { useAppSelector } from "@/redux/store";
import useScreenWidth from "@/customHooks/useScreenWidth";

function Page() {
	const screenWidth = useScreenWidth();

	const selectedChat = useAppSelector(
		(state) => state.chatReducer.selectedChat,
	);

	return (
		<div className="flex">
			{screenWidth > 768 ? (
				<>
					<RecentChats />
					<OpenChat />
				</>
			) : (
				<>{selectedChat.userName ? <OpenChat /> : <RecentChats />}</>
			)}
		</div>
	);
}

export default Page;
