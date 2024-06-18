import { configureStore } from "@reduxjs/toolkit";
import ActivateFriendReducer from "./Slices/ActivateFriend";
import ReceiverReducer from "./Slices/Reciver"; // Ensure correct file name and import

export const store = configureStore({
  reducer: {
    friendData: ActivateFriendReducer,
    receiver: ReceiverReducer, // Ensure correct reference to the reducer
  },
});
