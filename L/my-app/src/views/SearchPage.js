import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import styles from './SearchPage.module.scss'
import { formatSearch } from '@/utils'
import {
  fetchAnimeFromDmhy,
  filterDmhy,
  setDmhyMode,
  setDmnySort
} from '@/actions/bgm-actions'
import AnimeList from '@/components/Bangumi/AnimeList'
import SimplifyPager from '@/components/SimplifyPager'
import PartLoading from '@/components/PartLoading'
import SearchBarCt from '@/containers/SearchBarCt'
import { TYPE_MAP, PAGE_SIZE, SORTS, DMHY_MODE } from '@/utils/constant'

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
    this.props.mode === DMHY_MODE.SEARCH
      ? this.handleSearch({ page })
      : this.handleFilter({ page })
  }

  fetch = params => {
    this.params = { ...this.params, ...params }
    this.params.type = TYPE_MAP[this.params.type] || ''
    this.props.fetchAnimeFromDmhy(this.params)
  }

  handleSearch = params => {
    this.props.setDmhyMode(DMHY_MODE.SEARCH)
    this.fetch(params)
  }

  handleFilter = filter => {
    this.props.setDmhyMode(DMHY_MODE.FILTER)
    this.params = { ...this.params, ...filter }
    this.props.filterDmhy(this.params)
  }

  handleReset = filter => {}

  handleSortChange = sort => {
    this.props.setDmnySort(sort)
  }

  render() {
    const {
      hasNext,
      page,
      total,
      loading,
      currentData,
      current,
      totalPages,
      subOptions,
      mode,
      sort
    } = this.props
    return (
      <div className="main-box" styleName="anime">
        <div styleName="header">
          <SearchBarCt
            subOptions={subOptions}
            onQuery={this.handleSearch}
            onFilter={this.handleFilter}
            onReset={this.handleReset}
            initName={this.query.name}
            mode={mode}
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
          <AnimeList
            data={currentData}
            sort={sort}
            onSortClick={this.handleSortChange}
          />
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

const getCurrentData = (ids, page, data) =>
  ids.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page).map(v => data[v])

const mapStateToProps = state => {
  const mode = state.dmhyMode
  const { subOptions, data } = state.dmhy
  const sort = state.dmhySort
  const tem = { subOptions, mode, sort }
  if (mode === DMHY_MODE.SEARCH) {
    const { page, hasNext, totalPages, ids } = state.dmhy
    const loading = state.loading['loading@ANIME_FROM_DMHY']
    const currentData = getCurrentData(ids, page, data)
    return {
      page,
      hasNext,
      total: ids.length,
      current: currentData.length,
      currentData,
      totalPages,
      loading: loading === undefined ? true : loading,
      totalData: ids,
      ...tem
    }
  }
  const ids = state.filteredDmhy
  const { page } = state.dmhyFilter
  const currentData = getCurrentData(ids, page, data)
  return {
    page,
    hasNext: false,
    total: ids.length,
    current: currentData.length,
    currentData,
    totalPages: Math.ceil(ids.length / PAGE_SIZE),
    loading: false,
    totalData: ids,
    ...tem
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAnimeFromDmhy: ({ page, name, type }) =>
    dispatch(fetchAnimeFromDmhy({ name, type, page })),
  setDmhyMode: payload => dispatch(setDmhyMode(payload)),
  filterDmhy: payload => dispatch(filterDmhy(payload)),
  setDmnySort: payload => dispatch(setDmnySort(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(cssModules(SearchPage, styles))
