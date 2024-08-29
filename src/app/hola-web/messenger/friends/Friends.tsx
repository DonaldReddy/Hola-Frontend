import React from "react";
import FriendCard from "./FriendCard";

function Friends() {
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
		<div className="flex h-1/2 flex-col p-1 overflow-y-scroll items-center chat-card">
			{friends.map((friend) => (
				<FriendCard friendUserName={friend.name} key={friend.id} />
			))}
		</div>
	);
}

export default Friends;
