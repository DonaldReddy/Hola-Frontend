"use client";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdGroups2 } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectChat } from "@/redux/slices/chatSlice";
import { Chat } from "@/types";

type ChatCardProps = {
	chat: Chat;
};

function ChatCard({ chat }: ChatCardProps) {
	const dispatch = useAppDispatch();
	const user = useAppSelector((s) => s.userReducer.user);

	function handleClick(chat: Chat) {
		dispatch(selectChat(chat));
	}

	return (
		<div
			className="h-20 mt-1 px-1 flex items-center justify-around  border-[1px] border-transparent-500 rounded-sm hover:bg-hover-primary-500"
			onClick={() => handleClick(chat)}
		>
			{chat.chatType == "private" ? (
				<CgProfile size={40} />
			) : (
				<MdGroups2 size={40} />
			)}
			<div className="flex w-[80%] justify-between items-center">
				<div>
					<h2>
						{chat.chatType == "private"
							? chat.participants.find((val) => val != user)
							: chat.groupName}
					</h2>
					{/* <h5 className="text-sm text-gray-500">{recentMessage}</h5> */}
				</div>
				<div className="text-sm text-gray-400">
					{chat.lastMessageAt.split("T")[0]}
				</div>
			</div>
		</div>
	);
}

export default ChatCard;
