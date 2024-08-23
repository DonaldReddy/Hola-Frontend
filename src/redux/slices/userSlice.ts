import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  user: String;
};

const initialState: InitialState = {
  user: 'leo',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<string>) => {
      return {
        user: action.payload,
      };
    },
  },
});

export default userSlice.reducer;
export const { changeUser } = userSlice.actions;
