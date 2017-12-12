import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { WhiteSpace, Icon, Toast, WingBlank } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import Section from '../../components/Adr/Section.js'
import Loading from '../../components/Loading.js'
import { deleteAdr } from '../../services/user'
import { delay } from '../../services/tools-fun'
import routeLoading from '../../components/HighComponent/routeLoading'
import styles from './AdrListPage.css'

class AdrListPage extends React.Component {
  state = { chosen: -1 }
  componentWillMount() {
    const { user, dispatch } = this.props
    dispatch({ type: 'adr/fetchList', payload: { uid: user._id } })
  }
  handleDefaultClick = (id, status) => {
    if (status) return false
    const { dispatch } = this.props
    dispatch({
      type: 'adr/changeDefaultAdr',
      payload: { aid: id }
    })
  }
  handleDeleteClick = async aid => {
    const { dispatch, user } = this.props
    const { err, data = {} } = await deleteAdr({ aid, uid: user._id })
    if (err || +data.code !== 0) {
      dispatch({
        type: 'error/dataOperationError',
        payload: { msg: '操作未成功-。-', code: data.code }
      })
      return false
    }
    Toast.success('删除成功', 1)
    await delay(200)
    dispatch({ type: 'adr/deleteAdr', payload: { id: aid } })
  }
  render() {
    const { idList, list, statusList } = this.props
    return (
      <div className={styles.normal}>
        {
          !idList
            ? <Loading />
            : (
              <div className="normal">
                <WhiteSpace size="lg" />
                <QueueAnim component="div" type={['right', 'left']} leaveReverse>
                  {
                    idList.length
                      ? idList.map((id, index) => (
                        <Section
                          key={id} adr={{ ...list[id], isDefault: statusList[index] }}
                          onDefaultClick={this.handleDefaultClick}
                          onDeleteClick={this.handleDeleteClick}
                          onChosen={_id => this.setState({ chosen: +_id })}
                          chosen={this.state.chosen === +id}
                        />
                    ))
                      : <WingBlank><p className={styles.empty}>还没有收货地址哦，快去添加吧</p></WingBlank>
                  }
                </QueueAnim>
                <Link className={styles.add_adr} to="/adr/edit">
                  添加收货地址 <Icon type="right" />
                </Link>
              </div>
            )
        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  const user = state['user-info']
  const { idList, list, statusList } = state.adr
  return { user, idList, list, statusList }
}

export default connect(mapStateToProps)(routeLoading(AdrListPage))
