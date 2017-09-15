import React from 'react';
import PropTypes from 'prop-types'
import ReactAvatarEditor from 'react-avatar-editor'
import { WhiteSpace, Slider, Icon } from 'antd-mobile'
import _ from 'lodash'
import { delay } from '../../services/tools-fun'
import styles from './AvatarEditor.css';

class AvatarEditor extends React.Component {
  state = {
    file: null,
    scale: 1.2,
    rotate: 0
  }
  readFile = async file => {
    this.reader.readAsDataURL(file)
    return new Promise((resolve, reject) => {
      this.reader.onload = () => {
        resolve('ok')
      }
      this.reader.onerror = () => {
        reject(new Error('read fail'))
      }
    })
  }
  handleFileChange = async e => {
    const { files: [file] } = e.target
    await this.readFile(file)
    this.setState({ file })
    // await delay(500)
  }
  handleSliderChange = v => {
    this.setState({ scale: (v / 10).toFixed(1)})
  }
  handleRotateClick = (d) => {
    let { rotate } = this.state
    rotate += (d ? -90 : 90)
    if (rotate < 0) {
      this.setState({ rotate: rotate + 360 })
    } else {
      this.setState({ rotate: rotate % 360 })
    }
  }
  handleOkClick = () => {
    if (this.editor) {
      console.log(+new Date());
      const canvas = this.editor.getImage()
      canvas.toDataURL()
      console.log(+new Date());
    }
  }
  reader = new FileReader()
  editor = null
  render() {
    const { onHide } = this.props
    const { file, scale, rotate } = this.state
    return (
      <div className={styles.editor_wrapper}>
        <div className={styles.editor_box}>
          <WhiteSpace />
          <p className={styles.choose_file}>
            <a className={styles.btn} href="javascript:;">
              选择照片
              <input type="file" onChange={this.handleFileChange} accept="image/*"/>
            </a>
          </p>
          <WhiteSpace />
          <ReactAvatarEditor
            image={file}
            width={500}
            height={500}
            border={50}
            borderRadius={250}
            color={[255, 255, 255, 0.8]} // RGBA
            scale={scale}
            rotate={rotate}
            ref={editor => { this.editor = editor }}
          />
          <WhiteSpace />
          <div className={styles.fn_bar}>
            <Slider
              defaultValue={scale * 10} min={10} max={40}
              onAfterChange={this.handleSliderChange}
            />
            <WhiteSpace />
            <p className={styles.rotate_btns}>
              <a
                href="javascript:;" className={styles.rotate}
                onClick={() => { this.handleRotateClick(1) }}
              >
                <Icon size="md" type={require('../../svg-files/ic_rotate_left_black_24px.svg')} />
              </a>
              <a
                href="javascript:;" className={styles.rotate}
                onClick={() => { this.handleRotateClick(0) }}
              >
                <Icon size="md" type={require('../../svg-files/ic_rotate_right_black_24px.svg')} />
              </a>
            </p>
            <p className={styles.op_btns}>
              <a href="javascript:;" onClick={onHide} className={styles.cancel}>取消</a>
              <a href="javascript:;" onClick={this.handleOkClick} className={styles.ok}>确认上传</a>
            </p>
            <WhiteSpace />
          </div>
        </div>
      </div>
    );
  }
}

AvatarEditor.propTypes = {
  onHide: PropTypes.func.isRequired
}

export default AvatarEditor;
