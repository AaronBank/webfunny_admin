import "./index.scss"
import React, { Component } from "react"
import Header from "Components/header"
import { Row, Col, Tabs, Card, Icon, Tooltip, Spin } from "antd"
import { jsErrorOption, jsErrorOptionByHour } from "ChartConfig/jsChartOption"
import SvgIcons from "Components/svg_icons"
import Utils from "Common/utils"
const TabPane = Tabs.TabPane
const echarts = require("echarts")
class JavascriptError extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jsErrorCountByDayChart: null,
      activePageIndex: 0,
      loading: false
    }
    this.initData = this.initData.bind(this)
    this.loadInitData = this.loadInitData.bind(this)
  }

  componentDidMount() {
    // try {
    //   throw new Error("获取通讯录失败")
    // } catch (e) {
    //   console.error(e)
    // }
  }

  componentWillUnmount() {
    this.props.clearJavascriptErrorState()
  }
  render() {
    const { jsErrorList, consoleErrorList, ignoreErrorList, jsErrorListByPage, pageErrorList,
            maxPageErrorCount, totalPercent, pcPercent,
            iosPercent, androidPercent, activeKeyTop,
            activeKeyDown } = this.props
    return <div className="javascriptError-container">
      <Header
        chooseProject={this.choseProject.bind(this)}
        loadedProjects={this.loadedProjects.bind(this)}
        parentProps={this.props}
      />
      <Spin spinning={this.state.loading}>
      <Row>
        <Card className="main-info-container">
          <Col span={16}>
            <Tabs defaultActiveKey="1" activeKey={activeKeyTop} onTabClick={this.onStatistic.bind(this)}>
              <TabPane tab={<span><Icon type="area-chart" />月统计<span style={{fontSize: 12}}>(点击柱状图更新数据)</span></span>} key="1">
                <div id="jsErrorCountByDay" className="chart-box" />
              </TabPane>
              <TabPane tab={<span><Icon type="clock-circle-o" theme="filled" />实时统计</span>} key="2">
                <div id="jsErrorCountByHour" className="chart-box" />
              </TabPane>
            </Tabs>
          </Col>
          <Col span={8}>
            <Tabs defaultActiveKey="1" >
              <TabPane tab={<span><Icon type="file-text" />错误率</span>} key="1">
                <div className="info-box">
                  <span><Icon type="thunderbolt" theme="filled" /><label>总错误率</label></span>
                  <span>{totalPercent}%</span>
                </div>
                <div className="info-box">
                  <span><Icon type="windows" theme="filled"/><label>PC错误率</label></span>
                  <span>{pcPercent}%</span>
                </div>
                <div className="info-box">
                  <span><Icon type="apple" theme="filled" /><label>IOS错误率</label></span>
                  <span>{iosPercent}%</span>
                </div>
                <div className="info-box">
                  <span><Icon type="android" theme="filled"/><label>Android错误率</label></span>
                  <span>{androidPercent}%</span>
                </div>
              </TabPane>
            </Tabs>
          </Col>
        </Card>

      </Row>
      <Row>
        <Tabs defaultActiveKey="1"  activeKey={activeKeyDown} onTabClick={this.onPageError.bind(this)}>
          <TabPane tab={<span><Icon component={SvgIcons.Error}/>捕获异常<span style={{fontSize: 12}}>(window.onerror)<Tooltip placement="top" title="程序运行时出错，使用window.onerror进行捕获并上报"><Icon type="question-circle" style={{"marginLeft": 5}}/></Tooltip></span></span>} key="1">
            <Card className="error-list-container">
              {
                jsErrorList.length <= 0 && <span className="loading-box"><Icon className="loading-icon" type="loading" /></span>
              }
              {
                  jsErrorList.map((error, index) => {
                  const ignoreStatus = ignoreErrorList.filter(data => data.ignoreErrorMessage === error.errorMessage && data.type === "ignore").length > 0
                  const resolveStatus = ignoreErrorList.filter(data => data.ignoreErrorMessage === error.errorMessage && data.type === "resolve").length > 0
                  let tempErrorMessage = ""
                  if (error.errorMessage && error.errorMessage.indexOf(" ") !== -1) {
                    tempErrorMessage = Utils.b64DecodeUnicodeWithSpace(error.errorMessage)
                  } else {
                    tempErrorMessage = Utils.b64DecodeUnicode(error.errorMessage)
                  }
                  const msgArr = tempErrorMessage.split(": ")
                  const len = msgArr.length
                  const nowTime = new Date().getTime()
                  const latestTime = parseInt(error.happenTime, 10)
                  const timeStatus = nowTime - latestTime > 24 * 60 * 60 * 1000
                  return <p key={index} onClick={this.turnToDetail.bind(this, error)} title="点击查看详情" >
                      <span className={ignoreStatus && " status-icon status-icon-ignore " ||  resolveStatus && " status-icon status-icon-resolve " || "status-icon"}/>
                      <span>{ (Utils.b64DecodeUnicode(msgArr[0] || msgArr[1] || msgArr[2]) || "").substring(0, 30)}</span>
                      <span>{Utils.b64DecodeUnicode(msgArr[len - 1]) || "..."}</span>
                      { error.osInfo &&
                      error.osInfo.map((obj) => {
                        let osType = ""
                        if (obj.os === "ios") {
                          osType = "apple"
                        } else if (obj.os === "and") {
                          osType = "android"
                        } else {
                          osType = "windows"
                        }
                        return <span key={Math.random()}>
                          <Icon className="click-export" theme="filled" type={osType} /><label>（{obj.count}次）</label>
                        </span>
                      })
                      }
                      {
                        ignoreStatus && <label className="ignore-state">已忽略</label> ||
                        resolveStatus && <label className="resolve-state">已解决</label>
                      }
                      <span className="right-icon"><Icon type="right" /></span>
                      <span className={timeStatus ? "not-today" : ""} title="发生时间以用户的手机为准，不完全准确"><i>{timeStatus ? "最近：" : "24小时内："}</i>{new Date(latestTime).Format("yyyy-MM-dd hh:mm:ss")}</span>
                    </p>
                })
              }
            </Card>
          </TabPane>
          <TabPane tab={<span><Icon component={SvgIcons.ZiDingYi} />自定义异常<span style={{fontSize: 12}}>(console.error)<Tooltip placement="top" title="用户自定义并上报的错误, 使用console.error进行上报；同时也包含第三方的报错信息。"><Icon type="question-circle" style={{"marginLeft": 5}}/></Tooltip></span></span>} key="2">
            <Card className="error-list-container">
              {
                consoleErrorList.length <= 0 && <span className="loading-box"><Icon className="loading-icon" type="loading" /></span>
              }
              {
                consoleErrorList.map((error, index) => {
                  const ignoreStatus = ignoreErrorList.filter(data => data.ignoreErrorMessage === error.errorMessage && data.type === "ignore").length > 0
                  const resolveStatus = ignoreErrorList.filter(data => data.ignoreErrorMessage === error.errorMessage && data.type === "resolve").length > 0
                  let tempErrorMessage = ""
                  if (error.errorMessage && error.errorMessage.indexOf(" ") !== -1) {
                    tempErrorMessage = Utils.b64DecodeUnicodeWithSpace(error.errorMessage)
                  } else {
                    tempErrorMessage = Utils.b64DecodeUnicode(error.errorMessage)
                  }
                  const msgArr = tempErrorMessage.split(": ")
                  const len = msgArr.length
                  const nowTime = new Date().getTime()
                  const latestTime = parseInt(error.happenTime, 10)
                  const timeStatus = nowTime - latestTime > 24 * 60 * 60 * 1000
                  return <p key={index} onClick={this.turnToDetail.bind(this, error)} title="点击查看详情" >
                    <span className={ignoreStatus && " status-icon status-icon-ignore " ||  resolveStatus && " status-icon status-icon-resolve " || "status-icon"}/>
                    <span>{ (Utils.b64DecodeUnicode(msgArr[0] || msgArr[1] || msgArr[2]) || "").substring(0, 30)}</span>
                    <span>{Utils.b64DecodeUnicode(msgArr[len - 1]) || "..."}</span>
                    { error.osInfo &&
                    error.osInfo.map((obj) => {
                      let osType = ""
                      if (obj.os === "ios") {
                        osType = "apple"
                      } else if (obj.os === "and") {
                        osType = "android"
                      } else {
                        osType = "windows"
                      }
                      return <span key={Math.random()}>
                          <Icon className="click-export" theme="filled" type={osType} /><label>（{obj.count}次）</label>
                        </span>
                    })
                    }
                    {
                      ignoreStatus && <label className="ignore-state">已忽略</label> ||
                      resolveStatus && <label className="resolve-state">已解决</label>
                    }
                    <span className="right-icon"><Icon type="right" /></span>
                    <span className={timeStatus ? "not-today" : ""} title="发生时间以用户的手机为准，不完全准确"><i>{timeStatus ? "最近：" : "24小时内："}</i>{new Date(latestTime).Format("yyyy-MM-dd hh:mm:ss")}</span>
                  </p>
                })
              }
            </Card>
          </TabPane>
          <TabPane tab={<span><Icon component={SvgIcons.Pages} />错误页面</span>} key="3">
            <Col span={8} className="page-container">
              <Card style={{ width: "100%" }}>
                {
                  pageErrorList.map((page, index) => {
                    const percent = page.count * 100 / maxPageErrorCount + "%"
                    return <Tooltip key={Math.random()} title={page.simpleUrl} placement="right">
                        <p className={this.state.activePageIndex === index ? "url-box url-box-active" : "url-box"} style={{ backgroundSize: percent + " 100%" }} onClick={this.getJsErrorListByPage.bind(this, page.simpleUrl, index)}>
                          <span>{page.simpleUrl}</span><span>({page.count}次)</span>
                        </p>
                      </Tooltip>
                  })
                }
              </Card>
            </Col>
            <Col span={16} className="page-error-container">
              <Card className="error-list-container">
                {
                  jsErrorListByPage.map((error, index) => {
                    const errorMessage = Utils.b64DecodeUnicode(error.errorMessage)
                    const msgArr = errorMessage.split(": ")
                    const len = msgArr.length
                    return <p key={index} onClick={this.turnToDetail.bind(this, error)} title="点击查看详情" >
                      <span className="status-icon"/><span>{Utils.b64DecodeUnicode(msgArr[0] || msgArr[1] || msgArr[2]) || "空"}</span>
                      <span>{msgArr[len - 1] || "..."}</span>
                      {
                        error.osInfo.map((obj) => {
                          let osType = ""
                          if (obj.os === "ios") {
                            osType = "apple"
                          } else if (obj.os === "and") {
                            osType = "android"
                          } else {
                            osType = "windows"
                          }
                          return <span key={Math.random()}>
                          <Icon className="click-export" theme="filled" type={osType} /><label>（{obj.count}次）</label>
                        </span>
                        })
                      }
                      <span className="right-icon"><Icon type="right" /></span>
                      <span ><i>最近：</i>{new Date(parseInt(error.happenTime, 10)).Format("yyyy-MM-dd hh:mm:ss")}</span>
                    </p>
                  })
                }
              </Card>
            </Col>
          </TabPane>
        </Tabs>

      </Row>
      </Spin>
    </div>
  }
  onStatistic(key) {
    if (key === "2") {
      const hours = Utils.get24HoursArray().reverse()
      const sevenHours = Utils.getSevenDaysAgo24HoursArray().reverse()
      this.props.getJsErrorCountByHourAction((res) => {
        // 基于准备好的dom，初始化echarts实例
        const jsErrorChartByHour = echarts.init(document.getElementById("jsErrorCountByHour"))
        const data = res.data.today
        const dateArray = [], jsErrorArray = []
        let jsErrorTotalCount = 0
        for (let i = 0; i < hours.length; i ++) {
          if (data[i] && data[i].hour === hours[i]) {
            dateArray.push(data[i].hour + "时")
            jsErrorArray.push(data[i].count)
            jsErrorTotalCount = jsErrorTotalCount + parseInt(data[i].count, 10)
          } else {
            dateArray.push(hours[i] + "时")
            jsErrorArray.push(0)
          }
        }
        const seven = res.data.seven
        const sevenDateArray = [], sevenJsErrorArray = []
        for (let i = 0; i < sevenHours.length; i ++) {
          if (seven[i] && seven[i].hour === sevenHours[i]) {
            sevenDateArray.push(seven[i].hour + "时")
            sevenJsErrorArray.push(seven[i].count)
          } else {
            sevenDateArray.push(sevenHours[i] + "时")
            sevenJsErrorArray.push(0)
          }
        }
        jsErrorChartByHour.setOption(jsErrorOptionByHour([dateArray, jsErrorArray], [sevenDateArray, sevenJsErrorArray]))
      })
    }
    this.props.updateJavascriptErrorState({activeKeyTop: key, activeKeyDown: "1"})
  }
  onPageError(key) {
    const { timeType } = this.props
    this.props.updateJavascriptErrorState({activeKeyDown: key})
    if (key === "2") {
      // 获取js错误列表
      this.props.getConsoleErrorSortAction({ timeType }, (res) => {
        this.props.updateJavascriptErrorState({consoleErrorList: res.data})
      })
    } else if (key === "3") {
      this.props.getJsErrorCountByPageAction({ timeType }, (res) => {
        if (res.length) {
          this.props.getJsErrorSortAction({simpleUrl: res[0].simpleUrl, timeType}, (result) => {
            const maxPageErrorCount = parseInt(res[0].count, 10)
            this.props.updateJavascriptErrorState({jsErrorListByPage: result.data, maxPageErrorCount, pageErrorList: res})
          })
        } else {
          this.props.updateJavascriptErrorState({pageErrorList: []})
        }
      })
    }
  }
  getJsErrorListByPage(simpleUrl, index) {
    const { timeType } = this.props
    this.props.getJsErrorSortAction({simpleUrl, timeType}, (result) => {
      this.props.updateJavascriptErrorState({jsErrorListByPage: result.data})
      this.setState({activePageIndex: index})
    })
  }
  turnToDetail(error) {
    this.props.history.push("javascriptErrorDetail?errorMsg=" + error.errorMessage)
  }

  initData() {
    this.loadInitData()

    // 根据平台获取并计算错误率
    this.props.getJavascriptErrorCountByOsAction({day: 1}, (result) => {
      const pcError = parseInt(result.pcError.count, 10)
      const iosError = parseInt(result.iosError.count, 10)
      const androidError = parseInt(result.androidError.count, 10)
      const pcPv = parseInt(result.pcPv.count, 10)
      const iosPv = parseInt(result.iosPv.count, 10)
      const androidPv = parseInt(result.androidPv.count, 10)

      const errorTotal = pcError + iosError + androidError
      const pvTotal = pcPv + iosPv + androidPv

      const totalPercent = (errorTotal * 100 / pvTotal).toFixed(2)
      const pcPercent = (pcError * 100 / pcPv).toFixed(2)
      const iosPercent = (iosError * 100 / iosPv).toFixed(2)
      const androidPercent = (androidError * 100 / androidPv).toFixed(2)
      this.props.updateJavascriptErrorState({totalPercent, pcPercent, iosPercent, androidPercent})
    })
  }

  // 加载错误图表数据
  async loadInitData(newTimeType) {
    let dataIndex = 29
    const timeType = newTimeType ? newTimeType : this.props.timeType
    // 基于准备好的dom，初始化echarts实例
    this.state.jsErrorCountByDayChart = echarts.init(document.getElementById("jsErrorCountByDay"))
    // 绘制图表
    this.props.getJsErrorCountByDayAction({ timeType }, (result) => {
      const data = result.data
      const dateArray = [], jsErrorArray = []
      for (let i = 0; i <= 30; i ++) {
        if (!data[i]) continue
        dateArray.push(data[i].day)
        jsErrorArray.push(data[i].count)
      }
      this.state.jsErrorCountByDayChart.setOption(jsErrorOption([dateArray, jsErrorArray]))
    })
    this.state.jsErrorCountByDayChart.off("click")
    this.state.jsErrorCountByDayChart.on("click", (params) => {
      dataIndex = params.dataIndex
      this.setState({ loading: true })
      this.props.updateJavascriptErrorState({activeKeyDown: "1", timeType: 29 - dataIndex})
      // 获取忽略js错误列表
      this.props.getIgnoreJavascriptErrorListAction((result) => {
        this.props.updateJavascriptErrorState({ignoreErrorList: result})
        // 获取js错误列表
        this.props.getJsErrorSortAction({ timeType: 29 - dataIndex }, (res) => {
          this.props.updateJavascriptErrorState({jsErrorList: res.data})
          this.setState({loading: false})
        }).catch(() => {
          this.setState({loading: false})
        })
      })
    })
    // 获取忽略js错误列表
    this.props.getIgnoreJavascriptErrorListAction((result) => {
      this.props.updateJavascriptErrorState({ignoreErrorList: result})
      // 获取js错误列表
      this.props.getJsErrorSortAction({ timeType: 29 - dataIndex }, (res) => {
        this.props.updateJavascriptErrorState({jsErrorList: res.data})
        this.setState({loading: false})
      }).catch(() => {
        this.setState({loading: false})
      })
    })
  }
  choseProject() {
    this.props.clearJavascriptErrorState()
    this.initData()
  }
  loadedProjects() {
    this.initData()
  }
}

JavascriptError.propTypes = {
}

export default JavascriptError
