import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import styles from './SearchPage.module.scss'
import { formatSearch } from '@/utils'
import { fetchAnimeFromDmhy } from '@/actions/bgm-actions'
import AnimeList from '@/components/Bangumi/AnimeList'
import SimplifyPager from '@/components/SimplifyPager'
import PartLoading from '@/components/PartLoading'
// import SearchBar from '@/components/SearchBar'

export class SearchPage extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  get query() {
    return formatSearch(this.props.location.search)
  }

  componentDidMount = () => {
    this.handleSearch({ page: 1 })
  }

  handlePageChange = page => {
    this.handleSearch({ page })
  }

  handleSearch = params => {
    params = { ...this.query, ...params }
    this.props.fetchAnimeFromDmhy(params)
  }

  render() {
    const { next, page, total, loading, data } = this.props
    return (
      <div className="main-box" styleName="anime">
        {/* <SearchBar
          typeOptions={['动画', '季度全集', 'RAW']}
          subOptions={['动漫国字幕组', '诸神Kamigami字幕组', '悠哈C9字幕社']}
        /> */}
        <PartLoading loading={loading}>
          <SimplifyPager
            page={+page}
            next={next}
            total={+total}
            onChange={this.handlePageChange}
            count={data.length}
          />
          <AnimeList data={data} />
          <SimplifyPager
            page={+page}
            next={next}
            total={+total}
            onChange={this.handlePageChange}
            count={data.length}
            position="bottom"
          />
        </PartLoading>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { page, next, chunk } = state.dmhy
  const loading = state.loading['loading@ANIME_FROM_DMHY']
  return {
    page,
    next,
    total: chunk.length,
    data: chunk[page - 1] || [],
    loading: loading === undefined ? true : loading
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
