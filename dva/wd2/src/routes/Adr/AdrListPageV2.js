import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { List, Modal } from 'antd-mobile'
import AdrCell from '@/components/AdrCell'
import Loading from '@/components/Common/Loading'
import CustomTM from '@/components/Common/CustomTM'
import { formatSearch } from '@/utils/cts'
import './AdrListPage.scss'

const Item = List.Item
const alert = Modal.alert

const mapStateToProps = state => {
  return { adr: state.adr, loading: state.loading.models.adr }
}
@connect(mapStateToProps)
export default class AdrListPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedID: formatSearch(this.props.location.search || '').id || false,
      forceRender: false
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

  handleAdrSelected = id => {
    this.setState({ selectedID: id })
  }

  renderCell = (index, key) => {
    const {
      history,
      adr: { dic }
    } = this.props
    return (
      <AdrCell
        className="adr-cell-10aei"
        onEditClick={id => history.push(`/adr/${id}`)}
        onDelClick={this.handleDelClick}
        onToggleDefault={this.handleToggleDefault}
        adr={dic[key]}
        selected={this.state.selectedID === key}
        onSelected={this.handleAdrSelected}
      />
    )
  }

  render() {
    const { adr, loading, history } = this.props
    const { list = [] } = adr
    return (
      <div className="container adr-10aei">
        {list.length ? (
          <CustomTM
            renderCell={this.renderCell}
            list={list}
            forceRander={Math.random()}
          />
        ) : null}
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
        {loading ? <Loading /> : null}
      </div>
    )
  }
}
