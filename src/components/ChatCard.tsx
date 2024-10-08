"use client";
import { selectChat } from "@/redux/slices/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Chat } from "@/types";
import { MdGroups2 } from "react-icons/md";
import MyAvatar from "./MyAvatar";

function ChatCard({ chat, isSelected }: { chat: Chat; isSelected: boolean }) {
	const dispatch = useAppDispatch();
	const user = useAppSelector((s) => s.userReducer.user);

	function handleClick(chat: Chat) {
		dispatch(selectChat(chat));
	}

	return (
		<div
			className={`h-20 w-full mt-1 px-2 flex items-center gap-2 border-y  border-transparent-500 hover:bg-hover-primary-500 cursor-pointer ${
				isSelected ? "bg-hover-primary-500" : ""
			}`}
			onClick={() => handleClick(chat)}
		>
			<div className="h-10 w-10">
				{chat.chatType == "private" ? (
					<MyAvatar
						userName={
							chat.chatType == "private"
								? chat.participants.find((val) => val != user)!
								: ""
						}
					/>
				) : (
					<MdGroups2 size={40} />
				)}
			</div>
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
