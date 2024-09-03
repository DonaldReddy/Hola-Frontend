import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import React from "react";
import RequestReceived from "./RequestReceived";
import RequestSent from "./RequestSent";

function FriendRequest({ searchParams }: { searchParams: { type: string } }) {
	let currentTab = searchParams.type || "received";
	if (currentTab !== "sent" && currentTab !== "received") {
		currentTab = "received";
	}
	return (
		<Tabs
			defaultValue={currentTab}
			className="rounded-md w-[70svw] flex flex-col justify-center m-0 p-0 gap-0 items-center"
		>
			<TabsList className=" w-1/2  bg-neutral-900 m-0 p-0 gap-0">
				<TabsTrigger
					value="received"
					className="w-1/2 mx-1 bg-neutral-950 text-slate-300 data-[state=active]:bg-black data-[state=active]:text-slate-50"
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
					className="w-1/2 mx-1 bg-neutral-950 text-neutral-200 data-[state=active]:bg-black data-[state=active]:text-white"
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
