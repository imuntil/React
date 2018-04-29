import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Toast } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import AvatarEditor from '@/components/Form/AvatarEditor'
import { domain, modifyAvatar } from '@/services'
import { avatars } from '@/services/config'
import { delay } from '@/utils/cts'
import './ModifyPage.scss'

const Avatar = ({ src, active, onAvatarClick }) => (
  <div className="box" onClick={onAvatarClick}>
    <a href="javascript:;" className="avatar-48uax">
      <img src={src} alt="" width="100%" />
    </a>
    {active ? (
      <img
        className="chosen"
        src={require('@/assets/avatar/avatar-chosen.png')}
        alt=""
      />
    ) : null}
  </div>
)

const mapStateToProps = state => {
  const user = state.user
  return { user }
}

@connect(mapStateToProps)
export default class ModifyPwdPage extends PureComponent {
  state = {
    active: 0,
    avatars,
    editorVisible: false
  }

  constructor(props) {
    super(props)
    const { avatar, ran } = this.props.user
    if (!avatar) {
      this.state.active = -1
    } else if (`${avatar}`.indexOf('.png') !== -1) {
      this.state.active = 10
      this.state.avatars = [
        ...avatars,
        { name: 10, src: `${domain}upload/${avatar}?${ran}` }
      ]
    } else {
      this.state.active = +avatar
    }
  }

  handleAvatarClick = index => {
    this.setState({ active: index + 1 })
  }

  handleSave = async () => {
    const {
      dispatch,
      user: { phone, avatar, userID },
      history
    } = this.props
    const { active, avatars } = this.state
    const { name, src } = avatars[active - 1]
    const form = { phone }
    let needUpdate = true
    // 默认头像
    if (active <= 9) {
      form.imgfile = name
      if (+name === +avatar) {
        needUpdate = false
      }
    } else if (src.indexOf('base64') === -1) {
      // 旧自定义头像
      needUpdate = false
    } else {
      // 新头像
      form.imgfile = src.replace('data:image/jpeg;base64,', '')
    }
    if (needUpdate) {
      const { data, fail } = await modifyAvatar(form)
      if (!data) {
        Toast.info((fail && fail.msg) || '出错了，请稍后再试', 1.5)
        return
      }
      dispatch({
        type: 'user/setUser',
        payload: {
          avatar: active <= 9 ? name : userID + '.png',
          ran: Math.random()
        }
      })
    }
    Toast.success('更新成功', 1.5)
    await delay(1000)
    history.replace('/user')
  }

  handleEditComplete = base64 => {
    if (!base64) return
    const { avatars } = this.state
    const len = avatars.length
    let avatars_ = [...avatars]
    let active_ = 0
    if (len <= 10) {
      active_ = len + 1
      avatars_ = [...avatars, { name: active_, src: base64 }]
    } else {
      avatars_[10] = { name: len, src: base64 }
      active_ = len
    }
    this.setState({ avatars: avatars_, active: active_ })
  }

  render() {
    const { active, avatars, editorVisible } = this.state
    return (
      <div className="container modify-avatar-48uax">
        <div className="content-48uax">
          {avatars.map((v, index) => [
            <Avatar
              onAvatarClick={() => this.handleAvatarClick(index)}
              active={index + 1 === active}
              key={index}
              src={v.src}
            />,
            index % 4 === 3 ? (
              <p key={`line-${index}`} className="line" />
            ) : null
          ])}
          <Avatar
            onAvatarClick={() =>
              this.setState({
                editorVisible: true
              })
            }
            src={require('@/assets/avatar/add-avatar.png')}
          />
        </div>
        <p className="form-btn-box">
          <a onClick={this.handleSave} href="javascript:;" className="form-btn">
            保存
          </a>
        </p>
        <QueueAnim type={'top'}>
          {editorVisible ? (
            <AvatarEditor
              key="avatar"
              onCancel={() =>
                this.setState({
                  editorVisible: false
                })
              }
              onComplete={this.handleEditComplete}
            />
          ) : null}
        </QueueAnim>
      </div>
    )
  }
}
