import * as containers from "./bundle_load"

// 聚合路由
const prePath = BUILD_ENV === "local" ? "/webfunny" : ""
export default [
  { path: prePath + "/", component: containers.Home, exact: true },
  { path: prePath + "/home", component: containers.Home, exact: true },
  { path: prePath + "/projectList", component: containers.ProjectList },
  { path: prePath + "/register", component: containers.Register },
  { path: prePath + "/login", component: containers.Login },
  { path: prePath + "/javascriptError", component: containers.JavascriptError },
  { path: prePath + "/javascriptErrorDetail", component: containers.JavascriptErrorDetail },
  { path: prePath + "/behaviors", component: containers.Behaviors },
  { path: prePath + "/showScreenShot", component: containers.ShowScreenShot },
  { path: prePath + "/customerPvAnalysis", component: containers.CustomerPvAnalysis },
  { path: prePath + "/resourceError", component: containers.ResourceError },
  { path: prePath + "/httpError", component: containers.HttpError },
  { path: prePath + "/createProject", component: containers.CreateProject },
  { path: prePath + "/animateList", component: containers.AnimateList },
]
