import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { FriendRequest, ReceivedFriendRequest, User } from "@/types";

type InitialState = {
	isLoading: {
		friend: boolean;
		requestSent: boolean;
		requestReceived: boolean;
		people: boolean;
	};
	friends: User[];
	requestSent: FriendRequest[];
	requestReceived: ReceivedFriendRequest[];
	people: User[];
	error: string | null;
};

const initialState: InitialState = {
	friends: [],
	isLoading: {
		friend: false,
		requestSent: false,
		requestReceived: false,
		people: false,
	},
	requestSent: [],
	requestReceived: [],
	people: [],
	error: null,
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllFriends = createAsyncThunk<
	User[],
	{ user: string; search: string; signal: AbortSignal },
	{ rejectValue: string }
>("friend/getAllFriends", async ({ user, search, signal }, thunkAPI) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/user/api/v1/user/get-all-friends?userName=${user}&search=${search}`,
			{ signal },
		);

		return response.data.friends;
	} catch (error: any) {
		if (axios.isCancel(error)) return thunkAPI.rejectWithValue("");
		if (axios.isAxiosError(error)) return;
		return thunkAPI.rejectWithValue(
			error?.response?.data?.error || "Failed to fetch friends",
		);
	}
});

export const getReceivedFriendRequests = createAsyncThunk<
	ReceivedFriendRequest[],
	{ user: string; signal: AbortSignal },
	{ rejectValue: string }
>("friend/getReceivedFriendRequests", async ({ user, signal }, thunkAPI) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/friend-request/api/v1/friend-request/get-received-friend-requests?userName=${user}`,
			{ signal },
		);
		return response.data.friendRequests;
	} catch (error: any) {
		if (axios.isCancel(error)) return thunkAPI.rejectWithValue("");
		if (axios.isAxiosError(error)) return;
		return thunkAPI.rejectWithValue(
			error?.response?.data.error || "Failed to fetch received friend requests",
		);
	}
});

export const getSentFriendRequests = createAsyncThunk<
	FriendRequest[],
	{ user: string; signal?: AbortSignal },
	{ rejectValue: string }
>("friend/getSentFriendRequests", async ({ user, signal }, thunkAPI) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/friend-request/api/v1/friend-request/get-sent-friend-requests?userName=${user}`,
			{ signal },
		);
		return response.data.friendRequests;
	} catch (error: any) {
		if (axios.isCancel(error)) return thunkAPI.rejectWithValue("");
		if (axios.isAxiosError(error)) return;
		return thunkAPI.rejectWithValue(
			error?.response?.data.error || "Failed to fetch sent friend requests",
		);
	}
});

export const acceptFriendRequest = createAsyncThunk<
	string,
	string,
	{ rejectValue: string }
>("friend/acceptFriendRequest", async (friendRequestId, thunkAPI) => {
	try {
		const response = await axios.post(
			`${BASE_URL}/friend-request/api/v1/friend-request/accept-friend-request`,
			{
				friendRequestId,
			},
		);
		return response.data.from;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(
			error?.response.data.error || "Failed to fetch sent friend requests",
		);
	}
});

export const sendFriendRequest = createAsyncThunk<
	string,
	{ userName: string; friendUserName: string },
	{ rejectValue: string }
>(
	"friend/sendFriendRequest",
	async ({ userName, friendUserName }, thunkAPI) => {
		try {
			await axios.post(
				`${BASE_URL}/friend-request/api/v1/friend-request/send-friend-request`,
				{ userName, friendUserName },
			);
			return friendUserName;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(
				error?.response.data.error || "Failed to fetch sent friend requests",
			);
		}
	},
);

export const ignoreFriendRequest = createAsyncThunk<
	string,
	string,
	{ rejectValue: string }
>("friend/ignoreFriendRequest", async (friendRequestId, thunkAPI) => {
	try {
		await axios.post(
			`${BASE_URL}/friend-request/api/v1/friend-request/ignore-friend-request`,
			{
				friendRequestId,
			},
		);
		return friendRequestId;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(
			error?.response.data.error || "Failed to fetch sent friend requests",
		);
	}
});

export const withdrawFriendRequest = createAsyncThunk<
	string,
	string,
	{ rejectValue: string }
>("friend/withdrawFriendRequest", async (friendRequestId, thunkAPI) => {
	try {
		const response = await axios.post(
			`${BASE_URL}/friend-request/api/v1/friend-request/withdraw-friend-request`,
			{
				friendRequestId,
			},
		);
		return friendRequestId;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(
			error?.response.data.error || "Failed to fetch sent friend requests",
		);
	}
});

export const getUsers = createAsyncThunk<
	User[],
	string,
	{ rejectValue: string }
>("friend/getUsers", async (search, thunkAPI) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/user/api/v1/user/get-users?search=${search}`,
		);

		return response.data.users;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(
			error?.response?.data?.error || "Failed to fetch friends",
		);
	}
});

