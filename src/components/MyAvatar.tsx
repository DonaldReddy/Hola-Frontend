import { getFallBack } from "@/utils/main";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

function MyAvatar({ userName }: { userName: string }) {
	const url = new URL(
		"https://api.dicebear.com/9.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50",
	);

	url.searchParams.set("seed", userName);

	return (
		<div>
			<Avatar className="h-full w-full ">
				<AvatarImage src={url.toString()} className="h-full w-full " />
				<AvatarFallback
					delayMs={3000}
					className="bg-primary h-full w-full flex justify-center items-center rounded-full"
				>
					{getFallBack(userName)}
				</AvatarFallback>
			</Avatar>
		</div>
	);
}

export default MyAvatar;
