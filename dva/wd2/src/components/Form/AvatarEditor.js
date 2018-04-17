import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactAvatarEditor from 'react-avatar-editor'
import { Slider, WhiteSpace, Toast } from 'antd-mobile'
import './AvatarEditor.scss'

export default class AvatarEditor extends PureComponent {
  static defaultProps = {
    onCancel: () => {},
    onComplete: () => {}
  }

  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired
  }

  editor = null
  reader = new FileReader()

  state = {
    file: null,
    scale: 1.2,
    rotate: 0,
    temp: ''
  }

  componentDidMount = () => {
    this.editor.canvas.addEventListener('touchmove', this.stopTouch, false)
  }

  componentWillUnmount = () => {
    this.editor.canvas.removeEventListener('touchmove', this.stopTouch, false)
  }

  stopTouch = e => {
    e.preventDefault()
  }

  handleFileChange = async e => {
    Toast.loading('', 100)
    const {
      files: [file]
    } = e.target
    try {
      await this.readFile(file)
      this.setState({ file })
      Toast.hide()
    } catch (e) {
      Toast.info(e.msg)
    }
  }

  readFile = async file => {
    this.reader.readAsDataURL(file)
    return new Promise((resolve, reject) => {
      this.reader.onload = () => {
        resolve(true)
      }
      this.reader.onerror = () => {
        reject(new Error('读取照片失败'))
      }
    })
  }

  handleRotate = direction => {
    let { rotate } = this.state
    rotate += direction ? -90 : 90
    this.setState({ rotate: rotate < 0 ? rotate + 360 : rotate % 360 })
  }

  handleConfirmClick = () => {
    if (!this.editor) return
    const canvas = this.editor.getImageScaledToCanvas()
    const temp = this.state.file ? canvas.toDataURL('image/jpeg', 0.8) : ''
    const { onComplete, onCancel } = this.props
    onComplete(temp)
    onCancel()
  }

  render() {
    const { file, scale, rotate } = this.state
    const { onCancel } = this.props
    return (
      <div className="editor-wrapper-20fhd">
        <div className="content-20fhd">
          <WhiteSpace />
          <p className="choose-file-20fhd">
            <a href="javascript:;" className="btn-20fhd">
              选择照片
              <input
                type="file"
                onChange={this.handleFileChange}
                accept="image/*"
              />
            </a>
          </p>
          <WhiteSpace />
          <ReactAvatarEditor
            image={file}
            width={250}
            height={250}
            border={12}
            borderRadius={250}
            color={[255, 255, 255, 0.8]}
            scale={scale}
            rotate={rotate}
            ref={el => (this.editor = el)}
          />
          <div className="fn-bar-20fhd">
            <Slider
              defaultValue={scale * 10}
              min={10}
              max={40}
              onAfterChange={v => {
                this.setState({ scale: +(v / 10).toFixed(1) })
              }}
            />
            <WhiteSpace />
            <p className="rotate-btns-20fhd">
              <a href="javascript:;" onClick={() => this.handleRotate(true)}>
                <i className="iconfont">&#xe659;</i>
              </a>
              <a href="javascript:;" onClick={() => this.handleRotate(false)}>
                <i className="iconfont">&#xe658;</i>
              </a>
            </p>
            <WhiteSpace />
            <p className="bottom-btns-20fhd">
              <a href="javascript:;" className="cancel" onClick={onCancel}>
                取消
              </a>
              <a
                href="javascript:;"
                className="confirm"
                onClick={this.handleConfirmClick}
              >
                确认上传
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
