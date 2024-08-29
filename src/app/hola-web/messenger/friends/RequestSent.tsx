import React from "react";
import RequestCard from "./RequestCard";

function RequestSent() {
	let friends = [
		{ id: 1, name: "Alice Johnson" },
		{ id: 2, name: "Bob Smith" },
		{ id: 3, name: "Charlie Brown" },
		{ id: 4, name: "Diana Prince" },
		{ id: 5, name: "Eve Davis" },
		{ id: 6, name: "Frank Wilson" },
		{ id: 7, name: "Grace Hopper" },
		{ id: 8, name: "Hank Green" },
		{ id: 9, name: "Ivy Clark" },
		{ id: 10, name: "Jack Daniels" },
		{ id: 1, name: "Alice Johnson" },
		{ id: 2, name: "Bob Smith" },
		{ id: 3, name: "Charlie Brown" },
		{ id: 4, name: "Diana Prince" },
		{ id: 5, name: "Eve Davis" },
		{ id: 6, name: "Frank Wilson" },
		{ id: 7, name: "Grace Hopper" },
		{ id: 8, name: "Hank Green" },
		{ id: 9, name: "Ivy Clark" },
		{ id: 10, name: "Jack Daniels" },
	];

	return (
		<div className="flex h-[56svh] rounded-md p-1 flex-col overflow-y-scroll items-center chat-card">
			{friends.map((friend) => (
				<RequestCard friendUserName={friend.name} type="sent" key={friend.id} />
			))}
		</div>
	);
}

export default RequestSent;
