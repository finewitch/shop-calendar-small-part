import React from 'react'
import PropTypes from 'prop-types'

// import Link from 'next/link'
import { Link } from '../../routes'

/**
 * button 
 * types: link, button, submit
 * state: active
 * color: -primary
 */

const Button = ({ children, ...props }) => {
  const { href, as, color, design, icoType, type, state, className, routeName, routeParams, handleClick,ghost, ...rest } = props

  let buttonStyle = 'a-button'
  if (color) {
    buttonStyle += ' -' + color
  } 
  if (design) {
    buttonStyle += ' -' + design
  }
  if (icoType) {
    buttonStyle += ' -' + icoType
  }
  if (state) {
    buttonStyle += ' -' + state
  }
  if (className) {
    buttonStyle += ' ' + className
  }

  if (type === 'link') {
    return <Link href={href} as={as} route={routeName} params={routeParams}>
      <a className={buttonStyle}  {...rest}>{children}</a>
    </Link>
  } else {
    if(ghost){

      return <button className='ghost-btn'></button>

    }else{

      return <button className={buttonStyle} type={type} onClick={handleClick} {...rest}>{children}</button>

    }
  }
}

Button.propTypes = {
  type: PropTypes.oneOf([
    'link', 'button', 'submit'
  ]),
  href: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.oneOf([
    '', 'primary'
  ]),
  design: PropTypes.oneOf([
    '', 'arrowed', 'clear', 'ico'
  ]),
  icoType: PropTypes.oneOf([
    'close'
  ]),
  state: PropTypes.oneOf([
    '', 'active'
  ]),
  handleClick: PropTypes.func
}

Button.defaultProps = {
  type: 'link',
  href: '#',
  color: 'primary',
  design: '',
  state: ''
}

export default Button