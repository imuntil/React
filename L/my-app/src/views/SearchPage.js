import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import styles from './SearchPage.module.scss'
import { formatSearch } from '@/utils'
import { fetchAnimeFromDmhy, setDmhySort } from '@/actions/bgm-actions'
import AnimeListCt from '@/containers/AnimeListCt'
import SimplifyPager from '@/components/SimplifyPager'
import PartLoading from '@/components/PartLoading'
import SearchBarCt from '@/containers/SearchBarCt'
import { TYPE_MAP, PAGE_SIZE, SORTS } from '@/utils/constant'

export class SearchPage extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  get query() {
    return {
      ...formatSearch(this.props.location.search),
      page: 1,
      type: ''
    }
  }

  params = this.query

  componentDidMount = () => {
    this.fetch()
  }

  handlePageChange = page => {
    this.handleSearch({ page })
  }

  fetch = params => {
    this.params = { ...this.params, ...params }
    this.params.type = TYPE_MAP[this.params.type] || ''
    this.props.fetchAnimeFromDmhy(this.params)
  }

  handleSearch = params => {
    this.fetch(params)
  }

  render() {
    const {
      hasNext,
      page,
      total,
      loading,
      current,
      totalPages,
      currentData
    } = this.props
    return (
      <div className="main-box" styleName="anime">
        <div styleName="header">
          <SearchBarCt
            onQuery={this.handleSearch}
            onReset={this.handleReset}
            initName={this.query.name}
          />
        </div>
        <PartLoading loading={loading}>
          <SimplifyPager
            page={+page}
            hasNext={hasNext}
            totalPages={totalPages}
            currentCount={current}
            onChange={this.handlePageChange}
            totalCount={total}
          />
          <AnimeListCt data={currentData} />
          <SimplifyPager
            page={+page}
            hasNext={hasNext}
            totalPages={totalPages}
            currentCount={current}
            onChange={this.handlePageChange}
            totalCount={total}
            position="bottom"
          />
        </PartLoading>
      </div>
    )
  }
}

const getCurrentData = (page, data) =>
  data.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page)

const mapStateToProps = state => {
  const { page, hasNext, totalPages, data } = state.dmhy
  const loading = state.loading['loading@ANIME_FROM_DMHY']
  const currentData = getCurrentData(page, data)
  return {
    page,
    hasNext,
    total: data.length,
    current: currentData.length,
    currentData,
    totalPages,
    loading: loading === undefined ? true : loading
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAnimeFromDmhy: ({ page, name, type }) =>
    dispatch(fetchAnimeFromDmhy({ name, type, page })),
  setDmhySort: payload => dispatch(setDmhySort(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(cssModules(SearchPage, styles))
