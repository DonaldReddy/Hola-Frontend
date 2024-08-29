import RecentChats from "@/components/RecentChats";
import OpenChat from "../../../components/OpenChat";

function Page() {
	return (
		<div className="flex h-[95svh] overflow-hidden">
			<RecentChats />
			<OpenChat />
		</div>
	);
}

export default Page;
