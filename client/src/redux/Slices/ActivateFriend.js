import { createSlice } from "@reduxjs/toolkit";

export const ActivateFriend=createSlice({
          name:"ActivateFriend",
          initialState:{
                    currentFriend:null
          },
          reducers:{
                  get:(state,action)=>{
                       state.currentFriend=action.payload
                  }  
          }
})

export const {get}=ActivateFriend.actions;
export default ActivateFriend.reducer;