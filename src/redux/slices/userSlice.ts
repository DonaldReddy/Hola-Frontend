import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { FriendRequest, ReceivedFriendRequest } from "@/types";

type InitialState = {
	user: string;
	isLoading: { auth: boolean; friends: boolean; request: boolean };
	friends: string[];
	requestSent: FriendRequest[];
	requestReceived: ReceivedFriendRequest[];
	error: string | null;
};

const initialState: InitialState = {
	user: "",
	friends: [],
	isLoading: { auth: false, friends: false, request: false },
	requestSent: [],
	requestReceived: [],
	error: null,
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const validateSession = createAsyncThunk<
	{ status: boolean },
	string,
	{ rejectValue: string }
>("user/validateSession", async (userName, thunkAPI) => {
	try {
		const response = await axios.post(
			`${BASE_URL}/session/api/v1/session/validate-session`,
			{
				userName,
			},
		);

		return response.data;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(
			error?.response.data.error || "Session validation is failed",
		);
	}
});

export const signInUser = createAsyncThunk<
	string,
	{ userName: string; password: string },
	{ rejectValue: string }
>("user/signIn", async (signInInfo, thunkAPI) => {
	try {
		await axios.post(`${BASE_URL}/user/api/v1/user/sign-in`, signInInfo);
		return signInInfo.userName;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(
			error?.response.data.error || "Sign-in failed",
		);
	}
});

export const signUpUser = createAsyncThunk<
	string,
	{ name: string; userName: string; password: string },
	{ rejectValue: string }
>("user/signUp", async (signUpInfo, thunkAPI) => {
	try {
		await axios.post(`${BASE_URL}/user/api/v1/user/sign-up`, signUpInfo);
		return signUpInfo.userName;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(
			error?.response.data.error || "Sign-up failed",
		);
	}
});

export const signOutUser = createAsyncThunk<
	void,
	{ userName: string },
	{ rejectValue: string }
>("user/signOut", async (signOutInfo, thunkAPI) => {
	try {
		await axios.post(`${BASE_URL}/user/api/v1/user/sign-out`, signOutInfo);
	} catch (error: any) {
		return thunkAPI.rejectWithValue(
			error?.response.data.error || "Sign-out failed",
		);
	}
});

export const getAllFriends = createAsyncThunk<
	string[],
	{ user: string; signal: AbortSignal },
	{ rejectValue: string }
>("user/getAllFriends", async ({ user, signal }, thunkAPI) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/user/api/v1/user/get-all-friends?userName=${user}`,
			{ signal },
		);

		return response.data.friends;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(
			error?.response?.data?.error || "Failed to fetch friends",
		);
	}
});

export const getReceivedFriendRequests = createAsyncThunk<
	ReceivedFriendRequest[],
	{ user: string; signal: AbortSignal },
	{ rejectValue: string }
>("user/getReceivedFriendRequests", async ({ user, signal }, thunkAPI) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/friend-request/api/v1/friend-request/get-received-friend-requests?userName=${user}`,
			{ signal },
		);

		return response.data.friendRequests;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(
			error?.response?.data.error || "Failed to fetch received friend requests",
		);
	}
});

export const getSentFriendRequests = createAsyncThunk<
	FriendRequest[],
	{ user: string; signal: AbortSignal },
	{ rejectValue: string }
>("user/getSentFriendRequests", async ({ user, signal }, thunkAPI) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/friend-request/api/v1/friend-request/get-sent-friend-requests?userName=${user}`,
			{ signal },
		);
		return response.data.friendRequests;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(
			error?.response.data.error || "Failed to fetch sent friend requests",
		);
	}
});

export const acceptFriendRequest = createAsyncThunk<
	void,
	string,
	{ rejectValue: string }
>("user/acceptFriendRequest", async (friendRequestId, thunkAPI) => {
	try {
		const response = await axios.post(
			`${BASE_URL}/friend-request/api/v1/friend-request/accept-friend-request`,
			{
				friendRequestId,
			},
		);
		console.log(response.data);
	} catch (error: any) {
		return thunkAPI.rejectWithValue(
			error?.response.data.error || "Failed to fetch sent friend requests",
		);
	}
});

// Create a slice with an additional action for clearing errors
export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		changeUser: (state, action: PayloadAction<string>) => {
			state.user = action.payload;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// signInUser loading states
			.addCase(signInUser.pending, (state) => {
				state.isLoading.auth = true;
			})
			.addCase(signInUser.fulfilled, (state, action: PayloadAction<string>) => {
				state.user = action.payload;
				state.isLoading.auth = false;
				localStorage.setItem("user", action.payload);
			})
			.addCase(signInUser.rejected, (state, action) => {
				state.isLoading.auth = false;
				state.error = action.payload as string;
			})
			// signUpUser loading states
			.addCase(signUpUser.pending, (state) => {
				state.isLoading.auth = true;
			})
			.addCase(signUpUser.fulfilled, (state, action: PayloadAction<string>) => {
				state.user = action.payload;
				state.isLoading.auth = false;
				localStorage.setItem("user", action.payload);
			})
			.addCase(signUpUser.rejected, (state, action) => {
				state.isLoading.auth = false;
				state.error = action.payload as string;
			})
			// signOutUser loading states
			.addCase(signOutUser.pending, (state) => {
				state.isLoading.auth = true;
			})
			.addCase(signOutUser.fulfilled, (state) => {
				state.isLoading.auth = false;
				localStorage.removeItem("user");
				Object.assign(state, initialState); // reset state
			})
			.addCase(signOutUser.rejected, (state, action) => {
				state.isLoading.auth = false;
				state.error = action.payload as string;
			})
			// getAllFriends loading states
			.addCase(getAllFriends.pending, (state) => {
				state.isLoading.friends = true;
			})
			.addCase(
				getAllFriends.fulfilled,
				(state, action: PayloadAction<string[]>) => {
					state.friends = action.payload;
					state.isLoading.friends = false;
				},
			)
			.addCase(getAllFriends.rejected, (state, action) => {
				state.isLoading.friends = false;
				state.error = action.payload as string;
			})
			// getReceivedFriendRequests loading states
			.addCase(getReceivedFriendRequests.pending, (state) => {
				state.isLoading.request = true;
			})
			.addCase(
				getReceivedFriendRequests.fulfilled,
				(state, action: PayloadAction<ReceivedFriendRequest[]>) => {
					state.requestReceived = action.payload;
					state.isLoading.request = false;
				},
			)
			.addCase(getReceivedFriendRequests.rejected, (state, action) => {
				state.isLoading.request = false;
				state.error = action.payload as string;
			})
			// getSentFriendRequests loading states
			.addCase(getSentFriendRequests.pending, (state) => {
				state.isLoading.request = true;
			})
			.addCase(
				getSentFriendRequests.fulfilled,
				(state, action: PayloadAction<FriendRequest[]>) => {
					state.requestSent = action.payload;
					state.isLoading.request = false;
				},
			)
			.addCase(getSentFriendRequests.rejected, (state, action) => {
				state.isLoading.request = false;
				state.error = action.payload as string;
			})
			// validateSession loading states
			.addCase(
				validateSession.fulfilled,
				(state, action: PayloadAction<{ status: boolean }>) => {
					if (!action.payload.status) {
						localStorage.removeItem("user");
						state.user = "";
					}
				},
			)
			.addCase(validateSession.rejected, (state, action) => {
				localStorage.removeItem("user");
				state.user = "";
			});
	},
});

export default userSlice.reducer;
export const { changeUser, clearError } = userSlice.actions;
