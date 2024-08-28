"use client";
import React from "react";
import RecentChats from "@/components/RecentChats";
import OpenChat from "../../../components/OpenChat";
import { useAppSelector } from "@/redux/store";

function Page() {
	const screenWidth = useAppSelector((s) => s.generalSlice.screenWidth);

	const selectedChat = useAppSelector(
		(state) => state.chatReducer.selectedChat,
	);

	return (
		<div className="flex h-[95svh] overflow-hidden">
			{/* {screenWidth > 768 ? ( */}
			{/* <> */}
			<RecentChats />
			<OpenChat />
			{/* </> */}
			{/* ) : ( */}
			{/* <>{selectedChat.chatId ? <OpenChat /> : <RecentChats />}</> */}
			{/* )} */}
		</div>
	);
}

export default Page;
