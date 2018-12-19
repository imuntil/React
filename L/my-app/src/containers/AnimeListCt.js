import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AnimeList from '@/components/Bangumi/AnimeList'
import { PAGE_SIZE } from '@/utils/constant'
import { setDmhySort } from '@/actions/bgm-actions'
import withCopy from '@/HOC/withCopy'

export class AnimeListCt extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  state = {
    isChoosing: false,
    list: []
  }
  list = new Set()
  magnets = {}
  setMode = () => {
    this.setState(
      state => ({ isChoosing: !state.isChoosing }),
      () => {
        !this.state.isChoosing && this.clearChosen()
      }
    )
  }

  handleSortChange = sort => {
    this.props.setDmhySort({ sort })
  }

  handleToggleChoose = (id, index, magnet) => {
    this.list.has(id) ? this.list.delete(id) : this.list.add(id)
    this.setState({
      list: [...this.list]
    })
    this.magnets[id] = magnet
  }

  clearChosen(closeChoosing = false) {
    this.list.clear()
    closeChoosing
      ? this.setState({ isChoosing: false, list: [] })
      : this.setState({
          list: []
        })
  }

  handleConfirm = () => {
    // this.props.execCopy('niaxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxhao')
    const str = this.state.list.map(v => this.magnets[v]).join('\n')
    console.log(str)
    this.props.execCopy(str)
    this.clearChosen(true)
  }

  render() {
    const { sort, data } = this.props
    return (
      <AnimeList
        data={data}
        sort={sort}
        isChoosing={this.state.isChoosing}
        setMode={this.setMode}
        onSortClick={this.handleSortChange}
        toggleChoose={this.handleToggleChoose}
        chosenList={this.state.list}
        onConfirm={this.handleConfirm}
        onCancel={() => this.clearChosen(true)}
      />
    )
  }
}

const mapStateToProps = state => {
  const { sort } = state.dmhy
  return { sort }
}

const mapDispatchToProps = dispatch => ({
  setDmhySort: payload => dispatch(setDmhySort(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCopy(AnimeListCt))
