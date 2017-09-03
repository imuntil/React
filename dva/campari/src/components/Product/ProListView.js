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
    console.log('ccccccccccccccc');
    const { data: { dataBlob, sectionIDs, rowIDs, PER_PAGE = 10 } } = this.props
    this.dataBlob = dataBlob
    this.sectionIDs = sectionIDs
    this.rowIDs = rowIDs
    index = 0
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
    console.log('........................will');
    console.log('index in will is ', index);
    if (nextProps.page === null) return
    this.genData(nextProps.page);
    this.setState({
      dataSource: this.state.dataSource
        .cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
      isLoading: false
    })
  }

  shouldComponentUpdate(nextProps) {
    const { replace } = this.props
    if (!replace) return true
    const { BodyComponent } = nextProps
    if (!BodyComponent) return false
    if (_.isEmpty(nextProps.store)) return false
    // if (index >= 8) return false
    // console.log('...............');
    // console.log(nextProps.lists);
    // console.log(this.props.lists);
    // console.log('oooooooooooooooooooo');
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
    console.log('index in render .................................', index);
    const { lists, PER_PAGE = 10, RowComponent = Card,
      BodyComponent = MyBody, store, fetching } = this.props
    const row = (rowDta, sectionId, rowID) => {
      console.log('list.length', lists.length);
      // if (index > lists.length - 1) {
      //   return null
      // }
      console.log(index);
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
