import React from 'react'
import './Home.css'
import Slick from '../components/Home/Carousel'
import ProductSection from '../components/Home/ProductSection'
import NewsSection from '../components/Home/NewsSection'
import AboutSection from '../components/Home/AboutSection'
import OurBrands from '../components/Home/OurBrands'
import { connect } from 'react-redux'
import { fetchNewsList } from '../actions'
import { getNewsList } from '../reducers'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      delay: false
    }
  }
  componentWillMount () {
    const { fetchNewsList, list } = this.props
    if (!list || !list.length) {
      fetchNewsList()
    }
    setTimeout(() => {
      this.setState({delay: true})
    }, 500)
  }
  render () {
    const {list} = this.props
    const {delay} = this.state
    return (
      <div className="home-page">
        {
          delay ? <Slick /> : <img className="banner-img" src={require('../assets/carousel/carousel_1.jpg')} alt=""/>
        }
        <ProductSection />
        <NewsSection news={list} />
        <AboutSection />
        <OurBrands />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    list: getNewsList(state)
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchNewsList: () => dispatch(fetchNewsList())
  }
}
Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home