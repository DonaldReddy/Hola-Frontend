import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import chatReducer from "./slices/chatSlice";
import generalSlice from "./slices/generalSlice";

const store = configureStore({
	reducer: {
		userReducer,
		chatReducer,
		generalSlice,
	},
	devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
