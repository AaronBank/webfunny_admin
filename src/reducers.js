import animateListReducer from "Modules/animateList/reducer"
import behaviorsReducer from "Modules/behaviors/reducer"
import createProjectReducer from "Modules/createProject/reducer"
import customerPvAnalysisReducer from "Modules/customerPvAnalysis/reducer"
import homeReducer from "Modules/home/reducer"
import httpErrorReducer from "Modules/httpError/reducer"
import javascriptErrorReducer from "Modules/javascriptError/reducer"
import javascriptErrorDetailReducer from "Modules/javascriptErrorDetail/reducer"
import loginReducer from "Modules/login/reducer"
import projectListReducer from "Modules/projectList/reducer"
import registerReducer from "Modules/register/reducer"
import resourceErrorReducer from "Modules/resourceError/reducer"
import showScreenShotReducer from "Modules/showScreenShot/reducer"

export default {
  animateList: {reducer: animateListReducer, isCached: false},
  behaviors: {reducer: behaviorsReducer, isCached: false},
  createProject: {reducer: createProjectReducer, isCached: false},
  customerPvAnalysis: {reducer: customerPvAnalysisReducer, isCached: false},
  home: {reducer: homeReducer, isCached: false},
  httpError: {reducer: httpErrorReducer, isCached: false},
  javascriptError: {reducer: javascriptErrorReducer, isCached: false},
  javascriptErrorDetail: {reducer: javascriptErrorDetailReducer, isCached: false},
  login: {reducer: loginReducer, isCached: false},
  projectList: {reducer: projectListReducer, isCached: false},
  register: {reducer: registerReducer, isCached: false},
  resourceError: {reducer: resourceErrorReducer, isCached: false},
  showScreenShot: {reducer: showScreenShotReducer, isCached: false}
}