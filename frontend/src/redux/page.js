import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tabPages: [
    /* {
      title:'xxx',
      pageId:'xxx'
    } */
  ],
  activePageKey: '',
  PageFirstRenderFlag: true,
}

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setActivePageKey: (state, { pageId }) => {
      state.activePageKey = pageId
    },
    addActivePage: (state, { payload }) => {
      /* 不论是否存在，都要设置为AcitveTab */
      state.activePageKey = payload.pageId
      // 如果存在就不添加
      if (
        state.tabPages.findIndex((page) => page.pageId === payload.pageId) > -1
      ) {
        return
      }
      state.tabPages.push(payload)
    },

    removeActiveTabItem: (state, { payload }) => {
      const index = state.tabPages.findIndex(
        (page) => page.pageId === payload.pageId,
      )
      if (index > -1) {
        state.tabPages.splice(index, 1)
      }
    },
    setPageFirstRenderFlag: (state, { payload }) => {
      console.log('setset')
      state.PageFirstRenderFlag = payload.flag
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  addActivePage,
  removeActiveTabItem,
  setActivePageKey,
  setPageFirstRenderFlag,
} = pageSlice.actions

export default pageSlice.reducer