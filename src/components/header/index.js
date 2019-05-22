import "./index.scss"
import React, { Component } from "react"
import { Menu, Dropdown, Icon, Tooltip, AutoComplete, Button } from "antd"
import HttpUtil from "Common/http-util"
import HttpApi from "Common/http-api"
import SvgIcons from "Components/svg_icons"
const { AppMessage, NewFlag } = SvgIcons
export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userType: 1,
      projectList: [],
      chooseProject: {
        webMonitorId: "",
        projectName: ""
      }
    }
    this.choseProject = this.choseProject.bind(this)
  }

  componentDidMount() {
    const chooseWebMonitorId = window.localStorage.chooseWebMonitorId
    HttpUtil.get(HttpApi.projectList).then( res => {
      const projectList = res.data.rows
      let chooseProject = res.data.rows[0]
      for (let i = 0; i < projectList.length; i ++) {
        if (chooseWebMonitorId === projectList[i].webMonitorId) {
          chooseProject = projectList[i]
          break
        }
      }
      this.setState({projectList: res.data.rows, chooseProject})
      window.localStorage.chooseWebMonitorId = chooseProject.webMonitorId
      if (typeof this.props.loadedProjects === "function") this.props.loadedProjects(chooseProject)
    }, () => {
      throw new Error("未能成功获取应用列表")
    })
    $(window).scroll(() => {
      const top = $(document).scrollTop()
      if (top > 100) {
        $(".header-container").fadeOut()
      } else if (top < 20) {
        $(".header-container").fadeIn()
      }
    })
    document.getElementById("progress_bar").style.display = "none"
  }
  render() {
    const { projectList, chooseProject } = this.state
    const projectNameList = []
    const chooseProjectName = chooseProject.projectName
    projectList.forEach((item) => {
      projectNameList.push(item.projectName)
    })
    const errorNameList = [
      {
        name: "Js错误统计",
        url: "javascriptError",
        icon: <Icon type="line-chart" />
      },
      {
        name: "静态资源错误统计",
        url: "resourceError",
        icon: <Icon type="file-text" />
      },
      {
        name: "接口请求错误统计",
        url: "httpError",
        icon: <Icon type="export" />
      },
    ]
    const performanceNameList = [
      {
        name: "页面加载性能分析（待发布）",
        // url: "pagePerformance",
        icon: <Icon type="line-chart" />
      },
      {
        name: "接口请求性能分析（待发布）",
        // url: "httpPerformance",
        icon: <Icon type="file-text" />
      },
    ]

    const performanceMenu =
      <Menu>
        {
          performanceNameList.map((errorName, index) => {
            return <Menu.Item key={ index }>
              <a onClick={this.turnToErrorPage.bind(this, errorName)}>{errorName.icon} {errorName.name}</a>
            </Menu.Item>
          })
        }
      </Menu>
    const errorMenu =
      <Menu>
        {
          errorNameList.map((errorName, index) => {
            return <Menu.Item key={ index }>
              <a onClick={this.turnToErrorPage.bind(this, errorName)}>{errorName.icon} {errorName.name}</a>
            </Menu.Item>
          })
        }
      </Menu>
    return <div className="header-container">
      <section className="sub-header">
        <Icon className="home-icon" type="home" theme="filled" onClick={this.turnToHome.bind(this)}/>
        <div className="project-select-box">
          {
            projectNameList.length > 0 &&
            <span>
              <AutoComplete
                backfill
                style={{ width: 180 }}
                dataSource={projectNameList}
                placeholder="试着输入你的项目名称"
                defaultValue={chooseProjectName}
                filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                onSelect={(value) => {
                  projectList.forEach((item) => {
                    if (item.projectName === value) {
                      this.choseProject(item)
                    }
                  })
                }}
              /><div className="search-icon"><Icon type="search"/></div>
            </span>
          }
          <Button type="primary" icon="plus" onClick={this.turnToCreateNewProject.bind(this)}>新建项目</Button>
        </div>
        <span className="menu-right" onClick={this.turnTo.bind(this, "home")}>首页</span>
        <span className="menu-right">
          <Dropdown overlay={errorMenu} trigger={["click"]}>
            <a className="ant-dropdown-link" href="#">
              错误统计 <Icon type="down" /><Icon className="new-flag" component={NewFlag}/>
            </a>
          </Dropdown>
        </span>
        <span className="menu-right">
          <Dropdown overlay={performanceMenu} trigger={["click"]}>
            <a className="ant-dropdown-link" href="#">
              性能分析 <Icon type="down" />
            </a>
          </Dropdown>
          <label className="not">待发布</label>
        </span>
        <span className="menu-right" onClick={this.turnTo.bind(this, "behaviors")}>记录回放</span>
        <div className="github-container" onClick={this.turnToBlog.bind(this)}/>
      </section>
      <div className="message-box" onClick={this.turnToZhihu.bind(this)}>
        <Tooltip placement="topRight" title="有问题，欢迎给我留言">
          <Icon component={AppMessage}/>
        </Tooltip>
      </div>
    </div>
  }
  turnToZhihu() {
    window.open("https://zhuanlan.zhihu.com/webfunny")
  }
  turnTo(url) {
    this.props.parentProps.history.push(url)
  }
  turnToBlog() {
    window.open("https://zhuanlan.zhihu.com/p/66680065")
  }
  turnToHome() {
    const {parentProps} = this.props
    parentProps.history.push("home")
  }
  choseProject(project) {
    this.setState({chooseProject: project})
    window.localStorage.chooseWebMonitorId = project.webMonitorId
    if (typeof this.props.chooseProject === "function") {
      this.props.chooseProject(project)
    }
  }
  turnToErrorPage(errorName) {
    if (!errorName.url) return
    const {parentProps} = this.props
    parentProps.history.push(errorName.url)
  }
  changeUserType() {
    const { userType } = this.state
    if (userType === 1) {
      this.setState({userType: 2})
    } else {
      this.setState({userType: 1})
    }
  }
  turnToCreateNewProject() {
    const {parentProps} = this.props
    parentProps.history.push("createProject")
  }
}
