import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

const ConfirmModal = memo(function ConfirmModal(props) {
  const { visible, handleOk, handleCancel, origin, target } = props
  return (
    <Modal
      title="Basic Modal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
})

ConfirmModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
  origin: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
}

export default ConfirmModal
