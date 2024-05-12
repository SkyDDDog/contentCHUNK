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
