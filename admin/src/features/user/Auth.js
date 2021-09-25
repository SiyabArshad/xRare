import { createSlice } from '@reduxjs/toolkit'
const initialState={
    user:JSON.parse(localStorage.getItem("xrareAdminuser"))||null
}
export const Authslice=createSlice({
    name:"User",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user=action.payload
            localStorage.setItem("xrareAdminuser",JSON.stringify(state.user))            
        },
        logout:(state)=>{
            state.user=null
            localStorage.removeItem("xrareAdminuser")
        }

    }  ,  
})
export const{login,logout}=Authslice.actions
export default Authslice.reducer