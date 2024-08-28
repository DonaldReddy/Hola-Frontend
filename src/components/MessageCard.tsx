import React from "react";

function MessageCard({
	msg,
	isUser,
}: {
	msg: { message: string; timestamp: string };
	isUser: boolean;
}) {
	return (
		<div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
			<div
				className={` max-w-[60%] py-1 px-2 rounded-md break-words text-sm whitespace-pre-wrap ${
					isUser ? "bg-[#403f4183]" : "bg-[#4e118b83]"
				}`}
			>
				{msg.message}
				<div className="text-[11px] text-right text-[#ffffff76]">
					{msg.timestamp.split("T")[1].slice(0, -4)}
				</div>
			</div>
		</div>
	);
}

export default MessageCard;
