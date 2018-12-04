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
    onQuery: PropTypes.func.isRequired,
    onReset: PropTypes.func,
    initName: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      type: '-',
      name: props.initName
    }
  }

  typeOptions = ['季度全集', '動畫', 'RAW']

  get formatedState() {
    const { type, name } = this.state
    return {
      name,
      type: type === '-' ? '' : type
    }
  }

  handleQuery = () => {
    this.props.onQuery(this.formatedState)
  }
  handleChange = (type, v) => {
    if (type === 'name') {
      this.setState({ name: v })
    } else {
      this.setState({ [type]: v || '-' })
    }
  }
  handleReset = () => {
    this.setState({ type: '-', name: '' })
  }

  render() {
    return (
      <SearchBar
        typeOptions={this.typeOptions}
        onChange={this.handleChange}
        onQuery={this.handleQuery}
        model={this.state}
        onReset={this.handleReset}
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
