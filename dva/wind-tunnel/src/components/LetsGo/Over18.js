import React from 'react'
import PropTypes from 'prop-types'
import styles from './Over18.less'

function Over18({onYes}) {

  return (
    <div className={styles.over18}>
      <img style={{width: '70%'}} src={require('../../assets/over-18-words.png')} alt=""/>
      <div className={styles.btn_group}>
        <a href="javascript:;" onClick={onYes}>
          <img src={require('../../assets/over-18-yes.png')} alt=""/>
        </a>
        <a href="javascript:;">
          <img src={require('../../assets/over-18-no.png')} alt=""/>
        </a>
      </div>
      <span className={styles.vertical_p}>理性饮酒&npsp;&nbsp;Enjoy Responsibly</span>
    </div>
  )
}

Over18.propTypes = {
  onYes: PropTypes.func.isRequired
}

export default Over18
