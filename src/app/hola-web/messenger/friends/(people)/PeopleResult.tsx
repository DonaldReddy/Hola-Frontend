"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import PeopleCard from "./PeopleCard";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { clearSearchResults, getUsers } from "@/redux/slices/friendSlice";
import { AiOutlineLoading } from "react-icons/ai";
import { User } from "@/types";

function PeopleResult() {
	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();
	const people = useAppSelector((s) => s.friendSlice.people);
	const friends = useAppSelector((s) => s.friendSlice.friends);
	const requests = useAppSelector((s) => s.friendSlice.requestSent);
	const isLoading = useAppSelector((s) => s.friendSlice.isLoading.people);
	let timeout = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const search = searchParams.get("search") || "";
		if (timeout.current) clearTimeout(timeout.current);

		timeout.current = setTimeout(() => {
			if (search) {
				dispatch(getUsers(search));
			} else {
				dispatch(clearSearchResults());
			}
		}, 200);

		return () => {
			if (timeout.current) clearTimeout(timeout.current);
		};
	}, [searchParams, dispatch]);

	useEffect(() => {
		return () => {
			dispatch(clearSearchResults());
		};
	}, [dispatch]);

	function findStatus(person: User): "friend" | "sent" | "not sent" {
		if (friends.some((friend) => friend.userName === person.userName)) {
			return "friend";
		}
		if (requests.some((request) => request.to === person.userName)) {
			return "sent";
		}
		return "not sent";
	}

	return (
		<div className="h-[70svh] w-[90svw] overflow-y-scroll chat-card">
			{isLoading ? (
				<div className="flex justify-center items-center">
					<AiOutlineLoading className="animate-spin" size={30} />
					<span className="ml-2">Loading...</span>
				</div>
			) : searchParams.get("search") ? (
				people.length > 0 ? (
					<div>
						{people.map((person: User) => (
							<PeopleCard
								key={person.userName}
								userName={person.userName}
								name={person.name}
								status={findStatus(person)}
							/>
						))}
					</div>
				) : (
					<div>No friends found</div>
				)
			) : (
				<div>Search for people</div>
			)}
		</div>
	);
}

export default PeopleResult;
