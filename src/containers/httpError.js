import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import HttpError from "Modules/httpError"
import * as actions from "Modules/httpError/action"

const HttpErrorContainer = props => <HttpError {...props} />

const mapStateToProps = state => {
  const { httpError } = state
  return { ...httpError }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...actions }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(HttpErrorContainer)
