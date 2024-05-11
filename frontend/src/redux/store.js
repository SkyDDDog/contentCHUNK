import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import chatReducer from './chat'
import sideNavReducer from './sideNav'
export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    sideNav: sideNavReducer,
  },
})
