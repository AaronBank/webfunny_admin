import { handleActions } from "redux-actions"

const initialState = {
  httpErrorByDayChart: null,
  resourceLoadErrorList: null,
  timeType: 0,
  totalCount: 0,
  customerCount: 0,
  dayDetail: {}
}

export default handleActions({

  updateHttpErrorState: (state = initialState, { payload }) => {
    return {
      ...state,
      ...payload
    }
  },

  clearHttpErrorState: () => {
    return {
      ...initialState
    }
  }
}, initialState)
