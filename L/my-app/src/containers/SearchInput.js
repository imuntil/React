import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'
import styles from './SearchInput.module.scss'

class SearchInput extends PureComponent {
  static porpTypes = {
    onSearch: PropTypes.func.isRequired
  }
  state = {
    query: ''
  }

  handleKeyUp = (e) => {
    if (e.keyCode !== 13) return
    this.props.onSearch(this.state.query)
  }

  render() {
    return (
      <div styleName="search-input">
        <input
          type="search"
          placeholder="搜点什么"
          value={this.state.query}
          onChange={e => this.setState({ query: e.target.value.trim() })}
          onKeyUp={this.handleKeyUp}
        />
        <i
          className="iconfont icon-icon_search_"
          onClick={e => this.props.onSearch(this.state.query)}
          styleName="search-icon"
        />
      </div>
    )
  }
}

export default cssModules(SearchInput, styles)
