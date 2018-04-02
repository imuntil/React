import React, { PureComponent } from 'react'
import { connect } from 'dva'
// import QueueAnim from 'rc-queue-anim'
import './ProListPage.scss'
import ProTab from '@/components/ProTab'

class ProListPage extends PureComponent {
  render() {
    return (
      <div className="container pro-list-xlw29">
        <ProTab className="header-xlw29" />
        <div className="content-xlw29">
          <div>.xxx.</div>
        </div>
      </div>
    )
  }
}

export default connect()(ProListPage)
