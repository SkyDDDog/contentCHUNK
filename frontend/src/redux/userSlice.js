import { createSlice } from '@reduxjs/toolkit'
import { GetKnowLedgeList } from '../api/knowledgeRequest'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    userInfo: {
      /* {
    "id": "1749837707132424193",
    "remarks": null,
    "createDate": "2024-01-24T00:53:14.000+00:00",
    "updateDate": "2024-01-24T00:53:14.000+00:00",
    "delFlag": "0",
    "username": "lear",
    "password": "$2a$10$BGDBsZwetB5wS1oGLSMhtuZ5.Fb5quYd3k/5xXMxUL/D59.TAlTx.",
    "newRecord": false
} */
    },
    knowledgeList: [
      /*
    {
        "id": "1755201208858021889",
        "title": "title"
    }
   */
    ],
    pages: {},
  },
  reducers: {
    setUserInfo(state, { payload }) {
      state.userInfo = payload
    },
    setKnowLedgeList(state, { payload }) {
      state.knowledgeList = payload
    },
    setLoginStatus(state, { payload }) {
      state.isLogin = payload
    },
    /* 如何在rtk中使用异步 */
    async reloadKnowledgeList(state) {
      let knowledges = (await GetKnowLedgeList(state.userInfo.id)).data.item
        .knowledge
      state.knowledgeList = knowledges
    },
  },
})

export const {
  setLoginStatus,
  setUserInfo,
  setKnowLedgeList,
  reloadKnowledgeList,
} = userSlice.actions
export default userSlice.reducer
