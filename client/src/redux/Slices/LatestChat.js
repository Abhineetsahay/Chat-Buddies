import { createSlice } from "@reduxjs/toolkit";

export const ReceiverSlice = createSlice({
  name: "LatestChat",
  initialState: {
    message: null,
  },
  reducers: {
    getLatestChat: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { getLatestChat } = ReceiverSlice.actions;
export default ReceiverSlice.reducer;
