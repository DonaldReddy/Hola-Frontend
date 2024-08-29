"use client";
import { changeUser } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.userReducer.user);
	const router = useRouter();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		if (typeof window !== "undefined") {
			const userFromStorage = localStorage.getItem("user") || "";
			dispatch(changeUser(userFromStorage));
			if (userFromStorage) {
				router.push("/hola-web/messenger");
			}
		}
	}, [user, router, dispatch]);

	if (!isClient || user) {
		return (
			<div className="min-h-svh flex justify-center items-center">
				Loading...
			</div>
		);
	}

	return (
		<div className="text-slate-50 min-h-svh flex flex-col justify-center items-center">
			<div className="flex flex-col justify-between items-center  h-[150px] mb-6">
				<h1>Welcome to</h1>
				<Image
					src="/images/logo.svg"
					className="w-[200px]"
					alt="logo"
					width={200}
					height={200}
				/>
				<h2>Chat App for New Age</h2>
			</div>
			<div className="">
				<Link
					href="/hola-web/sign-in"
					className="mx-5 border-slate-50 border rounded-md px-3 py-1 hover:bg-hover-primary hover:text-slate-50"
				>
					Sign in
				</Link>
				<Link
					href="/hola-web/sign-up"
					className="mx-5 border-slate-50 border rounded-md px-3 py-1 hover:bg-hover-primary hover:text-slate-50"
				>
					Sign up
				</Link>
			</div>
		</div>
	);
}

export default Page;
