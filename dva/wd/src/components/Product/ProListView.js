import React from 'react';
import _ from 'lodash'
import { ListView, ActivityIndicator, WingBlank } from 'antd-mobile'
import styles from './ProListView.css';
import Card from '../Card.js'

function MyBody({ children }) {
  return (
    <WingBlank>
      <div
        className={styles.list_body}
      >
        {children}
      </div>
    </WingBlank>
  )
}

let index = 0
class ProListView extends React.Component {
  constructor(props) {
    super(props)
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID]
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID]
    const dataSource = new ListView.DataSource({
      getRowData,
      getSecionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })
    const { data = {}, PER_PAGE = 10 } = this.props
    this.dataBlob = data.dataBlob || {}
    this.sectionIDs = data.sectionIDs || []
    this.rowIDs = data.rowIDs || []
    this.genData = (pIndex = 0) => {
      const sectionName = `Section ${pIndex}`
      if (this.sectionIDs.includes(sectionName)) return
      this.sectionIDs.push(sectionName)
      this.dataBlob[sectionName] = sectionName
      this.rowIDs[pIndex] = []
      for (let i = 0; i < PER_PAGE; i++) {
        const rowName = `S${pIndex}, R${i}`
        this.rowIDs[pIndex].push(rowName)
        this.dataBlob[rowName] = rowName
      }
      this.rowIDs = [].concat(this.rowIDs)
      this.sectionIDs = [].concat(this.sectionIDs)
    }

    this.state = {
      dataSource: dataSource
        .cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
      isLoading: false
    }
  }

  componentWillMount() {
    index = 0
  }

  componentWillReceiveProps(nextProps) {
    const { page } = nextProps
    if (page === null) return
    if (nextProps.fetching) {
      index = 0
      return
    }
    // console.log('will receive props, and page is ', page, ' index is ', index);
    this.genData(nextProps.page);
    this.setState({
      dataSource: this.state.dataSource
        .cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
      isLoading: false
    })
  }

  shouldComponentUpdate() {
    const { replace, BodyComponent, store, fetching } = this.props
    if (!replace || !BodyComponent || _.isEmpty(store) || fetching) return true
    return true
  }

  componentWillUnmount() {
    const { onUpdate } = this.props
    if (onUpdate) onUpdate(this.dataBlob, this.sectionIDs, this.rowIDs)
  }

  onEndReached = () => {
    console.log('reached');
    if (this.state.isLoading || !this.props.hasMore) {
      return
    }
    this.setState({ isLoading: true })
    const { onLoadMore } = this.props
    setTimeout(() => {
      onLoadMore()
    }, 1000)
  }

  onScroll = (e) => {
    console.log(e.target.scrollTop);
  }

  lv = null

  render() {
    console.log('render');
    const { lists, PER_PAGE = 10, RowComponent = Card,
      BodyComponent = MyBody, store, fetching } = this.props
    const row = (rowDta, sectionId, rowID) => {
      const pro = lists[index]
      index += 1
      if (!pro) return null
      return (
        <RowComponent key={rowID} customStyle={{ marginTop: '.25rem' }} data={store[pro]} />
      )
    }
    return (
      <div className={styles.list_wrapper}>
        {
          fetching
            ? null
            : (
              <ListView
                ref={(el) => { this.lv = el }}
                dataSource={this.state.dataSource}
                renderFooter={() => (
                  <div className="list_footer" style={{ display: 'flex', justifyContent: 'center' }}>
                    {
                      this.state.isLoading
                        ? <ActivityIndicator text="加载中..." size="small" />
                        : null
                    }
                  </div>
                )}
                renderBodyComponent={() => <BodyComponent />}
                className={styles.list_box}
                renderRow={row}
                initialListSize={PER_PAGE - 2}
                pageSize={PER_PAGE >> 1}
                scrollRenderAheadDistance={500}
                scrollEventThrottle={200}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
                scrollerOptions={{ scrollbars: true }}
              />
            )
        }
      </div>
    )
  }
}

export default ProListView;
