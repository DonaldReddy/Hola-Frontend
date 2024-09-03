"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
	acceptFriendRequest,
	ignoreFriendRequest,
	withdrawFriendRequest,
} from "@/redux/slices/friendSlice";
import { useAppDispatch } from "@/redux/store";
import { getFallBack } from "@/utils/main";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";
import React from "react";

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
	const router = useRouter();

	async function handleAcceptFriendRequest(friendRequestId: string) {
		dispatch(acceptFriendRequest(friendRequestId))
			.unwrap()
			.then(() => {
				router.refresh();
				toast({
					description: "Friend request Accepted",
					duration: 2000,
				});
			})
			.catch((error) => {
				toast({ description: error, variant: "destructive", duration: 2000 });
			});
	}

	function handleIgnoreFriendRequest(friendRequestId: string) {
		dispatch(ignoreFriendRequest(friendRequestId))
			.unwrap()
			.then(() => {
				router.refresh();
				toast({
					description: "Friend request Sent",
					duration: 2000,
				});
			})
			.catch((error) => {
				toast({ description: error, variant: "destructive", duration: 2000 });
			});
	}

	function handleWithdrawFriendRequest(friendRequestId: string) {
		dispatch(withdrawFriendRequest(friendRequestId))
			.unwrap()
			.then(() => {
				router.refresh();
				toast({
					description: "Friend request withdrawn successfully",
					duration: 2000,
				});
			})
			.catch((error) => {
				toast({ description: error, variant: "destructive", duration: 2000 });
			});
	}

	return (
		<div className="flex items-center justify-between p-2 pr-10 hover:bg-primary-700 border-b border-b-zinc-500 last:border-b-0">
			<div className="flex  items-center gap-2">
				<div className="w-10 h-10 ">
					<Avatar className="h-full w-full ">
						<AvatarImage
							src={`https://api.dicebear.com/9.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=${userName}&radius=50`}
							className="h-full w-full "
						/>
						<AvatarFallback
							delayMs={2000}
							className="bg-primary h-full w-full flex justify-center items-center rounded-full"
						>
							{getFallBack(userName)}
						</AvatarFallback>
					</Avatar>
				</div>
				<div className="">
					<h1 className="text-sm">{userName}</h1>
				</div>
			</div>
			<div className="flex gap-2 items-center">
				{type == "received" && (
					<>
						<Button
							className="bg-primary-500 h-8 px-2"
							onClick={() => handleAcceptFriendRequest(id)}
						>
							Accept
						</Button>
						<Button
							className="bg-transparent hover:bg-red-800 h-8 px-2"
							onClick={() => handleIgnoreFriendRequest(id)}
						>
							Ignore
						</Button>
					</>
				)}
				{type == "sent" && (
					<Button
						className="bg-transparent hover:bg-red-800 h-8 px-2"
						onClick={() => handleWithdrawFriendRequest(id)}
					>
						Withdraw
					</Button>
				)}
			</div>
		</div>
	);
}

export default RequestCard;
