"use client";
import { Button } from "@/components/ui/button";
import { acceptFriendRequest } from "@/redux/slices/userSlice";
import { useAppDispatch } from "@/redux/store";
import React from "react";
import { CgProfile } from "react-icons/cg";

function RequestCard({
	userName,
	id,
	type = "received",
}: {
	userName: string;
	id: string;
	type?: "received" | "sent";
}) {
	const dispatch = useAppDispatch();

	async function handleAcceptFriend(friendRequestId: string) {
		dispatch(acceptFriendRequest(friendRequestId))
			.unwrap()
			.then(() => {
				window.location.reload();
			})
			.catch((error) => {
				console.error("Failed to accept friend request:", error);
			});
	}

	return (
		<div className="w-[500px] my-1 py-1 px-1 rounded-md flex justify-between bg-neutral-800 hover:bg-neutral-900">
			<div className="flex justify-center items-center gap-1">
				<CgProfile size={30} />
				{userName}
			</div>
			<div className="flex gap-2 items-center">
				{type == "received" && (
					<>
						<Button
							className="bg-primary-500 h-8 px-2"
							onClick={() => handleAcceptFriend(id)}
						>
							Accept
						</Button>
						<Button
							className="bg-transparent hover:bg-red-800 h-8 px-2"
							onClick={() => handleAcceptFriend(id)}
						>
							Ignore
						</Button>
					</>
				)}
				{type == "sent" && (
					<Button className="bg-transparent hover:bg-red-800 h-8 px-2">
						Delete
					</Button>
				)}
			</div>
		</div>
	);
}

export default RequestCard;
