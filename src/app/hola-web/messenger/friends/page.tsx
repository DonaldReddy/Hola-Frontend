import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Friends from "./(friend)/Friends";
import FriendRequest from "./(request)/FriendRequest";
import People from "./(people)/People";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
	return {
		title: "Friends",
	};
}

function Page({
	searchParams,
}: {
	searchParams: { tab: string; type: string; search: string };
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
		<div className="h-[95svh] w-svw flex justify-center items-center ">
			<Tabs
				value={currentTab}
				className="h-[90%] w-full flex flex-col justify-between items-center rounded-md"
			>
				<TabsList className="w-[95%] h-14 p-2 bg-neutral-900 flex justify-between gap-3">
					<TabsTrigger
						value="friends"
						className="w-1/3 h-10 text-lg bg-neutral-950 text-neutral-200 data-[state=active]:bg-primary data-[state=active]:text-white"
						asChild
					>
						<Link
							href={{
								query: {
									tab: "friends",
									...(currentTab === "friends" && searchParams.search
										? { search: searchParams.search }
										: {}),
								},
							}}
							replace
						>
							Friends
						</Link>
					</TabsTrigger>
					<TabsTrigger
						value="people"
						className="w-1/3 h-10 text-lg bg-neutral-950 text-neutral-200 data-[state=active]:bg-primary data-[state=active]:text-white"
						asChild
					>
						<Link
							href={{
								query: {
									tab: "people",
									...(currentTab === "people" && searchParams.search
										? { search: searchParams.search }
										: {}),
								},
							}}
							replace
						>
							People
						</Link>
					</TabsTrigger>
					<TabsTrigger
						value="friends-request"
						className="w-1/3 h-10 text-lg bg-neutral-950 text-neutral-200 data-[state=active]:bg-primary data-[state=active]:text-white"
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
