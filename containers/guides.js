import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import {actions} from '../modules/guides'
import GuidesList from '../components/organisms/guidesList'


class GuidesContainer extends Component {
  getAllGuides() {
    return this.props.guides.list
  }

  render() {
    const {limit, partial, guides} = this.props

    return <GuidesList limit={limit} list={this.getAllGuides()} partial={partial} />
  }
}

GuidesContainer.propTypes = {
  guides: PropTypes.objectOf(PropTypes.array).isRequired,
  limit: PropTypes.number
}

GuidesContainer.defaultProps = {
  guides: {},
  limit: 20,
}

const mapStateToProps = state => {
  return { 
    guides: state.guides
  }
}

// const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)})
// export default connect(mapStateToProps, mapDispatchToProps)(GuidesContainer)
export default GuidesContainer