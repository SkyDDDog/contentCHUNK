import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isChatExpended: true,
  boxWidth: 0,
  selectedText: '',
  contentToAdd: '',
  addCount: 0,
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
    setSelectedText: (state, { payload }) => {
      state.selectedText = payload.text
    },
    setEditorAddedContent: (state, { payload }) => {
      state.contentToAdd = payload.contentToAdd
      state.addCount = state.addCount + 1
    },
    setAddCount: (state, { payload }) => {
      state.addCount = payload.count
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setChatExpended,
  setBoxWidth,
  setSelectedText,
  setEditorAddedContent,
  setAddCount,
} = chatSlice.actions

export default chatSlice.reducer
