import React, { PureComponent } from 'react'
import './ProTab.scss'

class ProTab extends PureComponent {
  render() {
    const { className } = this.props
    return (
      <div className={`pro-tab-fj920 ${className}`}>
        <div className="tab-group-fj920">
          <a href="javascript:;">产品分类<span>▼</span></a>
          <a href="javascript:;">智能排序<span>▼</span></a>
        </div>
      </div>
    )
  }
}

export default ProTab
