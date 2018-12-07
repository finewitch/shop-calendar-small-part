import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { calendarActions } from '../modules/calendar'

import CalendarSlider from '../components/organisms/calendarSlider'

//https://www.npmjs.com/package/react-animate-on-change
import AnimateOnChange from 'react-animate-on-change'

class CalendarContainer extends Component {

    constructor(props) {
        super(props)

        this.getDates = this.getDates.bind(this)
    }

    componentWillMount() {
        // console.log(this.props.resourceGroupId)
        // if (this.props.resourceGroupId)
    }

    getDates() {
        const { calendar: { dates, loading }, actions, zipCode, resourceGroupId, serviceId  } = this.props
        // console.log(this.props, 'PROPS');

        let today = new Date()
        var dd;
        if(this.props.idIndex !== 0){

            var dateFromFirstStep = this.props.calendar.date; //2018-12-04
            
            dd = new Date(new Date(dateFromFirstStep).getTime() + (3 * 24 * 60 * 60 * 1000)).getDate()
            // console.log(dd)
        }else{
            dd = today.getDate() + 1 
            // console.log(dd)
        }
        let mm = today.getMonth() + 1
        let yyyy = today.getFullYear()
        

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd

        if (dates.length === 0 && !loading) {
            actions.getCalendar(resourceGroupId,zipCode,today)
        }
        
        return dates
    }

    render() {
        const { calendar: { loading, error } } = this.props

        // if (error) 
        //     return <p className="a-info">Wystąpił błąd. Spróbuj ponownie.</p>
        // else
            // return <AnimateOnChange
            //     baseClassName="calendarAnimation"
            //     animationClassName="-running"
            //     animate={!loading && !error}
            //     customTag="div">
                    return <CalendarSlider dates={this.getDates()} loading={loading} failed={error} />
                // </AnimateOnChange>
    }
}


CalendarContainer.propTypes = {
    calendar: PropTypes.object.isRequired
}

CalendarContainer.defaultProps = {
    calendar: {}
}

const mapStateToProps = state => {
    const idIndex = state.order.currentOption
    const id = state.order.serviceName !== '' ? state.order.serviceOptions[idIndex].ResourceGroupId : undefined

    return {
        calendar: state.calendar,
        zipCode: state.services.zipCode,
        serviceId: state.chosenServiceId,
        resourceGroupId: id,
        idIndex : idIndex
    }
}

const mapDispatchToProps = dispatch => ({ 
    actions: bindActionCreators(calendarActions, dispatch) 
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer)
