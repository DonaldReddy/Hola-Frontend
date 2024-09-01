"use client";
import React from "react";
import { BsChatSquareTextFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { sendFriendRequest } from "@/redux/slices/friendSlice";
import { useToast } from "@/hooks/use-toast";

function PeopleCard({
	name,
	userName,
	status = "not sent",
}: {
	name: string;
	userName: string;
	status?: "sent" | "friend" | "not sent";
}) {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const user = useAppSelector((s) => s.userReducer.user);
	const { toast } = useToast();

	function handleSendFriendRequest() {
		dispatch(sendFriendRequest({ userName: user, friendUserName: userName }))
			.unwrap()
			.then(() => {
				toast({ description: "Friend request sent" });
			})
			.catch((error) => {
				toast({ description: error, variant: "destructive", duration: 3000 });
			});
	}

	function navigateToChat() {
		router.replace("/hola-web/messenger");
	}

	return (
		<div className="flex items-center justify-between p-2 pr-10 hover:bg-primary-700 border-b border-b-zinc-500 last:border-b-0">
			<div className="flex  items-center gap-2">
				<div>
					<CgProfile size={40} />
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
							<IoPersonAddSharp size={20} />
						</div>
					)}
					{status === "sent" && (
						<div>
							<FaUserCheck size={20} />
						</div>
					)}
					{status === "friend" && (
						<div className="cursor-pointer" onClick={navigateToChat}>
							<BsChatSquareTextFill size={20} />
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default PeopleCard;
