import "./index.scss"
import React, { Component } from "react"
import Header from "Components/header"
import ChartFactory from "Components/chartFactory"
import SvgIcons from "Components/svg_icons"
import Fox from "Components/fox"
import { jsErrorOptionByHour } from "ChartConfig/jsChartOption"
import { Spin, Tabs, Icon, notification } from "antd"
import utils from "Common/utils"
const TabPane = Tabs.TabPane
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.initData.bind(this)
    this.analysisErrorData.bind(this)
  }
  componentDidMount() {
    this.openNotification()
  }

  render() {
    const { jsErrorTotalCount, jsErrorByHourChart, resourceErrorTotalCount, resourceErrorByDayChart, httpErrorTotalCount, httpErrorByHourChart } = this.props
    return <div className="home-container">
      <Header
        chooseProject={this.choseProject.bind(this)}
        loadedProjects={this.loadedProjects.bind(this)}
        parentProps={this.props}
        isCreateProject
      />
      <div className="home-mask">
        <div className="home-content">
          <Fox/>
          <div className="left">
            <Tabs>
              <TabPane tab={<span><Icon type="line-chart" />Js报错实时监控（今日：{jsErrorTotalCount}）</span>} key="1">
                {
                  jsErrorByHourChart ?
                    <ChartFactory
                      style={{ height: 320, paddingBottom: 20 }}
                      option={jsErrorByHourChart}
                    />
                    :
                    <div className="chart-loading">
                      <Spin tip="Loading..."/>
                    </div>
                }
              </TabPane>
              <TabPane tab={<span><Icon type="file-text" />静态资源加载报错（今天：{resourceErrorTotalCount}）</span>} key="2">
                {
                  resourceErrorByDayChart ?
                    <ChartFactory
                      style={{ height: 320, paddingBottom: 20 }}
                      option={resourceErrorByDayChart}
                    />
                    :
                    <div className="chart-loading">
                      <Spin tip="Loading..."/>
                    </div>
                }
              </TabPane>
              <TabPane tab={<span><Icon component={SvgIcons.RequestSvg} />接口请求报错（今天：{httpErrorTotalCount}）</span>} key="3">
                {
                  httpErrorByHourChart ?
                    <ChartFactory
                      style={{ height: 320, paddingBottom: 20 }}
                      option={httpErrorByHourChart}
                    />
                    :
                    <div className="chart-loading">
                      <Spin tip="Loading..."/>
                    </div>
                }
              </TabPane>
            </Tabs>
          </div>
        </div>
        <a className="bei-an-text" href="http://www.beian.miit.gov.cn">苏ICP备17071733号-2</a>
      </div>
    </div>
  }
  initData() {
    const hours = utils.get24HoursArray().reverse()
    const sevenHours = utils.getSevenDaysAgo24HoursArray().reverse()
    this.props.getJsErrorCountByHourAction((res) => {
      const data = res.data.today
      const seven = res.data.seven
      const jsErrorInfo = this.analysisErrorData(data, hours)
      const sevenDayAgoJsErrorInfo = this.analysisErrorData(seven, sevenHours)
      this.props.updateHomeState({jsErrorTotalCount: jsErrorInfo.errorTotalCount, jsErrorByHourChart: jsErrorOptionByHour([hours, jsErrorInfo.errorArray], [hours, sevenDayAgoJsErrorInfo.errorArray])})
    })
    this.props.getResourceErrorCountByHourAction((res) => {
      const data = res.data.today
      const seven = res.data.seven
      const errorInfo = this.analysisErrorData(data, hours)
      const sevenDayAgoErrorInfo = this.analysisErrorData(seven, sevenHours)
      this.props.updateHomeState({resourceErrorTotalCount: errorInfo.errorTotalCount, resourceErrorByDayChart: jsErrorOptionByHour([hours, errorInfo.errorArray], [hours, sevenDayAgoErrorInfo.errorArray])})
    })
    // 接口请求报错列表
    this.props.getHttpErrorCountByHourAction((res) => {
      const data = res.data.today
      const seven = res.data.seven
      const errorInfo = this.analysisErrorData(data, hours)
      const sevenDayAgoErrorInfo = this.analysisErrorData(seven, sevenHours)
      this.props.updateHomeState({httpErrorTotalCount: errorInfo.errorTotalCount, httpErrorByHourChart: jsErrorOptionByHour([errorInfo.dateArray, errorInfo.errorArray], [errorInfo.dateArray, sevenDayAgoErrorInfo.errorArray])})
    })
  }
  openNotification() {
    const nowDay = new Date().Format("yyyy-MM-dd")
    if (localStorage.closeNotification && nowDay <= localStorage.closeNotification) {
      return
    }
    const key = `open${Date.now()}`
    notification.open({
      message: "更新提示（2019-05-14）",
      description: <p className="update-box">
        <span> 抱歉，后台并发服务调整，暂时不开放功能 </span>
      </p>,
      onClose: () => {
        localStorage.closeNotification = new Date().Format("yyyy-MM-dd")
      },
      style: {
        width: 400,
        marginTop: 50,
      },
      duration: 20,
      key
    })
  }
  analysisErrorData(data, hours) {
    const nowHour = new Date().getHours()
    const dateArray = [], errorArray = []
    let errorTotalCount = 0
    for (let i = 0; i < hours.length; i ++) {
      let isInclude = false
      for (let j = 0; j < data.length; j ++) {
        if (data[j].hour === hours[i]) {
          const tempHour = hours[i]
          dateArray.push(tempHour + "时")
          errorArray.push(data[j].count)
          if (nowHour >= parseInt(tempHour.substring(6, 8), 10)) {
            errorTotalCount = errorTotalCount + parseInt(data[j].count, 10)
          }
          isInclude = true
          break
        }
      }
      if (isInclude === false) {
        dateArray.push(hours[i] + "时")
        errorArray.push(0)
      }
    }
    return {errorTotalCount, dateArray, errorArray}
  }
  choseProject() {
    this.props.clearHomeState()
    setTimeout(() => {
      this.initData()
    }, 2000)
  }
  loadedProjects() {
    setTimeout(() => {
      // this.initData()
    }, 2000)
  }
  turnToJsError() {
    this.props.history.push("javascriptError")
  }
  turnToBehaviors() {
    this.props.history.push("behaviors")
  }
}
