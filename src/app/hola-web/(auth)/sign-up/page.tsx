"use client";

import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { signUpUser } from "@/redux/slices/userSlice";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";

function Page() {
	const [signUpInfo, setSignUpInfo] = useState({
		userName: "",
		password: "",
		name: "",
	});
	const [errors, setErrors] = useState({
		userName: "",
		password: "",
		name: "",
	});
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.userReducer.user);
	const isLoading = useAppSelector((s) => s.userReducer.isLoading);
	const router = useRouter();
	const hideButton =
		isLoading ||
		!(signUpInfo.password && signUpInfo.userName && signUpInfo.name);

	useEffect(() => {
		if (user) router.replace("/hola-web/messenger");
	}, [user, router]);

	function validateSignUpInfo() {
		let isValid = true;
		let newErrors = { userName: "", password: "", name: "" };

		// Validate userName
		const userNameRegex = /^[a-z_]+$/;
		if (!userNameRegex.test(signUpInfo.userName)) {
			newErrors.userName =
				"Username must contain only lowercase letters and underscores.";
			isValid = false;
		}

		// Validate password
		if (signUpInfo.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters long.";
			isValid = false;
		}

		// Validate name
		const nameRegex = /^[a-zA-Z\s]+$/;
		if (!nameRegex.test(signUpInfo.name)) {
			newErrors.name = "Name must contain only letters and spaces.";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (validateSignUpInfo()) {
			dispatch(signUpUser(signUpInfo));
		}
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
	}

	return (
		<div className="min-h-svh flex flex-col md:flex-row items-center">
			<div id="left" className="w-full md:w-[55%] text-lg md:text-2xl ">
				<div className="flex flex-col items-center gap-5">
					<h1>Welcome to</h1>
					<Image
						src="/images/logo.svg"
						className="w-[100px] md:w-[300px] lg:w-[400px]"
						alt="logo"
						width={100}
						height={100}
						priority={true}
						sizes="(max-width: 768px) 100px, (max-width: 1200px) 300px, 400px"
					/>
					<h2>Sign up here and Explore</h2>
				</div>
			</div>
			<div
				id="right"
				className=" min-h-svh w-full md:w-[45%]   flex flex-col justify-evenly items-center bg-gradient-to-b from-[#430099] from-10%"
			>
				<h1 className=" text-xl md:text-2xl lg:text-3xl font-bold">Sign up</h1>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col justify-center my-5 text-xl lg:text-2xl"
				>
					<label htmlFor="name" className="mb-2">
						Name
					</label>
					<input
						id="name"
						name="name"
						type="text"
						required
						className={`text-slate-50 mb-6 px-2 py-1 outline-none rounded-lg bg-transparent-500 ${
							errors.name ? "border-red-600 border" : ""
						}`}
						onChange={handleChange}
						value={signUpInfo.name}
						placeholder="Enter Name"
					/>
					{errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

					<label htmlFor="userName" className="mb-2">
						User Name
					</label>
					<input
						id="userName"
						name="userName"
						type="text"
						required
						className={`text-slate-50 mb-6 px-2 py-1 outline-none rounded-lg bg-transparent-500 ${
							errors.userName ? "border-red-600 border" : ""
						}`}
						onChange={handleChange}
						value={signUpInfo.userName}
						placeholder="Enter Username"
					/>
					{errors.userName && (
						<p className="text-red-600 text-sm">{errors.userName}</p>
					)}

					<label htmlFor="password" className="mb-2 mt-2">
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						className={`text-slate-50 mb-5 px-2 py-1 outline-none rounded-lg bg-transparent-500 ${
							errors.password ? "border-red-600 border" : ""
						}`}
						onChange={handleChange}
						value={signUpInfo.password}
						placeholder="Enter Password"
					/>
					{errors.password && (
						<p className="text-red-600 text-sm">{errors.password}</p>
					)}

					<div className="mt-8 flex justify-center">
						{!isLoading && (
							<button
								type="submit"
								className={`border border-slate-50 rounded-md px-4 py-1 text-xs md:text-sm hover:bg-hover-primary ${
									hideButton ? "opacity-30" : ""
								}`}
								disabled={hideButton}
							>
								Sign up
							</button>
						)}
						{isLoading && <AiOutlineLoading className=" animate-spin" />}
					</div>
				</form>
				<Link
					href="/hola-web/sign-in"
					className=" underline decoration-[#7000FF] decoration-2 text-base"
					replace
				>
					Already have an account?
				</Link>
			</div>
		</div>
	);
}

export default Page;
