import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { servicesActions } from '../modules/services'

import ServicesList from '../components/organisms/servicesList'


class ServicesContainer extends Component {
    constructor (props) {
        super(props)
    }

    getAllServices() {
        const { services: { loading, list }, actions } = this.props
        if (list.length === 0 && !loading) {
            actions.getServices()
        }
            
        return list
    }

    render() {
        const { limit, services: { loading }, filtered, handleClick } = this.props

        return <ServicesList limit={limit} list={this.getAllServices()} loading={loading} filtered={filtered} handleClick={handleClick} />
    }
}


ServicesContainer.propTypes = {
    services: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    limit: PropTypes.number,
    filtered: PropTypes.bool
}

ServicesContainer.defaultProps = {
    services: {},
    loading: true,
    limit: 9,
    filtered: false
}

const mapStateToProps = state => ({
    services: state.services,
    zipcode: state.services.zipCode
})

const mapDispatchToProps = dispatch => ({ 
    actions: bindActionCreators(servicesActions, dispatch) 
})

export default connect(mapStateToProps, mapDispatchToProps)(ServicesContainer)
