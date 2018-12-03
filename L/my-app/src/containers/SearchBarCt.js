import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SearchBar from '@/components/SearchBar'

/**
 * 筛选 & 搜索
 * 重点是搜索，
 *
 *
 * @export
 * @class SearchBarCt
 * @extends {Component}
 */
export class SearchBarCt extends Component {
  static propTypes = {
    subOptions: PropTypes.array.isRequired,
    onQuery: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    onReset: PropTypes.func,
    initName: PropTypes.string.isRequired,
    mode: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      type: '-',
      subtitle: '-',
      name: props.initName
    }
  }

  typeOptions = ['季度全集', '動畫', 'RAW']

  get formatedState() {
    const { type, subtitle, name } = this.state
    return {
      name,
      type: type === '-' ? '' : type,
      subtitle: subtitle === '-' ? '' : subtitle
    }
  }

  handleQuery = () => {
    this.props.onQuery(this.formatedState)
  }
  handleFilter = () => {
    this.props.onFilter(this.formatedState)
  }
  handleChange = (type, v) => {
    if (type === 'name') {
      this.setState({ name: v })
    } else {
      this.setState({ [type]: v || '-' })
    }
  }
  handleReset = () => {
    this.setState({ type: '-', subtitle: '-', name: '' })
  }

  render() {
    return (
      <SearchBar
        subOptions={this.props.subOptions}
        typeOptions={this.typeOptions}
        onChange={this.handleChange}
        onQuery={this.handleQuery}
        onFilter={this.handleFilter}
        model={this.state}
        onReset={this.handleReset}
        mode={this.props.mode}
      />
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBarCt)
