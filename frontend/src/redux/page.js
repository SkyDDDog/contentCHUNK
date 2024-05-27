import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tabPages: [
    /* {
      title:'xxx',
      pageId:'xxx'
    } */
  ],
  activePageKey: '', // pageId
  PageFirstRenderFlag: true,
  activePageContent: '',
  activePageTitle: '',
  isPublishing: false,
}

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setActivePageKey: (state, { payload }) => {
      console.log('pageid in redux', payload)
      state.activePageKey = payload
      // setTimeout(() => {
      //   state.tabPages.forEach((item) => {
      //     if (item.pageId === state.activePageKey) {
      //       console.log('找到了!!!!!!!!!!!!!!!')
      //       state.activePageTitle = item.title
      //     }
      //   }, 500)
      // })
    },
    addActivePage: (state, { payload }) => {
      /* 不论是否在tabs自己中存在，都要设置为AcitveTab */
      state.activePageKey = payload.pageId
      // 如果tabs存在就不添加
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
    setActivePageContent: (state, { payload }) => {
      console.log('activePageContent', payload)
      state.activePageContent = payload
    },
    setIsPublish(state, { payload }) {
      state.isPublishing = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  addActivePage,
  removeActiveTabItem,
  setActivePageKey,
  setPageFirstRenderFlag,
  setActivePageContent,
  setIsPublish,
} = pageSlice.actions

export default pageSlice.reducer
