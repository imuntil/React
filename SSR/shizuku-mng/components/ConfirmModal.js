import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import AnimeSimCard from './AnimeSimCard'
import styles from './ConfirmModal.module.scss'
import cssModules from 'react-css-modules'
// import { wdyu } from '../utils'
// wdyu(React)

class ConfirmModal extends Component {
  state = {
    chosen: null
  }
  handleChosen = is => {
    this.setState({ chosen: is })
  }
  onOk = () => {
    this.props.handleOk(this.props[this.state.chosen.toLowerCase()])
  }
  render() {
    const { visible, handleCancel, origin, target } = this.props
    const { chosen } = this.state
    return (
      <Modal
        title="选择卡片"
        visible={visible}
        onOk={this.onOk}
        onCancel={handleCancel}
        width={600}
      >
        <div styleName="body">
          <div>
            <AnimeSimCard
              data={target}
              is={'TARGET'}
              onChoose={this.handleChosen}
              active={chosen === 'TARGET'}
            />
          </div>
          <div styleName="divider" />
          <div>
            <AnimeSimCard
              data={origin}
              is={'ORIGIN'}
              onChoose={this.handleChosen}
              active={chosen === 'ORIGIN'}
            />
          </div>
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
