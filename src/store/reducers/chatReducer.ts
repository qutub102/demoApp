import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { v4 as uuidv4 } from "uuid";

// Define a type for the slice state
interface chatState {
  value: number;
  tabs: any[];
  activeTabId: string;
  savedChat: any[];
}

// Define the initial state using that type
const initialState: chatState = {
  value: 0,
  tabs: [],
  activeTabId: "",
  savedChat: [],
};

export const chatSlice = createSlice({
  name: "chat",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addNewChat: (state, action) => {
      console.log("action -- ", !action.payload, action.payload);
      if (action.payload?.title) {
        const isExist = state.tabs.find((tab) => tab.id === action.payload.id);
        if (!isExist) state.tabs = [...state.tabs, action.payload];
        state.activeTabId = action.payload.id;
      } else {
        const tabLength = state.tabs.length;
        const id = uuidv4();

        state.tabs = [
          ...state.tabs,
          { title: `Chat Tab ${tabLength + 1}`, id, chat: [], isSaved: false },
        ];
        state.activeTabId = id;
      }
    },
    setactiveTabId: (state: any, action: PayloadAction<string>) => {
      state.activeTabId = action.payload;
    },
    setChat: (state, action) => {
      let tabIndex = state.tabs.findIndex((t) => t.id === state.activeTabId);
      console.log(tabIndex);
      state.tabs[tabIndex] = {
        ...state.tabs[tabIndex],
        chat: action.payload,
        isSaved: true,
      };
    },
    removeTab: (state, action) => {
      state.tabs = state.tabs.filter((tab) => tab.id !== action.payload.id);
      if (state.tabs.length > 0) {
        state.activeTabId = state.tabs[state.tabs.length - 1].id;
      } else {
        state.activeTabId = "";
      }
      if (action.payload.isSaved) {
        const isExist = state.savedChat.findIndex(
          (chat) => chat.id === action.payload.id
        );
        console.log("savedChat index ", isExist)
        if (isExist >= 0) {
          state.savedChat[isExist] = { ...action.payload, isSaved: false };
        } else
          state.savedChat = [
            ...state.savedChat,
            { ...action.payload, isSaved: false },
          ];
      }
    },
  },
});

export const { addNewChat, setactiveTabId, setChat, removeTab } =
  chatSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.chat.value;

export default chatSlice.reducer;
