/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { ListView, WingBlank, ActivityIndicator, RefreshControl } from 'antd-mobile';
import React from 'react'
import { connect } from 'dva';
import { Link } from 'dva/router'
import styles from './IndexPage.css'


function MyBody(props) {
  return (
    <WingBlank size="sm">
      {props.children}
    </WingBlank>
  );
}

let index = 0;
const NUM_SECTIONS = 1;
const NUM_ROWS_PER_SECTION = 20;
let ROW_KEY = ''

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.dataBlob = {};
    this.sectionIDs = [];
    this.rowIDs = [];
    this.genData = (pIndex = 0) => {
      for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        this.sectionIDs.push(sectionName);
        this.dataBlob[sectionName] = sectionName;
        this.rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
          const rowName = `S${ii}, R${jj}${ROW_KEY}`;
          this.rowIDs[ii].push(rowName);
          this.dataBlob[rowName] = rowName;
        }
      }
      // new object ref
      this.sectionIDs = [].concat(this.sectionIDs);
      this.rowIDs = [].concat(this.rowIDs);
    };

    this.state = {
      dataSource: dataSource
        .cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
      isLoading: true,
      refreshing: false,
    };
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
    const { refreshing } = this.state
    if (refreshing) {
      this.dataBlob = {};
      this.sectionIDs = [];
      this.rowIDs = [];
      index = 0
    }
    if (refreshing) ROW_KEY = `-${Math.random().toFixed(4)}`
    this.genData(nextProps.page - 1);
    this.setState({
      dataSource: this.state.dataSource
        .cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
      isLoading: false,
      refreshing: false,
    });
    // setTimeout(() => {
    // }, 600);
  }
  onEndReached = () => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    console.log('reached');
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    let { page } = this.props
    setTimeout(() => {
      this.props.dispatch({
        type: 'posts/fetch',
        payload: { page: ++page },
      })
    }, 250)
  }

  onRefresh = () => {
    console.log('refresh');
    const { dispatch } = this.props
    this.setState({
      refreshing: true,
    })
    dispatch({
      type: 'posts/refresh',
    })
  }

  onScroll = (e) => {
    this.st = e.scroller.getValue().top
    this.domScroller = e
  }

  lv = null

  render() {
    const { list } = this.props
    const row = (rowData, sectionId, rowID) => {
      if (index > list.length - 1) index = 0
      const obj = list[index++]
      return (
        <div className={styles.list_item} key={rowID}>
          <Link to={`/post/${obj.id}`}>
            <p>{index}-{obj.title}</p>
            <div className={styles.p_foot}>
              <em>{obj.reply_count}/{obj.visit_count}</em>
              <em>{obj.author.loginname}</em>
            </div>
          </Link>
        </div>
      );
    };
    return (<div style={{ margin: '2% auto 0', width: '96%', height: '98%' }}>
      <ListView
        ref={(el) => { this.lv = el }}
        dataSource={this.state.dataSource}
        renderHeader={() => <span className={styles.list_header}>CNode</span>}
        renderFooter={() => (<div className={styles.list_footer} style={{ fontSize: '16px' }}>
          { this.state.isLoading
            ? <ActivityIndicator style={{ justifyContent: 'center' }} text="loading..." size="small" /> : null }
        </div>)}
        renderBodyComponent={() => <MyBody />}
        renderRow={row}
        className={styles.wrapper}
        initialListSize={10}
        pageSize={10}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={200}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        scrollerOptions={{ scrollbars: true }}
        refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
      />
    </div>);
  }
}

function mapStateToProps(state) {
  const { list, page } = state.posts
  return {
    list,
    page,
  }
}
export default connect(mapStateToProps)(IndexPage)