export const friendSlice = createSlice({
	name: "friend",
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
		clearSearchResults: (state) => {
			state.people = [];
		},
	},
	extraReducers: (builder) => {
		builder
			// getAllFriends loading states
			.addCase(getAllFriends.pending, (state) => {
				state.isLoading.friend = true;
			})
			.addCase(
				getAllFriends.fulfilled,
				(state, action: PayloadAction<User[]>) => {
					if (action.payload) {
						state.friends = action.payload;
						state.isLoading.friend = false;
					}
				},
			)
			.addCase(getAllFriends.rejected, (state, action) => {
				if (action.payload) {
					state.isLoading.friend = false;
					state.error = action.payload as string;
				}
			})
			// getReceivedFriendRequests loading states
			.addCase(getReceivedFriendRequests.pending, (state) => {
				state.isLoading.requestReceived = true;
			})
			.addCase(
				getReceivedFriendRequests.fulfilled,
				(state, action: PayloadAction<ReceivedFriendRequest[]>) => {
					if (action.payload) {
						state.requestReceived = action.payload;
						state.isLoading.requestReceived = false;
					}
				},
			)
			.addCase(getReceivedFriendRequests.rejected, (state, action) => {
				if (action.payload) {
					state.isLoading.requestReceived = false;
					state.error = action.payload as string;
				}
			})
			// getSentFriendRequests loading states
			.addCase(getSentFriendRequests.pending, (state) => {
				state.isLoading.requestSent = true;
			})
			.addCase(
				getSentFriendRequests.fulfilled,
				(state, action: PayloadAction<FriendRequest[]>) => {
					if (action.payload) {
						state.requestSent = action.payload;
						state.isLoading.requestSent = false;
					}
				},
			)
			.addCase(getSentFriendRequests.rejected, (state, action) => {
				if (action.payload) {
					state.isLoading.requestSent = false;
					state.error = action.payload as string;
				}
			})
			// getUsers loading states
			.addCase(getUsers.pending, (state) => {
				state.isLoading.people = true;
				state.error = null;
			})
			.addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
				state.people = action.payload;
				state.isLoading.people = false;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.isLoading.people = false;
				state.error = action.payload as string;
			})
			// acceptFriendRequest loading states
			.addCase(
				acceptFriendRequest.fulfilled,
				(state, action: PayloadAction<string>) => {
					state.requestReceived = state.requestReceived.filter(
						(request) => request.from != action.payload,
					);
				},
			)
			.addCase(
				ignoreFriendRequest.fulfilled,
				(state, action: PayloadAction<string>) => {
					state.requestReceived = state.requestReceived.filter(
						(request) => request.requestId != action.payload,
					);
				},
			)
			// withdrawFriendRequest loading states
			.addCase(
				withdrawFriendRequest.fulfilled,
				(state, actions: PayloadAction<string>) => {
					state.requestSent = state.requestSent.filter(
						(request) => request.requestId != actions.payload,
					);
				},
			);
	},
});

export default friendSlice.reducer;
export const { clearError, clearSearchResults } = friendSlice.actions;
