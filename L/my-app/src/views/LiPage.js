import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import QueueAnim from 'rc-queue-anim'
import cssModules from 'react-css-modules'
import { Pagination } from 'antd'
import styles from './LiPage.module.scss'
import { fetchLis } from '@/actions/li-actions'
import LiCard from '@/components/LiCard'

class LiPage extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    pager: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  componentDidMount = () => {
    this.props.fetchLis()
  }

  handleCopy = magnet => {
    const copy = `magnet:?xt=urn:btih:${magnet.replace(/(熟|生)肉?/g, '')}`
    if (window.clipboardData) {
      window.clipboardData.setData('Text', copy)
      return
    }
    this.input.current.value = copy
    this.input.current.select()
    document.execCommand('copy')
  }

  onPageChange = page => {
    this.props.fetchLis({ page })
  }

  render() {
    const { total, size } = this.props.pager
    return (
      <div className="main-box">
        <input type="text" ref={this.input} styleName="hidden-input" />
        <QueueAnim delay={200} ease="easeOutBack" type="bottom">
          <div styleName="container" key="1">
            {this.props.list.map(v => (
              <LiCard li={v} key={v._id} onCopy={this.handleCopy} />
            ))}
          </div>
        </QueueAnim>
        <div className="pager">
          <Pagination
            showQuickJumper
            defaultPageSize={size}
            total={total}
            onChange={this.onPageChange}
          />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchLis: pager => {
      dispatch(fetchLis(pager))
    }
  }
}
const mapStateToProps = state => {
  const { list, pager } = state.li
  return { list, pager }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(cssModules(LiPage, styles))
