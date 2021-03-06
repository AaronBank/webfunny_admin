import { handleActions } from "redux-actions"

const initialState = {
  remotePath: "",
  monitorCode: ""
}

export default handleActions({

  updateCreateProjectState: (state = initialState, { payload }) => {
    return {
      ...state,
      ...payload
    }
  },

  clearCreateProjectState: () => {
    return {
      ...initialState
    }
  }
}, initialState)
