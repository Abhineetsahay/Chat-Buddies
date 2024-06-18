import { createSlice } from "@reduxjs/toolkit";

export const ReceiverSlice = createSlice({
  name: "Receiver",
  initialState: {
    Receiver: null,
  },
  reducers: {
    getReceiver: (state, action) => {
      state.Receiver = action.payload;
    },
  },
});

export const { getReceiver } = ReceiverSlice.actions;
export default ReceiverSlice.reducer;
