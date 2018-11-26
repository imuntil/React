import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import { connect } from 'react-redux'
import BgmIndexCard from '@/components/Bangumi/BgmIndexCard'
import BgmYearline from '@/components/Bangumi/BgmYearline'
import PartLoading from '@/components/PartLoading'
import { fetchYears, fetchBgmByYear } from '@/actions/bgm-actions'
import styles from './BangumiIndex.module.scss'
import { Pagination } from 'antd'
import chunk from 'lodash.chunk'

class BangumiIndex extends Component {
  static propTypes = {
    years: PropTypes.arrayOf(PropTypes.string)
  }

  state = {
    page: 1
  }

  componentDidMount = () => {
    this.props.fetchYears()
    this.props.fetchBgmByYear()
  }

  handleClick = year => {
    this.props.fetchBgmByYear(year)
    this.setState({ page: 1 })
  }

  onPageChange = v => {
    this.setState({
      page: v
    })
  }

  handleSearch = (name, type) => {
    if (type === 'H') {
      this.props.history.push(`/search?name=${name}`)
    }
  }

  get pageData() {
    return chunk(this.props.anime, 25)
  }

  get currentAnime() {
    return (
      (this.pageData.length && this.pageData[this.state.page - 1]) || []
    )
  }

  render() {
    const { currentYear, anime, years, loading = false } = this.props
    return (
      <div className="main-box">
        <div styleName="note">共{anime.length}部番剧</div>
        <div styleName="main">
          <PartLoading loading={loading}>
            <div styleName="view-box">
              {this.currentAnime.map(v => (
                <BgmIndexCard onClick={this.handleSearch} key={v._id} {...v} />
              ))}
            </div>
            <div className="pager">
              <Pagination
                defaultPageSize={25}
                total={anime.length}
                current={this.state.page}
                onChange={this.onPageChange}
              />
            </div>
          </PartLoading>
          <div styleName="right-box">
            <BgmYearline
              handleClick={this.handleClick}
              years={years}
              currentYear={currentYear}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {
    years,
    bgm: { anime, currentYear },
    loading
  } = state
  return {
    years,
    currentYear,
    anime: anime[currentYear] || [],
    loading: loading['loading@BGMS']
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchYears: () => dispatch(fetchYears()),
    fetchBgmByYear: year => dispatch(fetchBgmByYear(year))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(cssModules(BangumiIndex, styles))
