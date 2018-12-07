import React from 'react'
import PropTypes from 'prop-types'


/**
 * hamburger 
 */

const Hamburger = ({ children, ...props }) => {
    const { active, ...rest } = props

    let hamburgerStyle = 'hamburger hamburger--squeeze'
    if (active) {
        hamburgerStyle += ' is-active'
    }

    return (
        <button className={ hamburgerStyle } type="button" {...rest}>
            <span className="hamburger-box">
                <span className="hamburger-inner"></span>
            </span>
        </button>
    )
}

Hamburger.propTypes = {
    active: PropTypes.bool
}

Hamburger.defaultProps = {}

export default Hamburger