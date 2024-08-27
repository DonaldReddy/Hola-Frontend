"use client";
import React, { ChangeEvent } from "react";
import { IoIosSearch } from "react-icons/io";

function SearchBar() {
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		console.log(e.target.value);
	}

	return (
		<div className="flex items-center w-full p-1 gap-1 border-[1px] border-slate-50 rounded-3xl ">
			<IoIosSearch color="white" size={20} />
			<input
				className="w-full text-slate-50 bg-black outline-none"
				type="text"
				placeholder="Search"
				onChange={handleChange}
			/>
		</div>
	);
}

export default SearchBar;
