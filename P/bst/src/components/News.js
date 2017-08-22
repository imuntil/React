import React from 'react'
import { Table } from 'antd'
import { fetchNews } from '../reducers/news'
import { connect } from 'react-redux'
import Title from './Title'

// @connect (
//   state => ({
//     news: state.news
//   }),
//   dispatch => ({
//     fetchNews: () => dispatch(fetchNews())
//   })
// )
class News extends React.Component {
  defaultProps = {
    pagination: false
  }
  componentWillMount () {
    this.props.fetchNews()
  }
  render () {
    const columns = [
      {
        title: 'news',
        dataIndex: 'title'
      },
      {
        title: 'date',
        dataIndex: 'createTime',
        className: 'right'
      }
    ]
    const { news, pagination } = this.props
    return (
      <div className="j-news" style={{paddingBottom: '3rem', overflow: 'hidden'}}>
        <Title>
          <img src={require('../assets/news-title.png')} alt=""/>
        </Title>
        <div className="col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
          <Table columns={columns}
                 dataSource={news}
                 rowKey={row => row.id}
                 pagination={pagination}
                 showHeader={false} />
        </div>
        <div className="col-md-12 col-sm-12 col-xs-12">
          <a href="javascript:;" className="common-btn">查看更多</a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    news: state.news
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchNews: () => dispatch(fetchNews())
  }
}

News = connect(mapStateToProps, mapDispatchToProps)(News)
export default News