import React from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import { lvMap } from '@/utils'
import styles from './Avatar.module.scss'
import withContext from '@/HOC/withContext'

function Avatar({ user }) {
  return (
    <div styleName="avatar-mod">
      <a styleName="avatar" href="javascript:;">
        <img src={require('../assets/sos.jpg')} alt="avatar" />
      </a>
      <div styleName="profile-m">
        <p styleName="nick">脑残是个褒义词</p>
        <p styleName="lv">
          <i className={`iconfont icon-lv6`}></i>
          <span styleName="title">{lvMap[user.info.auth || 6].title}</span>
        </p>
      </div>
    </div>
  )
}

Avatar.propTypes = {
  user: PropTypes.object.isRequired
}

export default withContext(cssModules(Avatar, styles), 'user')
