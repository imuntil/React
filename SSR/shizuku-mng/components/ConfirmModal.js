import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, message } from 'antd'
import AnimeSimCard from './AnimeSimCard'
import styles from './ConfirmModal.module.scss'
import cssModules from 'react-css-modules'
import omit from 'lodash.omit'
// import { wdyu } from '../utils'
// wdyu(React)

/**
 * model 的 from 属性表示来源，
 * 当 from 属性为字符串时，则表示该 model 为单一数据来源，也就意味着该 model 没有 ids 属性
 * 反之，当之为数组时，则表示该 model 为多数据来源，即 merge 之后的结果，同时该 model 具有 ids 属性
 */

const getIds = obj => {
  const { id, ids, from } = obj
  return ids ? ids : { [from]: id }
}

class ConfirmModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func,
    handleOk: PropTypes.func,
    origin: PropTypes.object.isRequired,
    target: PropTypes.object.isRequired
  }

  state = {
    result: {},
    checks: {},
    ids: {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { origin, target, visible } = nextProps
    const { ids: prevIds } = prevState
    if (Object.keys(prevIds).length || !visible) {
      return null
    }
    const ids = { ...getIds(origin), ...getIds(target) }
    return {
      ids,
      checks: { id: ['TARGET', 'ORIGIN'] },
      result: {
        ids,
        id: target.id,
        _stems: target._stems,
        from: Object.keys(ids)
      }
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (!nextProps.visible && !this.props.visible) return false
    return true
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.visible && !this.props.visible) {
      this.setState({
        result: {},
        checks: {},
        ids: {}
      })
    }
  }

  handleChosen = is => {
    const data = this.props[is.toLowerCase()]
    const rest = omit(data, ['ids', 'from', '_stems'])
    // 将除了 ids， _stems, from 之外的其他属性， merge 到 result 中,
    // id 按理说已经没有意义了，因为 merge 之后有 ids 属性了。此时保留 id 属性仅仅是作为 dnd 的 draggableId & key。
    this.setState(({ result, checks }) => {
      return {
        result: {
          ...result,
          ...rest
        },
        checks: Object.keys(rest).reduce(
          (prev, key) => ({ ...prev, [key]: is }),
          checks
        )
      }
    })
  }

  onOk = () => {
    const { ids, cover, name } = this.state.result
    if (!ids || !cover || !name) {
      message.warning('ids, 封面, 番剧名必选')
      return
    }
    this.props.handleOk(this.state.result)
  }

  handleChange = (checked, key, value, obj) => {
    console.log(checked, key, value, obj)
    const { result, checks } = this.state
    if (key !== 'id') {
      this.setState({
        result: { ...result, [key]: checked ? value : '' },
        checks: { ...checks, [key]: checked ? obj : '' }
      })
      return
    }
  }

  render() {
    const { visible, handleCancel, origin, target } = this.props
    const { result, checks } = this.state
    return (
      <Modal
        title="选择卡片"
        visible={visible}
        onOk={this.onOk}
        onCancel={handleCancel}
        width={1000}
      >
        <div styleName="body">
          <AnimeSimCard data={result} is={'RESULT'} />
          <AnimeSimCard
            data={target}
            is={'TARGET'}
            onChoose={this.handleChosen}
            onChange={this.handleChange}
            checks={checks}
          />
          <AnimeSimCard
            data={origin}
            is={'ORIGIN'}
            onChoose={this.handleChosen}
            onChange={this.handleChange}
            checks={checks}
          />
        </div>
      </Modal>
    )
  }
}

export default cssModules(ConfirmModal, styles)
