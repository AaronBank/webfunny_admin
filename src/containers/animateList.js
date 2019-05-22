import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import AnimateList from "Modules/animateList"
import * as actions from "Modules/animateList/action"

const AnimateListContainer = props => <AnimateList {...props} />

const mapStateToProps = state => {
  const { animateList } = state
  return { ...animateList }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...actions }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AnimateListContainer)
