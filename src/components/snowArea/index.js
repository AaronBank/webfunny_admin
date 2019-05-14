import "./index.scss"
import React, { Component } from "react"
export default class Loading extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // 冬天飘雪花
    const canvas = document.querySelector("#snowCanvas")
    this.snow(canvas)
  }

  render() {
    return <canvas className="snow-canvas" id="snowCanvas" />
  }
  snow(canvas) {
    const context = canvas.getContext("2d")
    // 微粒子创建数组
    const particles = []
    for (let j = 0; j < 400; j++) {
      const floorIndex = j % 5
      const colors = ["#EE7657", "#6AEC5F", "#F6EE72", "#F36DF6", "#80F6C2"]
      particles.push({// 设置雪花的初始位x，y  x,y向上的速度，以及雪花的大小颜色，随机生成的
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: Math.random() * 1 - 0.5,
        vy: Math.random() * 1 + 0.5,
        size: 1 + Math.random() * 1,
        color: colors[floorIndex]
      })
    }
    // 进行绘制
    function timeUp() {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      // 清除画布
      let particle = {}
      for (let i = 0; i < 500; i++) {// 遍历所有的雪花
        particle = particles[i]
        if (!particle) continue
        particle.x += particle.vx// 更新雪花的新的x,y位置
        particle.y += particle.vy
        if (particle.x < 0) {
          particle.x = window.innerWidth// 如果雪花的位置放在了左侧意外，然后使其显示在窗口右边
        }
        if (particle.x > window.innerWidth) {
          particle.x = 0
        }
        if (particle.y >= window.innerHeight) {
          particle.y = 0
        }
        // 设置雪花颜色
        context.fillStyle = particle.color
        context.beginPath()// 开始绘制雪花
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)// 绘制圆形
        context.closePath()// 必和路径
        context.fill()
      }
    }
    setInterval(timeUp, 40)
  }
}
