import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { List, WhiteSpace, Icon } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import AdrCell from '@/components/AdrCell'
import './AdrListPage.scss'

const Item = List.Item

const mapStateToProps = state => {
  return { adr: state.adr }
}
@connect(mapStateToProps)
export default class AdrListPage extends PureComponent {
  constructor(props) {
    super(props)
    this.props.dispatch({ type: 'adr/fetchList' })
  }

  handleToggleDefault = (status, id) => {
    this.props.dispatch({ type: 'adr/toggleDefault', payload: { id } })
  }

  handleDelClick = id => {
    // xxx
  }

  render() {
    const { history, adr } = this.props
    const { list = [], dic } = adr
    return (
      <div className="container adr-10aei">
        {list.length ? (
          <QueueAnim>
            {list.map(v => (
              <AdrCell
                className="adr-cell-10aei"
                onEditClick={id => history.push(`/adr/${id}`)}
                onDelClick={this.handleDelClick}
                onToggleDefault={this.handleToggleDefault}
                key={v}
                adr={dic[v]}
              />
            ))}
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
          </QueueAnim>
        ) : (
          <p className="page-loading">
            <Icon type="loading" />
          </p>
        )}
      </div>
    )
  }
}
