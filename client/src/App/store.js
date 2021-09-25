import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../features/user/Auth.js'
import VideoReducer from '../features/movie/movie'
export default configureStore({
  reducer: {
    Auth: AuthReducer,
    Video:VideoReducer
  },
})