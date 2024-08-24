import React from "react";
import { CgProfile } from "react-icons/cg";

function ChatCard() {
	return (
		<div className="h-20 m-1 px-1 flex items-center justify-around  border-[1px] border-[#ffffff2e] rounded-sm hover:bg-[#df28ff44]">
			<CgProfile size={50} />
			<div className="flex w-[80%] justify-between items-center">
				<div>
					<h2>Luffy</h2>
					<h5 className="text-sm text-gray-500">Hello</h5>
				</div>
				<div className="text-sm text-gray-400">yesterday</div>
			</div>
		</div>
	);
}

export default ChatCard;
