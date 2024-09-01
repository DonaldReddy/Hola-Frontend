// "use client";
// import { CgProfile } from "react-icons/cg";
// import React from "react";
// import { BsChatSquareTextFill } from "react-icons/bs";
// import { IoPersonRemoveSharp } from "react-icons/io5";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
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

// function FriendCard({
// 	friendUserName = "friend",
// }: {
// 	friendUserName?: string;
// }) {
// 	const router = useRouter();

// 	function navigateToChat() {
// 		router.replace("/hola-web/messenger");
// 	}

// 	function handleUnFriend() {
// 		console.log("unfriend");
// 	}

// 	return (
// 		<div className="w-[500px] my-1 py-1 px-1 rounded-md flex justify-between bg-neutral-800 hover:bg-neutral-900">
// 			<div className="flex justify-center items-center gap-1">
// 				<CgProfile size={30} />
// 				{friendUserName}
// 			</div>
// 			<div className="flex gap-2">
// 				<Button
// 					onClick={navigateToChat}
// 					className="bg-transparent hover:bg-primary h-8"
// 				>
// 					<BsChatSquareTextFill />
// 				</Button>
// 				<Button
// 					className="bg-transparent hover:bg-red-800 h-8"
// 					onClick={handleUnFriend}
// 				>
// 					<IoPersonRemoveSharp />
// 				</Button>
// 			</div>
// 		</div>
// 	);
// }

// export default FriendCard;

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
import { Button } from "@/components/ui/button";

export default function AlertDialogDemo() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline">Show Dialog</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
