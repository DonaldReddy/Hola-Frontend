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
import { selectChat } from "@/redux/slices/chatSlice";
import { Chat } from "@/types";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import MyAvatar from "@/components/MyAvatar";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function FriendCard({
	name,
	friendUserName,
	isSelected,
}: {
	name: string;
	friendUserName: string;
	isSelected: boolean;
}) {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const user = useAppSelector((s) => s.userReducer.user);
	const { toast } = useToast();

	async function navigateToChat() {
		try {
			const url = new URL(`${BASE_URL}/chat/api/v1/chat/get-chat-between-two`);
			url.searchParams.set("userName", user);
			url.searchParams.set("friendUserName", friendUserName);
			const { data } = await axios.get(url.toString());

			if (data.chat) {
				const chat: Chat = {
					chatId: data.chat._id,
					lastMessageAt: data.chat.updatedAt,
					chatType: "private",
					participants: data.chat.participants,
					groupName: "",
				};
				dispatch(selectChat(chat));
			} else {
				const chat: Chat = {
					chatId: "new",
					lastMessageAt: "",
					chatType: "private",
					participants: [friendUserName, user],
					groupName: "",
				};
				dispatch(selectChat(chat));
			}
			router.replace("/hola-web/messenger");
		} catch (error) {
			toast({
				description: "Internal Error, Please try again",
				variant: "destructive",
				duration: 3000,
			});
		}
	}

	function handleUnFriend() {
		dispatch(unfriend({ userName: user, friendUserName }))
			.unwrap()
			.then(() => {
				router.refresh();
				toast({
					description: "Friend removed successfully.",
					duration: 3000,
				});
			})
			.catch(() => {
				toast({
					description: "Failed to remove friend. Please try again.",
					variant: "destructive",
					duration: 3000,
				});
			});
	}

	return (
		<div
			className={`flex items-center justify-between p-2 pr-10 hover:bg-primary-700 border-b border-b-zinc-500 last:border-b-0 ${
				isSelected ? "bg-primary-700" : ""
			}`}
		>
			<div className="flex  items-center gap-2">
				<div className="w-10 h-10 ">
					<MyAvatar userName={friendUserName} />
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
					<BsChatSquareTextFill size={20} title="send message" />
				</Button>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button className="bg-transparent hover:bg-red-800 h-10">
							<IoPersonRemoveSharp size={20} title="remove friend" />
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
