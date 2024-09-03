"use client";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getFallBack } from "@/utils/main";
import { getProfile } from "@/redux/slices/userSlice";

function Page() {
	const userInfo = useAppSelector((s) => s.userReducer);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (userInfo.user) dispatch(getProfile(userInfo.user));
	}, [dispatch, userInfo]);

	return (
		<div className="h-[95svh] w-svw bg-neutral-900 flex justify-center items-center">
			<div className="h-[50svh] w-[50svw]  bg-neutral-950 flex items-center justify-center gap-5 rounded-3xl">
				<div className="w-40 h-40 pr-5 border-r">
					<Avatar className="h-full w-full ">
						<AvatarImage
							src={`https://api.dicebear.com/9.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=${userInfo.user}&radius=50`}
							className="h-full w-full "
						/>
						<AvatarFallback
							delayMs={2000}
							className="bg-primary h-full w-full flex justify-center items-center rounded-full"
						>
							{getFallBack(userInfo.name || "")}
						</AvatarFallback>
					</Avatar>
				</div>
				<div>
					<p className="text-3xl my-1">{userInfo.name}</p>
					<p className="text-xl text-neutral-500  my-1">{userInfo.user}</p>
					<p className="text-base  my-1">{userInfo.numberOfFriends} friends</p>
				</div>
			</div>
		</div>
	);
}

export default Page;
