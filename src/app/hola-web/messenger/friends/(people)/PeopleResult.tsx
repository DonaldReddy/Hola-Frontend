"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import PeopleCard from "./PeopleCard";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { clearPeople, getUsers } from "@/redux/slices/friendSlice";

function PeopleResult() {
	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();
	const people = useAppSelector((s) => s.friendSlice.people);
	const user = useAppSelector((s) => s.userReducer.user);

	useEffect(() => {
		const search = searchParams.get("search") || "";
		const timeout = setTimeout(() => {
			if (search) dispatch(getUsers({ user, search }));
			else dispatch(clearPeople());
		}, 500);
		return () => clearTimeout(timeout);
	}, [searchParams]);

	return (
		<div className="h-full w-full overflow-y-scroll chat-card">
			{people.map((user) => (
				<PeopleCard name={user.name} userName={user.userName} />
			))}
		</div>
	);
}

export default PeopleResult;
