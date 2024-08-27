import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signOutUser } from "./userSlice";

type Chat = {
    chatId: string,
    userName: string
}

type InitialState = {
    recentChats: [],
    selectedChat: Chat
}

const initialState: InitialState = {
    recentChats: [],
    selectedChat: {
        chatId: "",
        userName: ""
    }
}

export const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        selectChat: (state, action: PayloadAction<Chat>) => {
            console.log(state.selectedChat.chatId);

            state.selectedChat = action.payload
        },
        unSelectChat: (state) => {
            state.selectedChat = initialState.selectedChat;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signOutUser.fulfilled, (state, action) => {
            state.selectedChat = initialState.selectedChat;
        })
    }
})

export default chatSlice.reducer;
export const { selectChat, unSelectChat } = chatSlice.actions;