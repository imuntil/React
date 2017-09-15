import React from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import QueueAnimate from 'rc-queue-anim'
import { WhiteSpace, WingBlank, Toast } from 'antd-mobile'
import AvatarEditor from '../../components/Form/AvatarEditor'
import { avatars } from '../../constant'
import styles from './ModifyAvatar.css'

const chunks = _.chunk(avatars, 4)
class ModifyAvatar extends React.Component {
  state = { showEditor: false }
  g1 = chunks.slice(0, 2)
  g2 = chunks.slice(2)
  render() {
    const { showEditor } = this.state
    return (
      <div className={styles.normal}>
        <WhiteSpace size="lg" />
        <div className={styles.box}>
          {
            this.g1.map((group, i) => (
              <p className={styles.line_group} key={i}>
                {
                  group.map((avatar, j) => (
                    <a href="javascript:;" key={`${i}-${j}`}>
                      <img src={avatar} alt=""/>
                    </a>
                  ))
                }
              </p>
            ))
          }
          <p className={styles.line_group}>
            {
              this.g2.map((avatar, i) => (
                <a href="javascript:;" key={`l-${i}`}>
                  <img src={avatar} alt=""/>
                </a>
              ))
            }
            <a href="javascript:;" onClick={() => { this.setState({ showEditor: true }) }}>
              <img src={require('../../assets/ig-dir/add-avatar.png')} alt=""/>
            </a>
            <a href="javascript:;" />
            <a href="javascript:;" />
          </p>
        </div>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WingBlank>
          <a href="javascript:;" className="common-btn">保存</a>
        </WingBlank>
        <QueueAnimate
          component="div"
          type="bottom"
        >
          {
            showEditor
              ? <AvatarEditor
              key="1" onHide={() => { this.setState({ showEditor: false }) }}
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
