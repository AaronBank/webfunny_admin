import { handleActions } from "redux-actions"

const initialState = {
  isFetching: false
}

export default handleActions({

  updateAnimateListState: (state = initialState, { payload }) => {
    return {
      ...state,
      ...payload
    }
  },

  clearAnimateListState: () => {
    return {
      ...initialState
    }
  }
}, initialState)
