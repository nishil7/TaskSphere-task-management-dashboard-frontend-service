import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name:'claimedTask',
    initialState: "-1",
    reducers:{
        assignTask(state,action){
            return action.payload
        }
    }
})

export const {assignTask} = UserSlice.actions
export default UserSlice