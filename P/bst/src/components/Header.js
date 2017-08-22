import React from 'react'
import { Navbar, NavItem, Nav } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import './Header.less'
import createHistory from 'history/createHashHistory'
const history = createHistory()

class Header extends React.Component {
  handleSelect (eventKey, event) {
    history.push(eventKey)
  }
  render () {
    return (
      <Navbar collapseOnSelect onSelect={this.handleSelect.bind(this)}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="javascript:;">React</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={'/'}>Home</NavItem>
            <NavItem eventKey={'/about'}>About</NavItem>
            <NavItem eventKey={'/products'}>Products</NavItem>
            <NavItem eventKey={'/contact'}>Contact</NavItem>
            <NavItem eventKey={'/news'}>News</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Header