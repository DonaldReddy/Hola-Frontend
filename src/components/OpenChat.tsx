"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import MessageCard from "./MessageCard";
import { Message } from "@/types";
import axios from "axios";
import { selectChat } from "@/redux/slices/chatSlice";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import MyAvatar from "./MyAvatar";
import { useSocketIO } from "@/context/SocketIO/SocketIOContextProvider";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function OpenChat() {
	const selectedChat = useAppSelector(
		(state) => state.chatReducer.selectedChat,
	);
	const user = useAppSelector((state) => state.userReducer.user);
	const chatContainerRef = useRef<HTMLDivElement>(null);
	const [conversationData, setConversationData] = useState<Message[]>([]);
	const dispatch = useAppDispatch();
	const { toast } = useToast();
	const router = useRouter();
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const socket = useSocketIO();

	async function fetchMessages() {
		try {
			const url = new URL(`${BASE_URL}/message/api/v1/message/get-messages`);
			url.searchParams.set("chatId", selectedChat.chatId);
			const { data } = await axios.get(url.toString());
			setConversationData([...data.messages]);
		} catch (error) {}
	}

	async function handleSendMessage(
		e: React.KeyboardEvent<HTMLTextAreaElement>,
	) {
		if (e.key == "Enter" && e.shiftKey) return;
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();

			const messageBody = e.currentTarget.value.trim();
			if (messageBody.length > 0) {
				if (selectedChat.chatId === "new") {
					handleCreateNewChatAndSendMessage(messageBody);
				} else {
					try {
						const { data } = await axios.post(
							`${BASE_URL}/message/api/v1/message/send-message`,
							{
								chatId: selectedChat.chatId,
								messageBody,
								author: user,
							},
						);
						setConversationData((prevData) => [...prevData, data.message]);
					} catch (error) {
						toast({
							description: "Failed to send the message. Please try again.",
							variant: "destructive",
						});
					}
				}
				if (textareaRef.current) {
					textareaRef.current.value = "";
				}
			}
		}
	}

	async function handleCreateNewChatAndSendMessage(messageBody: string) {
		try {
			const { data } = await axios.post(
				`${BASE_URL}/chat/api/v1/chat/create-new-chat-and-send-message`,
				{
					userName: user,
					friendUserName: selectedChat.participants[0],
					messageBody,
				},
			);

			if (!data.status) {
				toast({ description: data.error, variant: "destructive" });
			} else {
				dispatch(selectChat(data.chat));
				setConversationData((prevData) => [...prevData, data.message]);
				router.refresh();
			}
		} catch (error) {
			toast({
				description: "Failed to send the message. Please try again.",
				variant: "destructive",
			});
		}
	}

	useEffect(() => {
		if (selectedChat.chatId && selectedChat.chatId !== "new") {
			fetchMessages();
		}
	}, [selectedChat.chatId]);

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	}, [conversationData, selectedChat]);

	useEffect(() => {
		if (socket && selectedChat.chatId) {
			socket.on("MESSAGE", (message: Message) => {
				if (message.chatId === selectedChat.chatId)
					setConversationData((prevData) => [...prevData, message]);
			});
			return () => {
				socket.off("MESSAGE");
			};
		}
	}, [socket, selectedChat.chatId]);

	if (selectedChat?.participants.length == 0)
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
						<div className="h-10 w-10">
							<MyAvatar
								userName={
									selectedChat.participants.find(
										(participant) => participant != user,
									)!
								}
							/>
						</div>
						<div>
							<h2>
								{selectedChat.participants.find(
									(participant) => participant != user,
								)}
							</h2>
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
				{conversationData.map((message, idx) => (
					<MessageCard
						key={message.messageId}
						message={message}
						isUser={user === message.author}
					/>
				))}
			</div>

			<div className="bg-primary-700 w-full h-[7%] flex justify-center items-center border-t-[1px] border-[#ffffff4c]">
				<textarea
					className="h-[5svh] w-[90%] border-[1px] border-[#ffffff4b] px-2 py-1 rounded-md bg-primary-500 outline-none focus:bg-primary resize-none chat-card text-sm"
					placeholder="Type a message and hit Enter to send..."
					onKeyDown={handleSendMessage}
					ref={textareaRef}
				/>
			</div>
		</div>
	);
}

export default OpenChat;
