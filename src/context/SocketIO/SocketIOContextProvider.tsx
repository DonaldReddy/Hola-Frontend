"use client";
import { useAppSelector } from "@/redux/store";
import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

type SocketIO = typeof Socket | null;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const SocketIOContext = createContext<SocketIO>(null);

function SocketIOProvider({ children }: { children: React.ReactNode }) {
	const [socket, setSocket] = useState<SocketIO>(null); // Manage socket in state
	const user = useAppSelector((s) => s.userReducer.user);

	useEffect(() => {
		if (user && !socket) {
			const newSocket = io(BASE_URL!);
			newSocket.on("INIT", () => {
				newSocket.emit("INIT", user);
			});
			setSocket(newSocket);
		}

		return () => {
			if (socket) {
				socket.disconnect();
				setSocket(null);
			}
		};
	}, [user, socket]);

	return (
		<SocketIOContext.Provider value={socket}>
			{children}
		</SocketIOContext.Provider>
	);
}

export const useSocketIO = () => {
	const context = useContext(SocketIOContext);

	if (context === undefined) {
		throw new Error("useSocketIO must be used within a SocketIOProvider");
	}

	return context;
};

export default SocketIOProvider;
