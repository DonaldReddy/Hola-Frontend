import React from "react";
import RecentChats from "./RecentChats";
import OpenChat from "./OpenChat";

function Page() {
	return (
		<div className="flex">
			<RecentChats />
			<OpenChat />
		</div>
	);
}

export default Page;
