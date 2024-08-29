"use client";

import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { signInUser } from "@/redux/slices/userSlice";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

function Page() {
	const [signInInfo, setSignInInfo] = useState({ userName: "", password: "" });
	const screenWidth = useAppSelector((state) => state.generalSlice.screenWidth);
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.userReducer.user);
	const router = useRouter();

	useEffect(() => {
		if (user) router.replace("/hola-web/messenger");
	}, [user, router]);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		dispatch(signInUser(signInInfo));
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setSignInInfo({ ...signInInfo, [e.target.name]: e.target.value });
	}

	return (
		<div className="min-h-svh flex flex-col md:flex-row items-center">
			{screenWidth >= 768 && (
				<div id="left" className="w-full md:w-[55%] text-lg md:text-2xl ">
					<div className="flex flex-col items-center gap-5">
						<h1>Welcome to </h1>
						<Image
							src="/images/logo.svg"
							className="w-[100px] md:w-[300px] lg:w-[400px]"
							alt="logo"
							width={100}
							height={100}
							priority={true}
							sizes="(max-width: 768px) 100px, (max-width: 1200px) 300px, 400px"
						/>
						<h2>Sign in here and Explore</h2>
					</div>
				</div>
			)}
			<div
				id="right"
				className=" min-h-svh w-full md:w-[45%]   flex flex-col justify-evenly items-center bg-gradient-to-b from-primary from-10%"
			>
				{screenWidth < 768 && (
					<Image
						src="/images/logo.svg"
						className="w-[100px] md:w-[500px]"
						alt="logo"
						width={500}
						height={500}
						sizes="(max-width: 768px) 100px, 500px"
						priority={true}
					/>
				)}

				{screenWidth >= 768 && (
					<h1 className=" text-xl md:text-2xl lg:text-3xl font-bold">
						Sign in
					</h1>
				)}

				<form
					onSubmit={handleSubmit}
					className="flex flex-col my-5 text-xl lg:text-2xl"
				>
					<label htmlFor="userName" className="mb-2">
						User Name
					</label>
					<input
						id="userName"
						name="userName"
						type="text"
						required
						className="text-slate-50 mb-6 px-2 py-1 outline-none rounded-lg bg-transparent-500"
						onChange={handleChange}
						value={signInInfo.userName}
						placeholder="Enter Username"
					/>

					<label htmlFor="password" className="mb-2 mt-2">
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						className="text-slate-50 mb-5 px-2 py-1 outline-none rounded-lg bg-transparent-500"
						onChange={handleChange}
						value={signInInfo.password}
						placeholder="Enter Password"
					/>
					<div className="mt-8 flex justify-center">
						<button
							type="submit"
							className="border border-slate-50 rounded-md px-4 py-1 text-xs md:text-sm hover:bg-hover-primary"
						>
							Sign in
						</button>
					</div>
				</form>
				<Link
					href="/hola-web/sign-up"
					className=" underline decoration-[#7000FF] decoration-2 text-base"
					replace
				>
					Don{"`"}t have an account?
				</Link>
			</div>
		</div>
	);
}

export default Page;
