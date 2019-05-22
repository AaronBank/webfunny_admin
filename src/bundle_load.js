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
export const Home = props => <Bundle loadContainer={HomeContainer} title="前端监控系统" >
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

export const JavascriptError = props => <Bundle loadContainer={JavascriptErrorContainer} title="JS错误列表" >
  {Container => <Container {...props} />}
</Bundle>

export const JavascriptErrorDetail = props => <Bundle loadContainer={JavascriptErrorDetailContainer} title="错误详情" >
  {Container => <Container {...props} />}
</Bundle>

import ShowScreenShotContainer from "Containers/showScreenShot"
export const ShowScreenShot = props => <Bundle loadContainer={ShowScreenShotContainer} title="线上截图分析" >
  {Container => <Container {...props} />}
</Bundle>

export const Behaviors = props => <Bundle loadContainer={BehaviorsContainer} title="用户行为分析" >
  {Container => <Container {...props} />}
</Bundle>

export const CustomerPvAnalysis = props => <Bundle loadContainer={CustomerPvAnalysisContainer} title="用户PV/UV分析" >
  {Container => <Container {...props} />}
</Bundle>

export const ResourceError = props => <Bundle loadContainer={ResourceErrorContainer} title="静态资源加载报错分析" >
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
export const AnimateList = props => <Bundle loadContainer={AnimateListContainer} title="动画集合页" >
  {Container => <Container {...props} />}
</Bundle>
