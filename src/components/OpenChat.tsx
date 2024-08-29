"use client";
import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";
import { useAppSelector } from "@/redux/store";
import MessageCard from "./MessageCard";

function OpenChat() {
	const selectedChat = useAppSelector(
		(state) => state.chatReducer.selectedChat,
	);
	const user = useAppSelector((state) => state.userReducer.user);
	const chatContainerRef = useRef<HTMLDivElement>(null);
	const [conversationData, setConversationData] = useState([
		{
			messageId: "0",
			sender: "Luffy",
			receiver: "Zoro",
			message:
				"Hey Zoro, are you ready for our next adventure?Hey Zoro, are you ready for our next adventure?Hey Zoro, are you ready for our next adventure?Hey Zoro, are you ready for our next adventure?Hey Zoro, are you ready for our next adventure?Hey Zoro, are you ready for our next adventure?Hey Zoro, are you ready for our next adventure?",
			timestamp: "2024-08-25T09:00:00Z",
		},
		{
			messageId: "1",
			sender: "Luffy",
			receiver: "Zoro",
			message: "Hey Zoro, are you ready for our next adventure?",
			timestamp: "2024-08-25T09:00:00Z",
		},
		{
			messageId: "2",
			sender: "Zoro",
			receiver: "Luffy",
			message: "Of course. Just let me finish my training first.",
			timestamp: "2024-08-25T09:05:00Z",
		},
		{
			messageId: "3",
			sender: "Luffy",
			receiver: "Zoro",
			message: "Haha, you always say that. But I know you'll be ready!",
			timestamp: "2024-08-25T09:10:00Z",
		},
		{
			messageId: "4",
			sender: "Zoro",
			receiver: "Luffy",
			message: "Just make sure you don't get us into trouble again.",
			timestamp: "2024-08-25T09:15:00Z",
		},
		{
			messageId: "5",
			sender: "Luffy",
			receiver: "Zoro",
			message: "No promises! But it'll be fun, you'll see.",
			timestamp: "2024-08-25T09:20:00Z",
		},
		{
			messageId: "6",
			sender: "Zoro",
			receiver: "Luffy",
			message: "I hope so. Anyway, meet me at the harbor at noon.",
			timestamp: "2024-08-25T09:25:00Z",
		},
		{
			messageId: "7",
			sender: "Luffy",
			receiver: "Zoro",
			message: "Got it! I'll be there. See you soon!",
			timestamp: "2024-08-25T09:30:00Z",
		},
		{
			messageId: "8",
			sender: "Zoro",
			receiver: "Luffy",
			message: "Don't be late!",
			timestamp: "2024-08-25T09:35:00Z",
		},
		{
			messageId: "9",
			sender: "Luffy",
			receiver: "Zoro",
			message: "I never am! (Well, maybe sometimes...)",
			timestamp: "2024-08-25T09:40:00Z",
		},
		{
			messageId: "10",
			sender: "Zoro",
			receiver: "Luffy",
			message: "I'll be ready. Let's make this adventure one to remember.",
			timestamp: "2024-08-25T09:45:00Z",
		},
	]);

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
			if (trimmedMessage.length > 0) {
				setConversationData([
					...conversationData,
					{
						messageId: (conversationData.length + 1).toString(),
						sender: user,
						receiver: selectedChat.userName,
						message: trimmedMessage,
						timestamp: new Date().toISOString(),
					},
				]);
				e.currentTarget.value = ""; // Clear the textarea
			}
		}
	}

	if (!selectedChat.userName)
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
							<h2>{selectedChat.userName}</h2>
							<h5 className="text-sm text-gray-500">last seen at 12:00 am</h5>
						</div>
					</div>
					<div>
						<IoIosSearch size={20} />
					</div>
				</div>
			</div>

			<div
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
			</div>

			<div className="bg-primary-700 w-full h-[7%] flex justify-center items-center border-t-[1px] border-[#ffffff4c]">
				<textarea
					className="h-[5svh] w-[90%] border-[1px] border-[#ffffff4b] px-2 py-1 rounded-md bg-primary-500 outline-none focus:bg-primary resize-none chat-card text-sm"
					placeholder="Type a message"
					onKeyDown={handleSendMessage}
				/>
			</div>
		</div>
	);
}

export default OpenChat;
