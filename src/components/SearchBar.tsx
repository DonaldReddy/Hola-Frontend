"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

function SearchBar() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [search, setSearch] = useState("");

	useEffect(() => {
		const initialSearch = searchParams.get("search") || "";

		if (search === "") {
			setSearch(initialSearch);
		}
	}, []);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const newSearch = e.target.value;
		setSearch(newSearch);
		const params = new URLSearchParams(window.location.search);
		if (newSearch) params.set("search", newSearch);
		else params.delete("search");
		router.replace(`?${params.toString()}`);
	}

	return (
		<div className="flex items-center w-full p-1 gap-1 border-[1px] border-slate-50 rounded-3xl ">
			<IoIosSearch color="white" size={20} />
			<input
				className="w-full text-slate-50 bg-transparent outline-none"
				type="text"
				placeholder="Search"
				value={search}
				onChange={handleChange}
			/>
		</div>
	);
}

export default SearchBar;
