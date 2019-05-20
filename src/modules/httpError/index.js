import "./index.scss"
import React, { Component } from "react"
import { Row, Col, Tabs, Card, Icon, Spin } from "antd"
import Header from "Components/header"
import ChartFactory from "Components/chartFactory"
import { httpErrorOption } from "ChartConfig/httpLogChartOption"
const TabPane = Tabs.TabPane

class HttpError extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.initData = this.initData.bind(this)
    this.choseBarChart = this.choseBarChart.bind(this)
  }

  componentDidMount() {
    this.initData()
  }
  render() {
    const { httpErrorByDayChart, httpErrorList, dayDetail } = this.props
    return <div className="httpError-container">
      <Header
        chooseProject={this.choseProject.bind(this)}
        loadedProjects={this.loadedProjects.bind(this)}
        parentProps={this.props}
      />
      <Spin spinning={this.state.loading}>
        <Row>
          <Card className="main-info-container">
            <Col span={16}>
              <Tabs defaultActiveKey="1" >
                <TabPane tab={<span><Icon type="area-chart" />接口请求报错<span style={{fontSize: 12}}>(点击柱状图更新数据)</span></span>} key="1">
                  {
                    httpErrorByDayChart ?
                      <ChartFactory
                        style={{ height: 200, paddingBottom: 20 }}
                        option={httpErrorByDayChart}
                        handleClick={this.choseBarChart}
                      />
                      :
                      <div className="chart-loading">
                        <Spin tip="Loading..."/>
                      </div>
                  }
                </TabPane>
              </Tabs>
            </Col>
            <Col span={8}>
              <Tabs defaultActiveKey="1" >
                <TabPane tab={<span><Icon type="file-text" />今日概况</span>} key="1" >
                  { dayDetail &&
                    Object.keys(dayDetail).map((key, index) => {
                      return <div className="info-box" key={index}>
                        <span><span>{key}</span><label>发生次数</label></span>
                      <span>{dayDetail[key]}</span>
                      </div>
                    })
                  }
                </TabPane>
              </Tabs>
            </Col>
          </Card>

        </Row>
        <Row>
          <Tabs defaultActiveKey="1" >
            <TabPane tab={<span><Icon type="tags-o" />接口请求失败列表(<b>TOP15</b>)</span>} key="1">
              <Card className="error-list-container">
                { httpErrorList &&
                httpErrorList.map((httpError, index) => {
                  return <p key={index}>
                    <span>{ decodeURIComponent(httpError.simpleHttpUrl) } 【{httpError.statusArray.status + "：" + httpError.statusArray.count + "次"}】</span>
                    <span style={{color: "#666"}}>{new Date(httpError.createdAt).Format("yyyy-MM-dd hh:mm:ss")}</span>
                  </p>
                })
                }
              </Card>
            </TabPane>
          </Tabs>

        </Row>
      </Spin>
    </div>
  }
  initData() {
    // 静态资源加载失败列表
    this.props.getHttpErrorCountByDayAction({}, (data) => {
      const dateArray = [], httpErrorArray = []
      for (let i = 0; i <= 30; i ++) {
        if (!data[i]) continue
        dateArray.push(data[i].day)
        httpErrorArray.push(data[i].count)
      }
      this.props.updateHttpErrorState({httpErrorByDayChart: httpErrorOption([dateArray, httpErrorArray])})
    })
    this.choseBarChart({dataIndex: 29})
  }
  choseBarChart(params) {
    const dataIndex = params.dataIndex
    this.setState({ loading: true })
    this.props.updateHttpErrorState({timeType: 29 - dataIndex})
    const dayDetail = {}
    this.props.getHttpErrorListByDayAction({ timeType: 29 - dataIndex }, (data) => {
      for (let i = 0; i <= data.length - 1; i++) {
        for (let j = 0; j < data.length - 1 - i; j++) {
          if (data[j].createdAt < data[j + 1].createdAt) {
            const temp = data[j]
            data[j] = data[j + 1]
            data[j + 1] = temp
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        const key = data[i].statusArray.status
        const value = data[i].statusArray.count
        if (!dayDetail[key]) {
          dayDetail[key] = value
        } else {
          const tempValue = parseInt(dayDetail[key], 10)
          const tempValue2 = parseInt(value, 10)
          dayDetail[key] = tempValue + tempValue2
        }
      }
      this.props.updateHttpErrorState({httpErrorList: data, dayDetail})
      this.setState({loading: false})
    }).catch(() => {
      this.setState({loading: false})
    })
  }
  choseProject() {
    this.initData()
  }
  loadedProjects() {
  }
  turnToDetail(sourceUrl) {
    console.log(sourceUrl)
  }
}

HttpError.propTypes = {
}

export default HttpError
