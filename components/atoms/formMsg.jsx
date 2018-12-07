import React from 'react'
import PropTypes from 'prop-types'
/**
 * form mesage 
 */

const FormMsg = ({ children, ...props }) => {
    const {...rest} = props

    return <span className="a-formMessage">{children}</span>
  }
  
  FormMsg.propTypes = {
  }
  
  FormMsg.defaultProps = {
  }
  
  export default FormMsg