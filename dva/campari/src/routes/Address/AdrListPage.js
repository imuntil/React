import React from 'react'
import { connect } from 'dva'
import { WhiteSpace, Icon } from 'antd-mobile'
import Section from '../../components/Adr/Section.js'
import Loading from '../../components/Loading.js'
import { modifyAdr, setDefaultAdr } from '../../services/user'
import styles from './AdrListPage.css'

class AdrListPage extends React.Component {
  componentWillMount() {
    const { user, dispatch } = this.props
    dispatch({ type: 'adr/fetchList', payload: { userid: user.usersid } })
  }
  handleDefaultClick = (id, status) => {
    if (status) return false
    const { user, dispatch } = this.props
    setDefaultAdr({ userid: user.usersid, id })
      .then(({ data }) => {
        const { resultcode } = data
        if (+resultcode === 1) {
          dispatch({ type: '' , payload: '' })
        } else {
          console.log('fail');
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    const { idList, list } = this.props
    return (
      <div className={styles.normal}>
        {
          !idList
            ? <Loading />
            : (
              <div className="normal">
                <WhiteSpace size="lg" />
                {
                  idList.length
                    ? idList.map(id => (
                      <Section
                        key={id} adr={list[id]}
                        onDefaultClick={this.handleDefaultClick}
                      />
                    ))
                    : <p>还没有收货地址哦，快去添加吧</p>
                }
                <a className={styles.add_adr} href="javascript:;">
                  添加收货地址 <Icon type="right" />
                </a>
              </div>
            )
        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  const user = state['user-info']
  const { idList, list } = state.adr
  return { user, idList, list }
}

export default connect(mapStateToProps)(AdrListPage)
