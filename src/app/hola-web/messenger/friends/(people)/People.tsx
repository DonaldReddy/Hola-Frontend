import React from "react";
import SearchBar from "@/components/SearchBar";
import PeopleResult from "./PeopleResult";

function People() {
	return (
		<div className="h-[70svh] w-[70svw] pt-1 flex flex-col justify-between items-center rounded-md border border-neutral-600">
			<SearchBar />
			<div className="h-[90%] w-full  rounded-md ">{<PeopleResult />}</div>
		</div>
	);
}

export default People;
