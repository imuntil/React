import React from 'react'
import { NavLink } from 'dva/router'
// import PropTypes from 'prop-types'
import './NavBar.scss'

const NavBar = () => {
  return (
    <nav className="nav-bar-oql19">
      <NavLink to="/" activeClassName="active-link">
        <img src={require('../assets/nav/nav-1.jpg')} alt="" />
        <img className="active" src={require('../assets/nav/nav-1-a.jpg')} alt="" />
      </NavLink>
      <NavLink to="/" activeClassName="active-link">
        <img src={require('../assets/nav/nav-2.jpg')} alt="" />
        <img className="active" src={require('../assets/nav/nav-2-a.jpg')} alt="" />
      </NavLink>
      <NavLink to="/" activeClassName="active-link">
        <img src={require('../assets/nav/nav-3.jpg')} alt="" />
        <img className="active" src={require('../assets/nav/nav-3-a.jpg')} alt="" />
      </NavLink>
      <NavLink to="/" activeClassName="active-link">
        <img src={require('../assets/nav/nav-4.jpg')} alt="" />
        <img className="active" src={require('../assets/nav/nav-4-a.jpg')} alt="" />
      </NavLink>
      <NavLink to="/" activeClassName="active-link">
        <img src={require('../assets/nav/nav-5.jpg')} alt="" />
        <img className="active" src={require('../assets/nav/nav-5-a.jpg')} alt="" />
      </NavLink>
    </nav>
  )
}

NavBar.propTypes = {}

export default NavBar
