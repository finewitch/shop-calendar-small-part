import React from 'react'
import PropTypes from 'prop-types'

// import Link from 'next/link'
// https://github.com/fridays/next-routes
import {Link} from '../../routes'
/**
 * nav 
 */

const Nav = ({ children, ...props }) => {
  const { href, as, routeName, routeParams, handleClick, className,  ...rest } = props

  return <Link href={href} as={as} route={routeName} params={routeParams}>
    <a className={`a-link ${className}`} onClick={handleClick ? handleClick : () => {return false}} {...rest}>{children}</a>
  </Link>
}

Nav.propTypes = {
  href: PropTypes.string.isRequired
}

Nav.defaultProps = {
  href: '#'
}

export default Nav