import "./index.scss"
import React, { Component } from "react"
import { Form, Input, Button, Card } from "antd"
import Header from "Components/header"
const { Meta } = Card
class CreateProject extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { monitorCode } = this.props
    const { getFieldDecorator } = this.props.form
    return <div className="createProject-container">
      <Header parentProps={this.props}/>
      <Card title="创建新项目" style={{ width: "60%", margin: "auto" }}>
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.createNewProject.bind(this)}>
          <Form.Item
            label="项目名"
          >
            {getFieldDecorator("projectName", {
              rules: [{ required: true, message: "请输入项目名" }],
            })(
              <Input placeholder="输入你的项目名称" />
            )}
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 12, offset: 5 }}
          >
            <Button type="primary" htmlType="submit">
              创建
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {
        monitorCode &&
        <Card title="探针代码" style={{ width: "60%", margin: "auto", marginTop: 30 }}>
          <textarea className="code-box" defaultValue={decodeURIComponent(monitorCode)} />
        </Card>
      }
      {
        monitorCode &&
        <Card title="部署方法" style={{ width: "60%", margin: "auto", marginTop: 10 }}>
          <p>1. 将探针代码插入到页面 Head 标签的最顶部即可。</p>
          <p>2. 每个项目都支持七天的数据统计。</p>
          <img style={{ width: "100%"}} src={require("Images/common/bushu.jpg")} />
          <Meta
            title="使用注意："
            description="localhost 域名下不支持上传"
          />
        </Card>
      }
    </div>
  }
  createNewProject(e) {
    e.preventDefault()
    this.props.form.validateFields((err, data) => {
      if (!err) {
        // 查询这个项目名是否存在， 如果不存在则保存
        const webMonitorId = new Date().getTime()
        const param = Object.assign({}, {webMonitorId}, {...data})
        this.props.createNewProjectAction(param, (res) => {
          const { monitorCode } = res
          this.props.updateCreateProjectState({monitorCode})
        })
      }
    })
  }
}

CreateProject.propTypes = {
}
const WrappedApp = Form.create({ name: "coordinated" })(CreateProject)
export default WrappedApp
