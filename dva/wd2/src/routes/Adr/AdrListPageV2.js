import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { List, Modal } from 'antd-mobile'
import AdrCell from '@/components/AdrCell'
import Loading from '@/components/Common/Loading'
import CustomTM from '@/components/Common/CustomTM'
import { formatSearch } from '@/utils/cts.ts'
import { delay } from '@/utils/cts.ts'
import './AdrListPage.scss'

const Item = List.Item
const alert = Modal.alert

const mapStateToProps = state => {
  const loading = state.loading
  return {
    adr: state.adr,
    loading: loading.models.adr,
    pageLoading: loading.effects['adr/fetchList']
  }
}
@connect(mapStateToProps)
export default class AdrListPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedID: formatSearch(this.props.location.search || '').id || false
    }
  }

  handleToggleDefault = (status, id) => {
    this.props.dispatch({ type: 'adr/toggleDefault', payload: { id, status } })
  }

  handleDelClick = id => {
    alert('提示', '确定删除该地址么?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'OK',
        onPress: () => {
          this.props.dispatch({ type: 'adr/delServerAdr', payload: { id } })
        }
      }
    ])
  }

  handleAdrSelected = async id => {
    this.setState({ selectedID: `${id}` })
    const { history, dispatch } = this.props
    dispatch({ type: 'adr/setSelectedID', id })
    await delay(300)
    history.go(-1)
  }

  renderCell = (index, key) => {
    const {
      history,
      adr: { dic }
    } = this.props
    const { selectedID } = this.state
    return (
      <AdrCell
        className="adr-cell-10aei"
        onEditClick={id => history.push(`/adr/${id}`)}
        onDelClick={this.handleDelClick}
        onToggleDefault={this.handleToggleDefault}
        adr={dic[key]}
        value={selectedID === key}
        onSelected={this.handleAdrSelected}
        selectAble={!!selectedID}
      />
    )
  }

  render() {
    const { adr, loading, history, pageLoading } = this.props
    const { list = [] } = adr
    return (
      <div className="container adr-10aei">
        {list.length ? (
          <CustomTM
            renderCell={this.renderCell}
            list={list}
            forceRender={Math.random()}
          />
        ) : null}
        {pageLoading ? null : (
          <List key={-1}>
            <Item
              arrow="horizontal"
              onClick={() => {
                history.push('/adr/-1')
              }}
            >
              <p className="list-item">添加收货地址</p>
            </Item>
          </List>
        )}
        {loading ? <Loading /> : null}
      </div>
    )
  }
}
