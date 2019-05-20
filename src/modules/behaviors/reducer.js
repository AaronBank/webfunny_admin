import { handleActions } from "redux-actions"

const initialState = {
  exampleSearchValue: "2A882F9A-630A-49D0-BC53-2FB03A18A301",
  searchValue: "",
  webMonitorId: "",
  behaviorList: [],
  searchFlag: false,
  userInfo: null,
  previewUrl: "",
  timeScope: 0,
  showMore: false,
  loadPageTimeList: [],
  behaviorStartTime: "",
  behaviorEndTime: ""
}

export default handleActions({

  updateBehaviorsState: (state = initialState, { payload }) => {
    return {
      ...state,
      ...payload
    }
  },

  clearBehaviorsState: () => {
    return {
      ...initialState
    }
  }
}, initialState)
