import { createAction } from "redux-actions"
// import HttpUtil from "Common/http-util"
// import HttpApi from "Common/http-api"
export const updateAnimateListState = createAction("updateAnimateListState", payload => payload)

export const clearAnimateListState = createAction("clearAnimateListState")
