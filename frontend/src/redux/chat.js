import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isChatExpended: true,
  boxWidth: 0,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatExpended: (state, { payload }) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isChatExpended = payload
    },
    setBoxWidth: (state, { payload }) => {
      state.boxWidth = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setChatExpended, setBoxWidth } = chatSlice.actions

export default chatSlice.reducer
