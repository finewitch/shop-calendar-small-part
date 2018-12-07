import React from 'react'
import PropTypes from 'prop-types'
/**
 * incon 
 * type: reuired
 */

const Icon = ({ children, ...props }) => {
    const {hero, box, type, inline, ...rest} = props

    var iconClass = 'a-icon'
    if(hero) {
      iconClass += ' o-hero__deco'
    }
    if(box) {
      iconClass += ' o-box__icon'
    }

    if(inline) {
      iconClass += ' -inline'
    }
    
    iconClass += ' -'+type

    return <span className={iconClass} {...rest}></span>
  }
  
  Icon.propTypes = {
    type: PropTypes.oneOf([
      // hero/yellow
      'cutlery', 
      'inspirations', 
      'guide', 
      'services', 
      'running', 
      'transport', 
      'card', 
      'dots', 
      
      // std/blue
      'measuring', 
      'measuring-2', 
      'delivery', 
      'assembly', 
      'planning', 
      'info',
      'inspiration'
    ]).isRequired,
    hero: PropTypes.bool,
    box: PropTypes.bool,
    inline: PropTypes.bool,
  }
  
  Icon.defaultProps = {
    hero: false,
    box: false,
    inline: false
  }
  
  export default Icon