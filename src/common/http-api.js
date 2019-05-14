import envConfig from "./env_config"

const apiHost = envConfig.getApiHost()
const api = {
  // 获取所有模块的js文件
  "jsList": "//www.webfunny.cn/webfunny/manifest.json",
  // 登录
  "login": apiHost + "/server/user/login",
  // 注册
  "register": apiHost + "/server/user",
  // 查询所有用户
  "userList": apiHost + "/server/user/list",
  // 查询所有项目列表
  "projectList": apiHost + "/server/project/list",


  // 根据时间查询每天JS的错误量
  "getJsErrorCountByDay": apiHost + "/server/getJavascriptErrorInfoListByDay",
  // 根据时间查询一天内js错误总量和最近几小时的错误量
  "getJsErrorCountByHour": apiHost + "/server/getJavascriptErrorInfoListByHour",
  // 根据JS错误量进行排序
  "getJsErrorSort": apiHost + "/server/getJavascriptErrorSort",
  "getConsoleErrorSort": apiHost + "/server/getConsoleErrorSort",
  // 根据平台获取JS错误数量
  "getJavascriptErrorCountByOs": apiHost + "/server/getJavascriptErrorCountByOs",
  // errorMsg 获取js错误列表
  "getJavascriptErrorListByMsg": apiHost + "/server/getJavascriptErrorListByMsg",
  // 获取js错误相关信息
  "getJavascriptErrorAboutInfo": apiHost + "/server/getJavascriptErrorAboutInfo",
  // 获取js错误详情
  "getJavascriptErrorDetail": id => apiHost + "/server/javascriptErrorInfo/" + id,
  // 获取js错误对应的code
  "getJavascriptErrorStackCode": apiHost + "/server/getJavascriptErrorStackCode",
  // 根据页面每天JS的错误量
  "getJavascriptErrorListByPage": apiHost + "/server/getJavascriptErrorListByPage",
  // 设置需要忽略的js错误
  "setIgnoreJavascriptError": apiHost + "/server/ignoreError",
  // 获取忽略的js错误列表
  "ignoreErrorByApplication": apiHost + "/server/ignoreErrorByApplication",
  // 查询用户的行为列表
  "searchUserBehaviors": apiHost + "/server/searchUserBehaviors",
  // 查询用户的基本信息
  "searchCustomerInfo": apiHost + "/server/searchCustomerInfo",
  // 获取截屏列表
  "getScreenShotInfoListByPage": apiHost + "/server/getScreenShotInfoListByPage",
  // 获取日活量数据
  "getCustomerCountByTime": apiHost + "/server/getCustomerCountByTime",
  // 获取当日页面加载平均时间
  "getPageLoadTimeByDate": apiHost + "/server/getPageLoadTimeByDate",
  // 获取静态资源加载失败列表
  "getResourceLoadInfoListByDay": apiHost + "/server/getResourceLoadInfoListByDay",
  // 获取每天接口请求失败数量列表
  "getResourceErrorCountByDay": apiHost + "/server/getResourceErrorCountByDay",
  // 获取一天内每小时报错数量
  "getResourceErrorCountByHour": apiHost + "/server/getResourceErrorCountByHour",
  // 获取一天内每小时接口请求报错数量
  "getHttpErrorCountByHour": apiHost + "/server/getHttpErrorCountByHour",

  // 创建新项目
  "createNewProject": apiHost + "/server/createNewProject",


}

const nodeApi = {
}

export default {
  ...api,
  ...nodeApi
}

