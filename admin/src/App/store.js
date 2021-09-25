import { configureStore } from '@reduxjs/toolkit'
import AdminAuthReducer from '../features/user/Auth.js'
export default configureStore({
  reducer: {
    Auth: AdminAuthReducer,
  },
})