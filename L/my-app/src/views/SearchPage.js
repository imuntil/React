import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import styles from './SearchPage.module.scss'
import { formatSearch } from '@/utils'
import { fetchAnimeFromDmhy } from '@/actions/bgm-actions'

export class SearchPage extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  get query() {
    return formatSearch(this.props.location.search)
  }

  componentDidMount = () => {
    this.props.fetchAnimeFromDmhy(this.query)
  }

  render() {
    return <div className="mian-box">search-page</div>
  }
}

const mapStateToProps = state => {
  const { page, next, total, chunk } = state.dmhy
  return {
    page,
    next,
    total,
    data: chunk[page - 1] || []
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAnimeFromDmhy: ({ page, name, type }) =>
    dispatch(fetchAnimeFromDmhy({ name, type, page }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(cssModules(SearchPage, styles))
