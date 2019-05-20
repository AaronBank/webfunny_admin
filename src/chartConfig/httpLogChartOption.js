export const httpErrorOption = (result) => {
  return {
    color: [ "#5d5cb6" ],
    tooltip: {
      trigger: "axis",
      // axisPointer: {
      //   type: "cross",
      //   crossStyle: {
      //     color: "#666"
      //   }
      // },
      confine: true,
      position: ["50%", "50%"],
      alwaysShowContent: false,
      hideDelay: 100
    },
    grid: {
      top: "15%",
      left: "5%",
      right: "4%",
      bottom: "1%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: result[0],
        axisPointer: {
          type: "shadow"
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#666",
            type: "dashed"
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "次数",
        min: 0,
        max: "dataMax",
        axisLabel: {
          formatter: "{value}"
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#666",
            type: "dashed"
          }
        },
        axisTick: {
          show: false
        }

      }
    ],
    series: [
      {
        name: "Error发生次数：",
        type: "bar",
        smooth: true,
        data: result[1],
        areaStyle: {}
      }
    ]
  }
}
