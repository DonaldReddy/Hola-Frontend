import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import React from "react";
import RequestReceived from "../(request)/RequestReceived";
import RequestSent from "../(request)/RequestSent";

function FriendRequest({ searchParams }: { searchParams: { type: string } }) {
	let currentTab = searchParams.type || "received";
	if (currentTab !== "sent" && currentTab !== "received") {
		currentTab = "received";
	}
	return (
		<Tabs
			defaultValue={currentTab}
			className="rounded-md w-[70svw] h-[70svh] flex flex-col items-center"
		>
			<TabsList className=" w-1/2 m-5  bg-zinc-600">
				<TabsTrigger
					value="received"
					className="w-1/2 mx-1 bg-zinc-700 text-slate-300 data-[state=active]:bg-primary data-[state=active]:text-slate-50"
					asChild
				>
					<Link
						href={{
							query: {
								...searchParams,
								type: "received",
							},
						}}
						replace
					>
						Received
					</Link>
				</TabsTrigger>
				<TabsTrigger
					value="sent"
					className="w-1/2 mx-1 bg-zinc-700 text-neutral-200 data-[state=active]:bg-primary data-[state=active]:text-white"
					asChild
				>
					<Link
						href={{
							query: {
								...searchParams,
								type: "sent",
							},
						}}
						replace
					>
						Sent
					</Link>
				</TabsTrigger>
			</TabsList>
			<TabsContent value="received">
				<RequestReceived />
			</TabsContent>
			<TabsContent value="sent">
				<RequestSent />
			</TabsContent>
		</Tabs>
	);
}

export default FriendRequest;
