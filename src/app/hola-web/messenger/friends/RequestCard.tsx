import { Button } from "@/components/ui/button";
import React from "react";
import { CgProfile } from "react-icons/cg";

function RequestCard({
	friendUserName,
	type = "received",
}: {
	friendUserName: string;
	type?: "received" | "sent";
}) {
	return (
		<div className="w-[500px] my-1 py-1 px-1 rounded-md flex justify-between bg-neutral-800 hover:bg-neutral-900">
			<div className="flex justify-center items-center gap-1">
				<CgProfile size={30} />
				{friendUserName}
			</div>
			<div className="flex gap-2 items-center">
				{type == "received" && (
					<>
						<Button className="bg-primary-500 h-8 px-2">Accept</Button>
						<Button className="bg-transparent hover:bg-red-800 h-8 px-2">
							Ignore
						</Button>
					</>
				)}
				{type == "sent" && (
					<Button className="bg-transparent hover:bg-red-800 h-8 px-2">
						Delete
					</Button>
				)}
			</div>
		</div>
	);
}

export default RequestCard;
