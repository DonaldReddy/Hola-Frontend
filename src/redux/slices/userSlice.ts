import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
	user: string;
	isLoading: boolean;
	error: string | null;
};

const initialState: InitialState = {
	user: "",
	isLoading: false,
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

export const unfriend = createAsyncThunk<
	void,
	{ userName: string; friendUserName: string },
	{ rejectValue: string }
>("user/unFriend", async ({ userName, friendUserName }, thunkAPI) => {
	try {
		await axios.post(`${BASE_URL}/user/api/v1/user/remove-friend`, {
			userName,
			friendUserName,
		});
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
				state.isLoading = true;
			})
			.addCase(signInUser.fulfilled, (state, action: PayloadAction<string>) => {
				state.user = action.payload;
				state.isLoading = false;
				localStorage.setItem("user", action.payload);
			})
			.addCase(signInUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			// signUpUser loading states
			.addCase(signUpUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signUpUser.fulfilled, (state, action: PayloadAction<string>) => {
				state.user = action.payload;
				state.isLoading = false;
				localStorage.setItem("user", action.payload);
			})
			.addCase(signUpUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			// signOutUser loading states
			.addCase(signOutUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signOutUser.fulfilled, (state) => {
				state.isLoading = false;
				localStorage.removeItem("user");
				Object.assign(state, initialState); // reset state
			})
			.addCase(signOutUser.rejected, (state, action) => {
				state.isLoading = false;
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
			})
			.addCase(unfriend.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(unfriend.fulfilled, (state) => {
				state.isLoading = false;
			});
	},
});

export default userSlice.reducer;
export const { changeUser, clearError } = userSlice.actions;
