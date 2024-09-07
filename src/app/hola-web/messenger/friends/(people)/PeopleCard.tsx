"use client";
import React from "react";
import { BsChatSquareTextFill, BsFillPersonCheckFill } from "react-icons/bs";
import { IoPersonAddSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	getSentFriendRequests,
	sendFriendRequest,
} from "@/redux/slices/friendSlice";
import { useToast } from "@/hooks/use-toast";
import MyAvatar from "@/components/MyAvatar";

function PeopleCard({
	name,
	userName,
	status,
	isSelected,
}: {
	name: string;
	userName: string;
	status: "sent" | "friend" | "not sent";
	isSelected: boolean;
}) {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const user = useAppSelector((s) => s.userReducer.user);
	const { toast } = useToast();

	function handleSendFriendRequest() {
		dispatch(sendFriendRequest({ userName: user, friendUserName: userName }))
			.unwrap()
			.then(() => {
				dispatch(getSentFriendRequests({ user }));
				toast({ description: "Friend request sent", duration: 3000 });
			})
			.catch((error) => {
				toast({ description: error, variant: "destructive", duration: 3000 });
			});
	}

	function navigateToChat() {
		router.replace("/hola-web/messenger");
	}

	return (
		<div
			className={`flex items-center justify-between p-2 pr-10 hover:bg-primary-700 border-b border-b-zinc-500 last:border-b-0 ${
				isSelected ? "bg-primary-700" : ""
			}`}
		>
			<div className="flex items-center gap-2">
				<div className="w-10 h-10 ">
					<MyAvatar userName={userName} />
				</div>
				<div className="">
					<h1 className="text-sm">{name}</h1>
					<h2 className="text-xs text-neutral-400">{userName} </h2>
				</div>
			</div>
			{user !== userName && (
				<div>
					{status === "not sent" && (
						<div className="cursor-pointer" onClick={handleSendFriendRequest}>
							<IoPersonAddSharp size={20} title="send request" />
						</div>
					)}
					{status === "sent" && (
						<div>
							<BsFillPersonCheckFill size={20} title="already sent" />
						</div>
					)}
					{status === "friend" && (
						<div className="cursor-pointer" onClick={navigateToChat}>
							<BsChatSquareTextFill size={20} title="send message" />
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default PeopleCard;
