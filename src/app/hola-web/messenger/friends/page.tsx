import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Friends from "./(friend)/Friends";
import FriendRequest from "./(request)/FriendRequest";
import People from "./(people)/People";

function Page({
	searchParams,
}: {
	searchParams: { tab: string; type: string };
}) {
	let currentTab = searchParams.tab || "friends";
	if (
		currentTab !== "friends" &&
		currentTab !== "friends-request" &&
		currentTab !== "people"
	) {
		currentTab = "friends";
	}

	return (
		<div className="h-[95svh] flex justify-center items-center">
			<Tabs
				value={currentTab}
				className="bg-zinc-900 rounded-md h-[90svh] w-[90%] pt-2 flex flex-col items-center"
			>
				<TabsList className="w-[80svw] bg-zinc-600 ">
					<TabsTrigger
						value="friends"
						className="w-1/2 mx-1 bg-zinc-700 text-neutral-200 data-[state=active]:bg-primary data-[state=active]:text-white"
						asChild
					>
						<Link
							href={{
								query: {
									tab: "friends",
								},
							}}
							replace
						>
							Friends
						</Link>
					</TabsTrigger>
					<TabsTrigger
						value="people"
						className="w-1/2 mx-1 bg-zinc-700 text-slate-300 data-[state=active]:bg-primary data-[state=active]:text-slate-50"
						asChild
					>
						<Link
							href={{
								query: {
									tab: "people",
								},
							}}
							replace
						>
							People
						</Link>
					</TabsTrigger>
					<TabsTrigger
						value="friends-request"
						className="w-1/2 mx-1 bg-zinc-700 text-slate-300 data-[state=active]:bg-primary data-[state=active]:text-slate-50"
						asChild
					>
						<Link
							href={{
								query: {
									tab: "friends-request",
									type: "received",
								},
							}}
							replace
						>
							Friends Requests
						</Link>
					</TabsTrigger>
				</TabsList>
				<TabsContent value="friends">
					<Friends />
				</TabsContent>
				<TabsContent value="people">
					<People />
				</TabsContent>
				<TabsContent value="friends-request">
					<FriendRequest searchParams={searchParams} />
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default Page;
