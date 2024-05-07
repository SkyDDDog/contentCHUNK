import { createSlice } from '@reduxjs/toolkit'
const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    userInfo: {},
  },
  reducers: {
    initUserInfo(state, action) {
      state.userInfo = action.payload
    },
  },
})

export const { initUserInfo } = userSlice.actions
export default userSlice.reducer
