"use client";
import React, { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import useScreenWidth from "@/customHooks/useScreenWidth";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { unSelectChat } from "@/redux/slices/chatSlice";

function OpenChat() {
	const screenWidth = useScreenWidth();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const selectedChat = useAppSelector(
		(state) => state.chatReducer.selectedChat,
	);
	const user = useAppSelector((state) => state.userReducer.user);

	const conversationData = [
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
	];

	useEffect(() => {}, [user]);

	function handleGoBack(e: React.MouseEvent<SVGAElement>) {
		dispatch(unSelectChat());
	}

	if (!selectedChat.userName)
		return (
			<div className="flex w-[70%] justify-center items-center">
				select a chat to start messaging
			</div>
		);

	return (
		<div
			className={`w-full min-h-svh lg:w-[70%] flex flex-col items-center border-l-[1px] border-[#ffffff3c]`}
		>
			<div className="h-15 w-full px-3 py-1 flex items-center justify-between border-[1px] border-[#ffffff2e] bg-[#42009963] gap-3">
				{screenWidth <= 768 && <FaArrowLeftLong onClick={handleGoBack} />}
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

			<div className="max-h-[20%] w-full overflow-y-scroll chat-card bg-yellow-400">
				{conversationData.map((msg) =>
					user == msg.sender ? (
						<div className="max-h-min max-w-min my-2 rounded-md bg-red-600 relative right-0">
							{msg.message}
						</div>
					) : (
						<div className="max-h-min max-w-min my-2 rounded-md bg-emerald-600 ">
							{msg.message}
						</div>
					),
				)}
			</div>
			<div className="bg-[#4200996c] w-full h-[50px]"></div>
		</div>
	);
}

export default OpenChat;
