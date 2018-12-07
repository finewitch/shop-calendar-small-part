import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Service from '../molecules/service'


class ServicesList extends Component {

    constructor(props) {
        super(props)
    }

    prepareList() {
        return this.props.list

        // api example return
        return [
            /*{
                "ServiceId": 0,
                "ServiceName": "string",
                "ServiceSlug": "string",
                "Description": "string",
                "IsRecommended": true,
                "Components": [
                    {
                        "ResourceGroupId": 0,
                        "ResourceName": "string",
                        "RecourceCost": 0,
                        "isTransportCost": true
                    }
                ],
                "TotalPrice": 0,
                "IsStablePrice": true
            }*/
        ]
    }

    render() {
        let { loading, failed, limit, calculated, excluded, filtered, handleClick } = this.props
        let list = limit ? this.prepareList().slice(0, limit) : this.prepareList()

        if (filtered && excluded) {
            list = list.filter(service => {
                if (service.ServiceId === excluded) return false
                else return true
            })
        }

        let listView = list.map(service => {
            return <Service 
            id={service.ServiceId} 
            key={service.ServiceId} 
            name={service.ServiceName} 
            slug={service.ServiceSlug} 
            description={service.Description} 
            recommended={service.IsRecommended} 
            price={service.TotalPrice} 
            stable={service.IsStablePrice} 
            options={service.Components} 
            calculated={calculated}
            handleClickOn={handleClick}
            />
        })

        if (!list.length && loading) {
            return <p className="a-info">Wczytywanie...</p>
        } else {
            return <div className={`t-row -triple ${loading ? 'u-loading' : ''}`}>{listView}</div>
        }
    }
}


ServicesList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool,
    failed: PropTypes.bool,
    excluded: PropTypes.number,
    filtered: PropTypes.bool
}

ServicesList.defaultProps = {}

const mapStateToProps = state => ({
    calculated: state.services.locationName !== 'bd',
    excluded: state.services.fullService.Services ? state.services.fullService.Services.ServiceId : null
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ServicesList)
