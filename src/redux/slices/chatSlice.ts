import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
            state.selectedChat = action.payload
        },
        unSelectChat: (state) => {
            state.selectedChat = initialState.selectedChat;
        }
    }
})

export default chatSlice.reducer;
export const { selectChat, unSelectChat } = chatSlice.actions;