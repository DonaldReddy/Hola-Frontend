import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signOutUser } from "./userSlice";
import axios from "axios";
import { Chat } from "@/types";

type InitialState = {
	recentChats: Chat[];
	selectedChat: string;
	isLoading: boolean;
};

const initialState: InitialState = {
	recentChats: [],
	selectedChat: "",
	isLoading: false,
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchRecentChats = createAsyncThunk<
	Chat[],
	string,
	{ rejectValue: string }
>("chats/recentChats", async (user, thunkAPI) => {
	try {
		const privateResponse = await axios.get(
			`${BASE_URL}/chat/api/v1/chat/get-recent-private-chats?userName=${user}`,
		);

		const recentPrivateChats: Chat[] = privateResponse.data.chats.map(
			(chat: any) => ({
				chatId: chat._id,
				lastMessageAt: chat.updatedAt,
				chatType: chat.chatType,
				participants: chat.participants,
			}),
		);

		const groupResponse = await axios.get(
			`${BASE_URL}/chat/api/v1/chat/get-recent-group-chats?userName=${user}`,
		);

		const recentGroupChats: Chat[] = groupResponse.data.chats.map(
			(chat: any): Chat => ({
				chatId: chat._id,
				lastMessageAt: chat.updatedAt,
				chatType: chat.chatType,
				participants: chat.participants,
				groupName: chat.group.groupName,
			}),
		);

		let chats: Chat[] = [...recentPrivateChats, ...recentGroupChats];

		chats = chats.sort(
			(a, b) =>
				new Date(b.lastMessageAt).getTime() -
				new Date(a.lastMessageAt).getTime(),
		);

		return chats;
	} catch (error: any) {
		console.error("Error fetching recent chats:", error);
		return thunkAPI.rejectWithValue(
			error.message || "Failed to fetch recent chats",
		);
	}
});

export const chatSlice = createSlice({
	name: "chats",
	initialState,
	reducers: {
		selectChat: (state, action: PayloadAction<string>) => {
			state.selectedChat = action.payload;
		},
		unSelectChat: (state) => {
			state.selectedChat = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signOutUser.fulfilled, () => initialState);
		builder.addCase(fetchRecentChats.fulfilled, (state, action) => {
			state.recentChats = action.payload;
		});
		builder
			.addMatcher(
				(action) => action.type.endsWith("/pending"),
				(state) => {
					state.isLoading = true;
				},
			)
			.addMatcher(
				(action) =>
					action.type.endsWith("/rejected") ||
					action.type.endsWith("/fulfilled"),
				(state) => {
					state.isLoading = false;
				},
			);
	},
});

export default chatSlice.reducer;
export const { selectChat, unSelectChat } = chatSlice.actions;
