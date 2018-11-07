import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import styles from './LiPage.module.scss'
import { fetchLiPosts } from '@/actions/li-actions'

class LiPage extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  componentDidMount = () => {
    this.props.fetchLiPosts({ page: 1, size: 10 })
  }
  
  render() {
    return (
      <div>
        Li
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchLiPosts: pager => {
      dispatch(fetchLiPosts(pager))
    }
  }
}

export default connect(null, mapDispatchToProps)(cssModules(LiPage, styles))