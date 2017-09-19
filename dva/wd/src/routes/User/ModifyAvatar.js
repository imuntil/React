import React from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import QueueAnimate from 'rc-queue-anim'
import { WhiteSpace, WingBlank, Toast } from 'antd-mobile'
import AvatarEditor from '../../components/Form/AvatarEditor'
import { avatars, BASEURL } from '../../constant'
import { delay } from '../../services/tools-fun'
import { modifyAvatar } from '../../services/user'
import styles from './ModifyAvatar.css'

const chunks = _.chunk(avatars, 4)
function Avatar({ i, j, handleAvatarClick, chosen, avatar }) {
  return (
    <a
      onClick={() => { handleAvatarClick((i * 4) + j) }}
      href="javascript:;" key={`${i}-${j}`}
    >
      {
        chosen === (i * 4) + j
          ? <img className={styles.chosen} src={require('../../assets/ig-dir/avatar-chosen.png')} alt="" />
          : null
      }
      <span>
        <img src={avatar} alt="" />
      </span>
    </a>
  )
}
class ModifyAvatar extends React.Component {
  state = { showEditor: false, temp: '', chosen: null, g2: chunks.slice(2) }
  componentWillMount() {
    const { user: { imgname } } = this.props
    const { g2 } = this.state
    if (`${imgname}`.length > 4) {
      const ng2 = g2.concat(`${BASEURL}upload/${imgname}?${Math.random()}`)
      this.setState({ g2: ng2, chosen: (ng2.length + 8) - 1 })
    } else {
      this.setState({ chosen: imgname - 1 })
    }
  }
  g1 = chunks.slice(0, 2)
  updateToLocal = (imgname) => {
    const { dispatch } = this.props
    dispatch({
      type: 'user-info/saveToLocal',
      payload: { imgname }
    })
  }
  pushToServer = (imgfile, local = false) => {
    const { user, history } = this.props
    const body = new FormData()
    body.append('phone', user.phone)
    body.append('imgfile', imgfile)
    modifyAvatar(body)
      .then(({ data }) => {
        if (+data.resultcode === 1) {
          Toast.success('头像更新成功', 1)
          if (local) this.updateToLocal(imgfile)
          else this.updateToLocal(data.result)
          delay(1000)
            .then(() => {
              history.go(-1)
            })
        } else {
          Toast.fail(`操作失败，请稍后重试:${data.resultcode}`, 1000)
        }
      })
      .catch(err => {
        console.log(err);
        Toast.fail('操作失败，请稍后重试', 1000)
      })
  }
  handleEditEnd = (base64) => {
    console.log('edit end');
    const { g2, temp } = this.state
    const ng2 = temp ? g2.slice(0, -1).concat(base64) : g2.concat(base64)
    this.setState({
      g2: ng2,
      showEditor: false,
      chosen: (ng2.length + 8) - 1,
      temp: base64
    })
  }
  handleAvatarClick = index => {
    this.setState({ chosen: index })
  }
  handleSaveClick = () => {
    console.log('save');
    const { temp, chosen, g2 } = this.state
    const { history } = this.props
    if (chosen === 9 && !temp) {
      return history.go(-1)
    }
    const index = (g2.length + 8) - 1
    if (index === chosen) {
      this.pushToServer(temp.replace('data:image/jpeg;base64,', ''))
    } else {
      this.pushToServer(chosen + 1, true)
    }
  }
  render() {
    const { showEditor, chosen, g2 } = this.state
    return (
      <div className={styles.normal}>
        <WhiteSpace size="lg" />
        <div className={styles.box}>
          {
            this.g1.map((group, i) => (
              <p className={styles.line_group} key={i}>
                {
                  group.map((avatar, j) => (
                    <Avatar
                      i={i} j={j} handleAvatarClick={this.handleAvatarClick}
                      chosen={chosen} avatar={avatar} key={`${i}-${j}`}
                    />
                  ))
                }
              </p>
            ))
          }
          <p className={styles.line_group} style={{ justifyContent: 'flex-start' }}>
            {
              g2.map((avatar, i) => (
                <Avatar
                  i={2} j={i} handleAvatarClick={this.handleAvatarClick}
                  chosen={chosen} avatar={avatar} key={`2-${i}`}
                />
              ))
            }
            <a href="javascript:;" onClick={() => { this.setState({ showEditor: true }) }}>
              <img src={require('../../assets/ig-dir/add-avatar.png')} alt="" />
            </a>
          </p>
        </div>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WingBlank>
          <a href="javascript:;" onClick={this.handleSaveClick} className="common-btn">保存</a>
        </WingBlank>
        <QueueAnimate
          component="div"
          type="bottom"
        >
          {
            showEditor
              ? <AvatarEditor
                key="1"
                onEditEnd={this.handleEditEnd}
                onHide={() => { this.setState({ showEditor: false }) }}
              />
              : null
          }
        </QueueAnimate>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const user = state['user-info']
  return { user }
}

export default connect(mapStateToProps)(ModifyAvatar)
