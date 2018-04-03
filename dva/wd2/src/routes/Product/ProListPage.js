import React, { PureComponent } from 'react'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim'
import './ProListPage.scss'
import ListCell from '@/components/ListCell'
import ProTab from '@/components/ProTab'

class ProListPage extends PureComponent {
  render() {
    return (
      <div className="container pro-list-xlw29">
        <ProTab className="header-xlw29" />
        <QueueAnim className="content-xlw29">
          {[...Array(10).keys()].map(i => (
            <ListCell className="list-cell-xlw29" key={i} />
          ))}
        </QueueAnim>
      </div>
    )
  }
}

export default connect()(ProListPage)
