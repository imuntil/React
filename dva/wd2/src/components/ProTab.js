import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import QueueAnim from 'rc-queue-anim'
import './ProTab.scss'

class ProTab extends PureComponent {
  state = {
    categoryShow: false,
    sortShow: false
  }
  index = ['categoryShow', 'sortShow']

  // componentDidMount() {
  //   document.addEventListener('touchstart', this.handleBodyClick, false)
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('touchstart', this.handleBodyClick, false)
  // }

  /* 遍历dom树 */
  handleBodyClick = e => {
    let v = e.target
    let isTab = false
    if (v.className.indexOf('fj920') >= 0) return
    while (v.tagName.toLowerCase() !== 'body') {
      if (v.className.indexOf('pro-tab-fj920') >= 0) {
        isTab = true
        break
      }
      v = v.parentElement
    }
    !isTab && this.hideAllLayer()
  }

  /* 点击tab栏 */
  handleTabClick = tab => {
    // 点击categoryLayer 的空白 cell
    if (tab === 3) {
      this.hideAllLayer()
      return
    }
    const [a, b] = [this.index[tab], this.index[(tab + 1) % 2]]
    this.setState(preState => {
      return { [a]: !preState[a], [b]: false }
    })
  }

  hideAllLayer = () => {
    this.setState({ categoryShow: false, sortShow: false })
  }
  render() {
    const {
      className,
      onTypeCellClick,
      onSortCellClick,
      type,
      sort
    } = this.props
    const { categoryShow, sortShow } = this.state
    return (
      <div
        className={`pro-tab-fj920 ${className} ${categoryShow &&
          'no-border-fj920'}`}
      >
        <div className="tab-group-fj920">
          <a
            className="inTab-fj920"
            href="javascript:;"
            onClick={() => this.handleTabClick(0)}
          >
            产品分类<span>▼</span>
          </a>
          <a
            className="inTab-fj920"
            href="javascript:;"
            onClick={() => this.handleTabClick(1)}
          >
            智能排序<span>▼</span>
          </a>
        </div>
        <QueueAnim type="top" className="layer-wrapper-fj920" duration={200}>
          {categoryShow ? (
            <div key={0} className="layer-bg-fj920" onClick={this.hideAllLayer}>
              <div className="category-layer-fj920">
                <img src={require('../assets/c-all-4.jpg')} alt="" />
                <ul>
                  {[...Array(9).keys()].map(v => (
                    <li
                      key={v}
                      className={`${v === type - 1 && 'cell-active'}`}
                    >
                      <a
                        className="inTab-fj920"
                        onClick={e => {
                          e.stopPropagation()
                          this.hideAllLayer()
                          onTypeCellClick(v + 1)
                        }}
                        href="javascript:;"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
          {sortShow ? (
            <div key={1} className="layer-bg-fj920" onClick={this.hideAllLayer}>
              <div className="sort-layer-fj920">
                {['销量最高', '价格最高', '价格最低'].map((v, i) => (
                  <a
                    className={`inTab-fj920 ${i === sort - 2 && 'cell-active'}`}
                    key={i}
                    onClick={e => {
                      e.stopPropagation()
                      this.hideAllLayer()
                      onSortCellClick(i + 2)
                    }}
                    href="javascript:;"
                  >
                    {v}
                    <span>▼</span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </QueueAnim>
      </div>
    )
  }
}

ProTab.propTypes = {
  onTypeCellClick: PropTypes.func,
  onSortCellClick: PropTypes.func,
  type: PropTypes.number,
  sort: PropTypes.number
}

export default ProTab
