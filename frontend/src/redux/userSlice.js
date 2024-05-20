import { createSlice } from '@reduxjs/toolkit'
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
    pages:{

    }
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
    }
  },
})

export const { setLoginStatus,setUserInfo, setKnowLedgeList } = userSlice.actions
export default userSlice.reducer
