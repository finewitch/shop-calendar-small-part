import React from 'react'
import PropTypes from 'prop-types'


/**
 * form label 
 */

 
const FormLabel = ({ children, ...props }) => {
  const { required, ...rest } = props

  return (
    <label className="a-formLabel" { ...rest }>
      {children}
      {required ? <abbr className="a-formRequired">*</abbr> : ''}
    </label>
  )
}

FormLabel.propTypes = {
}

FormLabel.defaultProps = {
}


export default FormLabel