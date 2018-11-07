import React from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import styles from './Header.module.scss'
import Avatar from '@/components/Avatar'
import SearchInput from '@/containers/SearchInput'
import { NavLink } from 'react-router-dom'

function Header({ user, onSearch }) {
  return (
    <div styleName="header-section">
      <div styleName="blur-bg" />
      <div styleName="mask">
        <div styleName="center-box">
          <ul styleName="nav">
            <li>
              <NavLink exact to="/" activeClassName={styles.active}>
                番剧
              </NavLink>
            </li>
            <li>
              <NavLink to="/li" activeClassName={styles.active}>
                里世界
              </NavLink>
            </li>
            <li>
              <NavLink to="/p" activeClassName={styles.active}>
                P站(仮)
              </NavLink>
            </li>
            <li>
              <NavLink to="/other" activeClassName={styles.active}>
                其他
              </NavLink>
            </li>
            <li>
              <NavLink to="/sys" activeClassName={styles.active}>
                System
              </NavLink>
            </li>
          </ul>
          <div className="user">
            <Avatar />
          </div>
        </div>
      </div>
      <div styleName="search-box">
        <SearchInput onSearch={onSearch} />
      </div>
    </div>
  )
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired
}

export default cssModules(Header, styles)
