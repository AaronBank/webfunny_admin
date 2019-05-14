import "./index.scss"
import React, { Component } from "react"
export default class Loading extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className="fox-container">
      <div className="container">
        <div className="content content--fox">
          <div className="fox">
            <div className="fox-body">
              <div className="fox-front-leg" />
              <div className="fox-front-leg" />
            </div>
            <div className="fox-head">
              <div className="fox-face">
                <div className="fox-ears">
                  <div className="fox-ear" />
                  <div className="fox-ear" />
                </div>
                <div className="fox-skull" />
                <div className="fox-front" />
                <div className="fox-eyes" />
                <div className="fox-nose" />
              </div>
            </div>
            <div className="fox-tail">
              <div className="fox-tail">
                <div className="fox-tail">
                  <div className="fox-tail">
                    <div className="fox-tail">
                      <div className="fox-tail">
                        <div className="fox-tail" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img className="land-bg" src={require("./img/land.png")}/>
        </div>
      </div>
    </div>
  }
}
