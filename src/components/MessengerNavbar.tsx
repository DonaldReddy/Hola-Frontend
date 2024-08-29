"use client";
import Image from "next/image";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { IoPersonCircleSharp, IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { signOutUser } from "@/redux/slices/userSlice";

function MessengerNavbar() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.userReducer.user);

	function navigateTo(path: string) {
		router.push(path);
	}

	return (
		<div className="flex h-[5svh] justify-between px-5 py-1 border-b border-gray-500">
			<div id="left">
				<Image src="/images/logo.svg" alt="logo" width={70} height={70} />
			</div>
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
					onClick={() => {
						dispatch(signOutUser({ userName: user }));
						navigateTo("/hola-web");
					}}
				/>
			</div>
		</div>
	);
}

export default MessengerNavbar;
