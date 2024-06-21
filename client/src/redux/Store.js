import { configureStore } from "@reduxjs/toolkit";
import ActivateFriendReducer from "./Slices/ActivateFriend";
import ReceiverReducer from "./Slices/LatestChat"; // Ensure correct file name and import

export const store = configureStore({
  reducer: {
    friendData: ActivateFriendReducer,
    LatestChat: ReceiverReducer, // Ensure correct reference to the reducer
  },
});
