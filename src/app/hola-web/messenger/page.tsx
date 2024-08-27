"use client";
import React from "react";
import RecentChats from "@/components/RecentChats";
import OpenChat from "../../../components/OpenChat";
import { useAppSelector } from "@/redux/store";
import useScreenWidth from "@/customHooks/useScreenWidth";

function Page() {
	const screenWidth = useScreenWidth();

	const selectedChat = useAppSelector(
		(state) => state.chatReducer.selectedChat,
	);

	return (
		<div className="flex h-[95svh] overflow-hidden">
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
