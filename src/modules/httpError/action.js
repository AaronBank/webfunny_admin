import { createAction } from "redux-actions"
import HttpUtil from "Common/http-util"
import HttpApi from "Common/http-api"
export const updateHttpErrorState = createAction("updateHttpErrorState", payload => payload)

export const clearHttpErrorState = createAction("clearHttpErrorState")

export const getHttpErrorCountByDayAction = (params, handleResult) => () => {
  return HttpUtil.get(HttpApi.getHttpErrorCountByDay, params).then( response => {
    handleResult(response.data)
  })
}

export const getHttpErrorListByDayAction = (params, handleResult) => () => {
  return HttpUtil.post(HttpApi.getHttpErrorListByDay, params).then( response => {
    handleResult(response.data)
  })
}
