import React from 'react'
import { fetchNewsDetail } from '../actions'
import { connect } from 'react-redux'
import './News.css'
import { getNewsDetail } from '../reducers'

class NewsPage extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount () {
    const {id} = this.props.match.params
    this.props.getDetail(+id)
  }
  render () {
    const {title, createTime, content} = this.props.detail
    return (
      <div className="news-page">
        <img className="banner-img" src={require('../assets/carousel/about-banner.jpg')} alt=""/>
        <div className="common-section">
          <div className="news-box">
            <p className="title">{title}</p>
            <p className="date">{createTime && createTime.substr(0, 10)}</p>
            <div className="content"
                 dangerouslySetInnerHTML={{__html: content}} />
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    detail: getNewsDetail(state)
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getDetail: id => dispatch(fetchNewsDetail(id))
  }
}
NewsPage = connect(mapStateToProps, mapDispatchToProps)(NewsPage)
export default NewsPage