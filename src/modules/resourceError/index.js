import "./index.scss"
import React, { Component } from "react"
import { Row, Col, Tabs, Card, Icon, Spin } from "antd"
import Header from "Components/header"
import ChartFactory from "Components/chartFactory"
import { resourceErrorOption } from "ChartConfig/resourceChartOption"
import SvgIcons from "Components/svg_icons"
import Utils from "Common/utils"
const TabPane = Tabs.TabPane
class ResourceError extends Component {
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
    const { resourceErrorByDayChart, resourceLoadErrorList, totalCount, customerCount } = this.props
    return <div className="resourceError-container">
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
              <TabPane tab={<span><Icon type="area-chart" />资源加载报错<span style={{fontSize: 12}}>(点击柱状图更新数据)</span></span>} key="1">
                {
                  resourceErrorByDayChart ?
                    <ChartFactory
                      style={{ height: 200, paddingBottom: 20 }}
                      option={resourceErrorByDayChart}
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
                <div className="info-box">
                  <span><Icon component={SvgIcons.Total} /><label>总发生次数</label></span>
                  <span>{totalCount}次</span>
                </div>
                <div className="info-box">
                  <span><Icon component={SvgIcons.Pages} /><label>影响页面次数</label></span>
                  <span>{totalCount}次</span>
                </div>
                <div className="info-box">
                  <span><Icon component={SvgIcons.Customers} /><label>影响用户数</label></span>
                  <span>{customerCount}位</span>
                </div>
              </TabPane>
            </Tabs>
          </Col>
        </Card>

      </Row>
      <Row>
        <Tabs defaultActiveKey="1" >
          <TabPane tab={<span><Icon type="tags-o" />资源加载失败列表(<b>TOP15</b>)</span>} key="1">
            <Card className="error-list-container">
              { resourceLoadErrorList &&
                resourceLoadErrorList.map((resource, index) => {
                  if (!resource.sourceUrl.length) return null
                  return <p key={index}>
                    <span>{ decodeURIComponent(Utils.b64DecodeUnicode(resource.sourceUrl)) } 【总共:<b>{ resource.count }</b>次 | 发生页面:<b>{resource.pageCount}</b>个 | 影响用户:<b>{resource.customerCount}</b>位】</span>
                    <span style={{color: "#666"}}>{new Date(resource.createdAt).Format("yyyy-MM-dd hh:mm:ss")}</span>
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
    this.props.getResourceErrorCountByDayAction({}, (data) => {
      const dateArray = [], jsErrorArray = []
      for (let i = 0; i <= 30; i ++) {
        if (!data[i]) continue
        dateArray.push(data[i].day)
        jsErrorArray.push(data[i].count)
      }
      this.props.updateResourceErrorState({resourceErrorByDayChart: resourceErrorOption([dateArray, jsErrorArray])})
    })
    this.choseBarChart({dataIndex: 29})
  }
  choseBarChart(params) {
    const dataIndex = params.dataIndex
    this.setState({ loading: true })
    this.props.updateResourceErrorState({timeType: 29 - dataIndex})
    let totalCount = 0
    let customerCount = 0
    this.props.getResourceLoadInfoListByDayAction({ timeType: 29 - dataIndex }, (data) => {
      for (let i = 0; i <= data.length - 1; i++) {
        for (let j = 0; j < data.length - 1 - i; j++) {
          if (data[j].createdAt < data[j + 1].createdAt) {
            const temp = data[j]
            data[j] = data[j + 1]
            data[j + 1] = temp
          }
        }
      }
      for (let i = 0; i < data.length - 1; i++) {
        totalCount += parseInt(data[i].count, 10)
        customerCount += parseInt(data[i].customerCount, 10)
      }
      this.props.updateResourceErrorState({resourceLoadErrorList: data, totalCount, customerCount})
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

ResourceError.propTypes = {
}

export default ResourceError
