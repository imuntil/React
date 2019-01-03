import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, message } from 'antd'
import AnimeSimCard from './AnimeSimCard'
import styles from './ConfirmModal.module.scss'
import cssModules from 'react-css-modules'
// import { wdyu } from '../utils'
// wdyu(React)
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
      result: { ids, id: target.id, _stems: target._stems }
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
    const { id, ids, _stems, ...rest } = data
    this.setState(({ result, checks }) => {
      const { ids: prevIds, ...restResult } = result
      return {
        result: {
          ...restResult,
          ...rest,
          ids: ids ? { ...prevIds, ...ids } : { ...prevIds, [rest.from]: id }
        },
        checks: Object.keys(rest).reduce(
          (prev, key) => ({ ...prev, [key]: is }),
          checks
        )
      }
    })
  }

  onOk = () => {
    const { ids, from, cover, name } = this.state.result
    if (!ids || !from || !cover || !name) {
      message.warning('ids, 来源, 封面, 番剧名必选')
      return
    }
    this.props.handleOk(this.state.result)
  }

  handleChange = (checked, key, value, obj, from) => {
    console.log(checked, key, value, obj, from)
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
    console.log('render')
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
