import React from 'react';
import { ListView, ActivityIndicator } from 'antd-mobile'
import styles from './ProListView.css';
import { ALL_PRO_PER_PAGE } from '../../constant.js'

function MyBody({ children }) {
  return (
    <div
      className={styles.list_body}
    >
      {children}
    </div>
  )
}
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

    this.dataBlob = {}
    this.sectionIDs = []
    this.rowIDs = []
    this.index = 0
    this.genData = (pIndex = 0) => {
      const sectionName = `Section ${pIndex}`
      this.sectionIDs.push(sectionName)
      this.dataBlob[sectionName] = sectionName
      this.rowIDs[pIndex] = []
      for (let i = 0; i < ALL_PRO_PER_PAGE; i++) {
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
      isLoading: true
    }
  }

  componentWillReceiveProps(nextProps) {
    this.genData(nextProps.page);
    this.setState({
      dataSource: this.state.dataSource
        .cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
      isLoading: false
    })
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

  render() {
    const { lists } = this.props
    const row = (rowDta, sectionId, rowID) => {
      if (this.index > lists.length - 1) {
        return null
      }
      const pro = lists[this.index++]
      return (
        <div className={styles.pro_item} key={rowID}>
          <a href="javascript:;">
            <p>{this.index}</p>
            <p>aaaa</p>
            <p>cccc</p>
          </a>
        </div>
      )
    }
    return (
      <div style={{ height: 1000 }}>
        <ListView
          dataSource={this.state.dataSource}
          renderFooter={() => (
            <div className="list_footer">
              {
                this.state.isLoading
                  ? <ActivityIndicator text="loading" size="small" />
                  : null
              }
            </div>
          )}
          renderBodyComponent={() => <MyBody />}
          className={styles.list_box}
          renderRow={row}
          initialListSize={ALL_PRO_PER_PAGE - 2}
          pageSize={ALL_PRO_PER_PAGE >> 1}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={200}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
          scrollerOptions={{ scrollbars: true }}
        />
      </div>
    )
  }
}

export default ProListView;
