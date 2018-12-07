import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../modules/modal'
import * as Modals from '../components/organisms/modals'
import Modal from '../components/organisms/modal'

class ModalContainer extends Component {

  constructor(props) {
    super(props)
  }

  getModal() {
    if(typeof this.props.modal.name == 'undefined') {
      return null
    }
    const { name } = this.props.modal
    switch (name) {
      case 'postalCode':
        return <Modals.PostalCodeModal {...this.props} />
      case 'sessionEnd':
        return <Modals.SessionEndModal {...this.props} />
      case 'login':
        return <Modals.LoginModal {...this.props} />
      // case 'profil':
      //   return <Modals.ProfilModal {...this.props} />
      // case 'inspirations':
      //   return <Modals.InspirationsModal {...this.props} />
      // case 'question':
      //   return <Modals.QuestionModal {...this.props} />
      // case 'test':
      //   return <Modals.TestModal {...this.props} />
      // case 'inspirations2':
      //   return <Modals.InspirationsModal2 {...this.props} />
      // case 'panelWelcome':
      //   return <Modals.PanelWelcomeModal {...this.props} />
      // case 'haveProject':
      //   return <Modals.HaveProjectModal {...this.props} />
      // case 'addInspiration':
      //   return <Modals.AddInspirationModal {...this.props} />
      // case 'service':
      //   return <Modals.ServiceModal {...this.props} />

      default:
        return null
    }
  }

  closeModal() {
    this.actions.hideModal()
  }


  render() {
    const modal = this.getModal()
    const closable = !(this.props.modal.name === 'sessionEnd')

    return modal ? (<Modal onCloseCallback={this.closeModal} type={this.props.modal.name} show={!!modal} closable={closable} {...this.props}>{modal}</Modal>) : null
  }
}
ModalContainer.propTypes = {
  modal: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    modal: state.modal,
  }
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })
export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer)