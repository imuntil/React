import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { domain } from '@/services'
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

const Avatar = ({ src }) => (
  <div className="box">
    <a href="javascript:;" className="avatar-48uax">
      <img src={src} alt="" width="100%" />
    </a>
  </div>
)

const mapStateToProps = state => {
  return { user: state.user }
}

@connect(mapStateToProps)
export default class ModifyPwdPage extends PureComponent {
  render() {
    const { nick, avatar, ran } = this.props.user
    return (
      <div className="container modify-avatar-48uax">
        <div className="content-48uax">
          {avatars.map((v, index) => [
            <Avatar key={index} src={v} />,
            index % 4 === 3 ? (
              <p key={`line-${index}`} className="line" />
            ) : null
          ])}
          {nick ? <Avatar src={`${domain}upload/${avatar}?${ran}`} /> : null}
          <Avatar src={require('@/assets/avatar/add-avatar.png')} />
        </div>
      </div>
    )
  }
}
