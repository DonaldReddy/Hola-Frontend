import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialsState = {
	screenWidth: number;
	isClient: boolean;
};

const initialState: InitialsState = {
	screenWidth: 0,
	isClient: false,
};

export const generalSlice = createSlice({
	name: "general",
	initialState,
	reducers: {
		setScreenWidth: (state, action: PayloadAction<number>) => {
			state.screenWidth = action.payload;
		},
		setIsClient: (state, action: PayloadAction<boolean>) => {
			state.isClient = action.payload;
		},
	},
});
export default generalSlice.reducer;
export const { setScreenWidth, setIsClient } = generalSlice.actions;
