"use client";
import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";
import { useAppSelector } from "@/redux/store";
import MessageCard from "./MessageCard";
import { Message } from "@/types";

function OpenChat() {
	const selectedChat = useAppSelector(
		(state) => state.chatReducer.selectedChat,
	);
	const user = useAppSelector((state) => state.userReducer.user);
	const chatContainerRef = useRef<HTMLDivElement>(null);
	const conversationData: Message[] = [];

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	}, [conversationData, selectedChat]);

	function handleSendMessage(e: React.KeyboardEvent<HTMLTextAreaElement>) {
		if (e.key == "Enter" && e.shiftKey) return;
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();

			const trimmedMessage = e.currentTarget.value.trim();
			// if (trimmedMessage.length > 0) {
			// 	setConversationData([
			// 		...conversationData,
			// 		{
			// 			messageId: (conversationData.length + 1).toString(),
			// 			sender: user,
			// 			receiver: selectedChat.participants[0],
			// 			message: trimmedMessage,
			// 			timestamp: new Date().toISOString(),
			// 		},
			// 	]);
			// 	e.currentTarget.value = ""; // Clear the textarea
			// }
		}
	}

	if (!selectedChat.participants[0])
		return (
			<div className="flex md:w-[60%] lg:w-[70%] justify-center items-center">
				select a chat to start messaging
			</div>
		);

	return (
		<div
			className={`w-full h-svh md:w-[60%] lg:w-[70%] flex flex-col items-center border-l-[1px] border-[#ffffff3c] `}
		>
			<div className="h-[8%] w-full px-3 flex items-center justify-between border-[1px] border-[#ffffff2e] bg-primary-700 gap-3">
				<div className="w-[95%] lg:w-full flex justify-between items-center">
					<div className="flex items-center gap-2">
						<CgProfile size={40} />
						<div>
							<h2>{selectedChat.participants[0]}</h2>
							<h5 className="text-sm text-gray-500">last seen at 12:00 am</h5>
						</div>
					</div>
					<div>
						<IoIosSearch size={20} />
					</div>
				</div>
			</div>

			{/* <div
				className="h-[80%] w-full px-2 overflow-y-scroll chat-card "
				ref={chatContainerRef}
			>
				{conversationData.map((msg, idx) => (
					<MessageCard
						key={msg.messageId}
						msg={msg}
						isUser={user === msg.sender}
					/>
				))}
			</div> */}

			{/* <div className="bg-primary-700 w-full h-[7%] flex justify-center items-center border-t-[1px] border-[#ffffff4c]">
				<textarea
					className="h-[5svh] w-[90%] border-[1px] border-[#ffffff4b] px-2 py-1 rounded-md bg-primary-500 outline-none focus:bg-primary resize-none chat-card text-sm"
					placeholder="Type a message"
					onKeyDown={handleSendMessage}
				/>
			</div> */}
		</div>
	);
}

export default OpenChat;
