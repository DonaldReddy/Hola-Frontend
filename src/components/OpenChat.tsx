"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import MessageCard from "./MessageCard";
import { Message } from "@/types";
import axios from "axios";
import { selectChat } from "@/redux/slices/chatSlice";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import MyAvatar from "./MyAvatar";
import { useSocketIO } from "@/context/SocketIO/SocketIOContextProvider";
import { AiOutlineLoading } from "react-icons/ai";

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
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const searchParams = useSearchParams();
	const [page, setPage] = useState<number>(() => {
		const paramPage = searchParams.get("page");
		return paramPage ? Number(paramPage) : 1;
	});
	const [isLoading, setIsLoading] = useState(false);
	const socket = useSocketIO();
	const abortControllerRef = useRef<AbortController | null>(null);
	const conversationDataRef = useRef(conversationData);

	async function fetchMessages() {
		try {
			setIsLoading((prev) => true);

			if (abortControllerRef.current) {
				// Cancel the previous API call

				abortControllerRef.current.abort();
			}
			const controller = new AbortController();
			abortControllerRef.current = controller;
			chatContainerRef.current!.style.overflowY = "hidden";
			const url = new URL(`${BASE_URL}/message/api/v1/message/get-messages`);
			url.searchParams.set("chatId", selectedChat.chatId);
			url.searchParams.set("page", page.toString());
			const { data } = await axios.get(url.toString(), {
				signal: controller.signal,
			});
			abortControllerRef.current = null;
			chatContainerRef.current!.style.overflowY = "scroll";
			setConversationData((prevData) => [...data.messages, ...prevData]);
			setIsLoading((prev) => false);
		} catch (error) {
			// console.error("Failed to fetch messages:", error);
		}
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
						// scrollDown();
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
				// scrollDown();
			}
		} catch (error) {
			toast({
				description: "Failed to send the message. Please try again.",
				variant: "destructive",
			});
		}
	}

	useEffect(() => {
		conversationDataRef.current = conversationData;
		if (chatContainerRef.current && page === 1) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		} else if (chatContainerRef.current && page > 1) {
			chatContainerRef.current.scrollTop = 5;
		}
	}, [conversationData]);

	useEffect(() => {
		// Fetch messages when chat is selected
		if (selectedChat.chatId && selectedChat.chatId !== "new") {
			fetchMessages();
		}

		return () => {
			// Clean up
			setConversationData([]);
			conversationDataRef.current = [];
			abortControllerRef.current?.abort();
			abortControllerRef.current = null;
		};
	}, [selectedChat.chatId]);

	useEffect(() => {
		if (socket && selectedChat.chatId) {
			socket.on("MESSAGE", (message: Message) => {
				if (message.chatId === selectedChat.chatId) {
					setConversationData((prevData) => [...prevData, message]);
					conversationDataRef.current = [
						...conversationDataRef.current,
						message,
					];
				}
			});
			return () => {
				socket.off("MESSAGE");
			};
		}
	}, [socket, selectedChat.chatId]);

	useEffect(() => {
		const handleScroll = () => {
			if (
				chatContainerRef.current?.scrollTop === 0 &&
				conversationDataRef.current.length > 0
			) {
				setPage((prev) => prev + 1);
			}
		};

		const chatContainer = chatContainerRef.current;
		chatContainer?.addEventListener("scroll", handleScroll);

		return () => {
			chatContainer?.removeEventListener("scroll", handleScroll);
			setPage(1); // Reset page on cleanup
		};
	}, [selectedChat.chatId]);

	useEffect(() => {
		if (selectedChat.chatId && selectedChat.chatId !== "new") {
			fetchMessages();
		}
	}, [page]);

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
				className="h-[80%] w-full px-2 overflow-y-scroll scroll-area scroll-smooth"
				ref={chatContainerRef}
			>
				{isLoading && (
					<div className="flex justify-center items-center py-2">
						<AiOutlineLoading size={30} className="animate-spin" />
					</div>
				)}
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
