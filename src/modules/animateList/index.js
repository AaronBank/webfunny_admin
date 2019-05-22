import "./index.scss"
import React, { Component } from "react"
import Header from "Components/header"
import { Card } from "antd"
class AnimateList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const outWidth = $(".out_circle").width()
    $(".out_circle").height(outWidth)
    // 获取半径
    const rWidth = outWidth / 2

    // 获得弧度
    const radian = 2 * Math.PI / 360 * 60
    // 长边
    const langWidth = Math.sin(radian) * rWidth
    // 短边

    // icon的长度
    const iconWidth = $(".img_top").width()

    $(".img_top").css({
      top: 0 - iconWidth / 2,
      left: rWidth - iconWidth / 2
    })

    $(".img_bottom").css({
      top: rWidth * 1.5 - iconWidth / 2,
      left: rWidth - langWidth - iconWidth / 2
    })

    $(".img_bottom2").css({
      top: rWidth * 1.5 - iconWidth / 2,
      left: outWidth - (rWidth - langWidth) - iconWidth / 2
    })
  }

  render() {
    return <div className="animateList-container">
      <Header/>
      <Card title="3D旋转动画效果或者卫星围绕旋转效果" bordered={false} style={{ width: "80%", marginTop: 90, marginLeft: "10%", height: 500 }}>
        <div className="out_circle">
          <div className="nav_circle r1">
            <img className="center-img1" src={require("Images/animateList/center1.png")}/>
              <div className="img_top img">
                <img src={require("Images/animateList/icon1.png")}/>
              </div>
              <div className="img_bottom img">
                <img src={require("Images/animateList/icon2.png")}/>
              </div>
              <div className="img_bottom2 img">
                <img src={require("Images/animateList/icon3.png")}/>
              </div>
          </div>
        </div>
      </Card>
    </div>
  }
}

AnimateList.propTypes = {
}

export default AnimateList
