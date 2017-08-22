import React from 'react'
import ProductsLayout from '../../layouts/ProductsLayout'
import { Route } from 'react-router-dom'
import EcoHome from '../../components/Products/Eco/Home'
import EcoCase from '../../components/Products/Eco/EcoCase'
import EcoFunc from '../../components/Products/Eco/EcoFunc'
import EcoQA from '../../components/Products/Eco/EcoQA'
import EcoPros from '../../components/Products/Eco/EcoPros'

function EcoPage() {
  const banner = <img className="banner-img" src={require('../../assets/carousel/eco-banner.jpg')} alt=""/>
  const tabs = [
    {path: 'eco', title: '产品首页'},
    {path: 'eco/case', title: '实景案例'},
    {path: 'eco/func', title: '功能介绍'},
    {path: 'eco/qa', title: 'Q&A'},
    {path: 'eco/pros', title: '产品信息'},
    {path: 'eco/shops', title: '门店信息'}
  ]
  const routes = (
    <div>
      <Route path="/products/eco" exact component={EcoHome} />
      <Route path='/products/eco/case' component={EcoCase} />
      <Route path='/products/eco/func' component={EcoFunc} />
      <Route path='/products/eco/qa' component={EcoQA} />
      <Route path='/products/eco/pros' component={EcoPros} />
      <Route path='/products/eco/shops' render={() => <div>shops</div>} />
    </div>
  )
  return (
    <ProductsLayout banner={banner} tabs={tabs} routes={routes} />
  )
}
export default EcoPage