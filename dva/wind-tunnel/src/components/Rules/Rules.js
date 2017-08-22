import React from 'react'
import styles from './Rules.less'

function Rules() {
  return (
    <a className={styles.rule_btn} href="javascript:;">
      <img src={require('../../assets/activity-rule.png')} alt=""/>
    </a>
  )
}
export default Rules
