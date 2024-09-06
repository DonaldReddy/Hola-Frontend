import { Message } from "@/types";
import React from "react";

function MessageCard({
	message,
	isUser,
}: {
	message: Message;
	isUser: boolean;
}) {
	return (
		<div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
			<div
				className={` max-w-[60%] py-1 px-2 rounded-md break-words text-sm whitespace-pre-wrap ${
					isUser ? "bg-transparent-700" : "bg-primary-500"
				}`}
			>
				{message.messageBody}
				<div className="text-[11px] text-right text-[#ffffff76]">
					{message.sentAt.split("T")[1].slice(0, -4)}
				</div>
			</div>
		</div>
	);
}

export default MessageCard;
