"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { IoPersonCircleSharp, IoClose } from "react-icons/io5";
import { CgMenuLeftAlt } from "react-icons/cg";
import useScreenWidth from "@/customHooks/useScreenWidth";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { signOutUser } from "@/redux/slices/userSlice";

function MessengerNavbar() {
	const screenWidth = useScreenWidth();
	const [showMenu, setShowMenu] = useState(false);
	const router = useRouter();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.userReducer.user);

	function handleMenuToggle(e: React.MouseEvent<SVGElement>) {
		setShowMenu((prevState) => !prevState);
	}

	function navigateTo(path: string) {
		router.push(path);
	}

	return (
		<div className="flex h-[5svh] justify-between px-5 py-1 border-b border-gray-500">
			<div id="left">
				<Image src="/images/logo.svg" alt="logo" width={70} height={70} />
			</div>
			{screenWidth >= 700 && (
				<div id="right" className="flex gap-5 items-center">
					<MdOutlineChatBubbleOutline
						size={20}
						aria-label="Chat"
						title="chat"
						className=" cursor-pointer"
						onClick={() => navigateTo("/hola-web/messenger")}
					/>
					<FaUserFriends
						size={20}
						aria-label="Friends"
						title="friends"
						className=" cursor-pointer"
						onClick={() => navigateTo("/hola-web/messenger/friends")}
					/>
					<GoGear
						size={20}
						aria-label="Settings"
						title="settings"
						className=" cursor-pointer"
						onClick={() => navigateTo("/hola-web/messenger/settings")}
					/>
					<IoPersonCircleSharp
						size={20}
						aria-label="Profile"
						title="profile"
						className=" cursor-pointer"
						onClick={() => navigateTo("/hola-web/messenger/profile")}
					/>
					<FiLogOut
						size={20}
						aria-label="Logout"
						title="logout"
						className=" cursor-pointer"
						onClick={() => dispatch(signOutUser({ userName: user }))}
					/>
				</div>
			)}
			{screenWidth < 700 && !showMenu && (
				<CgMenuLeftAlt
					size={30}
					onClick={handleMenuToggle}
					aria-expanded={showMenu}
					aria-label="Toggle menu"
				/>
			)}

			{screenWidth < 700 && showMenu && (
				<IoClose
					size={30}
					onClick={handleMenuToggle}
					aria-expanded={showMenu}
					aria-label="Toggle menu"
				/>
			)}

			{showMenu && (
				<div className=" absolute h-[50svh] flex flex-col justify-center top-12 right-0 px-2 bg-[#9500ff52] rounded-s-2xl">
					<div className="flex items-center my-5 gap-1 text-left">
						<MdOutlineChatBubbleOutline
							size={20}
							aria-label="Chat"
							title="chat"
							className=" cursor-pointer"
							onClick={() => navigateTo("/hola-web/messenger")}
						/>
						chats
					</div>

					<div className="flex items-center my-5 gap-1 text-left">
						<FaUserFriends
							size={20}
							aria-label="Friends"
							title="friends"
							className=" cursor-pointer"
							onClick={() => navigateTo("/hola-web/messenger/friends")}
						/>
						friends
					</div>

					<div className="flex items-center my-5 gap-1 text-left">
						<GoGear
							size={20}
							aria-label="Settings"
							title="settings"
							className=" cursor-pointer"
							onClick={() => navigateTo("/hola-web/messenger/settings")}
						/>
						settings
					</div>

					<div className="flex items-center my-5 gap-1 text-left">
						<IoPersonCircleSharp
							size={20}
							aria-label="Profile"
							title="profile"
							className=" cursor-pointer"
							onClick={() => navigateTo("/hola-web/messenger/profile")}
						/>
						profile
					</div>
					<div className="flex items-center my-5 gap-1 text-left">
						<FiLogOut
							size={20}
							aria-label="Logout"
							title="logout"
							className=" cursor-pointer"
							onClick={() => dispatch(signOutUser({ userName: user }))}
						/>
						logout
					</div>
				</div>
			)}
		</div>
	);
}

export default MessengerNavbar;
