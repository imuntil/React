import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
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
  state = {
    chosen: null,
    result: {},
    checks: {},
    ids: {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { origin, target } = nextProps
    const { ids: prevIds } = prevState
    if (Object.keys(prevIds).length) {
      return null
    }
    const ids = { ...getIds(origin), ...getIds(target) }
    return {
      ids,
      checks: { id: ['TARGET', 'ORIGIN'] },
      result: { ids }
    }
  }

  handleChosen = is => {
    this.setState({ chosen: is })
  }
  onOk = () => {
    this.props.handleOk(this.props[this.state.chosen.toLowerCase()])
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
    const { visible, handleCancel, origin, target } = this.props
    const { chosen, result, checks } = this.state
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
            active={chosen === 'TARGET'}
            onChange={this.handleChange}
            checks={checks}
          />
          <AnimeSimCard
            data={origin}
            is={'ORIGIN'}
            onChoose={this.handleChosen}
            active={chosen === 'ORIGIN'}
            onChange={this.handleChange}
            checks={checks}
          />
        </div>
      </Modal>
    )
  }
}

ConfirmModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
  origin: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired
}

export default cssModules(ConfirmModal, styles)
