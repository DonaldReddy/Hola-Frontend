"use client";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { useAppDispatch } from "@/redux/store";
import { selectChat } from "@/redux/slices/chatSlice";

type ChatCardProps = {
	chatId: string;
	userName: string;
	recentMessage: string;
	timestamp: string;
};

function ChatCard({
	chatId,
	userName,
	recentMessage,
	timestamp,
}: ChatCardProps) {
	const dispatch = useAppDispatch();

	function handleClick(e: React.MouseEvent<HTMLDivElement>) {
		dispatch(selectChat({ userName, chatId }));
	}

	return (
		<div
			className="h-20 mt-1 px-1 flex items-center justify-around  border-[1px] border-[#ffffff2e] rounded-sm hover:bg-[#42009938]"
			onClick={handleClick}
		>
			<CgProfile size={50} />
			<div className="flex w-[80%] justify-between items-center">
				<div>
					<h2>{userName}</h2>
					<h5 className="text-sm text-gray-500">{recentMessage}</h5>
				</div>
				<div className="text-sm text-gray-400">{timestamp}</div>
			</div>
		</div>
	);
}

export default ChatCard;
