import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'

import Nav from "../components/atoms/nav"
import Hamburger from "../components/atoms/hamburger"
import PostalBox from "./organisms/postalBox"
import Aligner from "../components/aligner"
import Button from './atoms/button'

import { orderActions } from '../modules/order'

// https://github.com/fridays/next-routes
import { Router } from '../routes'


/**
 * header
 * back: true/false
 * menu: true/false
 * form: true/false
 */


class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shrinked: false,
      lastOffset: 0,
      isMenuActive: false,
      route: ''
    }

    this.clickHamburgerHandle = this.clickHamburgerHandle.bind(this)
    this.handlePageScroll = this.handlePageScroll.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleNav = this.handleNav.bind(this)
    this.handleMenunClosing = this.handleMenunClosing.bind(this)
  }

  handlePageScroll() {
    const scrollTop = window.pageYOffset
    const lastOffset = this.state.lastOffset
    const scrollDelta = scrollTop - lastOffset

    if (scrollDelta > 0) { // scroll down
      if (scrollTop > 36) {
        this.setState({shrinked: true})
      }
    } else { // scroll up
      // if (scrollTop < 200) {
        this.setState({shrinked: false})
      // }
    }

    this.setState({lastOffset: scrollTop})
  }
  
  componentDidMount() {
    this.setState({route: Router.route})
    window.addEventListener('scroll', this.handlePageScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handlePageScroll)
  }

  handleClick(e) {
    e.preventDefault()

    switch (Router.route) {
      case '/thankyou':
        Router.pushRoute('/')
        break
      case '/calendar':
        Router.pushRoute('/#uslugi')
        break
      case '/checkout':
        this.props.orderActions.resetOptions()
        break
      default:
        break
    }

  }

  handleNav(e) {
    const hash = window.location.hash
    const pageHandle = document.querySelector('.p-page')

    this.setState({
      isMenuActive: false
    })
    pageHandle.classList.remove('-fixed')

    if (hash === '#uslugi' || e.target.getAttribute('href') === '/#uslugi') {
      //e.preventDefault()
      const packagesSection = document.querySelector('.o-section.-packages')
      const packagesOffset = packagesSection.offsetTop - 72
      window.scroll({ top: packagesOffset, left: 0, behavior: 'smooth' })
    }
  }

  handleMenunClosing() {
    const pageHandle = document.querySelector('.p-page')

    this.setState({
      isMenuActive: false
    })
    pageHandle.classList.remove('-fixed')
  }

  clickHamburgerHandle(e) {
    const pageHandle = document.querySelector('.p-page')

    this.setState({
      isMenuActive: !this.state.isMenuActive
    })

    if (this.state.isMenuActive) {
      pageHandle.classList.remove('-fixed')
    } else {
      pageHandle.classList.add('-fixed')
    }
  }


  render() {
    const {
      back,
      menu,
      locationCalculated,
      serviceLoaded,
      emptyMessage,
      ...rest
    } = this.props

    const serviceView = this.state.route === '/service'
    const formVisible = (locationCalculated || (serviceLoaded && serviceView)) && this.state.route !== '/checkout' && this.state.route !== '/thankyou' && this.state.route !== '/failure'
    const formDisabled = this.state.route === '/calendar'

    // if (type === "ordering") {
    //   return <header className="t-header">
    //         <section className="o-header -ordering">
    //           <Aligner>

    //             <Nav href="#"><span className="a-icon -back"></span></Nav>

    //             <Nav routeName="/" routeParams={{}}><img className="a-logo" src="/static/img/logos/logo_twoj_sklep.svg" alt="Logo twoj_sklep"/></Nav>

    //             <PostalBox disabled={true} />
    //           </Aligner>
    //         </section>
    //     </header>
    // }

    return <header className="t-header">
      <section className={`o-header ${this.state.shrinked ? '-shrink' : ''} ${!menu ? '-ordering' : ''}`}>
        <Aligner>

          {/* back btn */}
          {back &&
            // <Nav href="#"></Nav>}
            <Button type="button" design="clear" handleClick={this.handleClick}><span className="a-icon -back"></span></Button>
          }

          {/* logo */}
          <Nav routeName="/" routeParams={{}} className={formVisible ? '' : '-orderingCentered'}><img className="a-logo" src="/static/img/logos/logo_twoj_sklep.svg" alt="Logo twoj_sklep"/></Nav>

          {/* menu + hamburger */}
           <Nav routeName="/#uslugi" routeParams={{}} handleClick={this.handleNav} className='a-mobile-visible-only'>Usługi twoj_sklep</Nav>

          {menu &&
            <div className={`u-collapse ${this.state.isMenuActive && '-active'}`}>
              <nav className="m-menu">
                <Nav routeName="/" routeParams={{}} handleClick={this.handleMenunClosing}>Strona główna</Nav>
                <Nav routeName="/#uslugi" routeParams={{}} handleClick={this.handleNav}>Usługi twoj_sklep</Nav>
              </nav>
            </div>}

          {/* postal code formular */}
          {formVisible &&
            <PostalBox inHeader={true} disabled={formDisabled} placed=" -header"/>}

        </Aligner>
      </section>
    </header>
  }
}

Header.propTypes = {
  back: PropTypes.bool,
  menu: PropTypes.bool,
  form: PropTypes.bool
}

Header.defaultProps = {
  back: false,
  menu: true,
  form: false
}

const mapStateToProps = state => {
  let isServiceLoaded = false
  
  if (Object.keys(state.services.fullService).length) {
    isServiceLoaded = true
  }

  return {
    locationCalculated:  state.services.locationName !== 'bd',
    serviceLoaded: isServiceLoaded
  }
}

const mapDispatchToProps = dispatch => ({ 
  orderActions: bindActionCreators(orderActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)