import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
	user: string;
	isLoading: boolean;
};

const initialState: InitialState = {
	user: "",
	isLoading: false,
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const signInUser = createAsyncThunk<
	string,
	{ userName: string; password: string },
	{ rejectValue: string }
>("user/signIn", async (signInInfo, thunkAPI) => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 3000));

		const response = await axios.post(
			`${BASE_URL}/user/api/v1/user/sign-in`,
			signInInfo,
		);

		localStorage.setItem("user", signInInfo.userName);
		return signInInfo.userName;
	} catch (error) {
		return thunkAPI.rejectWithValue("rejected");
	}
});

export const signUpUser = createAsyncThunk<
	string,
	{ name: string; userName: string; password: string },
	{ rejectValue: string }
>("user/signUp", async (signUpInfo, thunkAPI) => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 3000));

		const response = await axios.post(
			`${BASE_URL}/user/api/v1/user/sign-up`,
			signUpInfo,
		);

		localStorage.setItem("user", signUpInfo.userName);
		return signUpInfo.userName;
	} catch (error) {
		return thunkAPI.rejectWithValue("rejected");
	}
});

export const signOutUser = createAsyncThunk<
	void,
	{ userName: string },
	{ rejectValue: string }
>("user/signOut", async (signOutInfo, thunkAPI) => {
	try {
		const response = await axios.post(
			`${BASE_URL}/user/api/v1/user/sign-out`,
			signOutInfo,
		);
	} catch (error) {
		return thunkAPI.rejectWithValue("rejected");
	}
});

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		changeUser: (state, action: PayloadAction<string>) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signInUser.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			signInUser.fulfilled,
			(state, action: PayloadAction<string>) => {
				state.isLoading = false;
				state.user = action.payload;
			},
		);
		builder.addCase(signInUser.rejected, (state, action) => {
			state.isLoading = false;
			state.user = "";
		});
		builder.addCase(signUpUser.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			signUpUser.fulfilled,
			(state, action: PayloadAction<string>) => {
				state.isLoading = false;
				state.user = action.payload;
			},
		);
		builder.addCase(signUpUser.rejected, (state, action) => {
			state.isLoading = false;
			state.user = "";
		});
		builder.addCase(signOutUser.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(signOutUser.fulfilled, (state, action) => {
			state.isLoading = false;
			localStorage.removeItem("user");
			state.user = "";
		});
		builder.addCase(signOutUser.rejected, (state, action) => {
			state.isLoading = false;
			localStorage.removeItem("user");
			state.user = "";
		});
	},
});

export default userSlice.reducer;
export const { changeUser } = userSlice.actions;
