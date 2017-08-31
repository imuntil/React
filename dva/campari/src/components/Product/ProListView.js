import React from 'react';
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

    const { data: { dataBlob, sectionIDs, rowIDs, PER_PAGE = 10 } } = this.props
    console.log('rowIds', rowIDs);
    this.dataBlob = dataBlob
    this.sectionIDs = sectionIDs
    this.rowIDs = rowIDs
    this.index = 0
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

  // componentDidMount() {
  //   setTimeout(this.lv.scrollTo({ y: 50 }), 2000)
  // }

  componentWillReceiveProps(nextProps) {
    console.log('will');
    this.genData(nextProps.page);
    this.setState({
      dataSource: this.state.dataSource
        .cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
      isLoading: false
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  componentWillUnmount() {
    const { onUpdate } = this.props
    onUpdate(this.dataBlob, this.sectionIDs, this.rowIDs)
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
    const { lists, PER_PAGE = 10, RowComponent = Card, BodyComponent = MyBody } = this.props
    console.log(this.rowIDs);
    const row = (rowDta, sectionId, rowID) => {
      if (this.index > lists.length - 1) {
        return null
      }
      const pro = lists[this.index++]
      return (
        <RowComponent key={rowID} customStyle={{ marginTop: '.25rem' }} data={pro} />
      )
    }
    return (
      <div className={styles.list_wrapper}>
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
          // onScroll={this.onScroll}
        />
      </div>
    )
  }
}

export default ProListView;
