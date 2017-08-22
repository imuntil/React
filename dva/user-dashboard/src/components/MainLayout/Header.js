import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
const Item = Menu.Item

const Header = ({location}) => {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
      <Item key="/users">
        <Link to="/users"><Icon type="bars" /></Link>
      </Item>
      <Item key="/">
        <Link to="/"><Icon type="home" /></Link>
      </Item>
      <Item key="/404">
        <Link to="/not-found"><Icon type="frown-circle" /></Link>
      </Item>
      <Item key="/antd">
        <a href="https://github.com/dvajs/dva" target="_blank">dva</a>
      </Item>
    </Menu>
  )
}
export default Header
