import React from "react";

function MessageCard({ msg, isUser }: { msg: any; isUser: boolean }) {
	return (
		<div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
			<div
				className={`w-fit max-w-[45%] py-1 px-2 rounded-md break-words ${
					isUser ? "bg-[#403f4183]" : "bg-[#4e118ba9]"
				}`}
			>
				{msg.message}
			</div>
		</div>
	);
}

export default MessageCard;
