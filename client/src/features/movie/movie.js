import {createSlice} from '@reduxjs/toolkit'
const initialState={
    video:null
}
export const videoslice=createSlice({
    name:"video",
    initialState,
    reducers:{
        search:(state,action)=>{
            state.video=action.payload
        }
    }
})
export const{search}=videoslice.actions
export default videoslice.reducer