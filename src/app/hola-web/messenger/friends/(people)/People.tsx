import React from "react";
import SearchBar from "@/components/SearchBar";

function People() {
	return (
		<div className="h-[70svh] w-[70svw] flex justify-between items-center bg-neutral-800 rounded-md">
			<div className=" h-full w-[30%] p-2 flex flex-col justify-around items-center gap-1 bg-primary-700">
				<SearchBar />
				<div className="h-[90%] w-full  rounded-md"></div>
			</div>
		</div>
	);
}

export default People;
