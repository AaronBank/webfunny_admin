import { handleActions } from "redux-actions"

const initialState = {
  customerPvChart: null,
  jsErrorByHourChart: null,
  jsErrorTotalCount: 0,
  loadPageTimeChart: null,
  resourceErrorByDayChart: null,
  resourceErrorTotalCount: 0,
  httpErrorByHourChart: null,
  httpErrorTotalCount: 0,
  activePanelIndex: 1
}

export default handleActions({

  updateHomeState: (state = initialState, { payload }) => {
    return {
      ...state,
      ...payload
    }
  },

  clearHomeState: () => {
    return {
      ...initialState
    }
  }
}, initialState)
