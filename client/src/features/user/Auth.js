import { createSlice } from '@reduxjs/toolkit'
const initialState={
    user:JSON.parse(localStorage.getItem("xrareuser"))||null
}
export const Authslice=createSlice({
    name:"User",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user=action.payload
            localStorage.setItem("xrareuser",JSON.stringify(state.user))            
        },
        logout:(state)=>{
            state.user=null
            localStorage.removeItem("xrareuser")
        }

    }  ,  
})
export const{login,logout}=Authslice.actions
export default Authslice.reducer