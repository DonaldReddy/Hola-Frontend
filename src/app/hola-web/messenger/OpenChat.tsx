import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";

function OpenChat() {
	return (
		<div className="w-[70%] border-l-[1px] border-[#ffffff3c]">
			<div className="h-20 m-1 px-1 flex items-center justify-around  border-[1px] border-[#ffffff2e] rounded-sm hover:bg-[#df28ff44]">
				<CgProfile size={50} />
				<div className="flex w-[80%] justify-between items-center">
					<div>
						<h2>Luffy</h2>
						<h5 className="text-sm text-gray-500">last seen at 12:00am</h5>
					</div>
					<div>
						<IoIosSearch />
					</div>
				</div>
			</div>
			<div></div>
			<div></div>
		</div>
	);
}

export default OpenChat;
