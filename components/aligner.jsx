import React from 'react'
import PropTypes from 'prop-types'


/**
 * aligner
 * types: '', narrow
 */

const Aligner = ({ children, ...props }) => {
    const { type, ...rest } = props

    let alignerStyle = 't-aligner'
    if (type) {
        alignerStyle += ' -' + type
    }

    return <div className={ alignerStyle }>{children}</div>
}

Aligner.propTypes = {
    type: PropTypes.oneOf([
        '', 'narrow'
    ])
}

Aligner.defaultProps = {
    type: ''
}

export default Aligner