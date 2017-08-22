import React from 'react'
import {connect} from 'react-redux'
import {getProsListById} from '../../reducers/products'
import {fetchProducts} from '../../actions'
import {Row, Col, Spin} from 'antd'
import {URL} from '../../service'
import {Link} from 'react-router-dom'
import './Product.css'


class Products extends React.Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {
    const {categoryId, lists, fetchProsList} = this.props
    if (!lists || !lists[categoryId]) {
      fetchProsList(categoryId)
    }
  }
  render () {
    const {categoryId, lists, base = URL + '/', type} = this.props
    const list = lists[categoryId]
    return (
      <div className="products-section common-section">
        <Spin spinning={!list}>
          {
            !list
              ? null
              : Object.entries(list).map(([key, value], index) => (
              <div className="group" key={index}>
                <Row>
                  <Col xs={24} className='title'>
                    <span>
                      <img src={require('../../assets/icon/about-title-icon.jpg')} alt=""/>
                      &nbsp;&nbsp;{key}
                    </span>
                  </Col>
                  {
                    value.map((chunk, ci) => (
                      <Col xs={24} key={ci}>
                        {
                          chunk.map((pro, i) => (
                            <Col xs={12} sm={6} key={i} className='auto-img'>
                              <Link to={`/${type}/${pro.id}`}>
                                <img src={base + pro.topimage} alt=""/>
                                <p>{pro.title}</p>
                              </Link>
                            </Col>
                          ))
                        }
                      </Col>
                    ))
                  }
                </Row>
              </div>
            ))
          }
        </Spin>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    lists: getProsListById(state)
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchProsList: id => dispatch(fetchProducts(id))
  }
}
Products = connect(mapStateToProps, mapDispatchToProps)(Products)
export default Products