import { configureStore } from "@reduxjs/toolkit";
import ActivateFriendReducer from "./Slices/ActivateFriend";

export const store = configureStore({
  reducer: {
    friendData: ActivateFriendReducer, // Correctly reference the reducer here
  },
});
