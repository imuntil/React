import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import AnimeSimCard from './AnimeSimCard'

const PreviewModal = memo(function PreviewModal(props) {
  return (
    <Modal
      title="详情"
      visible={props.visible}
      footer={null}
      onCancel={props.hidePreview}
    >
      <div className="f__center" style={{ paddingBottom: '2rem' }}>
        <AnimeSimCard data={props.data} />
      </div>
    </Modal>
  )
})

PreviewModal.propTypes = {
  visible: PropTypes.bool,
  data: PropTypes.object,
  hidePreview: PropTypes.func
}

export default PreviewModal
