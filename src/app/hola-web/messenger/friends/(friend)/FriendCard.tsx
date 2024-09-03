"use client";
import React from "react";
import { BsChatSquareTextFill } from "react-icons/bs";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { unfriend } from "@/redux/slices/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getFallBack } from "@/utils/main";

function FriendCard({
	name,
	friendUserName,
}: {
	name: string;
	friendUserName: string;
}) {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const user = useAppSelector((s) => s.userReducer.user);

	function navigateToChat() {
		router.replace("/hola-web/messenger");
	}

	function handleUnFriend() {
		dispatch(unfriend({ userName: user, friendUserName }))
			.unwrap()
			.then(() => router.refresh());
	}

	return (
		<div className="flex items-center justify-between p-2 pr-10 hover:bg-primary-700 border-b border-b-zinc-500 last:border-b-0">
			<div className="flex  items-center gap-2">
				<div className="w-10 h-10 ">
					<Avatar className="h-full w-full ">
						<AvatarImage
							src={`https://api.dicebear.com/9.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=${friendUserName}&radius=50`}
							className="h-full w-full "
						/>
						<AvatarFallback
							delayMs={2000}
							className="bg-primary h-full w-full flex justify-center items-center rounded-full"
						>
							{getFallBack(user)}
						</AvatarFallback>
					</Avatar>
				</div>
				<div className="">
					<h1 className="text-sm">{name}</h1>
					<h2 className="text-xs text-neutral-400">{friendUserName} </h2>
				</div>
			</div>
			<div className="flex gap-2 items-center">
				<Button
					onClick={navigateToChat}
					className="bg-transparent hover:bg-purple-900 h-10"
				>
					<BsChatSquareTextFill size={20} />
				</Button>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button className="bg-transparent hover:bg-red-800 h-10">
							<IoPersonRemoveSharp size={20} />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent className="text-white bg-purple-950">
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription className="text-white">
								This action cannot be undone.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel className="text-black bg-neutral-300 hover:bg-white">
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={handleUnFriend}
								className="bg-red-800 hover:bg-red-700"
							>
								Remove friend
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}

export default FriendCard;
