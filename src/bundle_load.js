import React from "react"
import Bundle from "./lib/bundle"  // 调用基础库的方法

// 加载模块
import HomeContainer from "Containers/home"
import ProjectListContainer from "Containers/projectList"
import JavascriptErrorContainer from "Containers/javascriptError"
import BehaviorsContainer from "Containers/behaviors"
import JavascriptErrorDetailContainer from "Containers/javascriptErrorDetail"
import CustomerPvAnalysisContainer from "Containers/customerPvAnalysis"
import ResourceErrorContainer from "Containers/resourceError"
import HttpErrorContainer from "Containers/httpError"
export const Home = props => <Bundle loadContainer={HomeContainer} title="前端监控系统，实时监控及报警" >
  {Container => <Container {...props} />}
</Bundle>


export const ProjectList = props => <Bundle loadContainer={ProjectListContainer} title="项目列表" >
  {Container => <Container {...props} />}
</Bundle>

import RegisterContainer from "Containers/register"
export const Register = props => <Bundle loadContainer={RegisterContainer} title="register" >
  {Container => <Container {...props} />}
</Bundle>

import LoginContainer from "Containers/login"
export const Login = props => <Bundle loadContainer={LoginContainer} title="login" >
  {Container => <Container {...props} />}
</Bundle>

export const JavascriptError = props => <Bundle loadContainer={JavascriptErrorContainer} title="JS错误列表，利用window.onerror及console.error监控前端页面报错情况" >
  {Container => <Container {...props} />}
</Bundle>

export const JavascriptErrorDetail = props => <Bundle loadContainer={JavascriptErrorDetailContainer} title="错误详情" >
  {Container => <Container {...props} />}
</Bundle>

import ShowScreenShotContainer from "Containers/showScreenShot"
export const ShowScreenShot = props => <Bundle loadContainer={ShowScreenShotContainer} title="线上截图分析，利用html2Canvas等工具，用javascript代码对页面进行截图" >
  {Container => <Container {...props} />}
</Bundle>

export const Behaviors = props => <Bundle loadContainer={BehaviorsContainer} title="用户行为分析，通过监听并记录页面上用户的访问，请求，点击，报错等行为，来辅助前端开发定位线上问题" >
  {Container => <Container {...props} />}
</Bundle>

export const CustomerPvAnalysis = props => <Bundle loadContainer={CustomerPvAnalysisContainer} title="用户PV/UV分析" >
  {Container => <Container {...props} />}
</Bundle>

export const ResourceError = props => <Bundle loadContainer={ResourceErrorContainer} title="静态资源加载报错分析，通过监听页面静态资源加载事件分析出html页面上静态资源加载的情况" >
  {Container => <Container {...props} />}
</Bundle>

import CreateProjectContainer from "Containers/createProject"
export const CreateProject = props => <Bundle loadContainer={CreateProjectContainer} title="创建新项目" >
  {Container => <Container {...props} />}
</Bundle>

export const HttpError = props => <Bundle loadContainer={HttpErrorContainer} title="接口请求报错分析" >
  {Container => <Container {...props} />}
</Bundle>

import AnimateListContainer from "Containers/animateList"
export const AnimateList = props => <Bundle loadContainer={AnimateListContainer} title="Css3 如何画3D旋转效果或者卫星围绕旋转效果" >
  {Container => <Container {...props} />}
</Bundle>
