import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { domain, modifyAvatar } from '@/services'
import './ModifyPage.scss'

const avatars = [
  require('@/assets/avatar/avatar-1.jpg'),
  require('@/assets/avatar/avatar-2.jpg'),
  require('@/assets/avatar/avatar-3.jpg'),
  require('@/assets/avatar/avatar-4.jpg'),
  require('@/assets/avatar/avatar-5.jpg'),
  require('@/assets/avatar/avatar-6.jpg'),
  require('@/assets/avatar/avatar-7.jpg'),
  require('@/assets/avatar/avatar-8.jpg'),
  require('@/assets/avatar/avatar-9.jpg')
]

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
    avatars
  }

  constructor(props) {
    super(props)
    const { avatar, ran } = this.props.user
    if (!avatar) {
      this.state.active = -1
    } else if (avatar.indexOf('.') !== -1) {
      this.state.active = 10
      this.state.avatars = [...avatars, `${domain}upload/${avatar}?${ran}`]
    } else {
      this.state.active = +avatar
    }
  }

  handleAvatarClick = index => {
    this.setState({ active: index + 1 })
  }

  handleSave = async () => {
    // const {
    //   dispatch,
    //   user: { phone, avatar }
    // } = this.props
    // const { active } = this.state
  }

  render() {
    const { active, avatars } = this.state
    return (
      <div className="container modify-avatar-48uax">
        <div className="content-48uax">
          {avatars.map((v, index) => [
            <Avatar
              onAvatarClick={() => this.handleAvatarClick(index)}
              active={index + 1 === active}
              key={index}
              src={v}
            />,
            index % 4 === 3 ? (
              <p key={`line-${index}`} className="line" />
            ) : null
          ])}
          <Avatar src={require('@/assets/avatar/add-avatar.png')} />
        </div>
        <p className="form-btn-box" onClick={this.handleSave}>
          <a
            onClick={this.handleClick}
            href="javascript:;"
            className="form-btn"
          >
            保存
          </a>
        </p>
      </div>
    )
  }
}
