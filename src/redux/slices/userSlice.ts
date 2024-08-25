import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  user: string;
};

const initialState: InitialState = {
  user: typeof window !== "undefined" ? localStorage.getItem("user") || "" : "",
};



export const signInUser = createAsyncThunk<string, { userName: string, password: string }, { rejectValue: string }>("user/signIn", async (signInInfo, thunkAPI) => {
  try {
    localStorage.setItem("user", signInInfo.userName)
    return signInInfo.userName
  } catch (error) {
    return thunkAPI.rejectWithValue("rejected")
  }
});

export const signUpUser = createAsyncThunk<string, { name: string, userName: string, password: string }, { rejectValue: string }>("user/signUp", async (signUpInfo, thunkAPI) => {
  try {
    localStorage.setItem("user", signUpInfo.userName)
    return signUpInfo.userName
  } catch (error) {
    return thunkAPI.rejectWithValue("rejected")
  }
});

export const signOutUser = createAsyncThunk<string, { userName: string }, { rejectValue: string }>("user/signOut", async (signOutInfo, thunkAPI) => {
  try {
    return ""
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
    builder.addCase(signUpUser.fulfilled, (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.user = ""
    })
    builder.addCase(signOutUser.fulfilled, (state, action: PayloadAction<string>) => {
      state.user = "";
    });
    builder.addCase(signOutUser.rejected, (state, action) => {
      state.user = ""
    })
  }
});

export default userSlice.reducer;
export const { changeUser } = userSlice.actions;
