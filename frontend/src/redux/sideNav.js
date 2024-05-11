import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sideNavWidth: 0,
}

export const sideNavSlice = createSlice({
  name: 'sideNav',
  initialState,
  reducers: {
    setSideNavWidth: (state, { payload }) => {
      state.sideNavWidth = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSideNavWidth } = sideNavSlice.actions

export default sideNavSlice.reducer
