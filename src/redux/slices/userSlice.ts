import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  user: String;
};

const initialState: InitialState = {
  user: 'leo',
};


export const signInUser = createAsyncThunk<string, { userName: string, password: string }, { rejectValue: string }>("user/signIn", async (signInInfo, thunkAPI) => {
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => { reject(new Error("just error")) }, 2000)
    });
    return signInInfo.userName
  } catch (error) {
    return thunkAPI.rejectWithValue("rejected")
  }
});


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
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.user = ""
    })
  }
});

export default userSlice.reducer;
export const { changeUser } = userSlice.actions;
