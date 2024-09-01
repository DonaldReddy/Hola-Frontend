"use client";
import { CgProfile } from "react-icons/cg";
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

function FriendCard({
	friendUserName = "friend",
}: {
	friendUserName?: string;
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
		<div className="w-[500px] my-1 py-1 px-1 rounded-md flex justify-between bg-neutral-800 hover:bg-neutral-900">
			<div className="flex justify-center items-center gap-1">
				<CgProfile size={30} />
				{friendUserName}
			</div>
			<div className="flex gap-2">
				<Button
					onClick={navigateToChat}
					className="bg-transparent hover:bg-primary h-8"
				>
					<BsChatSquareTextFill />
				</Button>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button className="bg-transparent hover:bg-red-800 h-8">
							<IoPersonRemoveSharp />
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

// import {
// 	AlertDialog,
// 	AlertDialogAction,
// 	AlertDialogCancel,
// 	AlertDialogContent,
// 	AlertDialogDescription,
// 	AlertDialogFooter,
// 	AlertDialogHeader,
// 	AlertDialogTitle,
// 	AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";

// export default function AlertDialogDemo() {
// 	return (
// 		<AlertDialog>
// 			<AlertDialogTrigger asChild>
// 				<Button variant="outline">Show Dialog</Button>
// 			</AlertDialogTrigger>
// 			<AlertDialogContent>
// 				<AlertDialogHeader>
// 					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
// 					<AlertDialogDescription>
// 						This action cannot be undone. This will permanently delete your
// 						account and remove your data from our servers.
// 					</AlertDialogDescription>
// 				</AlertDialogHeader>
// 				<AlertDialogFooter>
// 					<AlertDialogCancel>Cancel</AlertDialogCancel>
// 					<AlertDialogAction>Continue</AlertDialogAction>
// 				</AlertDialogFooter>
// 			</AlertDialogContent>
// 		</AlertDialog>
// 	);
// }
