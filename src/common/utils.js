export default class Utils {
  static isArray(object) {
    return Object.prototype.toString.call(object) === "[object Array]"
  }
  static isObject(object) {
    return Object.prototype.toString.call(object) === "[object Object]"
  }
  static b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode("0x" + p1)
    }))
  }
  static b64DecodeUnicode(str) {
    try {
      return decodeURIComponent(atob(str).split("").map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(""))
    } catch (e) {
      return str
    }
  }
  static b64DecodeUnicodeWithSpace(tempStr) {
    if (!tempStr) return ""
    const str = tempStr.replace(/ /g, "+")
    try {
      return decodeURIComponent(atob(str).split("").map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(""))
    } catch (e) {
      return str
    }
  }
  static b64DecodeUnicodeBehavior(tempStr) {
    if (!tempStr) return ""
    const str = tempStr.replace(/ /g, "+")
    try {
      return decodeURIComponent(atob(str).split("").map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(""))
    } catch (e) {
      return str
    }
  }
  static qs(object, cache) {
    const arr = []
    function inner(innerObj, prefix) {
      for (const prop in innerObj) {
        if (!innerObj.hasOwnProperty(prop)) return
        const textValue = innerObj[prop]
        if (!Utils.isArray(textValue)) {
          if (Utils.isObject(textValue)) inner(textValue, prefix ? prefix + "." + prop : prop)
          else arr.push(encodeURIComponent((prefix ? prefix + "." : "") + prop) + "=" + encodeURIComponent(textValue || ""))
        } else {
          textValue.forEach((val) => {
            arr.push(encodeURIComponent((prefix ? prefix + "." : "") + prop + "[]") + "=" + encodeURIComponent(val || ""))
          })
        }
      }
    }
    inner(object, "")
    if (cache && !object._) {
      arr.push("_=" + encodeURIComponent(BUILD_NO))
    }
    return arr.length ? "?" + arr.join("&") : ""
  }

  static parseQs() {
    const s = window.location.search
    const index = s.indexOf("?")
    const result = {}
    if (index === -1) return result
    const arr = s.substr(index + 1).split("&")
    arr.forEach(function(item) {
      const equals = item.split("=")
      let key = decodeURIComponent(equals[0])
      const val = decodeURIComponent(equals[1] || "")
      let i = 0
      const splitting = key.split(".")
      const len = splitting.length
      key = splitting[len - 1]
      let temp = result
      if (len > 1) {
        for (; i < len - 1; i++) {
          if (!temp[splitting[i]] || !CommonTool.isObject(temp[splitting[i]])) temp[splitting[i]] = {}
          temp = temp[splitting[i]]
        }
      }
      if (key.substr(-2) !== "[]") {
        temp[key] = val
      } else {
        key = key.substr(0, key.length - 2)
        if (!temp[key]) temp[key] = [val]
        else temp[key].push(val)
      }
    })
    return result
  }

  // 快速排序
  static quickSort(arr) {
    // 如果数组<=1,则直接返回
    if (arr.length <= 1) {return arr}
    const pivotIndex = Math.floor(arr.length / 2)
    // 找基准，并把基准从原数组删除
    const pivot = arr.splice(pivotIndex, 1)[0]
    // 定义左右数组
    const left = []
    const right = []

    // 比基准小的放在left，比基准大的放在right
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] <= pivot) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }
    // 递归
    return Utils.quickSort(left).concat([pivot], Utils.quickSort(right))
  }

  // 获取24小时数组
  static get24HoursArray() {
    const dateTime = new Date().getTime()
    const hourArray = []
    for (let i = 0; i < 24; i ++) {
      const tempDateTime = dateTime - i * 60 * 60 * 1000
      const hour = new Date(tempDateTime).Format("MM-dd hh")
      hourArray.push(hour)
    }
    return hourArray
  }
  static getSevenDaysAgo24HoursArray() {
    const dateTime = new Date().getTime() - 6 * 24 * 60 * 60 * 1000
    const hourArray = []
    for (let i = 0; i < 24; i ++) {
      const tempDateTime = dateTime - i * 60 * 60 * 1000
      const hour = new Date(tempDateTime).Format("MM-dd hh")
      hourArray.push(hour)
    }
    return hourArray
  }
  static loadJs(url, onload) {
    const script = document.createElement("script")
    script.async = 1
    script.onload = typeof onload === "function" ? onload : () => {}
    script.src = url
    const dom = document.getElementsByTagName("script")[0]
    dom.parentNode.insertBefore(script, dom)
  }
}
