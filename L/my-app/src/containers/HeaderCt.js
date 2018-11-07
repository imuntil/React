import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withContext from '@/HOC/withContext'
import Header from '@/components/Header'

class HeaderCt extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  handleSearch = query => {
    console.log(query)
  }

  render() {
    return <Header user={this.props.user} onSearch={this.handleSearch} />
  }
}

export default withContext(HeaderCt)
